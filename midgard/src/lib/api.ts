const TOKEN_KEY = 'midgard_token';

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

// ---- Auth ----
export const login = (email: string, password: string) =>
  request<{ token: string; user: { id: number; email: string; name: string; role: string } }>(
    '/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }
  );
export const getMe = () =>
  request<{ id: number; email: string; name: string; role: string }>('/api/auth/me');
export const logout = () => clearToken();

export const register = (data: {
  full_name: string; email: string; username: string;
  password: string; secret_question: string; secret_answer: string;
}) => request<{ message: string }>('/api/auth/register', { method: 'POST', body: JSON.stringify(data) });

export const forgotPassword = (email: string) =>
  request<{ message: string; code?: string; secret_question?: string }>(
    '/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }
  );

export const verifyCode = (email: string, code: string) =>
  request<{ valid: boolean }>('/api/auth/verify-code', { method: 'POST', body: JSON.stringify({ email, code }) });

export const verifySecret = (email: string, secret_answer: string) =>
  request<{ valid: boolean }>('/api/auth/verify-secret', { method: 'POST', body: JSON.stringify({ email, secret_answer }) });

export const resetPassword = (email: string, code: string, new_password: string) =>
  request<{ message: string }>('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ email, code, new_password }) });

// ---- Admin ----
export const getAdminUsers = () => request<any[]>('/api/admin/users');
export const approveUser = (id: number) => request<any>(`/api/admin/users/${id}/approve`, { method: 'PUT' });
export const denyUser = (id: number, reason?: string) =>
  request<any>(`/api/admin/users/${id}/deny`, { method: 'PUT', body: JSON.stringify({ reason }) });
export const unlockUser = (id: number) => request<any>(`/api/admin/users/${id}/unlock`, { method: 'PUT' });

// ---- Jobs ----
export const getPublishedJobs  = ()           => request('/api/jobs');
export const getAllJobs         = ()           => request('/api/jobs/all');
export const createJob         = (data: any)  => request('/api/jobs',     { method: 'POST', body: JSON.stringify(data) });
export const updateJob         = (id: string | number, data: any) => request(`/api/jobs/${id}`,  { method: 'PUT',  body: JSON.stringify(data) });
export const deleteJob         = (id: string | number) => request(`/api/jobs/${id}`,  { method: 'DELETE' });

// ---- Blog posts ----
export const getPublishedPosts = ()           => request('/api/blog');
export const getAllPosts        = ()           => request('/api/blog/all');
export const createPost        = (data: any)  => request('/api/blog',     { method: 'POST', body: JSON.stringify(data) });
export const updatePost        = (id: string | number, data: any) => request(`/api/blog/${id}`,  { method: 'PUT',  body: JSON.stringify(data) });
export const deletePost        = (id: string | number) => request(`/api/blog/${id}`,  { method: 'DELETE' });

// ---- Case studies ----
export const getPublishedCases = ()           => request('/api/cases');
export const getAllCases        = ()           => request('/api/cases/all');
export const createCase        = (data: any)  => request('/api/cases',    { method: 'POST', body: JSON.stringify(data) });
export const updateCase        = (id: string | number, data: any) => request(`/api/cases/${id}`, { method: 'PUT',  body: JSON.stringify(data) });
export const deleteCase        = (id: string | number) => request(`/api/cases/${id}`, { method: 'DELETE' });

// ---- Ebooks ----
export const getPublishedEbooks = ()          => request('/api/ebooks');
export const getAllEbooks        = ()          => request('/api/ebooks/all');
export const createEbook        = (data: any) => request('/api/ebooks',   { method: 'POST', body: JSON.stringify(data) });
export const updateEbook        = (id: string | number, data: any) => request(`/api/ebooks/${id}`,{ method: 'PUT',  body: JSON.stringify(data) });
export const deleteEbook        = (id: string | number) => request(`/api/ebooks/${id}`,{ method: 'DELETE' });

// ---- Guides ----
export const getPublishedGuides = ()          => request('/api/guides');
export const getAllGuides        = ()          => request('/api/guides/all');
export const createGuide        = (data: any) => request('/api/guides',   { method: 'POST', body: JSON.stringify(data) });
export const updateGuide        = (id: string | number, data: any) => request(`/api/guides/${id}`,{ method: 'PUT',  body: JSON.stringify(data) });
export const deleteGuide        = (id: string | number) => request(`/api/guides/${id}`,{ method: 'DELETE' });

// ---- Webinars ----
export const getPublishedWebinars = ()          => request('/api/webinars');
export const getAllWebinars        = ()          => request('/api/webinars/all');
export const createWebinar        = (data: any) => request('/api/webinars', { method: 'POST', body: JSON.stringify(data) });
export const updateWebinar        = (id: string | number, data: any) => request(`/api/webinars/${id}`,{ method: 'PUT',  body: JSON.stringify(data) });
export const deleteWebinar        = (id: string | number) => request(`/api/webinars/${id}`,{ method: 'DELETE' });
