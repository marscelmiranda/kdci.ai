import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import {
  LayoutGrid, Briefcase, FileText, TrendingUp, BookOpen,
  Image as ImageIcon, Search, Plus, LogOut, Settings,
  ChevronLeft, Edit2, Trash2, Save, X, Check, MapPin, Clock, Users, Zap, Sparkles
} from 'lucide-react';
import { getAllJobs, saveJob, deleteJob, type Job } from '../contentStore';

const DEPARTMENTS = ['Engineering', 'AI & Data', 'Creative', 'CX & Support', 'Operations', 'Sales', 'Corporate'];
const JOB_TYPES   = ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote'];
const LOCATIONS   = ['Remote', 'Manila (Hybrid)', 'Manila (On-site)', 'US (Remote)'];

const Inp = (p: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...p} className={`w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#E61739]/60 transition-colors ${p.className??''}`}/>
);
const Tarea = (p: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...p} className={`w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#E61739]/60 transition-colors resize-none ${p.className??''}`}/>
);
const Sel = (p: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...p} className={`w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E61739]/60 transition-colors ${p.className??''}`}/>
);
const Lbl = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1 block">{children}</span>
);
const FW = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1"><Lbl>{label}</Lbl>{children}</div>
);

const BLANK_FORM = {
  title: '', department: 'Engineering', location: '', type: 'Full-Time',
  description: '', requirements: '', salary: '', status: 'Draft', tags: [] as string[],
};

