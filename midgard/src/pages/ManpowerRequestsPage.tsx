import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { PortalTopNav } from '../components/PortalTopNav';
import { RichTextEditor } from '../components/RichTextEditor';
import {
  getMe,
  getAllManpowerRequests,
  createManpowerRequest,
  deleteManpowerRequest,
} from '../lib/api';
import {
  LayoutGrid, Briefcase, FileText, BookOpen, BookMarked,
  Image as ImageIcon, LogOut, Settings, ChevronLeft,
  Plus, Trash2, Users, UserCircle2, ClipboardList,
  Loader2, AlertCircle, CheckCircle2, Clock, MapPin, X
} from 'lucide-react';

interface ManpowerRequest {
  id: number;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  responsibilities: string;
  requirements: string;
  notes: string;
  status: 'pending' | 'assigned' | 'published';
  requested_by_email: string;
  requested_by_name: string;
  assigned_to_email: string | null;
  assigned_to_name: string | null;
  job_listing_id: number | null;
  created_at: string;
}

const STATUS_BADGE: Record<string, { label: string; classes: string }> = {
  pending:   { label: 'Pending',   classes: 'bg-amber-500/10  text-amber-400  border-amber-500/20'  },
  assigned:  { label: 'Assigned',  classes: 'bg-blue-500/10   text-blue-400   border-blue-500/20'   },
  published: { label: 'Published', classes: 'bg-green-500/10  text-green-400  border-green-500/20'  },
};

const DEPARTMENTS = ['AI Consulting','AI Creatives','AI CX & Support','AI Marketing & Lead Gen','AI Workforce','Internal'];
const EMP_TYPES   = ['Full-Time','Part-Time','Contract','Freelance','Internship'];

