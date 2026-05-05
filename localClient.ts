/**
 * localClient.ts
 * ─────────────────────────────────────────────────────────────────
 * A local replacement for the Supabase client.
 * Implements the same chainable query-builder interface so
 * contentStore.ts and authStore.ts need zero changes.
 * Talks to the local Express API at /local-api (proxied by Vite).
 * ─────────────────────────────────────────────────────────────────
 */

const BASE = '/local-api';

function getToken(): string | null {
  return localStorage.getItem('kdci-local-token');
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });
  return res.json();
}

// ─── Query builder ────────────────────────────────────────────────
class QueryBuilder {
  private _table: string;
  private _eqFilters: Record<string, any> = {};
  private _inFilters: Record<string, any[]> = {};
  private _orderCol: string | null = null;
  private _orderAsc = false;
  private _selectCols = '*';
  private _count: string | null = null;

  constructor(table: string) {
    this._table = table;
  }

  select(cols: string, opts?: { count?: string }) {
    this._selectCols = cols;
    if (opts?.count) this._count = opts.count;
    return this;
  }

  eq(col: string, val: any) {
    this._eqFilters[col] = val;
    return this;
  }

  in(col: string, vals: any[]) {
    this._inFilters[col] = vals;
    return this;
  }

  order(col: string, opts?: { ascending?: boolean }) {
    this._orderCol = col;
    this._orderAsc = opts?.ascending ?? true;
    return this;
  }

  single() {
    return this._execute().then(({ data, error }) => ({
      data: Array.isArray(data) ? (data[0] ?? null) : data,
      error,
    }));
  }

  then(resolve: (val: any) => any, reject?: (err: any) => any) {
    return this._execute().then(resolve, reject);
  }

  private async _execute() {
    const params: Record<string, string> = {};
    if (Object.keys(this._eqFilters).length)
      params._eq = JSON.stringify(this._eqFilters);
    if (Object.keys(this._inFilters).length)
      params._in = JSON.stringify(this._inFilters);
    if (this._orderCol)
      params._order = JSON.stringify([this._orderCol, this._orderAsc ? 'asc' : 'desc']);

    const qs = new URLSearchParams(params).toString();
    const url = `/api/${this._table}${qs ? '?' + qs : ''}`;
    const json = await apiFetch(url);
    return json;
  }

  async insert(data: any) {
    return apiFetch(`/api/${this._table}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async update(data: any) {
    // update().eq() pattern — capture eq for id then PATCH
    return new UpdateBuilder(this._table, data, this._eqFilters);
  }

  async delete() {
    return new DeleteBuilder(this._table, this._eqFilters);
  }
}

class UpdateBuilder {
  private _eqFilters: Record<string, any> = {};
  constructor(
    private table: string,
    private data: any,
    initialEq: Record<string, any>
  ) {
    this._eqFilters = { ...initialEq };
  }

  eq(col: string, val: any) {
    this._eqFilters[col] = val;
    return this._execute();
  }

  then(resolve: (val: any) => any, reject?: (err: any) => any) {
    return this._execute().then(resolve, reject);
  }

  private _execute() {
    const id = this._eqFilters['id'];
    return apiFetch(`/api/${this.table}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(this.data),
    });
  }
}

class DeleteBuilder {
  constructor(
    private table: string,
    private _eqFilters: Record<string, any>
  ) {}

  eq(col: string, val: any) {
    this._eqFilters[col] = val;
    return this._execute();
  }

  then(resolve: (val: any) => any, reject?: (err: any) => any) {
    return this._execute().then(resolve, reject);
  }

  private _execute() {
    const id = this._eqFilters['id'];
    return apiFetch(`/api/${this.table}/${id}`, { method: 'DELETE' });
  }
}

// ─── from() entry point ───────────────────────────────────────────
function from(table: string) {
  return new QueryBuilder(table);
}

// ─── Auth ─────────────────────────────────────────────────────────
const auth = {
  async signInWithPassword({ email, password }: { email: string; password: string }) {
    const json = await apiFetch('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (json.data?.session?.access_token) {
      localStorage.setItem('kdci-local-token', json.data.session.access_token);
    }
    return json;
  },

  async signOut() {
    localStorage.removeItem('kdci-local-token');
    return apiFetch('/auth/signout', { method: 'POST' });
  },

  async getSession() {
    return apiFetch('/auth/session');
  },

  async getUser() {
    return apiFetch('/auth/user');
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    const token = getToken();
    const session = token ? { access_token: token } : null;
    setTimeout(() => callback('INITIAL_SESSION', session), 0);
    return {
      data: {
        subscription: { unsubscribe: () => {} },
      },
    };
  },

  async resetPasswordForEmail(email: string, _opts?: any) {
    console.log('[local] Password reset requested for:', email);
    return { error: null };
  },
};

// ─── Exported local client (same shape as Supabase client) ────────
export const localClient = { from, auth };
