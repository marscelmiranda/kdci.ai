/**
 * viteApiPlugin.ts
 * Runs the local DB API as Vite server middleware — no separate process needed.
 */
import type { Plugin } from 'vite';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { IncomingMessage, ServerResponse } from 'http';

const { Pool } = pg;
const JWT_SECRET = process.env.JWT_SECRET || 'kdci-local-dev-secret-2024';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const ALLOWED_TABLES = ['jobs', 'blog_posts', 'case_studies', 'ebooks', 'guides', 'webinars', 'hubspot_forms', 'staff'];

function getToken(req: IncomingMessage): string | null {
  const auth = req.headers['authorization'];
  return auth ? auth.replace('Bearer ', '') : null;
}

function json(res: ServerResponse, status: number, data: unknown) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function readBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(body)); } catch { resolve({}); }
    });
  });
}

export function localApiPlugin(): Plugin {
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = req.url || '';
        if (!url.startsWith('/local-api')) return next();

        const path = url.replace('/local-api', '').split('?')[0];
        const rawQuery = url.includes('?') ? url.split('?')[1] : '';
        const qs = new URLSearchParams(rawQuery);
        const method = req.method || 'GET';

        try {
          // ── POST /auth/signin ──────────────────────────────────────────
          if (path === '/auth/signin' && method === 'POST') {
            const { email, password } = await readBody(req);
            const result = await pool.query('SELECT * FROM staff WHERE email = $1', [email]);
            const user = result.rows[0];
            if (!user) return json(res, 200, { data: { user: null, session: null }, error: { message: 'Invalid credentials' } });
            const valid = user.password_hash
              ? await bcrypt.compare(password, user.password_hash)
              : password === 'admin123';
            if (!valid) return json(res, 200, { data: { user: null, session: null }, error: { message: 'Invalid credentials' } });
            const payload = { id: user.id, email: user.email, role: user.role };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
            return json(res, 200, { data: { user: payload, session: { access_token: token, user: payload } }, error: null });
          }

          // ── POST /auth/signout ─────────────────────────────────────────
          if (path === '/auth/signout' && method === 'POST') {
            return json(res, 200, { error: null });
          }

          // ── GET /auth/session ──────────────────────────────────────────
          if (path === '/auth/session' && method === 'GET') {
            const token = getToken(req);
            if (!token) return json(res, 200, { data: { session: null } });
            try {
              const user = jwt.verify(token, JWT_SECRET);
              return json(res, 200, { data: { session: { access_token: token, user } } });
            } catch {
              return json(res, 200, { data: { session: null } });
            }
          }

          // ── GET /auth/user ─────────────────────────────────────────────
          if (path === '/auth/user' && method === 'GET') {
            const token = getToken(req);
            if (!token) return json(res, 200, { data: { user: null } });
            try {
              const user = jwt.verify(token, JWT_SECRET);
              return json(res, 200, { data: { user } });
            } catch {
              return json(res, 200, { data: { user: null } });
            }
          }

          // ── GET /api/:table ────────────────────────────────────────────
          const getMatch = path.match(/^\/api\/([^/]+)$/);
          if (getMatch && method === 'GET') {
            const table = getMatch[1];
            if (!ALLOWED_TABLES.includes(table)) return json(res, 400, { data: null, error: { message: 'Invalid table' } });

            let sql = `SELECT * FROM ${table}`;
            const params: any[] = [];
            const conditions: string[] = [];

            const eqRaw = qs.get('_eq');
            const inRaw = qs.get('_in');
            const orderRaw = qs.get('_order');

            if (eqRaw) {
              for (const [col, val] of Object.entries(JSON.parse(eqRaw))) {
                params.push(val);
                conditions.push(`${col} = $${params.length}`);
              }
            }
            if (inRaw) {
              for (const [col, vals] of Object.entries(JSON.parse(inRaw) as Record<string, any[]>)) {
                params.push(vals);
                conditions.push(`${col} = ANY($${params.length})`);
              }
            }
            if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
            if (orderRaw) {
              const [col, dir] = JSON.parse(orderRaw);
              sql += ` ORDER BY ${col} ${dir === 'asc' ? 'ASC' : 'DESC'}`;
            }

            const result = await pool.query(sql, params);
            return json(res, 200, { data: result.rows, error: null });
          }

          // ── POST /api/:table ───────────────────────────────────────────
          if (getMatch && method === 'POST') {
            const table = getMatch[1];
            if (!ALLOWED_TABLES.includes(table)) return json(res, 400, { data: null, error: { message: 'Invalid table' } });
            const body = await readBody(req);
            const cols = Object.keys(body);
            const vals = Object.values(body);
            const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');
            const result = await pool.query(
              `INSERT INTO ${table} (${cols.join(', ')}) VALUES (${placeholders}) RETURNING *`,
              vals
            );
            return json(res, 200, { data: result.rows[0], error: null });
          }

          // ── PATCH /api/:table/:id ──────────────────────────────────────
          const patchMatch = path.match(/^\/api\/([^/]+)\/(\d+)$/);
          if (patchMatch && method === 'PATCH') {
            const table = patchMatch[1];
            const id = patchMatch[2];
            if (!ALLOWED_TABLES.includes(table)) return json(res, 400, { data: null, error: { message: 'Invalid table' } });
            const body = await readBody(req);
            const cols = Object.keys(body);
            const vals = Object.values(body);
            const sets = cols.map((col, i) => `${col} = $${i + 1}`).join(', ');
            vals.push(id);
            const result = await pool.query(
              `UPDATE ${table} SET ${sets} WHERE id = $${vals.length} RETURNING *`,
              vals
            );
            return json(res, 200, { data: result.rows[0], error: null });
          }

          // ── DELETE /api/:table/:id ─────────────────────────────────────
          if (patchMatch && method === 'DELETE') {
            const table = patchMatch[1];
            const id = patchMatch[2];
            if (!ALLOWED_TABLES.includes(table)) return json(res, 400, { data: null, error: { message: 'Invalid table' } });
            await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
            return json(res, 200, { data: null, error: null });
          }

          // ── POST /api/staff/check ──────────────────────────────────────
          if (path === '/api/staff/check' && method === 'POST') {
            const { email } = await readBody(req);
            const result = await pool.query('SELECT id FROM staff WHERE email = $1', [email]);
            return json(res, 200, { data: result.rows[0] || null, error: null });
          }

          return json(res, 404, { error: 'Not found' });
        } catch (err: any) {
          console.error('[local-api error]', err.message);
          return json(res, 500, { data: null, error: { message: err.message } });
        }
      });
    },
  };
}
