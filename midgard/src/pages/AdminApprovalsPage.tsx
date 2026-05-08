import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import {
  LayoutGrid, Briefcase, FileText, BookOpen, Image as ImageIcon,
  LogOut, Settings, ChevronLeft, Check, X, Loader2, AlertCircle,
  Users, Clock, CheckCircle2, XCircle, RefreshCw, Lock, Unlock,
  ShieldCheck, ShieldAlert, User, Mail, Calendar
} from 'lucide-react';
import { getAdminUsers, approveUser, denyUser, unlockUser } from '../lib/api';

interface PortalUser {
  id: number;
  full_name: string;
  name: string;
  email: string;
  username: string;
  role: string;
  status: string;
  deny_reason: string | null;
  created_at: string;
  failed_attempts?: number;
}

type Tab = 'pending' | 'active' | 'denied';

export const AdminApprovalsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('pending');
  const [denyModal, setDenyModal] = useState<{ userId: number; name: string } | null>(null);
  const [denyReason, setDenyReason] = useState('');
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const handleNavClick = (id: string) => {
    if (id === 'overview') setView('dashboard');
    else if (id === 'careers') setView('career-ops');
    else if (id === 'blog') setView('blog-ops');
    else if (id === 'resources') setView('resources-ops');
    else if (id === 'portfolio') setView('portfolio-ops');
    else if (id === 'admin') setView('admin-approvals');
  };

  const load = () => {
    setLoading(true);
    setError(null);
    getAdminUsers()
      .then(setUsers)
      .catch(() => setError('Failed to load users.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleApprove = async (id: number) => {
    setActionLoading(id);
    try {
      await approveUser(id);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'active' } : u));
    } catch (e: any) { alert(e.message); }
    finally { setActionLoading(null); }
  };

  const handleDenyConfirm = async () => {
    if (!denyModal) return;
    setActionLoading(denyModal.userId);
    try {
      await denyUser(denyModal.userId, denyReason);
      setUsers(prev => prev.map(u => u.id === denyModal.userId ? { ...u, status: 'denied', deny_reason: denyReason || null } : u));
      setDenyModal(null);
      setDenyReason('');
    } catch (e: any) { alert(e.message); }
    finally { setActionLoading(null); }
  };

  const handleUnlock = async (id: number) => {
    setActionLoading(id);
    try {
      await unlockUser(id);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, failed_attempts: 0 } : u));
    } catch (e: any) { alert(e.message); }
    finally { setActionLoading(null); }
  };

  const filtered = users.filter(u => {
    if (tab === 'pending') return u.status === 'pending';
    if (tab === 'active') return u.status === 'active';
    if (tab === 'denied') return u.status === 'denied';
    return false;
  });

  const counts = {
    pending: users.filter(u => u.status === 'pending').length,
    active: users.filter(u => u.status === 'active').length,
    denied: users.filter(u => u.status === 'denied').length,
  };

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">
      <aside className="w-72 shrink-0 border-r border-white/5 h-screen sticky top-0 flex flex-col bg-[#0a0a0a]">
        <div className="p-8 pb-4">
          <Logo isDarkHero={true} />
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest w-fit">Publisher Portal</div>
        </div>
        <nav className="flex-grow px-4 py-6 space-y-1">
          {[
            { id: 'overview',  label: 'Overview',           icon: LayoutGrid },
            { id: 'careers',   label: 'Career Ops',         icon: Briefcase  },
            { id: 'blog',      label: 'Blogs & Insights',   icon: FileText   },
            { id: 'resources', label: 'Resources',          icon: BookOpen   },
            { id: 'portfolio', label: 'Creative Portfolio', icon: ImageIcon  },
            { id: 'admin',     label: 'User Approvals',     icon: Users      },
          ].map(item => (
            <button key={item.id} onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.id === 'admin' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={18} />{item.label}
              {item.id === 'admin' && counts.pending > 0 && (
                <span className="ml-auto px-2 py-0.5 rounded-full bg-[#E61739] text-white text-[10px] font-black">{counts.pending}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all mb-2"><Settings size={18} /> Settings</button>
          <button onClick={() => setView('login')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#E61739] hover:bg-[#E61739]/10 transition-all"><LogOut size={18} /> Sign Out</button>
        </div>
      </aside>

      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
              <span onClick={() => setView('dashboard')} className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
              <ChevronLeft size={10} className="rotate-180" />
              <span className="text-[#E61739]">User Approvals</span>
            </div>
            <h1 className="text-3xl font-heading font-bold text-white">User Approvals</h1>
          </div>
          <button onClick={load} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all">
            <RefreshCw size={16} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {([
            { key: 'pending', label: 'Pending',  icon: Clock,         color: 'text-amber-400',  bg: 'bg-amber-500/10 border-amber-500/20' },
            { key: 'active',  label: 'Approved', icon: CheckCircle2,  color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20' },
            { key: 'denied',  label: 'Denied',   icon: XCircle,       color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20' },
          ] as const).map(({ key, label, icon: Icon, color, bg }) => (
            <div key={key} className={`p-5 rounded-2xl border ${bg} flex items-center gap-4 cursor-pointer ${tab === key ? 'ring-2 ring-white/20' : ''}`}
              onClick={() => setTab(key)}>
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${color}`}><Icon size={20} /></div>
              <div>
                <div className={`text-2xl font-black ${color}`}>{counts[key]}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {(['pending', 'active', 'denied'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${tab === t ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>
              {t === 'active' ? 'Approved' : t.charAt(0).toUpperCase() + t.slice(1)}
              {t === 'pending' && counts.pending > 0 && <span className="ml-2 px-1.5 py-0.5 rounded-full bg-[#E61739] text-[9px]">{counts.pending}</span>}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={28} className="animate-spin text-[#E61739]/50" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-white/20 text-sm">
              No {tab === 'active' ? 'approved' : tab} accounts.
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/[0.02]">
                  <th className="px-8 py-5">User</th>
                  <th className="px-8 py-5">Username</th>
                  <th className="px-8 py-5">Role</th>
                  <th className="px-8 py-5">Submitted</th>
                  {tab === 'denied' && <th className="px-8 py-5">Reason</th>}
                  {tab === 'active' && <th className="px-8 py-5">Status</th>}
                  {(tab === 'pending' || tab === 'active') && <th className="px-8 py-5 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(user => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#E61739]/10 border border-[#E61739]/20 flex items-center justify-center text-[#E61739] font-black text-sm shrink-0">
                          {(user.full_name || user.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{user.full_name || user.name}</div>
                          <div className="text-white/40 text-xs">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-white/50 text-sm font-mono">@{user.username || '—'}</td>
                    <td className="px-8 py-5">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-wide text-white/50">{user.role}</span>
                    </td>
                    <td className="px-8 py-5 text-white/40 text-sm font-mono">{fmt(user.created_at)}</td>
                    {tab === 'denied' && (
                      <td className="px-8 py-5 text-white/40 text-sm max-w-[200px]">{user.deny_reason || '—'}</td>
                    )}
                    {tab === 'active' && (
                      <td className="px-8 py-5">
                        {(user.failed_attempts ?? 0) >= 5 ? (
                          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-red-400"><Lock size={12} /> Locked</span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-green-400"><ShieldCheck size={12} /> Active</span>
                        )}
                      </td>
                    )}
                    {tab === 'pending' && (
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleApprove(user.id)} disabled={actionLoading === user.id}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black hover:bg-green-500/20 transition-all disabled:opacity-50">
                            {actionLoading === user.id ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} Approve
                          </button>
                          <button onClick={() => { setDenyModal({ userId: user.id, name: user.full_name || user.name }); setDenyReason(''); }} disabled={actionLoading === user.id}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black hover:bg-red-500/20 transition-all disabled:opacity-50">
                            <X size={12} /> Deny
                          </button>
                        </div>
                      </td>
                    )}
                    {tab === 'active' && (
                      <td className="px-8 py-5 text-right">
                        {(user.failed_attempts ?? 0) >= 5 && (
                          <button onClick={() => handleUnlock(user.id)} disabled={actionLoading === user.id}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black hover:bg-amber-500/20 transition-all disabled:opacity-50 ml-auto">
                            {actionLoading === user.id ? <Loader2 size={12} className="animate-spin" /> : <Unlock size={12} />} Unlock
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {denyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-[2rem] p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Deny Account</h3>
            <p className="text-white/50 text-sm mb-6">Deny <span className="text-white font-bold">{denyModal.name}</span>? Optionally provide a reason.</p>
            <textarea value={denyReason} onChange={e => setDenyReason(e.target.value)} rows={3} placeholder="Reason for denial (optional)..."
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739] placeholder:text-white/20 resize-none mb-5" />
            <div className="flex gap-3">
              <button onClick={() => { setDenyModal(null); setDenyReason(''); }}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 text-sm font-bold hover:bg-white/5 transition-all">Cancel</button>
              <button onClick={handleDenyConfirm} disabled={actionLoading === denyModal.userId}
                className="flex-1 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {actionLoading === denyModal.userId ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />} Confirm Deny
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
