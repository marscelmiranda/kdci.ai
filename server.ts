import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import multer from 'multer';
import fs from 'fs';

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const uploadsDir = path.join(__dirname, 'public', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });
const uploadStorage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).substr(2, 6)}${ext}`);
  },
});
const upload = multer({ storage: uploadStorage, limits: { fileSize: 15 * 1024 * 1024 } });

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
  // Marketing subscribers table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS marketing_subscribers (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      full_name VARCHAR(255),
      contact_number VARCHAR(50),
      service_interests TEXT[],
      marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
      subscribed_at TIMESTAMPTZ DEFAULT NOW(),
      status VARCHAR(20) DEFAULT 'active'
    )
  `).catch(() => {});
  // Manpower requests — add metric columns if missing
  await pool.query(`ALTER TABLE manpower_requests ADD COLUMN IF NOT EXISTS applicants_total INTEGER DEFAULT 0`).catch(() => {});
  await pool.query(`ALTER TABLE manpower_requests ADD COLUMN IF NOT EXISTS applicants_processed INTEGER DEFAULT 0`).catch(() => {});
  // Manpower requests table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS manpower_requests (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      department TEXT,
      location TEXT,
      employment_type TEXT,
      description TEXT,
      responsibilities TEXT,
      requirements TEXT,
      status TEXT DEFAULT 'pending',
      requested_by_email TEXT,
      requested_by_name TEXT,
      assigned_to_email TEXT,
      assigned_to_name TEXT,
      job_listing_id INTEGER,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `).catch(() => {});
})();

const app = express();
const PORT = parseInt(process.env.PORT || '5000');
const isDev = process.env.NODE_ENV !== 'production';

app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (!isDev && host.startsWith('www.')) {
    const target = `https://${host.slice(4)}${req.url}`;
    return res.redirect(301, target);
  }
  next();
});

