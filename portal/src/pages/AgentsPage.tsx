import React, { useState } from 'react';
import { ViewType } from '../types';
import { NavBar } from '../components/NavBar';
import {
  Bot, MessageSquare, ListChecks, Gauge, Bell, ScrollText,
  CheckCircle2, XCircle, Clock, AlertTriangle, Zap,
  Play, Pause, ChevronRight, ChevronDown, Eye,
  Mail, Database, Globe, FileText, TrendingUp,
  Activity, User, Shield, RefreshCw, Settings
} from 'lucide-react';

interface Props {
  setView: (v: ViewType) => void;
  user: { name: string; email: string; role: string } | null;
}

const TABS = [
  { id: 'overview',  label: 'Overview',      icon: Bot },
  { id: 'sessions',  label: 'Chat Sessions', icon: MessageSquare },
  { id: 'tasks',     label: 'Task Runs',     icon: ListChecks },
  { id: 'usage',     label: 'Usage & Limits',icon: Gauge },
  { id: 'alerts',    label: 'Alerts',        icon: Bell },
  { id: 'audit',     label: 'Audit Log',     icon: ScrollText },
];

const STATUS_COLORS: Record<string, string> = {
  active:    'bg-green-50 text-green-700 border-green-200',
  ended:     'bg-slate-100 text-slate-500 border-slate-200',
  escalated: 'bg-amber-50 text-amber-700 border-amber-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  failed:    'bg-red-50 text-red-600 border-red-200',
  running:   'bg-blue-50 text-blue-700 border-blue-200',
  queued:    'bg-purple-50 text-purple-700 border-purple-200',
};

const SESSIONS = [
  { id: 'SES-0041', date: 'May 25, 2026 · 09:14', duration: '6m 32s', user: 'Aedan Reyes', messages: 18, model: 'Gemini 2.0 Flash', status: 'ended',    summary: 'Customer asked about invoice discrepancies and payment timelines.' },
  { id: 'SES-0040', date: 'May 25, 2026 · 07:02', duration: '2m 11s', user: 'Aedan Reyes', messages: 6,  model: 'Gemini 2.0 Flash', status: 'escalated', summary: 'Billing dispute escalated to human agent after 3 failed clarification attempts.' },
  { id: 'SES-0039', date: 'May 24, 2026 · 16:48', duration: '11m 05s',user: 'Maria Santos', messages: 31, model: 'Gemini 2.5 Pro',  status: 'ended',    summary: 'Onboarding walkthrough for new staff augmentation SLA terms.' },
  { id: 'SES-0038', date: 'May 24, 2026 · 14:22', duration: '—',      user: 'Aedan Reyes', messages: 4,  model: 'Gemini 2.0 Flash', status: 'active',   summary: 'Reviewing agent task logs and performance metrics.' },
  { id: 'SES-0037', date: 'May 23, 2026 · 11:37', duration: '4m 50s', user: 'Maria Santos', messages: 12, model: 'Gemini 2.0 Flash', status: 'ended',    summary: 'FAQ query about data residency and GDPR compliance.' },
];

const TASKS = [
  { id: 'TSK-0118', name: 'Monthly Invoice Summary', desc: 'Compile and email invoice summaries for all active contracts.', trigger: 'Schedule · 1st of month', status: 'completed', start: 'May 1, 2026 · 00:00', end: 'May 1, 2026 · 00:03', steps: [5, 5], tools: ['Sent email', 'Generated PDF'], result: 'Invoice summary sent to 3 recipients.' },
  { id: 'TSK-0117', name: 'CRM Contact Sync',         desc: 'Push updated client records to HubSpot.',                      trigger: 'Event · form submission',  status: 'completed', start: 'May 24, 2026 · 15:12', end: 'May 24, 2026 · 15:12', steps: [3, 3], tools: ['Updated CRM'],             result: '2 contact records updated.' },
  { id: 'TSK-0116', name: 'SLA Breach Checker',       desc: 'Scan open tickets and flag any approaching SLA thresholds.',   trigger: 'Schedule · every 4 hrs',   status: 'running',   start: 'May 25, 2026 · 08:00', end: '—',                    steps: [2, 4], tools: ['Read tickets'],            result: '—' },
  { id: 'TSK-0115', name: 'Candidate Pipeline Digest', desc: 'Summarise new applicants and score against role criteria.',   trigger: 'Schedule · daily 07:00',   status: 'failed',    start: 'May 25, 2026 · 07:00', end: 'May 25, 2026 · 07:01', steps: [1, 5], tools: [],                          result: '', error: 'Could not connect to the recruitment database. It may be temporarily offline — no data was lost.' },
  { id: 'TSK-0114', name: 'Weekly KPI Report',        desc: 'Aggregate KPIs and post to the client dashboard.',             trigger: 'Schedule · Mon 06:00',     status: 'completed', start: 'May 19, 2026 · 06:00', end: 'May 19, 2026 · 06:04', steps: [6, 6], tools: ['Generated PDF', 'Sent email'],result: 'KPI report delivered to 5 stakeholders.' },
  { id: 'TSK-0113', name: 'Onboarding Doc Generator', desc: 'Create onboarding pack for newly signed contracts.',           trigger: 'User · Aedan Reyes',        status: 'queued',    start: '—',                    end: '—',                    steps: [0, 4], tools: [],                          result: '' },
];