export const CareerOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [viewState, setViewState] = useState<'list' | 'editor'>('list');
  const [jobs, setJobs]           = useState<Job[]>([]);
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const [form, setForm] = useState(BLANK_FORM);

  useEffect(() => {
    document.body.style.backgroundColor = '#0a0a0a';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  const loadJobs = () => {
    setLoading(true);
    getAllJobs().then(data => setJobs(data)).finally(() => setLoading(false));
  };

  useEffect(() => { loadJobs(); }, []);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openNew = () => {
    setEditingId(null);
    setForm(BLANK_FORM);
    setViewState('editor');
  };

  const openEdit = (job: Job) => {
    setEditingId(job.id);
    setForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements,
      salary: job.salary,
      status: job.status,
      tags: job.tags ?? [],
    });
    setViewState('editor');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { showToast('Title is required', 'error'); return; }
    setSaving(true);
    try {
      await saveJob({
        ...(editingId ? { id: editingId } : {}),
        ...form,
        active: form.status === 'Active',
        applicants: 0,
      } as Partial<Job>);
      showToast(editingId ? 'Job updated!' : 'Job posted!', 'success');
      loadJobs();
      setViewState('list');
    } catch {
      showToast('Save failed. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this job posting?')) return;
    try {
      await deleteJob(id);
      showToast('Job removed.', 'success');
      loadJobs();
    } catch {
      showToast('Delete failed.', 'error');
    }
  };

  const livePostings    = jobs.filter(j => j.status === 'Active').length;
  const totalApplicants = jobs.reduce((sum, j) => sum + (j.applicants ?? 0), 0);

  const filtered = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleNavClick = (id: string) => {
    if (id === 'overview') setView('publisher-dashboard');
    if (id === 'blog')     setView('cms-blog-ops');
  };

  const NAV = [
    { id:'overview', label:'Overview',          icon:LayoutGrid },
    { id:'careers',  label:'Career Ops',         icon:Briefcase  },
    { id:'blog',     label:'Blogs & Insights',   icon:FileText   },
    { id:'cases',    label:'Case Studies',        icon:TrendingUp },
    { id:'portfolio',label:'Creative Portfolio',  icon:ImageIcon  },
    { id:'ebooks',   label:'Ebooks & Whitepapers',icon:BookOpen   },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 h-screen sticky top-0 flex flex-col bg-[#0a0a0a]">
        <div className="p-8 pb-4">
          <Logo isDarkHero={true} />
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest w-fit">Publisher Portal</div>
        </div>
        <nav className="flex-grow px-4 py-6 space-y-1">
          {NAV.map(item => (
            <button key={item.id} onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                item.id === 'careers' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={18} />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all mb-2"><Settings size={18} /> Settings</button>
          <button onClick={() => setView('home')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#E61739] hover:bg-[#E61739]/10 transition-all"><LogOut size={18} /> Sign Out</button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-grow p-8 md:p-10 overflow-y-auto">

        {/* ── LIST VIEW ── */}
        {viewState === 'list' && (
          <div>
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-heading font-bold text-white mb-1">Career Ops</h1>
                <p className="text-sm text-white/30">Manage job postings and applicants.</p>
              </div>
              <button onClick={openNew} className="flex items-center gap-2 px-5 py-2.5 bg-[#E61739] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#c21230] transition-colors">
                <Plus size={14} /> Post New Job
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label:'Live Postings',    value: livePostings,    icon:<Briefcase size={18}/>, color:'text-green-500 bg-green-500/10' },
                { label:'Total Applicants', value: totalApplicants, icon:<Users size={18}/>,     color:'text-blue-500 bg-blue-500/10'  },
                { label:'Total Postings',   value: jobs.length,     icon:<Zap size={18}/>,       color:'text-[#E61739] bg-[#E61739]/10'},
              ].map((s, i) => (
                <div key={i} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${s.color}`}>{s.icon}</div>
                  <div><div className="text-xl font-bold text-white">{loading ? '...' : s.value}</div><div className="text-[10px] font-black uppercase text-white/30 tracking-widest">{s.label}</div></div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6 flex-wrap">
              <div className="relative flex-1 min-w-48">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={14}/>
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search jobs…"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#1a1a1a] border border-white/5 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#E61739]/40"/>
              </div>
              <div className="flex gap-2">
                {['All','Active','Draft','Closed'].map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${statusFilter===s?'bg-[#E61739] text-white':'bg-white/5 text-white/40 hover:text-white'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
              {loading ? (
                <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-[#E61739] border-t-transparent rounded-full animate-spin"/></div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/30">
                      <th className="px-6 py-5">Job Title</th>
                      <th className="px-6 py-5 hidden md:table-cell">Department</th>
                      <th className="px-6 py-5 hidden lg:table-cell">Location</th>
                      <th className="px-6 py-5">Status</th>
                      <th className="px-6 py-5 hidden lg:table-cell">Applicants</th>
                      <th className="px-6 py-5">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(job => (
                      <tr key={job.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-sm text-white">{job.title}</div>
                          <div className="text-[10px] text-white/30 mt-0.5">{job.type}</div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell"><span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-white/50">{job.department}</span></td>
                        <td className="px-6 py-4 hidden lg:table-cell text-sm text-white/50 flex items-center gap-1"><MapPin size={12}/> {job.location}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border ${
                            job.status==='Active'?'bg-green-500/10 text-green-400 border-green-500/20':
                            job.status==='Draft'?'bg-yellow-500/10 text-yellow-400 border-yellow-500/20':
                            'bg-white/5 text-white/30 border-white/10'}`}>{job.status}</span>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell text-sm text-white/40">{job.applicants ?? 0}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openEdit(job)} className="p-1.5 text-white/30 hover:text-white transition-colors"><Edit2 size={14}/></button>
                            <button onClick={() => handleDelete(job.id)} className="p-1.5 text-white/20 hover:text-red-400 transition-colors"><Trash2 size={14}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={6} className="px-6 py-12 text-center text-white/20 text-sm">No jobs found.</td></tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ── EDITOR VIEW ── */}
        {viewState === 'editor' && (
          <form onSubmit={handleSave}>
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <button type="button" onClick={() => setViewState('list')}
                className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-black uppercase tracking-widest transition-colors">
                <ChevronLeft size={15}/> Back to Jobs
              </button>
              <div className="flex items-center gap-3">
                <div className="flex bg-black/30 p-1 rounded-xl border border-white/10">
                  {['Draft','Active','Closed'].map(s => (
                    <button key={s} type="button" onClick={() => setForm(f => ({...f, status: s}))}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide transition-all ${form.status===s?'bg-white text-black shadow-sm':'text-white/40 hover:text-white'}`}>
                      {s}
                    </button>
                  ))}
                </div>
                <button type="submit" disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#E61739] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#c21230] transition-colors disabled:opacity-50">
                  {saving ? <><div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"/>Saving…</> : <><Save size={14}/>Save Job</>}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 flex flex-col gap-5">
                <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
                  <FW label="Job Title *"><Inp required value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} placeholder="e.g. Senior AI Prompt Engineer"/></FW>
                  <div className="grid grid-cols-2 gap-4">
                    <FW label="Department"><Sel value={form.department} onChange={e=>setForm(f=>({...f,department:e.target.value}))}>{DEPARTMENTS.map(d=><option key={d}>{d}</option>)}</Sel></FW>
                    <FW label="Employment Type"><Sel value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>{JOB_TYPES.map(t=><option key={t}>{t}</option>)}</Sel></FW>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FW label="Location"><Sel value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))}><option value="">Select…</option>{LOCATIONS.map(l=><option key={l}>{l}</option>)}</Sel></FW>
                    <FW label="Salary Range"><Inp value={form.salary} onChange={e=>setForm(f=>({...f,salary:e.target.value}))} placeholder="e.g. $80k–$100k"/></FW>
                  </div>
                  <FW label="Job Description"><Tarea rows={5} value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="Role overview and responsibilities…"/></FW>
                  <FW label="Requirements"><Tarea rows={4} value={form.requirements} onChange={e=>setForm(f=>({...f,requirements:e.target.value}))} placeholder="Key qualifications and experience…"/></FW>
                  <FW label="Tags (comma-separated)">
                    <Inp value={form.tags.join(', ')} onChange={e=>setForm(f=>({...f,tags:e.target.value.split(',').map(t=>t.trim()).filter(Boolean)}))} placeholder="LLM, Python, NLP"/>
                  </FW>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5 h-fit sticky top-4">
                <Lbl>Careers Page Preview</Lbl>
                <div className="mt-3 bg-[#F5F5F7] rounded-2xl p-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-[#E61739] text-[10px] font-black uppercase">{form.department || 'Department'}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><Clock size={10}/>{form.type}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{form.title || 'Job Title'}</h3>
                  {form.location && <p className="text-xs text-slate-500 mb-2 flex items-center gap-1"><MapPin size={11}/>{form.location}</p>}
                  {form.salary   && <p className="text-xs text-green-700 mb-2">💰 {form.salary}</p>}
                  <p className="text-xs text-slate-500 line-clamp-3">{form.description || 'Description appears here…'}</p>
                  {form.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {form.tags.slice(0,4).map(t=><span key={t} className="px-2 py-0.5 bg-white border border-slate-100 rounded-full text-[9px] font-bold text-slate-500">{t}</span>)}
                    </div>
                  )}
                  <div className="mt-3 px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl text-center">Apply Now</div>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-2xl text-sm font-bold shadow-2xl border z-50 ${
          toast.type==='success'?'bg-green-950 border-green-800 text-green-300':'bg-red-950 border-red-800 text-red-300'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
};
