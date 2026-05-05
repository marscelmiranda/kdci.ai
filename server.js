import express from 'express';
import cors from 'cors';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { Pool } = pg;
const app = express();
const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'kdci-local-dev-secret-2024';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false },
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ─── Auth middleware ──────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ─── Auth routes ──────────────────────────────────────────────────
app.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM staff WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.json({ data: { user: null, session: null }, error: { message: 'Invalid credentials' } });

    const valid = user.password_hash
      ? await bcrypt.compare(password, user.password_hash)
      : password === 'admin123';

    if (!valid) return res.json({ data: { user: null, session: null }, error: { message: 'Invalid credentials' } });

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    const session = { access_token: token, user: payload };
    res.json({ data: { user: payload, session }, error: null });
  } catch (err) {
    res.json({ data: { user: null, session: null }, error: { message: err.message } });
  }
});

app.post('/auth/signout', (req, res) => {
  res.json({ error: null });
});

app.get('/auth/session', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.json({ data: { session: null } });
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.json({ data: { session: { access_token: token, user } } });
  } catch {
    res.json({ data: { session: null } });
  }
});

app.get('/auth/user', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.json({ data: { user: null } });
  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.json({ data: { user } });
  } catch {
    res.json({ data: { user: null } });
  }
});

// ─── Generic table query helper ───────────────────────────────────
const ALLOWED_TABLES = ['jobs', 'blog_posts', 'case_studies', 'ebooks', 'guides', 'webinars', 'hubspot_forms', 'staff'];

function buildSelect(table, query) {
  let sql = `SELECT * FROM ${table}`;
  const params = [];
  const conditions = [];

  if (query._eq) {
    for (const [col, val] of Object.entries(query._eq)) {
      params.push(val);
      conditions.push(`${col} = $${params.length}`);
    }
  }
  if (query._in) {
    for (const [col, vals] of Object.entries(query._in)) {
      params.push(vals);
      conditions.push(`${col} = ANY($${params.length})`);
    }
  }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');

  if (query._order) {
    const [col, dir] = query._order;
    sql += ` ORDER BY ${col} ${dir === 'asc' ? 'ASC' : 'DESC'}`;
  }

  return { sql, params };
}

// ─── Table CRUD routes ────────────────────────────────────────────
app.get('/api/:table', async (req, res) => {
  const { table } = req.params;
  if (!ALLOWED_TABLES.includes(table)) return res.status(400).json({ data: null, error: { message: 'Invalid table' } });
  try {
    const q = req.query;
    const filter = {
      _eq: q._eq ? JSON.parse(q._eq) : null,
      _in: q._in ? JSON.parse(q._in) : null,
      _order: q._order ? JSON.parse(q._order) : null,
    };
    const { sql, params } = buildSelect(table, filter);
    const result = await pool.query(sql, params);
    res.json({ data: result.rows, error: null });
  } catch (err) {
    res.json({ data: null, error: { message: err.message } });
  }
});

app.post('/api/:table', authMiddleware, async (req, res) => {
  const { table } = req.params;
  if (!ALLOWED_TABLES.includes(table)) return res.status(400).json({ data: null, error: { message: 'Invalid table' } });
  try {
    const body = req.body;
    const cols = Object.keys(body);
    const vals = Object.values(body);
    const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');
    const sql = `INSERT INTO ${table} (${cols.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const result = await pool.query(sql, vals);
    res.json({ data: result.rows[0], error: null });
  } catch (err) {
    res.json({ data: null, error: { message: err.message } });
  }
});

app.patch('/api/:table/:id', authMiddleware, async (req, res) => {
  const { table, id } = req.params;
  if (!ALLOWED_TABLES.includes(table)) return res.status(400).json({ data: null, error: { message: 'Invalid table' } });
  try {
    const body = req.body;
    const cols = Object.keys(body);
    const vals = Object.values(body);
    const sets = cols.map((col, i) => `${col} = $${i + 1}`).join(', ');
    vals.push(id);
    const sql = `UPDATE ${table} SET ${sets} WHERE id = $${vals.length} RETURNING *`;
    const result = await pool.query(sql, vals);
    res.json({ data: result.rows[0], error: null });
  } catch (err) {
    res.json({ data: null, error: { message: err.message } });
  }
});

app.delete('/api/:table/:id', authMiddleware, async (req, res) => {
  const { table, id } = req.params;
  if (!ALLOWED_TABLES.includes(table)) return res.status(400).json({ data: null, error: { message: 'Invalid table' } });
  try {
    await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    res.json({ data: null, error: null });
  } catch (err) {
    res.json({ data: null, error: { message: err.message } });
  }
});

// ─── Staff management ─────────────────────────────────────────────
app.post('/api/staff/check', async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query('SELECT id FROM staff WHERE email = $1', [email]);
    res.json({ data: result.rows[0] || null, error: null });
  } catch (err) {
    res.json({ data: null, error: { message: err.message } });
  }
});

app.listen(PORT, 'localhost', () => {
  console.log(`Local DB API running on http://localhost:${PORT}`);
});