export const ManpowerRequestsPage = ({
  setView,
  userRole,
}: {
  setView: (v: ViewType) => void;
  userRole: string;
}) => {
  const [viewState, setViewState] = useState<'list' | 'form'>('list');
  const [requests, setRequests]   = useState<ManpowerRequest[]>([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [apiError, setApiError]   = useState<string | null>(null);
  const [success, setSuccess]     = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName]   = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: '',
    department: 'AI Consulting',
    location: '',
    employment_type: 'Full-Time',
    description: '',
    responsibilities: '',
    requirements: '',
    notes: '',
  });

  useEffect(() => {
    document.body.style.backgroundColor = '#0a0a0a';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  useEffect(() => {
    getMe()
      .then(u => { setUserEmail(u.email); setUserName(u.name || ''); })
      .catch(() => {});
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    setLoading(true);
    getAllManpowerRequests()
      .then(rows => setRequests(rows as ManpowerRequest[]))
      .catch(err => setApiError(err.message))
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { setApiError('Job title is required.'); return; }
    setSaving(true);
    setApiError(null);
    try {
      const created = await createManpowerRequest({
        ...form,
        requested_by_email: userEmail,
        requested_by_name: userName,
      }) as ManpowerRequest;
      setRequests(prev => [created, ...prev]);
      setSuccess('Manpower request submitted successfully. It will appear in Career Ops as a Pending Job Request.');
      setViewState('list');
      setForm({ title: '', department: 'Engineering', location: '', employment_type: 'Full-Time', description: '', responsibilities: '', requirements: '', notes: '' });
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteManpowerRequest(id);
      setRequests(prev => prev.filter(r => r.id !== id));
      setDeleteConfirm(null);
    } catch (err: any) {
      setApiError(err.message);
    }
  };

  const handleNavClick = (id: string) => {
    if (id === 'overview')     setView('dashboard');
    else if (id === 'careers')      setView('career-ops');
    else if (id === 'blog')         setView('blog-ops');
    else if (id === 'case-studies') setView('case-studies-ops');
    else if (id === 'resources')    setView('resources-ops');
    else if (id === 'portfolio')    setView('portfolio-ops');
    else if (id === 'admin')        setView('admin-approvals');
    else if (id === 'manpower')     setView('manpower-requests');
    else if (id === 'profile')      setView('profile');
  };

  const pending   = requests.filter(r => r.status === 'pending').length;
  const assigned  = requests.filter(r => r.status === 'assigned').length;
  const published = requests.filter(r => r.status === 'published').length;

  const fmtDate = (s: string) =>
    s ? new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
      <PortalTopNav setView={setView} activeNav="manpower-requests" />
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
              <span onClick={() => setView('dashboard')} className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
              <ChevronLeft size={10} className="rotate-180" />
              {viewState === 'form' && (
                <>
                  <span onClick={() => setViewState('list')} className="hover:text-white cursor-pointer transition-colors">Manpower Requests</span>
                  <ChevronLeft size={10} className="rotate-180" />
                  <span className="text-[#E61739]">New Request</span>
                </>
              )}
              {viewState === 'list' && <span className="text-[#E61739]">Manpower Requests</span>}
            </div>
            <h1 className="text-3xl font-heading font-bold text-white">
              {viewState === 'list' ? 'Manpower Requests' : 'New Manpower Request'}
            </h1>
            {viewState === 'list' && (
              <p className="text-white/40 text-sm mt-1">Submit staffing requests that will be reviewed and published by recruiters.</p>
            )}
          </div>
          {viewState === 'list' && (
            <button
              onClick={() => { setApiError(null); setSuccess(null); setViewState('form'); }}
              className="px-6 py-3 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg"
            >
              <Plus size={16} /> New Request
            </button>
          )}
          {viewState === 'form' && (
            <button
              onClick={() => setViewState('list')}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Notifications */}
        {apiError && (
          <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-5 py-4 text-sm font-medium">
            <AlertCircle size={16} className="shrink-0" />
            <span className="flex-grow">{apiError}</span>
            <button onClick={() => setApiError(null)}><X size={16} /></button>
          </div>
        )}
        {success && (
          <div className="mb-6 flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl px-5 py-4 text-sm font-medium">
            <CheckCircle2 size={16} className="shrink-0" />
            <span className="flex-grow">{success}</span>
            <button onClick={() => setSuccess(null)}><X size={16} /></button>
          </div>
        )}

        {/* ---- LIST VIEW ---- */}
        {viewState === 'list' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400"><Clock size={22} /></div>
                <div>
                  <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Pending</div>
                  <div className="text-2xl font-heading font-bold text-white">{pending}</div>
                </div>
              </div>
              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400"><Users size={22} /></div>
                <div>
                  <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Assigned</div>
                  <div className="text-2xl font-heading font-bold text-white">{assigned}</div>
                </div>
              </div>
              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400"><CheckCircle2 size={22} /></div>
                <div>
                  <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Published</div>
                  <div className="text-2xl font-heading font-bold text-white">{published}</div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24 text-white/40 font-bold text-sm gap-3">
                <Loader2 size={20} className="animate-spin text-[#E61739]" /> Loading requests…
              </div>
            ) : requests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-28 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-5 text-white/20">
                  <ClipboardList size={32} />
                </div>
                <p className="text-white/40 font-bold text-lg mb-2">No requests yet</p>
                <p className="text-white/20 text-sm mb-6">Submit a manpower request to notify your recruitment team.</p>
                <button
                  onClick={() => setViewState('form')}
                  className="px-6 py-3 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                >
                  <Plus size={16} /> New Request
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {requests.map(req => {
                  const badge = STATUS_BADGE[req.status] ?? STATUS_BADGE.pending;
                  return (
                    <div key={req.id} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${badge.classes}`}>
                              {badge.label}
                            </span>
                            {req.department && (
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/30 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                                {req.department}
                              </span>
                            )}
                            {req.employment_type && (
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/30 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                                {req.employment_type}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1 truncate">{req.title}</h3>
                          <div className="flex items-center gap-4 text-xs text-white/30 flex-wrap">
                            {req.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={11} />{req.location}
                              </span>
                            )}
                            <span>Requested by <span className="text-white/50">{req.requested_by_name || req.requested_by_email}</span></span>
                            <span>on {fmtDate(req.created_at)}</span>
                            {req.assigned_to_name && (
                              <span>Assigned to <span className="text-blue-400">{req.assigned_to_name}</span></span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {req.status === 'published' && req.job_listing_id && (
                            <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Live on Careers</span>
                          )}
                          {(req.status === 'pending' && (req.requested_by_email === userEmail || userRole === 'admin')) && (
                            <button
                              onClick={() => setDeleteConfirm(req.id)}
                              className="p-2 rounded-xl text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
                              title="Delete request"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ---- FORM VIEW ---- */}
        {viewState === 'form' && (
          <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">

            {/* Basic info */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 space-y-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#E61739] rounded-full inline-block" /> Role Details
              </h2>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Job Title <span className="text-[#E61739]">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Software Engineer"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm font-bold text-white placeholder:text-white/30 focus:outline-none focus:border-[#E61739] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Department</label>
                  <select
                    value={form.department}
                    onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-[#E61739] transition-all"
                  >
                    {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#1a1a1a]">{d}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Employment Type</label>
                  <select
                    value={form.employment_type}
                    onChange={e => setForm(f => ({ ...f, employment_type: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-[#E61739] transition-all"
                  >
                    {EMP_TYPES.map(t => <option key={t} value={t} className="bg-[#1a1a1a]">{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Manila (Hybrid), Remote, Pasig City"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm font-bold text-white placeholder:text-white/30 focus:outline-none focus:border-[#E61739] transition-all"
                />
              </div>
            </div>

            {/* Job Overview */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 space-y-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#E61739] rounded-full inline-block" /> Job Overview
              </h2>
              <p className="text-white/30 text-xs">Provide a summary of the role, its purpose, and what success looks like.</p>
              <RichTextEditor
                value={form.description}
                onChange={v => setForm(f => ({ ...f, description: v }))}
                placeholder="Describe the role, team context, and what this hire will accomplish…"
              />
            </div>

            {/* Key Responsibilities */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 space-y-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#E61739] rounded-full inline-block" /> Key Responsibilities
              </h2>
              <RichTextEditor
                value={form.responsibilities}
                onChange={v => setForm(f => ({ ...f, responsibilities: v }))}
                placeholder="List the primary duties and day-to-day responsibilities…"
              />
            </div>

            {/* Job Requirements */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 space-y-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#E61739] rounded-full inline-block" /> Job Requirements
              </h2>
              <RichTextEditor
                value={form.requirements}
                onChange={v => setForm(f => ({ ...f, requirements: v }))}
                placeholder="Skills, experience, education, and qualifications needed…"
              />
            </div>

            {/* Internal Notes */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 space-y-4">
              <h2 className="text-sm font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                <span className="w-1 h-4 bg-amber-400 rounded-full inline-block" /> Internal Notes
                <span className="text-[10px] text-white/20 font-medium normal-case tracking-normal ml-1">(optional, not published)</span>
              </h2>
              <textarea
                rows={3}
                placeholder="Any internal context, urgency, headcount justification, or recruiter guidance…"
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm font-medium text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex items-center gap-4 pb-12">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3.5 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg disabled:opacity-60"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <ClipboardList size={16} />}
                {saving ? 'Submitting…' : 'Submit Request'}
              </button>
              <button
                type="button"
                onClick={() => setViewState('list')}
                className="px-6 py-3.5 rounded-xl border border-white/10 text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <p className="text-white/30 text-xs ml-2">
                This request will appear in <strong className="text-white/50">Career Ops → Pending Requests</strong> for your recruiter team.
              </p>
            </div>
          </form>
        )}
      </main>

      {/* Delete Confirm Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-sm p-8 shadow-2xl">
            <h2 className="text-xl font-heading font-bold text-white mb-3">Delete Request?</h2>
            <p className="text-white/40 text-sm mb-7">This will permanently remove the manpower request. This cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-grow py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-all"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-grow py-3 border border-white/10 text-white/60 hover:text-white rounded-xl font-bold text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
