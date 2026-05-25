import React, { useState } from 'react';
import { ViewType } from '../types';
import { NavBar } from '../components/NavBar';
import { useLangfuseData, type UITask, type UISession, type UIAlert, type UIAuditEntry } from '../hooks/useLangfuseData';
import {
  Bot, MessageSquare, ListChecks, Gauge, Bell, ScrollText,
  CheckCircle2, XCircle, AlertTriangle, ChevronRight, Eye,
  Activity, User, Shield, RefreshCw, Settings, Play,
  Link2, ExternalLink, Loader2,
} from 'lucide-react';

interface Props {
  setView: (v: ViewType) => void;
  user: { name: string; email: string; role: string } | null;
}

const TABS = [
  { id: 'overview',  label: 'Overview',       icon: Bot },
  { id: 'sessions',  label: 'Chat Sessions',  icon: MessageSquare },
  { id: 'tasks',     label: 'Task Runs',      icon: ListChecks },
  { id: 'usage',     label: 'Usage & Limits', icon: Gauge },
  { id: 'alerts',    label: 'Alerts',         icon: Bell },
  { id: 'audit',     label: 'Audit Log',      icon: ScrollText },
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

const AUDIT_ICONS: Record<string, React.ComponentType<any>> = {
  'play': Play, 'x-circle': XCircle, 'user': User,
  'settings': Settings, 'check': CheckCircle2, 'refresh': RefreshCw, 'shield': Shield,
};

const AUDIT_COLORS: Record<string, string> = {
  blue: 'text-blue-500 bg-blue-50', red: 'text-red-500 bg-red-50',
  amber: 'text-amber-500 bg-amber-50', purple: 'text-purple-500 bg-purple-50',
  green: 'text-green-600 bg-green-50', slate: 'text-slate-500 bg-slate-100',
  indigo: 'text-indigo-500 bg-indigo-50',
};

// ─── Reusable sub-components ──────────────────────────────────────────────────

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

/** Amber banner shown when Langfuse is not yet connected. */
const LangfuseDisconnected = () => (
  <div className="mb-6 flex flex-wrap items-center gap-4 bg-amber-50 border border-amber-200 rounded-[24px] px-6 py-4">
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
        <Link2 size={15} className="text-amber-600" />
      </div>
      <div>
        <div className="text-[13px] font-bold text-amber-900">Langfuse not connected</div>
        <div className="text-[11px] font-medium text-amber-700 mt-0.5">
          Data below is a preview. Set <code className="bg-amber-100 px-1 rounded text-[10px]">LANGFUSE_PUBLIC_KEY</code> and <code className="bg-amber-100 px-1 rounded text-[10px]">LANGFUSE_SECRET_KEY</code> on the server to activate live observability.
        </div>
      </div>
    </div>
    <a
      href="https://langfuse.com/docs/get-started"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 hover:text-amber-900 transition-colors shrink-0"
    >
      Get started <ExternalLink size={11} />
    </a>
  </div>
);

/** Green pill shown in the page header when Langfuse is connected. */
const LangfuseConnected = ({ projectName, host }: { projectName?: string; host?: string }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
    <span className="text-[11px] font-bold text-green-700">
      Langfuse{projectName ? ` · ${projectName}` : ''}
    </span>
    {host && host !== 'https://cloud.langfuse.com' && (
      <span className="text-[10px] text-green-500 font-medium">{host}</span>
    )}
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────

export const AgentsPage = ({ setView, user }: Props) => {
  const [activeTab, setActiveTab]     = useState('overview');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const { connected, status, loading, error, sessions, tasks, alerts, audit, metrics, refresh } = useLangfuseData();

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
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-heading font-bold text-slate-900">Agentic AI Programs</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Monitor your AI agents, chat sessions, task runs, usage, and activity.</p>
          </div>
          <div className="flex items-center gap-3">
            {connected && status && <LangfuseConnected projectName={status.projectName} host={status.host} />}
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
              Refresh
            </button>
          </div>
        </div>

        {/* Langfuse connection banner (shown only when not connected) */}
        {!connected && <LangfuseDisconnected />}

        {/* Error state */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-sm font-medium text-red-700">
            <XCircle size={15} className="shrink-0" /> {error}
          </div>
        )}

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
              <StatCard label="Total Runs This Month"  value={metrics.totalRunsMonth.toLocaleString()} sub={connected ? 'Live from Langfuse' : '↑ 18 vs. last month'}        color="text-slate-900" />
              <StatCard label="Active Agents Right Now" value={String(metrics.activeAgents)}            sub={connected ? 'Traces without endTime' : 'SLA Checker · CRM Sync'} color="text-blue-600" />
              <StatCard label="Success Rate"            value={metrics.successRate}                     sub={connected ? 'Computed from trace levels' : '4 failures in 30 days'} color="text-green-600" />
              <StatCard label="Tasks Automated"         value={metrics.tasksAutomated.toLocaleString()} sub={connected ? 'Total traces ingested' : 'Hours of manual work saved'} color="text-purple-600" />
            </div>

            {/* Agent roster */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-8 pt-8 pb-4 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h2 className="text-[15px] font-bold text-slate-900">Active Programs</h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Agents currently running or on standby.</p>
                </div>
                {!connected && <span className="text-[9px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-1 rounded-full">Preview</span>}
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  { name: 'SLA Breach Checker',        type: 'Agentic AI',      schedule: 'Every 4 hrs',  lastRun: 'May 25, 2026 · 08:00', status: 'running',   runs: 38, rate: '97%' },
                  { name: 'CRM Contact Sync',           type: 'Agentic AI',      schedule: 'On event',     lastRun: 'May 24, 2026 · 15:12', status: 'active',    runs: 61, rate: '100%' },
                  { name: 'Monthly Invoice Summary',    type: 'Agentic AI',      schedule: '1st of month', lastRun: 'May 1, 2026 · 00:00',  status: 'ended',     runs: 5,  rate: '100%' },
                  { name: 'Candidate Pipeline Digest',  type: 'Human Oversight', schedule: 'Daily 07:00',  lastRun: 'May 25, 2026 · 07:01', status: 'failed',    runs: 29, rate: '89%' },
                  { name: 'Onboarding Doc Generator',   type: 'Human Oversight', schedule: 'On demand',    lastRun: '—',                    status: 'queued',    runs: 3,  rate: '100%' },
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

            {/* Langfuse SDK hint — shown only when connected */}
            {connected && (
              <div className="bg-white rounded-[30px] border border-slate-100 shadow-sm p-6 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-purple-600" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-slate-800 mb-1">Populate the agent roster</div>
                  <p className="text-[12px] font-medium text-slate-500 leading-relaxed">
                    Tag traces with <code className="bg-slate-100 px-1 rounded text-[10px]">metadata.agentName</code> and <code className="bg-slate-100 px-1 rounded text-[10px]">metadata.agentType</code> in your Langfuse SDK calls to show individual program cards here.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── CHAT SESSIONS ────────────────────────────────────── */}
        {activeTab === 'sessions' && (
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 pt-8 pb-5 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-[15px] font-bold text-slate-900">Chat Sessions</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {connected ? 'Live from Langfuse sessions API.' : 'Preview data — connect Langfuse to see real sessions.'}
                </p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">{sessions.length} sessions</span>
            </div>
            <div className="divide-y divide-slate-50">
              {sessions.map((s, i) => (
                <div key={i} className="px-8 py-6">
                  <div className="flex flex-wrap items-start gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-black text-slate-400 tracking-wider">{s.id}</span>
                        {s.langfuseSessionId && (
                          <span className="text-[9px] font-bold text-purple-500 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">Langfuse</span>
                        )}
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
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {connected ? 'Sourced from Langfuse traces.' : 'Preview data — each row will map to a Langfuse trace.'}
                </p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">{tasks.length} tasks</span>
            </div>
            <div className="divide-y divide-slate-50">
              {tasks.map((t, i) => {
                const open = expandedTask === t.id;
                return (
                  <div key={i} className="px-8 py-5">
                    <button className="w-full text-left" onClick={() => setExpandedTask(open ? null : t.id)}>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[13px] font-bold text-slate-900">{t.name}</span>
                            {t.traceId && <span className="text-[9px] font-bold text-purple-500 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">Langfuse</span>}
                            <StatusBadge status={t.status} />
                          </div>
                          <div className="text-[11px] font-medium text-slate-400 mt-1">{t.trigger}</div>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                          <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${t.status === 'failed' ? 'bg-red-400' : t.status === 'running' ? 'bg-blue-400' : 'bg-green-400'}`}
                              style={{ width: `${(t.steps[0] / Math.max(t.steps[1], 1)) * 100}%` }}
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
                        {t.desc && <p className="text-[12px] font-medium text-slate-500">{t.desc}</p>}

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

                        {t.latencyMs != null && (
                          <div className="flex flex-wrap gap-3">
                            <div className="bg-slate-50 rounded-2xl px-4 py-3 text-[11px]">
                              <div className="font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-1">Latency</div>
                              <div className="font-bold text-slate-700">{t.latencyMs < 1000 ? `${t.latencyMs}ms` : `${(t.latencyMs / 1000).toFixed(1)}s`}</div>
                            </div>
                            {t.costUsd != null && t.costUsd > 0 && (
                              <div className="bg-slate-50 rounded-2xl px-4 py-3 text-[11px]">
                                <div className="font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-1">Cost</div>
                                <div className="font-bold text-slate-700">${t.costUsd.toFixed(4)}</div>
                              </div>
                            )}
                          </div>
                        )}

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

                        {t.traceId && (
                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-[10px] font-bold text-slate-400">Trace ID:</span>
                            <code className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-lg">{t.traceId}</code>
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
              <StatCard label="Estimated Cost This Period" value={`$${metrics.costUsd.toFixed(2)}`}                         sub={connected ? 'Aggregated from Langfuse daily metrics' : 'Based on your Pro plan usage'} color="text-slate-900" />
              <StatCard label="Runs Used"                  value={`${metrics.runsUsed} / ${metrics.runsLimit}`}             sub="Resets 1st of next month"  color="text-blue-600" />
              <StatCard label="Sessions Used"              value={`${metrics.sessionsUsed} / ${metrics.sessionsLimit}`}     sub="Chat sessions this month"  color="text-purple-600" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <UsageBar label="Task Runs"     used={metrics.runsUsed}     total={metrics.runsLimit}     unit="runs"     color="bg-blue-400" />
              <UsageBar label="Chat Sessions" used={metrics.sessionsUsed} total={metrics.sessionsLimit} unit="sessions" color="bg-purple-400" />
              <UsageBar label="AI Processing" used={metrics.creditsUsed}  total={metrics.creditsLimit}  unit="credits"  color="bg-amber-400" />
              <UsageBar label="Integrations"  used={3}                    total={10}                    unit="connected" color="bg-green-400" />
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
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {connected ? 'Derived from failed and long-running Langfuse traces.' : 'Preview data — will auto-populate from trace errors when connected.'}
                </p>
              </div>
              <div className="divide-y divide-slate-50">
                {alerts.map((a, i) => {
                  const cfg: Record<string, string> = {
                    error: 'text-red-500 bg-red-50', warning: 'text-amber-500 bg-amber-50',
                    info: 'text-blue-500 bg-blue-50', success: 'text-green-600 bg-green-50',
                  };
                  const IconMap = { error: XCircle, warning: AlertTriangle, info: Activity, success: CheckCircle2 };
                  const Icon = IconMap[a.type] ?? Activity;
                  return (
                    <div key={i} className="px-8 py-6 flex items-start gap-4">
                      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${cfg[a.type]}`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold text-slate-900 mb-1">{a.title}</div>
                        <p className="text-[12px] font-medium text-slate-500 leading-relaxed">{a.desc}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[11px] font-medium text-slate-400">{a.time}</span>
                          {a.traceId && <code className="text-[10px] font-bold text-purple-500 bg-purple-50 px-2 py-0.5 rounded-lg">{a.traceId}</code>}
                        </div>
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
                  { label: 'Task failures',      email: true,  inapp: true  },
                  { label: 'Long-running tasks', email: false, inapp: true  },
                  { label: 'Unusual activity',   email: true,  inapp: true  },
                  { label: 'Weekly summary',     email: true,  inapp: false },
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
              <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full">{audit.length} entries</span>
            </div>
            <div className="divide-y divide-slate-50">
              {audit.map((entry, i) => {
                const Icon = AUDIT_ICONS[entry.iconKey] ?? Settings;
                const colorCls = AUDIT_COLORS[entry.colorKey] ?? 'text-slate-500 bg-slate-100';
                return (
                  <div key={i} className="px-8 py-5 flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${colorCls}`}>
                      <Icon size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-[13px] font-bold text-slate-900">{entry.actor}</span>
                        <span className="text-[12px] font-medium text-slate-500">{entry.action}</span>
                      </div>
                      <div className="text-[11px] font-medium text-slate-400 mt-0.5 truncate">{entry.detail}</div>
                      {entry.traceId && <code className="text-[10px] font-bold text-purple-500 bg-purple-50 px-2 py-0.5 rounded-lg mt-1 inline-block">{entry.traceId}</code>}
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
