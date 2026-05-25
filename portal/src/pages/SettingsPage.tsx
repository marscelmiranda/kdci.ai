import React, { useState } from 'react';
import { ViewType } from '../types';
import { NavBar } from '../components/NavBar';
import {
  User, Lock, FileText, Clock, Users, CreditCard,
  Eye, EyeOff, CheckCircle2, AlertCircle, XCircle,
  Loader2, ChevronRight, Building2, Phone, Mail,
  Briefcase, Calendar, Shield, Activity, TrendingUp,
  Receipt, Download, BadgeCheck, Bot, UserCheck
} from 'lucide-react';

interface Props {
  setView: (v: ViewType) => void;
  user: { name: string; email: string; role: string } | null;
}

type Tab = 'profile' | 'contract' | 'history' | 'agents' | 'billing';

type ServiceStatus = 'onboarding' | 'processing' | 'ongoing' | 'pending-payment' | 'suspended';

const STATUS_CONFIG: Record<ServiceStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  onboarding:      { label: 'Onboarding',       color: 'text-blue-700',   bg: 'bg-blue-50 border-blue-100',   icon: BadgeCheck },
  processing:      { label: 'Processing',        color: 'text-amber-700',  bg: 'bg-amber-50 border-amber-100', icon: Loader2 },
  ongoing:         { label: 'Ongoing',           color: 'text-green-700',  bg: 'bg-green-50 border-green-100', icon: CheckCircle2 },
  'pending-payment': { label: 'Pending Payment', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-100', icon: AlertCircle },
  suspended:       { label: 'Suspended',         color: 'text-red-700',    bg: 'bg-red-50 border-red-100',     icon: XCircle },
};

