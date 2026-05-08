import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ----- DB migrations -----
(async () => {
  const cols = [
    'ADD COLUMN IF NOT EXISTS username VARCHAR(50)',
    'ADD COLUMN IF NOT EXISTS full_name VARCHAR(255)',
    "ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active'",
    'ADD COLUMN IF NOT EXISTS failed_attempts INTEGER DEFAULT 0',
    'ADD COLUMN IF NOT EXISTS locked_at TIMESTAMPTZ',
    'ADD COLUMN IF NOT EXISTS deny_reason TEXT',
    'ADD COLUMN IF NOT EXISTS secret_question TEXT',
    'ADD COLUMN IF NOT EXISTS secret_answer TEXT',
  ];
  for (const col of cols) {
    await pool.query(`ALTER TABLE users ${col}`).catch(() => {});
  }
  await pool.query(`
    CREATE TABLE IF NOT EXISTS reset_codes (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      code VARCHAR(6) NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      used BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `).catch(() => {});
  // Ensure existing admin account is active
  await pool.query(`UPDATE users SET status='active', failed_attempts=0 WHERE status IS NULL OR status=''`).catch(() => {});
})();

const app = express();
const PORT = parseInt(process.env.PORT || '5000');
const isDev = process.env.NODE_ENV !== 'production';

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
}));
app.use(express.json());

