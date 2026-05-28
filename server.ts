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
    res.status(500).json({ error: 'Email service not configured. Please contact us directly at info@kdci.co.' });
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
      to: 'info@kdci.co',
      replyTo: email,
      subject: `[Website Inquiry] ${resolvedType} — ${resolvedName} (${company})`,
      html,
    });
    console.log(`[contact] Email sent: ${email} — ${resolvedType}`);
    res.json({ success: true });
  } catch (err: any) {
    console.error('[contact] Send error:', err.message);
    res.status(500).json({ error: 'Failed to send your message. Please try again or email us directly at info@kdci.co.' });
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

// ===== robots.txt — block crawlers from private portals =====
app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send(
    'User-agent: *\nDisallow: /portal/\nDisallow: /midgard/\n'
  );
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
  app.get('*splat', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅  API server listening on :${PORT}`);
  if (isDev) console.log(`    Public site → Vite on :5173 | Midgard → static dist`);
});