const ALERTS = [
  { type: 'error',   icon: XCircle,       title: 'Task failed: Candidate Pipeline Digest',       desc: 'Recruitment database was unreachable at 07:00. The task will retry at the next scheduled run.',  time: 'May 25, 2026 · 07:01' },
  { type: 'warning', icon: AlertTriangle,  title: 'Long-running task: SLA Breach Checker',        desc: 'This task has been running for 2+ hours. Expected completion is under 10 minutes.',               time: 'May 25, 2026 · 10:03' },
  { type: 'info',    icon: Activity,       title: 'Unusual spike in chat sessions',               desc: '12 sessions opened in the last hour, compared to an average of 3. No errors detected.',           time: 'May 25, 2026 · 09:55' },
  { type: 'success', icon: CheckCircle2,   title: 'Monthly Invoice Summary completed',            desc: 'All 3 recipients received their invoice summaries. No issues reported.',                           time: 'May 1, 2026 · 00:03' },
];

const AUDIT = [
  { actor: 'Aedan Reyes',    action: 'Triggered task manually',    detail: 'Onboarding Doc Generator · TSK-0113',  time: 'May 25, 2026 · 10:41', icon: Play,     color: 'text-blue-500 bg-blue-50' },
  { actor: 'System',         action: 'Task failed',                detail: 'Candidate Pipeline Digest · TSK-0115', time: 'May 25, 2026 · 07:01', icon: XCircle,  color: 'text-red-500 bg-red-50' },
  { actor: 'Maria Santos',   action: 'Escalated chat to human',    detail: 'Session SES-0040',                     time: 'May 25, 2026 · 07:06', icon: User,     color: 'text-amber-500 bg-amber-50' },
  { actor: 'Aedan Reyes',    action: 'Updated agent configuration', detail: 'SLA Breach Checker · check interval changed to 4 hrs', time: 'May 24, 2026 · 17:30', icon: Settings, color: 'text-purple-500 bg-purple-50' },
  { actor: 'System',         action: 'Task completed',             detail: 'CRM Contact Sync · TSK-0117',          time: 'May 24, 2026 · 15:12', icon: CheckCircle2, color: 'text-green-500 bg-green-50' },
  { actor: 'System',         action: 'Agent auto-resumed',         detail: 'SLA Breach Checker restarted after idle timeout', time: 'May 24, 2026 · 08:01', icon: RefreshCw, color: 'text-slate-500 bg-slate-100' },
  { actor: 'Aedan Reyes',    action: 'Human override applied',     detail: 'Overrode agent decision on billing dispute (SES-0040)', time: 'May 25, 2026 · 07:08', icon: Shield, color: 'text-indigo-500 bg-indigo-50' },
];

const StatusBadge = ({ status }: { status: string }) => (
  <span className={`text-[10px] font-black uppercase tracking-widest border px-2.5 py-1 rounded-full ${STATUS_COLORS[status] ?? 'bg-slate-100 text-slate-500 border-slate-200'}`}>
    {status}
  </span>
);

const ToolTag = ({ label }: { label: string }) => (
  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{label}</span>
);