// Serve robots.txt and sitemap.xml directly from public/ (bypasses build)
app.get('/robots.txt', (_req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});
app.get('/sitemap.xml', async (_req, res) => {
  try {
    const staticXml = fs.readFileSync(path.join(__dirname, 'public', 'sitemap.xml'), 'utf8');
    const { rows: blogs } = await pool.query(
      `SELECT slug, updated_at FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC NULLS LAST`
    );
    const today = new Date().toISOString().slice(0, 10);
    const blogEntries = blogs.map((b: any) => {
      const lastmod = b.updated_at ? new Date(b.updated_at).toISOString().slice(0, 10) : today;
      return `  <url>\n    <loc>https://kdci.ai/blogs/${b.slug}/</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
    }).join('\n');
    const merged = staticXml.replace('</urlset>', `\n  <!-- ── Blog Posts ──────────────────────────────────────────────────── -->\n${blogEntries}\n\n</urlset>`);
    res.setHeader('Content-Type', 'application/xml');
    res.send(merged);
  } catch {
    res.setHeader('Content-Type', 'application/xml');
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
  }
});

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

app.get('/api/auth/me', async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) { res.status(401).json({ error: 'No token' }); return; }
  try {
    const payload = jwt.verify(authHeader.slice(7), JWT_SECRET) as any;
    // Always fetch role live from the database so admin changes take effect immediately
    const result = await pool.query('SELECT role FROM users WHERE id = $1', [payload.id]);
    const liveRole = result.rows[0]?.role ?? payload.role;
    res.json({ id: payload.id, email: payload.email, name: payload.name, role: liveRole });
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

// ----- CONTACT FORM -----
app.post('/api/contact', async (req, res) => {
  const {
    // Full contact page fields
    inquiryType, firstName, lastName, country, message,
    // Service page fields (some use 'name' instead of first/last)
    name, notes, service, source,
    // Common across all forms
    email, phone, company, role,
    // Extra service-specific fields
    agents, agentCount, department, channel, channels, meetingTarget,
  } = req.body;

  const resolvedName = name || [firstName, lastName].filter(Boolean).join(' ') || '';
  const resolvedMessage = message || notes || '';
  const resolvedType = inquiryType || service || source || 'Website Inquiry';

  if (!email || !resolvedName || !company) {
    res.status(400).json({ error: 'Missing required fields (name, email, company).' });
    return;
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error('[contact] SMTP credentials not configured');
    res.status(500).json({ error: 'Email service not configured. Please contact us directly at info@kdci.ai.' });
    return;
  }

  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const row = (label: string, value: string | undefined | null) =>
    value ? `<tr><td style="padding:8px 0;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;width:160px;vertical-align:top">${label}</td><td style="padding:8px 0;font-weight:600;color:#111">${value}</td></tr>` : '';

  const esc = (s: string) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;border:1px solid #eee;border-radius:8px;overflow:hidden">
      <div style="background:#E61739;padding:24px 32px">
        <h1 style="color:white;margin:0;font-size:18px;font-weight:700;letter-spacing:0.5px">New Website Inquiry — KDCI.co</h1>
        <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:13px">${esc(resolvedType)}</p>
      </div>
      <div style="padding:32px;background:#fafafa">
        <table style="width:100%;border-collapse:collapse">
          ${row('Name', resolvedName)}
          ${row('Email', `<a href="mailto:${email}" style="color:#E61739">${email}</a>`)}
          ${row('Phone', phone)}
          ${row('Company', company)}
          ${row('Role', role)}
          ${row('Country', country)}
          ${row('Service', service && service !== resolvedType ? service : null)}
          ${row('Source Page', source)}
          ${row('No. of AI Agents', agents || agentCount)}
          ${row('Department', department)}
          ${row('Support Channels', channel || channels)}
          ${row('Monthly Meeting Target', meetingTarget)}
        </table>
        ${resolvedMessage ? `
        <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e5e5e5">
          <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">Message / Notes</div>
          <p style="white-space:pre-wrap;line-height:1.7;margin:0;color:#333">${esc(resolvedMessage)}</p>
        </div>` : ''}
      </div>
      <div style="padding:14px 32px;background:#111;color:#555;font-size:11px">
        Submitted via kdci.co · ${new Date().toUTCString()}
      </div>
    </div>`;

  try {
    await transporter.sendMail({
      from: `"KDCI Website" <${smtpUser}>`,
      to: 'info@kdci.ai',
      replyTo: email,
      subject: `[Website Inquiry] ${resolvedType} — ${resolvedName} (${company})`,
      html,
    });
    console.log(`[contact] Email sent: ${email} — ${resolvedType}`);
    res.json({ success: true });
  } catch (err: any) {
    console.error('[contact] Send error:', err.message);
    res.status(500).json({ error: 'Failed to send your message. Please try again or email us directly at info@kdci.ai.' });
  }
});

// ----- MARKETING SUBSCRIBE -----
app.post('/api/subscribe', async (req, res) => {
  const { email, fullName, contactNumber, serviceInterests, marketingConsent } = req.body;
  if (!email || !fullName || !marketingConsent) {
    res.status(400).json({ error: 'Email, full name and marketing consent are required.' });
    return;
  }
  try {
    await pool.query(
      `INSERT INTO marketing_subscribers (email, full_name, contact_number, service_interests, marketing_consent)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE
         SET full_name = EXCLUDED.full_name,
             contact_number = EXCLUDED.contact_number,
             service_interests = EXCLUDED.service_interests,
             marketing_consent = EXCLUDED.marketing_consent,
             subscribed_at = NOW(),
             status = 'active'`,
      [email, fullName, contactNumber || null, serviceInterests || [], true]
    );
    console.log(`[subscribe] New subscriber: ${email}`);
    res.json({ success: true });
  } catch (err: any) {
    console.error('[subscribe] DB error:', err.message);
    res.status(500).json({ error: 'Failed to save subscription. Please try again.' });
  }
});

// ----- ONE-TIME DEV→PROD SEED (remove after use) -----
app.post('/api/admin/seed-db', async (req, res) => {
  const key = req.headers['x-api-key'];
  if (!process.env.PORTAL_API_KEY || key !== process.env.PORTAL_API_KEY) {
    res.status(401).json({ error: 'Unauthorized' }); return;
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Users
    await client.query('DELETE FROM reset_codes');
    await client.query('DELETE FROM users');
    const USERS = [
      [1,'admin@kdci.co','$2b$12$8RZ2AqthACt8CrNH6tY4cemL05GlmJMxPjST219ERCAHFCqN8hjn2','Admin','admin','2026-05-07 08:02:09.12553',null,null,'active',0,null,null,null,null],
      [2,'testuser@kdci.co','$2b$12$IzhMVfwG7ITx/njaCLQHAuoPmKBxrPzl3T0ppVppIPTfAdGIVKGSG','Test User','user','2026-05-08 02:13:23.106361','testuser','Test User','pending',0,null,null,'What city were you born in?','$2b$10$UM6a7Iu52NcfCISFqNGIrOUyYkA2wg6Iaf0NyhZqTESv4LRqRIIiO'],
      [3,'marscel@kdci.co','$2b$12$v9mSk/4XEiNtvJfXN/heV.E24WaRcMVS9gkz6QscV6N.5YVcTrqwi','Marscel Miranda','admin','2026-05-08 02:40:06.937169','marscel','Marscel Miranda','active',0,null,null,'What city were you born in?','$2b$10$YVpOkYyp/pVCz7EneXmL9OC4IkoOl/0kFu2gmbXo.JraxD7LZhcuC'],
      [4,'marisse.marasigan@kdci.co','$2a$06$2e3ZaarPiPzdF9ioAHKqVeKvtVXD03w0YPOXPHbZ1d3jSXX7HD0ZO','Marisse Marasigan','admin','2026-05-13 02:21:49.452272',null,null,'active',0,null,null,null,null],
    ];
    for (const u of USERS) {
      await client.query(
        `INSERT INTO users (id,email,password_hash,name,role,created_at,username,full_name,status,failed_attempts,locked_at,deny_reason,secret_question,secret_answer)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
        u
      );
    }
    await client.query(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`);

    // Job listings
    await client.query('DELETE FROM job_listings');
    const JOBS = [
      [3,'Content Writer','content-writer','CX & Support','Pasig City','Contract',null,
        `Job Summary\n\nKDCI Outsourcing is seeking a Staff Writer to create high-quality, original written content across client case studies, business research papers, and company communications. This role is not focused on generic SEO blogging. Instead, it is responsible for producing substantive, insight-driven content that demonstrates KDCI's impact on clients, showcases operational outcomes, and positions the company as a thought leader in outsourcing and professional services.\n\nThe ideal candidate has a journalism or research-driven writing background and is comfortable turning real business data, interviews, and operational results into compelling narratives. This role requires curiosity, analytical thinking, and the ability to independently propose and develop story ideas that matter to decision-makers.\n\nKey Responsibilities\n\nWrite original client case studies that document KDCI's results, processes, and business impact across industries.\nProduce research papers and white papers analyzing business process outcomes, outsourcing performance, productivity, cost efficiency, and operational improvements.\nWrite company newsletters and internal/external updates highlighting milestones, client wins, product launches, and company developments.\nPropose story ideas and research topics to the marketing and leadership team, based on trends, client data, and market opportunities.\nConduct interviews with clients, account managers, executives, and subject-matter experts to gather firsthand insights.\nPerform independent research, data validation, and fact-checking to ensure accuracy and credibility.\nTranslate complex business and operational concepts into clear, persuasive, and engaging content for executive-level and professional audiences.\nCollaborate with marketing, sales, and leadership to align content with strategic positioning and go-to-market initiatives.\nRevise and refine content based on editorial feedback while maintaining high standards of quality, structure, and originality.\nMaintain consistency with KDCI\'s brand voice, tone, and editorial standards across all written materials.`,
        null,
        `Job Requirements\n\nBachelor\'s degree in Journalism, Communications, English, Business, or a related field.\n2–4 years of professional writing experience in journalism, research writing, B2B content, or editorial publishing.\nDemonstrated experience writing case studies, research articles, white papers, or analytical business content.\nStrong portfolio of published work showing original reporting, structured thinking, and depth of analysis.\nAbility to conduct interviews, extract insights, and synthesize qualitative and quantitative information into compelling narratives.\nExceptional writing, editing, and proofreading skills with attention to clarity, logic, and factual accuracy.\nAbility to independently generate content ideas and story angles without relying on prompts.\nStrong time management skills and the ability to manage multiple projects and deadlines.\nComfortable working cross-functionally with marketing, operations, and executive leadership.`,
        null,'active','2026-05-07 07:52:22.089','2026-05-07 07:52:22.099489','2026-05-07 07:52:22.099489'],
      [4,'AI Consultant','ai-consultant','AI & Data','Hybrid','Full-Time',null,
        `About the role\n\nKDCI Outsourcing is looking for an experienced AI Consultant to help our clients and internal teams harness the power of artificial intelligence. You\'ll assess business processes, identify automation and AI opportunities, design tailored AI strategies, and guide implementation end-to-end — from proof-of-concept to full deployment. This is a high-impact, client-facing role at the intersection of strategy, technology, and outsourcing operations.\n\nKey responsibilities\n\nConduct AI readiness assessments for clients across industries including e-commerce, healthcare, finance, and marketing.\n\nDesign and deliver AI roadmaps aligned with business goals, covering NLP, machine learning, computer vision, and generative AI use cases.\n\nCollaborate with KDCI\'s outsourced teams to integrate AI-powered tools into existing client workflows (CRM, BPO, content, support).\n\nEvaluate, recommend, and oversee implementation of third-party AI tools and platforms (ChatGPT, Gemini, Claude, Midjourney, HubSpot AI, etc.).\n\nLead internal AI upskilling programs and workshops to build team capability across KDCI departments.\n\nStay ahead of AI trends and proactively identify new service offerings KDCI can bring to market.`,
        null,
        `3–5 years in AI consulting, data science, or technology strategy\n\nStrong understanding of ML frameworks, LLMs, and AI application layers\n\nProven client-facing experience delivering strategic recommendations\n\nProficiency in Python or no-code AI tools; familiarity with APIs\n\nExcellent English communication — written and verbal`,
        null,'active',null,'2026-05-07 08:44:28.83657','2026-05-07 08:44:48.05881'],
      [5,'Test','test','Engineering','Manila','Full-Time',null,'Test',null,'Test',null,'active','2026-05-08 04:07:54.435','2026-05-08 04:07:54.444815','2026-05-08 04:07:54.444815'],
    ];
    for (const j of JOBS) {
      await client.query(
        `INSERT INTO job_listings (id,title,slug,department,location,employment_type,experience_level,description,responsibilities,requirements,salary_range,status,published_at,created_at,updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
        j
      );
    }
    await client.query(`SELECT setval('job_listings_id_seq', (SELECT MAX(id) FROM job_listings))`);

    // Blog posts
    await client.query('DELETE FROM blog_posts');
    const blogContent = '[{"id":"txw61tdxl","type":"pull_quote","isCollapsed":false,"content":{"quote":"Do or Do Not, there is no try."}},{"id":"931oyxv5x","type":"divider","isCollapsed":false,"content":{}}]';
    await client.query(
      `INSERT INTO blog_posts (id,title,slug,excerpt,content,author,category,cover_image,tags,status,published_at,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [2,'Test file','test-file',null,blogContent,'Marscel Miranda','Company News',null,'{Test,company,news}','published','2026-05-07 08:33:55.409','2026-05-07 08:33:55.418906','2026-05-07 08:33:55.418906']
    );
    await client.query(`SELECT setval('blog_posts_id_seq', (SELECT MAX(id) FROM blog_posts))`);

    await client.query('COMMIT');
    res.json({ success: true, message: 'Database seeded from dev snapshot', tables: { users: USERS.length, job_listings: JOBS.length, blog_posts: 1 } });
  } catch (err: any) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
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

// ===== MANPOWER REQUESTS =====
app.get('/api/manpower-requests', requireAuth, async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM manpower_requests ORDER BY created_at DESC');
    res.json(rows);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/manpower-requests', requireAuth, async (req, res) => {
  const { title, department, location, employment_type, description, responsibilities, requirements, notes, requested_by_email, requested_by_name } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO manpower_requests (title,department,location,employment_type,description,responsibilities,requirements,notes,requested_by_email,requested_by_name,status,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'pending',NOW(),NOW()) RETURNING *`,
      [title, department, location, employment_type, description, responsibilities, requirements, notes, requested_by_email, requested_by_name]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/manpower-requests/:id/assign', requireAuth, async (req, res) => {
  const { assigned_to_email, assigned_to_name } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE manpower_requests SET status='assigned',assigned_to_email=$1,assigned_to_name=$2,updated_at=NOW() WHERE id=$3 RETURNING *`,
      [assigned_to_email, assigned_to_name, req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/manpower-requests/:id/unassign', requireAuth, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `UPDATE manpower_requests SET status='pending',assigned_to_email=NULL,assigned_to_name=NULL,updated_at=NOW() WHERE id=$1 RETURNING *`,
      [req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/manpower-requests/:id/publish', requireAuth, async (req, res) => {
  try {
    const { rows: reqRows } = await pool.query('SELECT * FROM manpower_requests WHERE id = $1', [req.params.id]);
    if (!reqRows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    const r = reqRows[0];
    const slug = r.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();
    const { rows: jobRows } = await pool.query(
      `INSERT INTO job_listings (title,slug,department,location,employment_type,description,responsibilities,requirements,status,published_at,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'active',NOW(),NOW(),NOW()) RETURNING *`,
      [r.title, slug, r.department, r.location, r.employment_type, r.description, r.responsibilities, r.requirements]
    );
    await pool.query(
      `UPDATE manpower_requests SET status='published',job_listing_id=$1,updated_at=NOW() WHERE id=$2`,
      [jobRows[0].id, req.params.id]
    );
    res.json({ manpower_request: { ...r, status: 'published', job_listing_id: jobRows[0].id }, job_listing: jobRows[0] });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/manpower-requests/:id', requireAuth, async (req, res) => {
  const { applicants_total, applicants_processed } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE manpower_requests SET applicants_total=$1, applicants_processed=$2, updated_at=NOW() WHERE id=$3 RETURNING *`,
      [applicants_total ?? 0, applicants_processed ?? 0, req.params.id]
    );
    if (!rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/manpower-requests/:id', requireAuth, async (req, res) => {
  try {
    await pool.query('DELETE FROM manpower_requests WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
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
  const { title, slug, excerpt, content, author, category, cover_image, cover_image_alt, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO blog_posts (title,slug,excerpt,content,author,category,cover_image,cover_image_alt,tags,status,published_at,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW(),NOW()) RETURNING *`,
      [title, slug, excerpt, content, author, category, cover_image, cover_image_alt || '', tags || [], status, status === 'published' ? new Date() : null]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/blog/:id', requireAuth, async (req, res) => {
  const { title, slug, excerpt, content, author, category, cover_image, cover_image_alt, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE blog_posts SET title=$1,slug=$2,excerpt=$3,content=$4,author=$5,category=$6,cover_image=$7,cover_image_alt=$8,tags=$9,status=$10,updated_at=NOW() WHERE id=$11 RETURNING *`,
      [title, slug, excerpt, content, author, category, cover_image, cover_image_alt || '', tags || [], status, req.params.id]
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
const CASE_FIELDS = `
  id, title, slug, subtitle, hero_image_url, client, category1, category2, category3,
  stat1_value, stat1_label, stat2_value, stat2_label, stat3_value, stat3_label,
  in_brief, challenge_heading, challenge_body, challenge_item1, challenge_item2,
  challenge_item3, challenge_item4, challenge_item5,
  solution_heading, solution_body1, solution_body2,
  quote_text, quote_attribution, quote_title,
  outcome_heading, outcome_body, outcome_metric1_value, outcome_metric1_label,
  outcome_metric2_value, outcome_metric2_label,
  sidebar_industry, sidebar_services, sidebar_region, sidebar_tech_stack,
  read_next1_category, read_next1_title, read_next1_excerpt,
  read_next2_category, read_next2_title, read_next2_excerpt,
  author, status, published_at, created_at, updated_at,
  meta_title, meta_description, keywords, canonical_url,
  og_title, og_description, og_image_url, json_ld, no_index,
  hubspot_event_name, hubspot_form_guid, utm_source, utm_medium, utm_campaign
`;

app.get('/api/cases', async (_req, res) => {
  try {
    const { rows } = await pool.query(`SELECT ${CASE_FIELDS} FROM case_studies WHERE status = 'published' ORDER BY published_at DESC NULLS LAST`);
    res.json(rows);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.get('/api/cases/all', async (_req, res) => {
  try {
    const { rows } = await pool.query(`SELECT ${CASE_FIELDS} FROM case_studies ORDER BY created_at DESC`);
    res.json(rows);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.get('/api/cases/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT ${CASE_FIELDS} FROM case_studies WHERE id = $1`, [req.params.id]);
    if (!rows[0]) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.post('/api/cases', requireAuth, async (req, res) => {
  const b = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO case_studies (
        title, slug, subtitle, hero_image_url, client, category1, category2, category3,
        stat1_value, stat1_label, stat2_value, stat2_label, stat3_value, stat3_label,
        in_brief, challenge_heading, challenge_body,
        challenge_item1, challenge_item2, challenge_item3, challenge_item4, challenge_item5,
        solution_heading, solution_body1, solution_body2,
        quote_text, quote_attribution, quote_title,
        outcome_heading, outcome_body, outcome_metric1_value, outcome_metric1_label,
        outcome_metric2_value, outcome_metric2_label,
        sidebar_industry, sidebar_services, sidebar_region, sidebar_tech_stack,
        read_next1_category, read_next1_title, read_next1_excerpt,
        read_next2_category, read_next2_title, read_next2_excerpt,
        author, status, published_at,
        meta_title, meta_description, keywords, canonical_url,
        og_title, og_description, og_image_url, json_ld, no_index,
        hubspot_event_name, hubspot_form_guid, utm_source, utm_medium, utm_campaign, hero_image_alt,
        created_at, updated_at
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
        $21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,
        $39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,
        $57,$58,$59,$60,$61,$62,NOW(),NOW()
      ) RETURNING *`,
      [
        b.title, b.slug, b.subtitle, b.hero_image_url, b.client,
        b.category1, b.category2 || '', b.category3 || '',
        b.stat1_value || '', b.stat1_label || '', b.stat2_value || '', b.stat2_label || '',
        b.stat3_value || '', b.stat3_label || '',
        b.in_brief || '', b.challenge_heading || 'The Challenge', b.challenge_body || '',
        b.challenge_item1 || '', b.challenge_item2 || '', b.challenge_item3 || '',
        b.challenge_item4 || '', b.challenge_item5 || '',
        b.solution_heading || 'The Solution', b.solution_body1 || '', b.solution_body2 || '',
        b.quote_text || '', b.quote_attribution || '', b.quote_title || '',
        b.outcome_heading || 'The Outcome', b.outcome_body || '',
        b.outcome_metric1_value || '', b.outcome_metric1_label || '',
        b.outcome_metric2_value || '', b.outcome_metric2_label || '',
        b.sidebar_industry || '', b.sidebar_services || '',
        b.sidebar_region || '', b.sidebar_tech_stack || '',
        b.read_next1_category || '', b.read_next1_title || '', b.read_next1_excerpt || '',
        b.read_next2_category || '', b.read_next2_title || '', b.read_next2_excerpt || '',
        b.author || '', b.status,
        b.status === 'published' ? new Date() : null,
        b.meta_title || '', b.meta_description || '', b.keywords || '',
        b.canonical_url || '', b.og_title || '', b.og_description || '',
        b.og_image_url || '', b.json_ld || '', b.no_index || false,
        b.hubspot_event_name || '', b.hubspot_form_guid || '',
        b.utm_source || '', b.utm_medium || '', b.utm_campaign || '', b.hero_image_alt || '',
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/cases/:id', requireAuth, async (req, res) => {
  const b = req.body;
  try {
    const existing = await pool.query(`SELECT published_at, status FROM case_studies WHERE id=$1`, [req.params.id]);
    const wasPublished = existing.rows[0]?.status === 'published';
    const nowPublished = b.status === 'published';
    const publishedAt = nowPublished && !wasPublished ? new Date() : (existing.rows[0]?.published_at ?? null);
    const { rows } = await pool.query(
      `UPDATE case_studies SET
        title=$1, slug=$2, subtitle=$3, hero_image_url=$4, client=$5,
        category1=$6, category2=$7, category3=$8,
        stat1_value=$9, stat1_label=$10, stat2_value=$11, stat2_label=$12,
        stat3_value=$13, stat3_label=$14,
        in_brief=$15, challenge_heading=$16, challenge_body=$17,
        challenge_item1=$18, challenge_item2=$19, challenge_item3=$20,
        challenge_item4=$21, challenge_item5=$22,
        solution_heading=$23, solution_body1=$24, solution_body2=$25,
        quote_text=$26, quote_attribution=$27, quote_title=$28,
        outcome_heading=$29, outcome_body=$30,
        outcome_metric1_value=$31, outcome_metric1_label=$32,
        outcome_metric2_value=$33, outcome_metric2_label=$34,
        sidebar_industry=$35, sidebar_services=$36,
        sidebar_region=$37, sidebar_tech_stack=$38,
        read_next1_category=$39, read_next1_title=$40, read_next1_excerpt=$41,
        read_next2_category=$42, read_next2_title=$43, read_next2_excerpt=$44,
        author=$45, status=$46, published_at=$47,
        meta_title=$48, meta_description=$49, keywords=$50, canonical_url=$51,
        og_title=$52, og_description=$53, og_image_url=$54, json_ld=$55, no_index=$56,
        hubspot_event_name=$57, hubspot_form_guid=$58,
        utm_source=$59, utm_medium=$60, utm_campaign=$61, hero_image_alt=$62,
        updated_at=NOW()
      WHERE id=$63 RETURNING *`,
      [
        b.title, b.slug, b.subtitle || '', b.hero_image_url || '', b.client || '',
        b.category1 || 'Case Study', b.category2 || '', b.category3 || '',
        b.stat1_value || '', b.stat1_label || '', b.stat2_value || '', b.stat2_label || '',
        b.stat3_value || '', b.stat3_label || '',
        b.in_brief || '', b.challenge_heading || 'The Challenge', b.challenge_body || '',
        b.challenge_item1 || '', b.challenge_item2 || '', b.challenge_item3 || '',
        b.challenge_item4 || '', b.challenge_item5 || '',
        b.solution_heading || 'The Solution', b.solution_body1 || '', b.solution_body2 || '',
        b.quote_text || '', b.quote_attribution || '', b.quote_title || '',
        b.outcome_heading || 'The Outcome', b.outcome_body || '',
        b.outcome_metric1_value || '', b.outcome_metric1_label || '',
        b.outcome_metric2_value || '', b.outcome_metric2_label || '',
        b.sidebar_industry || '', b.sidebar_services || '',
        b.sidebar_region || '', b.sidebar_tech_stack || '',
        b.read_next1_category || '', b.read_next1_title || '', b.read_next1_excerpt || '',
        b.read_next2_category || '', b.read_next2_title || '', b.read_next2_excerpt || '',
        b.author || '', b.status, publishedAt,
        b.meta_title || '', b.meta_description || '', b.keywords || '',
        b.canonical_url || '', b.og_title || '', b.og_description || '',
        b.og_image_url || '', b.json_ld || '', b.no_index || false,
        b.hubspot_event_name || '', b.hubspot_form_guid || '',
        b.utm_source || '', b.utm_medium || '', b.utm_campaign || '', b.hero_image_alt || '',
        req.params.id,
      ]
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
  const { title, slug, description, author, category, cover_image, cover_image_alt, download_url, page_count, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO ebooks (title,slug,description,author,category,cover_image,cover_image_alt,download_url,page_count,tags,status,published_at,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW()) RETURNING *`,
      [title, slug, description, author, category, cover_image, cover_image_alt || '', download_url, page_count, tags || [], status, status === 'published' ? new Date() : null]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/ebooks/:id', requireAuth, async (req, res) => {
  const { title, slug, description, author, category, cover_image, cover_image_alt, download_url, page_count, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE ebooks SET title=$1,slug=$2,description=$3,author=$4,category=$5,cover_image=$6,cover_image_alt=$7,download_url=$8,page_count=$9,tags=$10,status=$11,updated_at=NOW() WHERE id=$12 RETURNING *`,
      [title, slug, description, author, category, cover_image, cover_image_alt || '', download_url, page_count, tags || [], status, req.params.id]
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
  const { title, slug, excerpt, content, author, category, cover_image, cover_image_alt, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO guides (title,slug,excerpt,content,author,category,cover_image,cover_image_alt,tags,status,published_at,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW(),NOW()) RETURNING *`,
      [title, slug, excerpt, content, author, category, cover_image, cover_image_alt || '', tags || [], status, status === 'published' ? new Date() : null]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/guides/:id', requireAuth, async (req, res) => {
  const { title, slug, excerpt, content, author, category, cover_image, cover_image_alt, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE guides SET title=$1,slug=$2,excerpt=$3,content=$4,author=$5,category=$6,cover_image=$7,cover_image_alt=$8,tags=$9,status=$10,updated_at=NOW() WHERE id=$11 RETURNING *`,
      [title, slug, excerpt, content, author, category, cover_image, cover_image_alt || '', tags || [], status, req.params.id]
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
  const { title, slug, description, host, event_date, duration_minutes, recording_url, cover_image, cover_image_alt, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO webinars (title,slug,description,host,event_date,duration_minutes,recording_url,cover_image,cover_image_alt,tags,status,published_at,created_at,updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW()) RETURNING *`,
      [title, slug, description, host, event_date, duration_minutes, recording_url, cover_image, cover_image_alt || '', tags || [], status, status === 'published' ? new Date() : null]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

app.put('/api/webinars/:id', requireAuth, async (req, res) => {
  const { title, slug, description, host, event_date, duration_minutes, recording_url, cover_image, cover_image_alt, tags, status } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE webinars SET title=$1,slug=$2,description=$3,host=$4,event_date=$5,duration_minutes=$6,recording_url=$7,cover_image=$8,cover_image_alt=$9,tags=$10,status=$11,updated_at=NOW() WHERE id=$12 RETURNING *`,
      [title, slug, description, host, event_date, duration_minutes, recording_url, cover_image, cover_image_alt || '', tags || [], status, req.params.id]
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

// ===== FILE UPLOAD =====
app.use('/uploads', express.static(uploadsDir));

app.post('/api/upload', requireAuth, upload.single('file'), (req: any, res: any) => {
  if (!req.file) { res.status(400).json({ error: 'No file uploaded' }); return; }
  res.json({ url: `/uploads/${req.file.filename}` });
});

app.get('/api/media', requireAuth, (_req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir)
      .filter(f => /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(f))
      .sort()
      .reverse()
      .map(f => ({ url: `/uploads/${f}`, name: f }));
    res.json(files);
  } catch { res.json([]); }
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

// ===== Langfuse proxy — /portal/api/langfuse/* =====
// Keeps LANGFUSE_PUBLIC_KEY + LANGFUSE_SECRET_KEY off the browser.
// Set env vars to activate live observability; omit them to stay in preview mode.
{
  const LF_HOST   = process.env.LANGFUSE_HOST ?? 'https://cloud.langfuse.com';
  const LF_PUB    = process.env.LANGFUSE_PUBLIC_KEY ?? '';
  const LF_SECRET = process.env.LANGFUSE_SECRET_KEY ?? '';
  const LF_AUTH   = () => 'Basic ' + Buffer.from(`${LF_PUB}:${LF_SECRET}`).toString('base64');

  const lfConfigured = () => Boolean(LF_PUB && LF_SECRET);

  /** Forward a GET to the Langfuse REST API and relay the JSON response. */
  const lfProxy = async (req: any, res: any, lfPath: string) => {
    if (!lfConfigured()) return res.status(400).json({ error: 'Langfuse not configured' });
    try {
      const qs  = new URLSearchParams(req.query as Record<string, string>).toString();
      const url = `${LF_HOST}/api/public${lfPath}${qs ? '?' + qs : ''}`;
      const r   = await fetch(url, { headers: { Authorization: LF_AUTH(), 'Content-Type': 'application/json' } });
      const body = await r.json();
      res.status(r.status).json(body);
    } catch (err: any) {
      res.status(502).json({ error: `Langfuse proxy error: ${err.message}` });
    }
  };

  // Connection status — used by useLangfuseData hook to detect if credentials exist
  app.get('/portal/api/langfuse/status', async (_req, res) => {
    if (!lfConfigured()) return res.json({ configured: false });
    try {
      const r    = await fetch(`${LF_HOST}/api/public/projects`, { headers: { Authorization: LF_AUTH() } });
      const body = await r.json() as any;
      const proj = body?.data?.[0];
      res.json({ configured: true, projectId: proj?.id, projectName: proj?.name, host: LF_HOST });
    } catch (err: any) {
      res.json({ configured: false, error: err.message });
    }
  });

  // Traces  → Task Runs
  app.get('/portal/api/langfuse/traces',                      (req, res) => lfProxy(req, res, '/traces'));
  app.get('/portal/api/langfuse/traces/:id/observations',     (req, res) => lfProxy(req, res, `/traces/${req.params.id}/observations`));

  // Sessions → Chat Sessions
  app.get('/portal/api/langfuse/sessions',                    (req, res) => lfProxy(req, res, '/sessions'));

  // Metrics  → Overview + Usage bars
  app.get('/portal/api/langfuse/metrics/daily',               (req, res) => lfProxy(req, res, '/metrics/daily'));

  // Scores   → Success-rate computation
  app.get('/portal/api/langfuse/scores',                      (req, res) => lfProxy(req, res, '/scores'));
}

// Client Portal — always served as pre-built static files (no proxy)
const portalDist = path.join(__dirname, 'portal', 'dist');
app.use('/portal/assets', express.static(path.join(portalDist, 'assets'), { maxAge: '1y', immutable: true }));
app.use('/portal', express.static(portalDist, { etag: false, lastModified: false, setHeaders: (res, filePath) => {
  if (filePath.endsWith('index.html')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  }
}}));
app.get(['/portal', '/portal/*splat'], (_req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.sendFile(path.join(portalDist, 'index.html'));
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
          if (res && typeof (res as express.Response).status === 'function') {
            (res as express.Response).status(503).send('Vite dev server starting up — please refresh in a moment.');
          }
        },
      },
    })
  );
} else {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  // Non-pre-rendered routes (dynamic slugs, CMS, etc.) get the clean SPA shell
  // so the client renders the correct page without a hydration mismatch against
  // the pre-rendered home markup. Falls back to index.html if the shell is absent.
  const spaShell = path.join(distPath, 'spa-shell.html');
  const fallbackHtml = fs.existsSync(spaShell) ? spaShell : path.join(distPath, 'index.html');

  // Blog post pages: inject correct meta tags so Googlebot sees proper title/canonical
  app.get('/blogs/:slug/', async (req, res) => {
    try {
      const { rows } = await pool.query(
        `SELECT title, excerpt, slug, cover_image FROM blog_posts WHERE slug = $1 AND status = 'published'`,
        [req.params.slug]
      );
      if (!rows.length) return res.sendFile(fallbackHtml);
      const post = rows[0];
      const canonical = `https://kdci.ai/blogs/${post.slug}/`;
      const title = `${post.title} | KDCI.ai`;
      const desc = (post.excerpt || '').replace(/"/g, '&quot;').slice(0, 160);
      const img = post.cover_image || 'https://kdci.ai/KDCI.AI_Logo_D01_No_Tagline.webp';
      let html = fs.readFileSync(fallbackHtml, 'utf8');
      html = html
        .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
        .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`)
        .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`)
        .replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${img}" />`)
        .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${title}" />`)
        .replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${img}" />`);
      if (desc) {
        html = html
          .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${desc}" />`)
          .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${desc}" />`)
          .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${desc}" />`);
      }
      // Inject or replace canonical
      if (html.includes('<link rel="canonical"')) {
        html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`);
      } else {
        html = html.replace('</head>', `  <link rel="canonical" href="${canonical}" />\n</head>`);
      }
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    } catch {
      res.sendFile(fallbackHtml);
    }
  });

  // Service pages: inject page-specific FAQPage schema
  const faqSchemas: Record<string, string> = {
    '/solutions/ai-agent-operations/': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'url': 'https://kdci.ai/solutions/ai-agent-operations/',
      'mainEntity': [
        { '@type': 'Question', 'name': "What exactly counts as an 'AI agent' for monitoring purposes?", 'acceptedAnswer': { '@type': 'Answer', 'text': 'Any automated system using a large language model (LLM) to handle customer interactions, internal queries, data processing, or decision support — including chatbots, voice agents, email bots, support agents on Intercom or Zendesk, and custom-built LLM workflows.' } },
        { '@type': 'Question', 'name': 'How do you detect prompt drift?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We run daily automated evaluation benchmarks against a set of baseline test cases established at kickoff. When accuracy scores fall below threshold — or when hallucination rates, escalation rates, or latency spikes are detected — our system flags the agent for human review and retraining.' } },
        { '@type': 'Question', 'name': "What's the response time when an issue is detected?", 'acceptedAnswer': { '@type': 'Answer', 'text': 'Critical issues (agent failures, integration outages) are escalated within 4 business hours. Performance drift triggers a review within one business day, with optimization executed and tested within the same week.' } },
        { '@type': 'Question', 'name': 'Do you need admin access to our AI platforms?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We need read access to your agent configurations and, for optimization, the ability to update prompt templates. We document every change and require client approval for any structural modifications to an agent\'s logic.' } },
        { '@type': 'Question', 'name': 'What AI platforms and helpdesks do you support?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We support agents built on OpenAI, Anthropic, Google Gemini, and most LLM platforms. For integrations, we work with Intercom, Zendesk, Freshdesk, HubSpot, Salesforce, and custom API-based setups.' } },
        { '@type': 'Question', 'name': 'How is pricing calculated — is it per agent?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Pricing is tier-based, not strictly per-agent. Each tier covers a range (1–2, 3–5, or unlimited agents) and includes a standard set of services. For high-volume deployments, we build custom pricing around the complexity of your stack.' } },
        { '@type': 'Question', 'name': 'What happens if an agent goes down completely?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Full agent failures are treated as critical incidents. Your AI Ops Specialist is notified immediately via PagerDuty, investigates root cause, and coordinates with your team or vendor to restore service. You receive an incident report within 24 hours.' } },
        { '@type': 'Question', 'name': 'Can you monitor voice AI agents (e.g. Retell AI, Vapi)?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. We monitor voice agents for call completion rate, resolution rate, transfer rate, and sentiment patterns. We also review call transcripts to catch accuracy issues that automated scoring may miss.' } },
        { '@type': 'Question', 'name': 'How is sensitive customer data handled during monitoring?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'All monitoring is conducted on anonymized or aggregated performance data wherever possible. If transcript review is required, we follow your data handling policy and can operate under NDA and DPA agreements.' } },
        { '@type': 'Question', 'name': "What's included in the monthly scorecard?", 'acceptedAnswer': { '@type': 'Answer', 'text': 'The monthly scorecard includes: agent-by-agent accuracy scores, drift trend charts, escalation rate analysis, integration health status, prompt optimization summary, benchmark comparisons to your industry baseline, and a prioritized recommendation list for the next 30 days.' } }
      ]
    }),
    '/solutions/ai-consulting-and-strategy/': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'url': 'https://kdci.ai/solutions/ai-consulting-and-strategy/',
      'mainEntity': [
        { '@type': 'Question', 'name': 'What does AI Consulting & Implementation actually include?', 'acceptedAnswer': { '@type': 'Answer', 'text': "It covers the full lifecycle: discovery and process audit, AI strategy design, custom agent or workflow builds, integration into your existing systems, staff training, and ongoing optimisation. We don't just advise — we build and run the solution alongside your team until outcomes are proven." } },
        { '@type': 'Question', 'name': 'How long does it take to go from consultation to a live AI solution?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Most clients are live with their first AI workflow within 21 business days. Discovery and scoping takes 3–5 days, build and configuration takes 10–14 days, and deployment with UAT takes 3–5 days. Complex multi-agent systems may take 4–6 weeks depending on integration depth.' } },
        { '@type': 'Question', 'name': 'Do we need an existing AI strategy before KDCI can help us?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'No. Most clients come to us without one. Our first step is always a free 2-hour Operations Audit where we map your current workflows, identify the highest-ROI automation opportunities, and present a prioritised AI roadmap before any contract is signed.' } },
        { '@type': 'Question', 'name': 'What AI platforms and frameworks does KDCI work with?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We work with OpenAI (GPT-4o), Anthropic (Claude), Google Gemini, Mistral, and open-source LLMs. For agentic frameworks we use LangChain, CrewAI, n8n, Make, and Zapier. We also integrate with your existing stack — CRMs, ERPs, helpdesks, and data warehouses.' } },
        { '@type': 'Question', 'name': 'Can KDCI build custom AI agents for our specific workflows?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. Our AI engineering team designs and deploys purpose-built agents for tasks like automated research, document classification, outreach sequencing, data extraction, report generation, and first-response triage. Every agent is built to your specific data schema and approval requirements.' } },
        { '@type': 'Question', 'name': 'How do you handle hallucinations and accuracy in automated workflows?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We implement human-in-the-loop checkpoints at every critical decision point. AI agents generate outputs that are reviewed by trained human operators before execution. We also run accuracy benchmarks weekly and retrain or reprompt when performance drifts below agreed thresholds.' } },
        { '@type': 'Question', 'name': 'What business processes are most suited for AI augmentation?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'High-volume, rule-based tasks with structured inputs deliver the fastest ROI: document classification, data extraction, content generation at scale, email routing, lead scoring, invoice processing, and first-response support triage. We also handle complex multi-step research and synthesis workflows.' } },
        { '@type': 'Question', 'name': 'How is AI performance monitored after implementation?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We track accuracy rates, task completion rates, processing speed, and error rates through a monthly AI performance report. Dashboards are delivered weekly during the first 90 days. Models are retrained or updated as your data evolves or new LLM versions outperform the current stack.' } },
        { '@type': 'Question', 'name': 'Is agentic AI safe to deploy in regulated industries like Fintech or Healthcare?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, with the right safeguards. We implement strict data governance, encrypted pipelines, audit logs, and human approval gates for any sensitive outputs. We have deployed AI solutions in HIPAA-compliant healthcare environments and SOC-2 certified Fintech infrastructure.' } },
        { '@type': 'Question', 'name': 'What ROI should we expect and over what timeframe?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Most clients see measurable ROI within 60–90 days of go-live. Typical outcomes: 40–80% reduction in manual processing time, 30–50% cost reduction versus purely human teams, and near-zero error rates on automated tasks. We define success metrics at kickoff and report against them monthly.' } }
      ]
    }),
    '/solutions/ai-customer-service-agents/': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'url': 'https://kdci.ai/solutions/ai-customer-service-agents/',
      'mainEntity': [
        { '@type': 'Question', 'name': 'What customer support channels can KDCI cover?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We support voice, email, live chat, social media DMs, SMS, and in-app messaging. Our agents are trained across multiple channels simultaneously, so you get a true omnichannel operation from a single managed team.' } },
        { '@type': 'Question', 'name': 'What are your typical CSAT and FCR benchmarks?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Across our managed CX pods, we consistently deliver 4.7–4.9/5 CSAT and 85–92% First Contact Resolution. We publish monthly QA scorecards for full transparency.' } },
        { '@type': 'Question', 'name': 'Can KDCI handle 24/7 support coverage?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. We run three overlapping shifts from Metro Manila, giving you uninterrupted coverage across all time zones without the complexity of managing multiple vendors.' } },
        { '@type': 'Question', 'name': 'How quickly can we ramp up a support team?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Our standard ramp is 14 days for a 5-agent pod. We maintain a pre-vetted bench of trained candidates, so we can often exceed that speed for urgent scaling needs.' } },
        { '@type': 'Question', 'name': 'Do your agents handle escalations and complex complaints?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Absolutely. We train a dedicated Tier 2 and Tier 3 layer within each pod. Complex escalations are routed automatically using AI triage and handled by senior agents with specialized domain knowledge.' } },
        { '@type': 'Question', 'name': 'Can KDCI integrate with our existing helpdesk platform?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. Our agents are proficient in Zendesk, Freshdesk, Salesforce Service Cloud, Intercom, Gorgias, HubSpot Service Hub, Kustomer, and most major platforms. We can be operational in your stack within days.' } },
        { '@type': 'Question', 'name': 'How do you maintain quality across a large team?', 'acceptedAnswer': { '@type': 'Answer', 'text': "We use our proprietary QA system that samples 15% of all interactions weekly, scoring them against a calibrated rubric. Agents receive weekly coaching, and Team Leads review results daily." } },
        { '@type': 'Question', 'name': 'Can agents upsell and cross-sell during support interactions?', 'acceptedAnswer': { '@type': 'Answer', 'text': "Yes. We run dedicated 'support-to-sales' training programs. Our retail and e-commerce clients see an average 18–25% lift in revenue from support interactions through proactive upselling." } },
        { '@type': 'Question', 'name': 'What languages can KDCI support?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Our primary language is English (neutral accent). We also have agents proficient in Spanish, French, Mandarin, Japanese, and German. For specialized language needs, we can source and train within 4–6 weeks.' } },
        { '@type': 'Question', 'name': 'How do you handle spikes in volume (holiday, campaign surges)?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We build flexible surge capacity into every contract. You can request additional seats with 72-hour notice for up to 30% above your base headcount. For larger surges, we plan together 30 days in advance.' } }
      ]
    }),
    '/solutions/ai-graphic-design/': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'url': 'https://kdci.ai/solutions/ai-graphic-design/',
      'mainEntity': [
        { '@type': 'Question', 'name': "What makes KDCI's AI Creative Studio different from a traditional design agency?", 'acceptedAnswer': { '@type': 'Answer', 'text': 'Our Manila team runs AI tools — Midjourney, Adobe Firefly, Runway ML, CapCut AI — at every stage of production. That means faster delivery, lower cost per asset, and consistent brand output without sacrificing quality. Traditional agencies bill hourly and have slower turnaround cycles. We operate on a production cadence model.' } },
        { '@type': 'Question', 'name': "What's included in each pricing tier?", 'acceptedAnswer': { '@type': 'Answer', 'text': 'Content Pack ($2,500/mo + $1K setup): 20 social posts, 4 carousels, and monthly brand assets — ideal for brands that need consistent social output. Creative Retainer ($4,500/mo + $1.5K setup): dedicated designer, unlimited requests, 5-day turnaround. Full Studio ($7,500/mo + $2.5K setup): full team covering brand, ads, video, and social with a 3-day priority SLA.' } },
        { '@type': 'Question', 'name': 'How quickly can we get started?', 'acceptedAnswer': { '@type': 'Answer', 'text': "We begin brand discovery within 48 hours of sign-off. Your first content batch is delivered by the end of Week 2. Full production cadence is live by Month 1. We're structured to move fast without skipping brand alignment." } },
        { '@type': 'Question', 'name': 'How does AI-generated imagery work without going off-brand?', 'acceptedAnswer': { '@type': 'Answer', 'text': "We build a brand prompt library in Week 1 — documenting your colour palette, visual style, subject matter rules, and tone. Every AI image generated goes through a brand consistency review before delivery. You'll never receive outputs that don't match your visual identity." } },
        { '@type': 'Question', 'name': 'Can you handle video and motion content?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. Our Full Studio tier includes a dedicated motion and video team. We use Runway ML for AI-assisted video, CapCut AI for short-form editing, and Adobe Premiere/After Effects for polished cuts. ElevenLabs handles voiceover where required.' } },
        { '@type': 'Question', 'name': "What's the minimum commitment?", 'acceptedAnswer': { '@type': 'Answer', 'text': 'All plans require a 3-month minimum. This ensures we have enough runway to complete onboarding, establish a production rhythm, and deliver measurable results. Most clients stay well beyond the minimum — our average engagement is over 18 months.' } },
        { '@type': 'Question', 'name': 'Can we start on a Content Pack and upgrade later?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Absolutely — and this is the most common path. Many clients start with the Content Pack to validate quality and cadence, then move to the Creative Retainer or Full Studio as their creative needs scale. The upgrade is seamless because your brand guide and team are already in place.' } },
        { '@type': 'Question', 'name': 'What industries do you specialise in?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Our highest-volume verticals are E-Commerce & Retail, Real Estate, SaaS & Tech, Hospitality, Professional Services, and Startups. We have pre-built template systems and production playbooks for each that accelerate onboarding significantly.' } },
        { '@type': 'Question', 'name': 'How do we manage revisions and feedback loops?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We use a structured feedback process — Frame.io for video reviews, Figma comments for design assets, and a shared project board (Asana, ClickUp, or Notion) for all task tracking. Revision requests submitted before 12pm Manila time are typically turned around within the same business day.' } },
        { '@type': 'Question', 'name': 'What design tools does your team use?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Our team works in Figma, Adobe Creative Suite (Photoshop, Illustrator, InDesign, Premiere Pro, After Effects), Canva Pro, Midjourney, Adobe Firefly, Runway ML, and CapCut AI. We adapt to whatever\'s already in your workflow and can operate within your existing DAM or asset library.' } }
      ]
    }),
    '/solutions/ai-lead-generation/': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'url': 'https://kdci.ai/solutions/ai-lead-generation/',
      'mainEntity': [
        { '@type': 'Question', 'name': "What exactly is 'fully managed' outbound?", 'acceptedAnswer': { '@type': 'Answer', 'text': "It means we handle every component: ICP definition, prospect sourcing, Clay enrichment, sequence writing, domain setup, inbox warm-up, LinkedIn campaign management, reply handling, meeting booking, CRM updates, and weekly reporting. You review and approve the ICP and sequences, then we run the engine. Your only job is to show up to the meetings we book." } },
        { '@type': 'Question', 'name': 'Why is there a 6-week ramp before full performance?', 'acceptedAnswer': { '@type': 'Answer', 'text': "Cold email deliverability depends on sender reputation. Sending high volumes from a new domain immediately will land in spam. We use a structured warm-up protocol — starting with small batches, gradually increasing volume, monitoring bounce and spam rates — before scaling to full contact volume. Skipping this destroys your domain reputation. We don't skip it." } },
        { '@type': 'Question', 'name': 'How many meetings should we expect?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Meetings booked depend on ICP quality, deal size, and market saturation. Typical benchmarks for our managed programmes: 8–15 meetings/month on the Launch Package, 15–30 on the Growth Engine, and 25–45+ on the Full Outbound Team. These are ranges — actual results depend on your market and offer.' } },
        { '@type': 'Question', 'name': "What's the difference between the Growth Engine and Full Outbound Team?", 'acceptedAnswer': { '@type': 'Answer', 'text': "The Growth Engine ($5,000/mo) runs 1,500 contacts/week across email and LinkedIn with multi-sequence testing — ideal for teams with a defined ICP who want to scale outbound. The Full Outbound Team ($8,000/mo) adds a dedicated SDR and researcher, 3,000+ contacts/week, Clay enrichment on every contact, and a weekly strategy call — it's a full outbound function, not just a campaign." } },
        { '@type': 'Question', 'name': 'Do you handle LinkedIn outreach as well as email?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes — LinkedIn outreach is included from the Growth Engine tier upward. We use LinkedIn Sales Navigator to run connection requests, personalised InMail sequences, and profile engagement campaigns, coordinated with email so the outreach is multi-channel rather than repetitive.' } },
        { '@type': 'Question', 'name': 'What CRM do you update and how?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We natively integrate with HubSpot and Salesforce. Every qualified reply, booked meeting, and status change is logged in your CRM in real time. If you use a different CRM, we discuss integration options during onboarding — most standard CRMs can be connected via Zapier.' } },
        { '@type': 'Question', 'name': 'Can we review and approve the sequences before launch?', 'acceptedAnswer': { '@type': 'Answer', 'text': "Yes — always. We write the first sequence and present it for your review and approval before a single email is sent. You can request edits, approve, or reject. We iterate until you're satisfied. The same applies to LinkedIn scripts and A/B test variants." } },
        { '@type': 'Question', 'name': "What's the minimum commitment?", 'acceptedAnswer': { '@type': 'Answer', 'text': 'All plans require a 3-month minimum. This gives the ramp period time to complete and delivers enough performance data to optimise. Most clients continue beyond 3 months — outbound compounds as we learn what resonates with your ICP and refine the sequences accordingly.' } },
        { '@type': 'Question', 'name': 'How do you personalise email sequences at scale?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'We use Clay to pull live data signals for every contact — recent funding rounds, new hire announcements, job postings, product launches, LinkedIn activity — and feed those signals into AI-written sentence-level personalization. Every email reads like it was researched manually, even at 3,000 contacts per week.' } },
        { '@type': 'Question', 'name': 'What happens if deliverability drops during a campaign?', 'acceptedAnswer': { '@type': 'Answer', 'text': "We monitor bounce rates, spam complaint rates, and inbox placement daily. If deliverability falls below our threshold, we pause sending immediately, investigate root cause (list quality, domain reputation, content triggers), remediate, and relaunch only after we've confirmed the issue is resolved. We never sacrifice your domain health for short-term volume." } }
      ]
    }),
    '/solutions/ai-staffing-solutions/': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'url': 'https://kdci.ai/solutions/ai-staffing-solutions/',
      'mainEntity': [
        { '@type': 'Question', 'name': 'What makes KDCI.ai specialists different from a typical VA or offshore hire?', 'acceptedAnswer': { '@type': 'Answer', 'text': "Every specialist in our talent pool is AI-trained before placement — they arrive proficient in Claude, GPT-4o, Zapier, Midjourney, HubSpot, Notion AI, and other tools relevant to your role. You're not training someone on AI from scratch; you're embedding someone who already uses these tools in their daily workflow." } },
        { '@type': 'Question', 'name': 'How fast can a specialist be live and productive?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Our standard onboarding timeline runs 5–7 business days from role brief to first productive day. Day 1–2: brief call and KPI definition. Day 3–5: candidate matching from our talent pool. Day 6–7: your interviews and hire confirmation. Week 2: full onboarding and setup. Week 3: first productive week with daily check-ins.' } },
        { '@type': 'Question', 'name': 'What does the 2-week replacement guarantee mean?', 'acceptedAnswer': { '@type': 'Answer', 'text': "If a placed specialist isn't the right fit for any reason within the first 3 months, we find and onboard a replacement within 2 weeks at zero additional cost. No conditions, no rebooking fees." } },
        { '@type': 'Question', 'name': "What's included in the monthly fee?", 'acceptedAnswer': { '@type': 'Answer', 'text': "Everything. The flat monthly rate covers the specialist's salary, HR administration, payroll processing, Philippine statutory benefits, compliance documentation, and KDCI.ai's management layer. There are no hidden markups or additional HR costs on your end." } },
        { '@type': 'Question', 'name': "What's the difference between Part-Time and Full-Time plans?", 'acceptedAnswer': { '@type': 'Answer', 'text': 'Part-Time ($2,000/mo) gives you 20 hours per week at a fixed schedule — ideal for focused AI ops or research roles. Full-Time ($3,500/mo) is a fully embedded team member at 40 hours per week. Both plans include all AI tools, HR management, and the 2-week replacement guarantee.' } },
        { '@type': 'Question', 'name': 'How does the Team (3+ seats) plan work?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Team pricing starts at $2,800/seat/month for 3 or more dedicated specialists, offering a volume discount over the individual full-time rate. At 5+ seats, a dedicated team lead is included to coordinate output, run daily standups, and manage KPI reporting across the team.' } },
        { '@type': 'Question', 'name': 'What types of roles can we hire for?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Our most in-demand AI-augmented roles include: Prompt Engineers, AI Ops Specialists, Data Analysts, AI-Enabled Executive VAs, Content Ops Managers, Social Media AI Specialists, CRM Admins (HubSpot/Salesforce), Research Analysts, and Catalog & Listing Managers. If your role isn\'t listed, contact us — we likely have a match in our talent pool.' } },
        { '@type': 'Question', 'name': 'Is there a minimum commitment?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'All plans require a 3-month minimum. This ensures we have time to complete onboarding, validate performance, and deliver measurable results. Our average placement tenure is 14 months — most clients scale to additional seats well before the minimum expires.' } },
        { '@type': 'Question', 'name': 'Do specialists work exclusively for our company?', 'acceptedAnswer': { '@type': 'Answer', 'text': "Yes. Every KDCI.ai specialist is 100% dedicated to your account. They work your hours, use your tools, follow your processes, and represent your brand. They are not shared across multiple clients — they are effectively your employee, just managed and supported by KDCI.ai." } },
        { '@type': 'Question', 'name': 'Can we conduct our own interviews before confirming a hire?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Absolutely. We present a shortlist of 3–5 pre-screened, AI-proficiency-tested candidates. You conduct your own interviews, ask your own questions, and make the final hire decision. We handle the offer, onboarding, HR setup, and ongoing management from there.' } }
      ]
    }),
  };

  for (const [route, schema] of Object.entries(faqSchemas)) {
    app.get(route, (_req, res) => {
      try {
        let html = fs.readFileSync(fallbackHtml, 'utf8');
        const schemaTag = `<script type="application/ld+json">${schema}</script>`;
        html = html.replace('<!-- FAQ schema injected server-side per route -->', schemaTag);
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
      } catch {
        res.sendFile(fallbackHtml);
      }
    });
  }

  app.get('*splat', (_req, res) => {
    res.sendFile(fallbackHtml);
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅  API server listening on :${PORT}`);
  if (isDev) console.log(`    Public site → Vite on :5173 | Midgard → static dist`);
});
