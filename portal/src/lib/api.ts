const TOKEN_KEY = 'portal_token';

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }
  return res.json();
}

export const login = (email: string, password: string) =>
  request<{ token: string; user: { id: number; email: string; name: string; role: string } }>(
    '/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }
  );

export const getMe = () =>
  request<{ id: number; email: string; name: string; role: string }>('/api/auth/me');

export const logout = () => clearToken();