const StatCard = ({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) => (
  <div className="bg-white rounded-[30px] border border-slate-100 p-6 shadow-sm">
    <div className={`text-3xl font-heading font-bold ${color} mb-1`}>{value}</div>
    <div className="text-[13px] font-bold text-slate-700 mb-0.5">{label}</div>
    <div className="text-[11px] font-medium text-slate-400">{sub}</div>
  </div>
);

const UsageBar = ({ label, used, total, unit, color }: { label: string; used: number; total: number; unit: string; color: string }) => {
  const pct = Math.min((used / total) * 100, 100);
  return (
    <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-sm">
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="text-[13px] font-bold text-slate-800">{label}</div>
          <div className="text-[11px] font-medium text-slate-400 mt-0.5">{used.toLocaleString()} / {total.toLocaleString()} {unit}</div>
        </div>
        <div className={`text-lg font-heading font-bold ${pct >= 80 ? 'text-[#E61739]' : 'text-slate-700'}`}>{Math.round(pct)}%</div>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export const AgentsPage = ({ setView, user }: Props) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

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
          <span className="text-xs font-bold text-slate-700">Agents</span>
        </div>

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold text-slate-900">Agentic AI Programs</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Monitor your AI agents, chat sessions, task runs, usage, and activity.</p>
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[28px] text-xs font-bold transition-all whitespace-nowrap ${active ? 'bg-[#1D1D1F] text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
              >
                <Icon size={13} />{tab.label}
              </button>
            );
          })}
        </div>

        {/* ── OVERVIEW ─────────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard label="Total Runs This Month" value="142"  sub="↑ 18 vs. last month"        color="text-slate-900" />
              <StatCard label="Active Agents Right Now" value="2" sub="SLA Checker · CRM Sync"     color="text-blue-600" />
              <StatCard label="Success Rate"         value="96.5%" sub="4 failures in last 30 days" color="text-green-600" />
              <StatCard label="Tasks Automated"      value="1,204" sub="hours of manual work saved" color="text-purple-600" />
            </div>

            {/* Active agent roster */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-8 pt-8 pb-4 border-b border-slate-50">
                <h2 className="text-[15px] font-bold text-slate-900">Active Programs</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Agents currently running or on standby.</p>
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  { name: 'SLA Breach Checker',       type: 'Agentic AI',       schedule: 'Every 4 hrs', lastRun: 'May 25, 2026 · 08:00', status: 'running',   runs: 38, rate: '97%' },
                  { name: 'CRM Contact Sync',         type: 'Agentic AI',       schedule: 'On event',    lastRun: 'May 24, 2026 · 15:12', status: 'active',    runs: 61, rate: '100%' },
                  { name: 'Monthly Invoice Summary',  type: 'Agentic AI',       schedule: '1st of month',lastRun: 'May 1, 2026 · 00:00',  status: 'ended',     runs: 5,  rate: '100%' },
                  { name: 'Candidate Pipeline Digest',type: 'Human Oversight',  schedule: 'Daily 07:00', lastRun: 'May 25, 2026 · 07:01', status: 'failed',    runs: 29, rate: '89%' },
                  { name: 'Onboarding Doc Generator', type: 'Human Oversight',  schedule: 'On demand',   lastRun: '—',                    status: 'queued',    runs: 3,  rate: '100%' },
                ].map((a, i) => (
                  <div key={i} className="px-8 py-5 flex flex-wrap items-center gap-4">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${a.type === 'Agentic AI' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                      {a.type === 'Agentic AI' ? <Bot size={16} className="text-purple-600" /> : <User size={16} className="text-blue-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-bold text-slate-900 truncate">{a.name}</div>
                      <div className="text-[11px] font-medium text-slate-400 mt-0.5">{a.type} · {a.schedule}</div>
                    </div>
                    <div className="hidden sm:block text-[11px] font-medium text-slate-400 text-right">
                      <div>Last run</div>
                      <div className="text-slate-600 font-bold mt-0.5">{a.lastRun}</div>
                    </div>
                    <div className="hidden md:block text-center">
                      <div className="text-[11px] font-medium text-slate-400">Runs</div>
                      <div className="text-[13px] font-bold text-slate-700 mt-0.5">{a.runs}</div>
                    </div>
                    <div className="hidden md:block text-center">
                      <div className="text-[11px] font-medium text-slate-400">Success</div>
                      <div className="text-[13px] font-bold text-green-600 mt-0.5">{a.rate}</div>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CHAT SESSIONS ────────────────────────────────────── */}
        {activeTab === 'sessions' && (
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 pt-8 pb-5 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-[15px] font-bold text-slate-900">Chat Sessions</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">All AI-initiated and user-initiated conversations.</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">{SESSIONS.length} sessions</span>
            </div>
            <div className="divide-y divide-slate-50">
              {SESSIONS.map((s, i) => (
                <div key={i} className="px-8 py-6">
                  <div className="flex flex-wrap items-start gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-black text-slate-400 tracking-wider">{s.id}</span>
                        <StatusBadge status={s.status} />
                      </div>
                      <div className="text-[11px] font-medium text-slate-400 mt-1">{s.date} · {s.duration}</div>
                    </div>
                    <button className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-[#E61739] transition-colors px-3 py-1.5 rounded-xl hover:bg-red-50">
                      <Eye size={12} /> Transcript
                    </button>
                  </div>
                  <p className="text-[12px] text-slate-600 font-medium leading-relaxed mb-3">"{s.summary}"</p>
                  <div className="flex flex-wrap gap-4 text-[11px] font-medium text-slate-400">
                    <span><span className="font-bold text-slate-600">{s.user}</span> initiated</span>
                    <span>{s.messages} messages</span>
                    <span>{s.model}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TASK RUNS ────────────────────────────────────────── */}
        {activeTab === 'tasks' && (
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 pt-8 pb-5 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-[15px] font-bold text-slate-900">Task Runs</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Automated and manually triggered agent tasks.</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">{TASKS.length} tasks</span>
            </div>
            <div className="divide-y divide-slate-50">
              {TASKS.map((t, i) => {
                const open = expandedTask === t.id;
                return (
                  <div key={i} className="px-8 py-5">
                    <button className="w-full text-left" onClick={() => setExpandedTask(open ? null : t.id)}>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[13px] font-bold text-slate-900">{t.name}</span>
                            <StatusBadge status={t.status} />
                          </div>
                          <div className="text-[11px] font-medium text-slate-400 mt-1">{t.trigger}</div>
                        </div>

                        {/* Steps progress */}
                        <div className="hidden sm:flex items-center gap-2">
                          <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${t.status === 'failed' ? 'bg-red-400' : t.status === 'running' ? 'bg-blue-400' : 'bg-green-400'}`}
                              style={{ width: `${(t.steps[0] / t.steps[1]) * 100}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-slate-400">{t.steps[0]}/{t.steps[1]} steps</span>
                        </div>

                        <div className={`transition-transform ${open ? 'rotate-90' : ''}`}>
                          <ChevronRight size={14} className="text-slate-300" />
                        </div>
                      </div>
                    </button>

                    {open && (
                      <div className="mt-5 space-y-4">
                        <p className="text-[12px] font-medium text-slate-500">{t.desc}</p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                          {[
                            { label: 'Started',   val: t.start },
                            { label: 'Ended',     val: t.end },
                            { label: 'Triggered', val: t.trigger },
                            { label: 'Steps',     val: `${t.steps[0]} of ${t.steps[1]} completed` },
                          ].map((f, j) => (
                            <div key={j} className="bg-slate-50 rounded-2xl px-4 py-3">
                              <div className="font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-1">{f.label}</div>
                              <div className="font-bold text-slate-700">{f.val}</div>
                            </div>
                          ))}
                        </div>

                        {t.tools.length > 0 && (
                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-1">Tools used</span>
                            {t.tools.map((tool, j) => <ToolTag key={j} label={tool} />)}
                          </div>
                        )}

                        {t.result && !t.error && (
                          <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-2xl px-5 py-4">
                            <CheckCircle2 size={15} className="text-green-600 shrink-0 mt-0.5" />
                            <p className="text-[12px] font-medium text-green-800">{t.result}</p>
                          </div>
                        )}

                        {t.error && (
                          <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4">
                            <XCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                            <p className="text-[12px] font-medium text-red-700">{t.error}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── USAGE & LIMITS ───────────────────────────────────── */}
        {activeTab === 'usage' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <StatCard label="Estimated Cost This Period" value="$42.80" sub="Based on your Pro plan usage" color="text-slate-900" />
              <StatCard label="Runs Used"   value="142 / 500"  sub="Resets Jun 1, 2026"  color="text-blue-600" />
              <StatCard label="Sessions Used" value="41 / 200" sub="Chat sessions this month" color="text-purple-600" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <UsageBar label="Task Runs"        used={142} total={500} unit="runs"    color="bg-blue-400" />
              <UsageBar label="Chat Sessions"    used={41}  total={200} unit="sessions" color="bg-purple-400" />
              <UsageBar label="AI Processing"    used={68}  total={100} unit="credits"  color="bg-amber-400" />
              <UsageBar label="Integrations"     used={3}   total={10}  unit="connected" color="bg-green-400" />
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8">
              <h2 className="text-[14px] font-bold text-slate-900 mb-5">Plan Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[12px]">
                {[
                  { label: 'Current Plan',  val: 'Pro' },
                  { label: 'Billing Cycle', val: 'Monthly' },
                  { label: 'Renewal Date',  val: 'Jun 1, 2026' },
                  { label: 'Seat Count',    val: '3 users' },
                ].map((f, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl px-4 py-3">
                    <div className="font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-1">{f.label}</div>
                    <div className="font-bold text-slate-800">{f.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ALERTS ───────────────────────────────────────────── */}
        {activeTab === 'alerts' && (
          <div className="space-y-5">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-8 pt-8 pb-5 border-b border-slate-50">
                <h2 className="text-[15px] font-bold text-slate-900">Active Alerts</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Failed runs, long-running tasks, and unusual activity.</p>
              </div>
              <div className="divide-y divide-slate-50">
                {ALERTS.map((a, i) => {
                  const Icon = a.icon;
                  const cfg: Record<string, string> = {
                    error:   'text-red-500 bg-red-50',
                    warning: 'text-amber-500 bg-amber-50',
                    info:    'text-blue-500 bg-blue-50',
                    success: 'text-green-600 bg-green-50',
                  };
                  return (
                    <div key={i} className="px-8 py-6 flex items-start gap-4">
                      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${cfg[a.type]}`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold text-slate-900 mb-1">{a.title}</div>
                        <p className="text-[12px] font-medium text-slate-500 leading-relaxed">{a.desc}</p>
                        <div className="text-[11px] font-medium text-slate-400 mt-2">{a.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notification preferences */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8">
              <h2 className="text-[14px] font-bold text-slate-900 mb-5">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: 'Task failures',       email: true,  inapp: true  },
                  { label: 'Long-running tasks',  email: false, inapp: true  },
                  { label: 'Unusual activity',    email: true,  inapp: true  },
                  { label: 'Weekly summary',      email: true,  inapp: false },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center gap-4 py-2">
                    <div className="flex-1 text-[13px] font-bold text-slate-700">{pref.label}</div>
                    {[{ label: 'Email', val: pref.email }, { label: 'In-app', val: pref.inapp }].map((ch, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center ${ch.val ? 'bg-[#1D1D1F] border-[#1D1D1F]' : 'border-slate-200 bg-white'}`}>
                          {ch.val && <CheckCircle2 size={10} className="text-white" />}
                        </div>
                        <span className="text-[11px] font-medium text-slate-400">{ch.label}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button className="px-5 py-2.5 bg-[#1D1D1F] text-white rounded-2xl font-bold text-xs hover:bg-black transition-all">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── AUDIT LOG ────────────────────────────────────────── */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 pt-8 pb-5 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-[15px] font-bold text-slate-900">Audit Log</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">All user and system actions, overrides, and configuration changes.</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">{AUDIT.length} entries</span>
            </div>
            <div className="divide-y divide-slate-50">
              {AUDIT.map((entry, i) => {
                const Icon = entry.icon;
                return (
                  <div key={i} className="px-8 py-5 flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${entry.color}`}>
                      <Icon size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-[13px] font-bold text-slate-900">{entry.actor}</span>
                        <span className="text-[12px] font-medium text-slate-500">{entry.action}</span>
                      </div>
                      <div className="text-[11px] font-medium text-slate-400 mt-0.5 truncate">{entry.detail}</div>
                    </div>
                    <div className="text-[11px] font-medium text-slate-400 shrink-0 text-right hidden sm:block">{entry.time}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