app.use((req, _res, next) => {
  if (req.path.startsWith('/api')) {
    const hasKey = !!req.headers['x-api-key'];
    const hasToken = !!req.headers['authorization'];
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} | auth=${hasKey ? 'api-key' : hasToken ? 'bearer' : 'NONE'}`);
  }
  next();
});

// ----- Auth middleware -----
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-dev-secret';

const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Accept JWT Bearer token (portal login)
  const authHeader = req.headers['authorization'];
  if (authHeader?.startsWith('Bearer ')) {
    try {
      jwt.verify(authHeader.slice(7), JWT_SECRET);
      return next();
    } catch {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }
  }
  // Also accept raw API key for backwards compatibility
  const key = req.headers['x-api-key'];
  const expected = process.env.PORTAL_API_KEY;
  if (expected && key === expected) return next();

  res.status(401).json({ error: 'Unauthorized' });
};

// ----- AUTH ROUTES -----
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) { res.status(400).json({ error: 'Email and password required' }); return; }
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    const user = rows[0];
    if (!user) { res.status(401).json({ error: 'Invalid email or password.' }); return; }
    // Check locked (5+ failed attempts)
    if ((user.failed_attempts ?? 0) >= 5) {
      res.status(403).json({ error: 'Account locked due to too many failed attempts. Contact your administrator.' }); return;
    }
    // Check account status
    if (user.status === 'pending') {
      res.status(403).json({ error: 'Your account is pending administrator approval.' }); return;
    }
    if (user.status === 'denied') {
      const reason = user.deny_reason ? ` Reason: ${user.deny_reason}` : '';
      res.status(403).json({ error: `Your account request was denied.${reason}` }); return;
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      const attempts = (user.failed_attempts ?? 0) + 1;
      await pool.query('UPDATE users SET failed_attempts = $1 WHERE id = $2', [attempts, user.id]);
      const left = 5 - attempts;
      if (left <= 0) {
        res.status(403).json({ error: 'Account locked due to too many failed attempts. Contact your administrator.' });
      } else {
        res.status(401).json({ error: `Invalid email or password. ${left} attempt${left === 1 ? '' : 's'} remaining before lockout.` });
      }
      return;
    }
    await pool.query('UPDATE users SET failed_attempts = 0 WHERE id = $1', [user.id]);
    const displayName = user.full_name || user.name;
    const token = jwt.sign({ id: user.id, email: user.email, name: displayName, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: { id: user.id, email: user.email, name: displayName, role: user.role } });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) { res.status(401).json({ error: 'No token' }); return; }
  try {
    const payload = jwt.verify(authHeader.slice(7), JWT_SECRET) as any;
    res.json({ id: payload.id, email: payload.email, name: payload.name, role: payload.role });
  } catch { res.status(401).json({ error: 'Invalid or expired token' }); }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { full_name, email, username, password, secret_question, secret_answer } = req.body;
    if (!full_name || !email || !username || !password || !secret_question || !secret_answer) {
      res.status(400).json({ error: 'All fields are required.' }); return;
    }
    const { rows: existing } = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email.toLowerCase().trim(), username.toLowerCase().trim()]
    );
    if (existing.length > 0) { res.status(409).json({ error: 'An account with this email or username already exists.' }); return; }
    const hash = await bcrypt.hash(password, 12);
    const answerHash = await bcrypt.hash(secret_answer.toLowerCase().trim(), 10);
    await pool.query(
      `INSERT INTO users (email, password_hash, name, full_name, username, role, status, secret_question, secret_answer, failed_attempts, created_at)
       VALUES ($1, $2, $3, $3, $4, 'user', 'pending', $5, $6, 0, NOW())`,
      [email.toLowerCase().trim(), hash, full_name, username.toLowerCase().trim(), secret_question, answerHash]
    );
    res.status(201).json({ message: 'Account created. Pending administrator approval.' });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) { res.status(400).json({ error: 'Email required.' }); return; }
    const { rows } = await pool.query(
      "SELECT id, secret_question FROM users WHERE email = $1 AND status = 'active'",
      [email.toLowerCase().trim()]
    );
    if (!rows[0]) { res.json({ message: 'If that email is registered, a code has been sent.' }); return; }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expires = new Date(Date.now() + 15 * 60 * 1000);
    await pool.query('DELETE FROM reset_codes WHERE email = $1', [email.toLowerCase().trim()]);
    await pool.query('INSERT INTO reset_codes (email, code, expires_at) VALUES ($1, $2, $3)', [email.toLowerCase().trim(), code, expires]);
    res.json({ message: 'Code generated.', code, secret_question: rows[0].secret_question });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/auth/verify-code', async (req, res) => {
  try {
    const { email, code } = req.body;
    const { rows } = await pool.query(
      'SELECT id FROM reset_codes WHERE email = $1 AND code = $2 AND used = FALSE AND expires_at > NOW()',
      [email.toLowerCase().trim(), code]
    );
    if (!rows[0]) { res.status(400).json({ error: 'Invalid or expired code.' }); return; }
    res.json({ valid: true });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/auth/verify-secret', async (req, res) => {
  try {
    const { email, secret_answer } = req.body;
    const { rows } = await pool.query('SELECT secret_answer FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    if (!rows[0]) { res.status(400).json({ error: 'Invalid request.' }); return; }
    const valid = await bcrypt.compare(secret_answer.toLowerCase().trim(), rows[0].secret_answer);
    if (!valid) { res.status(400).json({ error: 'Incorrect answer to security question.' }); return; }
    res.json({ valid: true });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, code, new_password } = req.body;
    const { rows } = await pool.query(
      'SELECT id FROM reset_codes WHERE email = $1 AND code = $2 AND used = FALSE AND expires_at > NOW()',
      [email.toLowerCase().trim(), code]
    );
    if (!rows[0]) { res.status(400).json({ error: 'Invalid or expired reset session.' }); return; }
    const hash = await bcrypt.hash(new_password, 12);
    await pool.query('UPDATE users SET password_hash = $1, failed_attempts = 0 WHERE email = $2', [hash, email.toLowerCase().trim()]);
    await pool.query('UPDATE reset_codes SET used = TRUE WHERE email = $1', [email.toLowerCase().trim()]);
    res.json({ message: 'Password reset successfully.' });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ----- ADMIN ROUTES -----
app.get('/api/admin/users', requireAuth, async (_req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, full_name, name, email, username, role, status, deny_reason, failed_attempts, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/admin/users/:id/approve', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      "UPDATE users SET status = 'active', failed_attempts = 0 WHERE id = $1 RETURNING id, email, status",
      [req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'User not found.' }); return; }
    res.json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/admin/users/:id/deny', requireAuth, async (req, res) => {
  try {
    const { reason } = req.body;
    const { rows } = await pool.query(
      "UPDATE users SET status = 'denied', deny_reason = $1 WHERE id = $2 RETURNING id, email, status",
      [reason || null, req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'User not found.' }); return; }
    res.json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/admin/users/:id/unlock', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'UPDATE users SET failed_attempts = 0 WHERE id = $1 RETURNING id, email, failed_attempts',
      [req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'User not found.' }); return; }
    res.json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ----- HEALTH -----
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// ===== JOB LISTINGS =====
app.get('/api/jobs', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM job_listings WHERE status = 'active' ORDER BY published_at DESC NULLS LAST`
    );
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/jobs/all', async (_req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM job_listings ORDER BY created_at DESC`);
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM job_listings WHERE id = $1`, [req.params.id]);
    if (!rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/jobs', requireAuth, async (req, res) => {
  const { title, slug, department, location, employment_type, experience_level, description, responsibilities, requirements, salary_range, status } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO job_listings (title, slug, department, location, employment_type, experience_level, description, responsibilities, requirements, salary_range, status, published_at, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW()) RETURNING *`,
      [title, slug, department, location, employment_type, experience_level, description, responsibilities, requirements, salary_range, status, status === 'active' ? new Date() : null]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/jobs/:id', requireAuth, async (req, res) => {
  const { title, slug, department, location, employment_type, experience_level, description, responsibilities, requirements, salary_range, status } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE job_listings SET title=$1,slug=$2,department=$3,location=$4,employment_type=$5,experience_level=$6,description=$7,responsibilities=$8,requirements=$9,salary_range=$10,status=$11,updated_at=NOW() WHERE id=$12 RETURNING *`,
      [title, slug, department, location, employment_type, experience_level, description, responsibilities, requirements, salary_range, status, req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/jobs/:id', requireAuth, async (req, res) => {
  try {
    await pool.query(`DELETE FROM job_listings WHERE id = $1`, [req.params.id]);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ===== BLOG POSTS =====
app.get('/api/blog', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC NULLS LAST`
    );
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/blog/all', async (_req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM blog_posts ORDER BY created_at DESC`);
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/blog/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM blog_posts WHERE id::text = $1 OR slug = $1`, [req.params.id]);
    if (!rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/blog', requireAuth, async (req, res) => {
  const { title, slug, excerpt, content, author, category, cover_image, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO blog_posts (title,slug,excerpt,content,author,category,cover_image,tags,status,published_at,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW(),NOW()) RETURNING *`,
      [title, slug, excerpt, content, author, category, cover_image, tags || [], status, status === 'published' ? new Date() : null]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/blog/:id', requireAuth, async (req, res) => {
  const { title, slug, excerpt, content, author, category, cover_image, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE blog_posts SET title=$1,slug=$2,excerpt=$3,content=$4,author=$5,category=$6,cover_image=$7,tags=$8,status=$9,updated_at=NOW() WHERE id=$10 RETURNING *`,
      [title, slug, excerpt, content, author, category, cover_image, tags || [], status, req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/blog/:id', requireAuth, async (req, res) => {
  try {
    await pool.query(`DELETE FROM blog_posts WHERE id = $1`, [req.params.id]);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ===== CASE STUDIES =====
app.get('/api/cases', async (_req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM case_studies WHERE status = 'published' ORDER BY published_at DESC NULLS LAST`);
    res.json(rows);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.get('/api/cases/all', async (_req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM case_studies ORDER BY created_at DESC`);
    res.json(rows);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/cases', requireAuth, async (req, res) => {
  const { title, slug, client, industry, challenge, solution, results, excerpt, cover_image, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO case_studies (title,slug,client,industry,challenge,solution,results,excerpt,cover_image,tags,status,published_at,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW()) RETURNING *`,
      [title, slug, client, industry, challenge, solution, results, excerpt, cover_image, tags || [], status, status === 'published' ? new Date() : null]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/cases/:id', requireAuth, async (req, res) => {
  const { title, slug, client, industry, challenge, solution, results, excerpt, cover_image, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE case_studies SET title=$1,slug=$2,client=$3,industry=$4,challenge=$5,solution=$6,results=$7,excerpt=$8,cover_image=$9,tags=$10,status=$11,updated_at=NOW() WHERE id=$12 RETURNING *`,
      [title, slug, client, industry, challenge, solution, results, excerpt, cover_image, tags || [], status, req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/cases/:id', requireAuth, async (req, res) => {
  try {
    await pool.query(`DELETE FROM case_studies WHERE id = $1`, [req.params.id]);
    res.json({ success: true });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ===== EBOOKS =====
app.get('/api/ebooks', async (_req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM ebooks WHERE status = 'published' ORDER BY published_at DESC NULLS LAST`);
    res.json(rows);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.get('/api/ebooks/all', async (_req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM ebooks ORDER BY created_at DESC`);
    res.json(rows);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/ebooks', requireAuth, async (req, res) => {
  const { title, slug, description, author, category, cover_image, download_url, page_count, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO ebooks (title,slug,description,author,category,cover_image,download_url,page_count,tags,status,published_at,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW(),NOW()) RETURNING *`,
      [title, slug, description, author, category, cover_image, download_url, page_count, tags || [], status, status === 'published' ? new Date() : null]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/ebooks/:id', requireAuth, async (req, res) => {
  const { title, slug, description, author, category, cover_image, download_url, page_count, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE ebooks SET title=$1,slug=$2,description=$3,author=$4,category=$5,cover_image=$6,download_url=$7,page_count=$8,tags=$9,status=$10,updated_at=NOW() WHERE id=$11 RETURNING *`,
      [title, slug, description, author, category, cover_image, download_url, page_count, tags || [], status, req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/ebooks/:id', requireAuth, async (req, res) => {
  try {
    await pool.query(`DELETE FROM ebooks WHERE id = $1`, [req.params.id]);
    res.json({ success: true });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ===== GUIDES =====
app.get('/api/guides', async (_req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM guides WHERE status = 'published' ORDER BY published_at DESC NULLS LAST`);
    res.json(rows);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.get('/api/guides/all', async (_req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM guides ORDER BY created_at DESC`);
    res.json(rows);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/guides', requireAuth, async (req, res) => {
  const { title, slug, excerpt, content, author, category, cover_image, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO guides (title,slug,excerpt,content,author,category,cover_image,tags,status,published_at,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,NOW(),NOW()) RETURNING *`,
      [title, slug, excerpt, content, author, category, cover_image, tags || [], status, status === 'published' ? new Date() : null]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/guides/:id', requireAuth, async (req, res) => {
  const { title, slug, excerpt, content, author, category, cover_image, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE guides SET title=$1,slug=$2,excerpt=$3,content=$4,author=$5,category=$6,cover_image=$7,tags=$8,status=$9,updated_at=NOW() WHERE id=$10 RETURNING *`,
      [title, slug, excerpt, content, author, category, cover_image, tags || [], status, req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/guides/:id', requireAuth, async (req, res) => {
  try {
    await pool.query(`DELETE FROM guides WHERE id = $1`, [req.params.id]);
    res.json({ success: true });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ===== WEBINARS =====
app.get('/api/webinars', async (_req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM webinars WHERE status = 'published' ORDER BY event_date DESC NULLS LAST`);
    res.json(rows);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.get('/api/webinars/all', async (_req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM webinars ORDER BY created_at DESC`);
    res.json(rows);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/webinars', requireAuth, async (req, res) => {
  const { title, slug, description, host, event_date, duration_minutes, recording_url, cover_image, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO webinars (title,slug,description,host,event_date,duration_minutes,recording_url,cover_image,tags,status,published_at,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW(),NOW()) RETURNING *`,
      [title, slug, description, host, event_date, duration_minutes, recording_url, cover_image, tags || [], status, status === 'published' ? new Date() : null]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/webinars/:id', requireAuth, async (req, res) => {
  const { title, slug, description, host, event_date, duration_minutes, recording_url, cover_image, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE webinars SET title=$1,slug=$2,description=$3,host=$4,event_date=$5,duration_minutes=$6,recording_url=$7,cover_image=$8,tags=$9,status=$10,updated_at=NOW() WHERE id=$11 RETURNING *`,
      [title, slug, description, host, event_date, duration_minutes, recording_url, cover_image, tags || [], status, req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/webinars/:id', requireAuth, async (req, res) => {
  try {
    await pool.query(`DELETE FROM webinars WHERE id = $1`, [req.params.id]);
    res.json({ success: true });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

// ===== Frontend: Dev proxy / Prod static =====
// Midgard portal — always served as pre-built static files (no proxy)
const midgardDist = path.join(__dirname, 'midgard', 'dist');
// Hashed assets can be cached long-term; index.html must never be cached
app.use('/midgard/assets', express.static(path.join(midgardDist, 'assets'), { maxAge: '1y', immutable: true }));
app.use('/midgard', express.static(midgardDist, { etag: false, lastModified: false, setHeaders: (res, filePath) => {
  if (filePath.endsWith('index.html')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  }
}}));
app.get(['/midgard', '/midgard/*splat'], (_req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.sendFile(path.join(midgardDist, 'index.html'));
});

if (isDev) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:5173',
      changeOrigin: true,
      ws: true,
      on: {
        error: (_err, _req, res) => {
          (res as express.Response).status(503).send('Vite dev server starting up — please refresh in a moment.');
        },
      },
    })
  );
} else {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅  API server listening on :${PORT}`);
  if (isDev) console.log(`    Public site → Vite on :5173 | Midgard → static dist`);
});