const StatusBadge = ({ status }: { status: ServiceStatus }) => {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${cfg.bg} ${cfg.color}`}>
      <Icon size={10} /> {cfg.label}
    </span>
  );
};

const MOCK_SERVICES = [
  { id: 'SVC-001', name: 'AI Customer Experience Support', type: 'CX Operations', start: 'Jan 15, 2025', renewal: 'Jan 15, 2026', status: 'ongoing' as ServiceStatus },
  { id: 'SVC-002', name: 'Outbound Demand Generation', type: 'Sales Ops', start: 'Mar 1, 2025', renewal: 'Mar 1, 2026', status: 'onboarding' as ServiceStatus },
  { id: 'SVC-003', name: 'Back Office Processing', type: 'Operations', start: 'Jun 10, 2024', renewal: 'Jun 10, 2025', status: 'suspended' as ServiceStatus },
  { id: 'SVC-004', name: 'Agentic Recruitment Support', type: 'HR Ops', start: 'Feb 20, 2025', renewal: 'Feb 20, 2026', status: 'processing' as ServiceStatus },
  { id: 'SVC-005', name: 'Creative Production Team', type: 'Creative Ops', start: 'Nov 5, 2024', renewal: 'Nov 5, 2025', status: 'pending-payment' as ServiceStatus },
];

const MOCK_AGENTS = [
  { name: 'Maria Santos',   role: 'CX Lead',                  team: 'CX Operations', status: 'active',   since: 'Jan 2025', agentType: 'human-oversight' },
  { name: 'James Reyes',    role: 'Demand Gen Specialist',     team: 'Sales Ops',     status: 'active',   since: 'Mar 2025', agentType: 'agentic-ai' },
  { name: 'Chloe Mendoza',  role: 'Back Office Agent',         team: 'Operations',    status: 'inactive', since: 'Jun 2024', agentType: 'agentic-ai' },
  { name: 'Rico Bautista',  role: 'Recruitment Coordinator',   team: 'HR Ops',        status: 'active',   since: 'Feb 2025', agentType: 'human-oversight' },
  { name: 'Ana Villanueva', role: 'Graphic Designer',          team: 'Creative Ops',  status: 'inactive', since: 'Nov 2024', agentType: 'human-oversight' },
  { name: 'Paolo Cruz',     role: 'CX Specialist',             team: 'CX Operations', status: 'active',   since: 'Jan 2025', agentType: 'agentic-ai' },
];

const MOCK_INVOICES = [
  { id: 'INV-2025-005', date: 'May 1, 2025', amount: '$8,400.00', status: 'paid' },
  { id: 'INV-2025-004', date: 'Apr 1, 2025', amount: '$8,400.00', status: 'paid' },
  { id: 'INV-2025-003', date: 'Mar 1, 2025', amount: '$7,200.00', status: 'paid' },
  { id: 'INV-2025-002', date: 'Feb 1, 2025', amount: '$6,000.00', status: 'paid' },
  { id: 'INV-2025-001', date: 'Jan 1, 2025', amount: '$6,000.00', status: 'paid' },
];

export const SettingsPage = ({ setView, user }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState('+1 (555) 000-0000');
  const [company, setCompany] = useState('Acme Corporation');
  const [jobTitle, setJobTitle] = useState('Operations Manager');
  const [profileSaved, setProfileSaved] = useState(false);

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSaved, setPwSaved] = useState(false);

  const [agentFilter, setAgentFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [historyFilter, setHistoryFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    if (newPw.length < 8) { setPwError('Password must be at least 8 characters.'); return; }
    if (newPw !== confirmPw) { setPwError('Passwords do not match.'); return; }
    setPwSaved(true);
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    setTimeout(() => setPwSaved(false), 3000);
  };

  const activeAgents = MOCK_AGENTS.filter(a => a.status === 'active');
  const inactiveAgents = MOCK_AGENTS.filter(a => a.status === 'inactive');
  const filteredAgents = agentFilter === 'all' ? MOCK_AGENTS : agentFilter === 'active' ? activeAgents : inactiveAgents;

  const activeServices = MOCK_SERVICES.filter(s => ['ongoing', 'onboarding', 'processing'].includes(s.status));
  const inactiveServices = MOCK_SERVICES.filter(s => ['suspended', 'pending-payment'].includes(s.status));
  const filteredServices = historyFilter === 'all' ? MOCK_SERVICES : historyFilter === 'active' ? activeServices : inactiveServices;

  const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'profile',  label: 'Profile',          icon: User },
    { id: 'contract', label: 'Contract',          icon: FileText },
    { id: 'history',  label: 'Account History',   icon: Clock },
    { id: 'agents',   label: 'Agents',            icon: Users },
    { id: 'billing',  label: 'Billing',           icon: CreditCard },
  ];

  const inputCls = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400";
  const labelCls = "block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5";

  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar setView={setView} user={user} />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-7">
          <button
            onClick={() => setView('dashboard')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#E61739] transition-colors group"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform"><path d="M15 18l-6-6 6-6"/></svg>
            Dashboard
          </button>
          <span className="text-slate-200 text-xs font-bold">›</span>
          <span className="text-xs font-bold text-slate-700">Settings</span>
        </div>

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage your profile, contract, agents, and billing.</p>
        </div>

        {/* Tab bar */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-2 shadow-sm flex gap-1 flex-wrap mb-8">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-[30px] text-xs font-bold transition-all ${active ? 'bg-[#1D1D1F] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
              >
                <Icon size={13} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* User details */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-[14px] bg-[#E61739]/10 flex items-center justify-center">
                  <User size={18} className="text-[#E61739]" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-[15px]">User Details</h2>
                  <p className="text-slate-400 text-xs font-medium">Update your personal information.</p>
                </div>
              </div>

              {profileSaved && (
                <div className="mb-5 flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 rounded-2xl px-4 py-3 text-xs font-bold">
                  <CheckCircle2 size={14} /> Profile saved successfully.
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Full Name</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input value={name} onChange={e => setName(e.target.value)} className={`${inputCls} pl-10`} placeholder="Full name" />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Job Title</label>
                    <div className="relative">
                      <Briefcase size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} className={`${inputCls} pl-10`} placeholder="Your role" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Work Email</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className={`${inputCls} pl-10`} placeholder="you@company.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Phone</label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input value={phone} onChange={e => setPhone(e.target.value)} className={`${inputCls} pl-10`} placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Company</label>
                    <div className="relative">
                      <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input value={company} onChange={e => setCompany(e.target.value)} className={`${inputCls} pl-10`} placeholder="Company name" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full py-3 bg-[#1D1D1F] text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">
                  Save Profile
                </button>
              </form>
            </div>

            {/* Password change */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-[14px] bg-amber-50 flex items-center justify-center">
                  <Lock size={18} className="text-amber-600" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-[15px]">Change Password</h2>
                  <p className="text-slate-400 text-xs font-medium">Keep your account secure.</p>
                </div>
              </div>

              {pwError && (
                <div className="mb-5 flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 rounded-2xl px-4 py-3 text-xs font-bold">
                  <AlertCircle size={14} /> {pwError}
                </div>
              )}
              {pwSaved && (
                <div className="mb-5 flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 rounded-2xl px-4 py-3 text-xs font-bold">
                  <CheckCircle2 size={14} /> Password updated successfully.
                </div>
              )}

              <form onSubmit={handleSavePassword} className="space-y-5">
                {[
                  { label: 'Current Password', value: currentPw, set: setCurrentPw, show: showCurrent, setShow: setShowCurrent },
                  { label: 'New Password', value: newPw, set: setNewPw, show: showNew, setShow: setShowNew },
                  { label: 'Confirm New Password', value: confirmPw, set: setConfirmPw, show: showConfirm, setShow: setShowConfirm },
                ].map(field => (
                  <div key={field.label}>
                    <label className={labelCls}>{field.label}</label>
                    <div className="relative">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={field.show ? 'text' : 'password'}
                        value={field.value}
                        onChange={e => field.set(e.target.value)}
                        required
                        className={`${inputCls} pl-10 pr-10`}
                        placeholder="••••••••"
                      />
                      <button type="button" onClick={() => field.setShow(!field.show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                        {field.show ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                ))}

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Password Requirements</p>
                  {['Minimum 8 characters', 'At least one uppercase letter', 'At least one number'].map(req => (
                    <div key={req} className="flex items-center gap-2 text-xs text-slate-500 font-medium mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> {req}
                    </div>
                  ))}
                </div>

                <button type="submit" className="w-full py-3 bg-[#1D1D1F] text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── CONTRACT TAB ── */}
        {activeTab === 'contract' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-[14px] bg-blue-50 flex items-center justify-center">
                  <FileText size={18} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-[15px]">Contract Details</h2>
                  <p className="text-slate-400 text-xs font-medium">Your active service agreement with KDCI.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {[
                  { label: 'Contract Number', value: 'KDCI-2025-0042', icon: FileText },
                  { label: 'Contract Type', value: 'Managed Services Agreement', icon: Briefcase },
                  { label: 'Start Date', value: 'January 15, 2025', icon: Calendar },
                  { label: 'Renewal Date', value: 'January 14, 2026', icon: Calendar },
                  { label: 'Billing Cycle', value: 'Monthly — Net 30', icon: CreditCard },
                  { label: 'Currency', value: 'USD', icon: Receipt },
                  { label: 'Account Manager', value: 'Lorraine Dela Cruz', icon: User },
                  { label: 'Contract Status', value: 'Active', icon: CheckCircle2 },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="bg-slate-50 rounded-[20px] p-5 border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={13} className="text-slate-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                      </div>
                      <p className="font-bold text-slate-900 text-sm">{item.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 bg-slate-50 rounded-[20px] p-5 border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Scope of Services</span>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">AI-powered CX support, outbound demand generation, back-office processing, agentic recruitment, and creative production team provisioning as outlined in Schedule A of the agreement.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-[#020202] rounded-[40px] p-7 relative overflow-hidden">
                <div className="absolute top-[-40px] right-[-40px] w-[150px] h-[150px] bg-[#E61739]/20 rounded-full blur-[50px]" />
                <div className="relative z-10">
                  <Shield size={22} className="text-[#E61739] mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Total Contract Value</p>
                  <p className="text-3xl font-heading font-bold text-white">$100,800</p>
                  <p className="text-white/40 text-xs font-medium mt-1">12-month term</p>
                </div>
              </div>

              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-7">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Contract Actions</p>
                {['Download Contract PDF', 'Request Amendment', 'View SLA Terms', 'Contact Account Manager'].map(action => (
                  <button key={action} className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all text-sm font-bold text-slate-700 border border-transparent hover:border-slate-100 group mb-1">
                    {action}
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ACCOUNT HISTORY TAB ── */}
        {activeTab === 'history' && (
          <div className="space-y-6">

            {/* Summary counts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Total Services', value: MOCK_SERVICES.length, color: 'text-slate-900', bg: 'bg-white' },
                { label: 'Active', value: activeServices.length, color: 'text-green-700', bg: 'bg-green-50 border-green-100' },
                { label: 'Inactive / Issues', value: inactiveServices.length, color: 'text-red-700', bg: 'bg-red-50 border-red-100' },
                { label: 'In Progress', value: MOCK_SERVICES.filter(s => ['onboarding','processing'].includes(s.status)).length, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-100' },
              ].map(stat => (
                <div key={stat.label} className={`${stat.bg} rounded-[40px] border border-slate-100 shadow-sm p-6 text-center`}>
                  <p className={`text-3xl font-heading font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs font-bold text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Filter + table */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-bold text-slate-900 text-[15px]">Service History</h2>
                  <p className="text-slate-400 text-xs font-medium mt-0.5">All contracted KDCI services and their current status.</p>
                </div>
                <div className="flex gap-2">
                  {(['all', 'active', 'inactive'] as const).map(f => (
                    <button key={f} onClick={() => setHistoryFilter(f)} className={`px-4 py-2 rounded-2xl text-xs font-bold capitalize transition-all ${historyFilter === f ? 'bg-[#1D1D1F] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                      {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Inactive'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredServices.map(svc => (
                  <div key={svc.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 bg-slate-50 rounded-[24px] border border-slate-100 hover:border-slate-200 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                        <Activity size={16} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{svc.name}</p>
                        <p className="text-slate-400 text-xs font-medium mt-0.5">{svc.type} · ID: {svc.id}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Started</p>
                        <p className="text-xs font-bold text-slate-700">{svc.start}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Renewal</p>
                        <p className="text-xs font-bold text-slate-700">{svc.renewal}</p>
                      </div>
                      <StatusBadge status={svc.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── AGENTS TAB ── */}
        {activeTab === 'agents' && (
          <div className="space-y-6">

            {/* Agent count cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <div className="bg-[#020202] rounded-[40px] p-8 relative overflow-hidden col-span-2 sm:col-span-1">
                <div className="absolute bottom-[-40px] right-[-40px] w-[150px] h-[150px] bg-[#E61739]/20 rounded-full blur-[60px]" />
                <div className="relative z-10">
                  <TrendingUp size={22} className="text-[#E61739] mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Total Agents</p>
                  <p className="text-5xl font-heading font-bold text-white">{MOCK_AGENTS.length}</p>
                </div>
              </div>
              <div className="bg-green-50 rounded-[40px] border border-green-100 p-8">
                <CheckCircle2 size={22} className="text-green-600 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-1">Active</p>
                <p className="text-5xl font-heading font-bold text-green-700">{activeAgents.length}</p>
              </div>
              <div className="bg-purple-50 rounded-[40px] border border-purple-100 p-8">
                <Bot size={22} className="text-purple-600 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-purple-600 mb-1">Agentic AI</p>
                <p className="text-5xl font-heading font-bold text-purple-700">{MOCK_AGENTS.filter(a => a.agentType === 'agentic-ai').length}</p>
              </div>
              <div className="bg-blue-50 rounded-[40px] border border-blue-100 p-8">
                <UserCheck size={22} className="text-blue-600 mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Human Oversight</p>
                <p className="text-5xl font-heading font-bold text-blue-700">{MOCK_AGENTS.filter(a => a.agentType === 'human-oversight').length}</p>
              </div>
            </div>

            {/* Agent table */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-bold text-slate-900 text-[15px]">Agent Roster</h2>
                  <p className="text-slate-400 text-xs font-medium mt-0.5">All assigned KDCI agents across your service lines.</p>
                </div>
                <div className="flex gap-2">
                  {(['all', 'active', 'inactive'] as const).map(f => (
                    <button key={f} onClick={() => setAgentFilter(f)} className={`px-4 py-2 rounded-2xl text-xs font-bold capitalize transition-all ${agentFilter === f ? 'bg-[#1D1D1F] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                      {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredAgents.map(agent => (
                  <div key={agent.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-[20px] border border-slate-100 hover:border-slate-200 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${agent.status === 'active' ? 'bg-[#E61739]/10' : 'bg-slate-200'}`}>
                        <User size={16} className={agent.status === 'active' ? 'text-[#E61739]' : 'text-slate-400'} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{agent.name}</p>
                        <p className="text-slate-400 text-xs font-medium">{agent.role} · {agent.team}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap justify-end">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${agent.agentType === 'agentic-ai' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                        {agent.agentType === 'agentic-ai' ? <Bot size={10} /> : <UserCheck size={10} />}
                        {agent.agentType === 'agentic-ai' ? 'Agentic AI' : 'Human Oversight'}
                      </span>
                      <div className="hidden sm:block text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Since</p>
                        <p className="text-xs font-bold text-slate-700">{agent.since}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${agent.status === 'active' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-slate-400'}`} />
                        {agent.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BILLING TAB ── */}
        {activeTab === 'billing' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 space-y-5">

              {/* Payment method */}
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-[14px] bg-indigo-50 flex items-center justify-center">
                    <CreditCard size={18} className="text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-[15px]">Payment Method</h2>
                    <p className="text-slate-400 text-xs font-medium">Your current billing method on file.</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#1D1D1F] to-[#2d2d30] rounded-[24px] p-6 relative overflow-hidden mb-5">
                  <div className="absolute top-[-20px] right-[-20px] w-[100px] h-[100px] bg-[#E61739]/20 rounded-full blur-[30px]" />
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Bank Wire / ACH</p>
                      <p className="text-white font-bold text-lg mt-3">•••• •••• •••• 4829</p>
                      <p className="text-white/60 text-xs font-medium mt-1">Acme Corporation · Primary</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Shield size={18} className="text-white/70" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Billing Cycle', value: 'Monthly' },
                    { label: 'Payment Terms', value: 'Net 30' },
                    { label: 'Next Due', value: 'Jun 1, 2025' },
                  ].map(item => (
                    <div key={item.label} className="bg-slate-50 rounded-[16px] p-4 border border-slate-100">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</p>
                      <p className="font-bold text-slate-900 text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoice history */}
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-bold text-slate-900 text-[15px]">Invoice History</h2>
                    <p className="text-slate-400 text-xs font-medium mt-0.5">Your recent billing statements.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all text-xs font-bold">
                    <Download size={12} /> Export
                  </button>
                </div>
                <div className="space-y-3">
                  {MOCK_INVOICES.map(inv => (
                    <div key={inv.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-[20px] border border-slate-100 hover:border-slate-200 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-[12px] bg-green-50 border border-green-100 flex items-center justify-center">
                          <Receipt size={15} className="text-green-600" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{inv.id}</p>
                          <p className="text-slate-400 text-xs font-medium">{inv.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-5">
                        <p className="font-bold text-slate-900 text-sm">{inv.amount}</p>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-700 border border-green-100">
                          <CheckCircle2 size={9} /> Paid
                        </span>
                        <button className="text-slate-300 hover:text-[#E61739] transition-colors">
                          <Download size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              <div className="bg-[#020202] rounded-[40px] p-7 relative overflow-hidden">
                <div className="absolute top-[-30px] left-[-30px] w-[120px] h-[120px] bg-purple-600/20 rounded-full blur-[40px]" />
                <div className="relative z-10">
                  <Receipt size={20} className="text-[#E61739] mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Outstanding Balance</p>
                  <p className="text-4xl font-heading font-bold text-white">$0.00</p>
                  <div className="flex items-center gap-2 mt-3">
                    <CheckCircle2 size={13} className="text-green-400" />
                    <p className="text-white/50 text-xs font-medium">All invoices settled</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-7">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Billing Summary</p>
                {[
                  { label: 'YTD Spend', value: '$36,000' },
                  { label: 'Avg Monthly', value: '$7,200' },
                  { label: 'Active Services', value: '3' },
                  { label: 'Agents Billed', value: '4' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                    <span className="text-xs font-bold text-slate-500">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-7">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Billing Actions</p>
                {['Download Latest Invoice', 'Request Credit Note', 'Update Payment Method', 'Contact Billing Team'].map(action => (
                  <button key={action} className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all text-sm font-bold text-slate-700 border border-transparent hover:border-slate-100 group mb-1">
                    {action}
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
