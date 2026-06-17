import React, { useState } from 'react';
import { ViewType } from '../types';
import { NavBar } from '../components/NavBar';
import { useReportsData, type DateRangeValue } from '../hooks/useReportsData';
import {
  FileText, Bot, MessageSquare, ShieldAlert, TrendingUp, DollarSign,
  Download, Calendar, Mail, RefreshCw, Loader2, ChevronRight,
  CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight, Link2,
  ExternalLink, BarChart2, Clock, Users, Zap, Star,
} from 'lucide-react';

interface Props {
  setView: (v: ViewType) => void;
  user: { name: string; email: string; role: string } | null;
}

const TABS = [
  { id: 'executive',    label: 'Executive Summary', icon: FileText },
  { id: 'agent',        label: 'Agent Activity',    icon: Bot },
  { id: 'chat',         label: 'Chat Interaction',  icon: MessageSquare },
  { id: 'errors',       label: 'Error & Reliability', icon: ShieldAlert },
  { id: 'growth',       label: 'Usage & Growth',    icon: TrendingUp },
  { id: 'roi',          label: 'ROI Summary',       icon: DollarSign },
];

const DATE_RANGES: { label: string; value: DateRangeValue }[] = [
  { label: 'This Month',   value: 'this-month' },
  { label: 'Last 30 Days', value: 'last-30' },
  { label: 'Last Quarter', value: 'last-quarter' },
  { label: 'Custom',       value: 'custom' },
];

// ─── Micro components ─────────────────────────────────────────────────────────

const SectionCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden ${className}`}>{children}</div>
);

const SectionHeader = ({ title, sub }: { title: string; sub?: string }) => (
  <div className="px-8 pt-8 pb-5 border-b border-slate-50">
    <h2 className="text-[15px] font-bold text-slate-900">{title}</h2>
    {sub && <p className="text-xs text-slate-400 font-medium mt-0.5">{sub}</p>}
  </div>
);

const StatCard = ({ label, value, sub, color, delta }: { label: string; value: string; sub?: string; color?: string; delta?: number }) => (
  <div className="bg-white rounded-[28px] border border-slate-100 p-6 shadow-sm">
    {delta !== undefined && (
      <div className={`flex items-center gap-1 text-[10px] font-bold mb-2 ${delta >= 0 ? 'text-green-600' : 'text-red-500'}`}>
        {delta >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {Math.abs(delta)}{typeof delta === 'number' && !String(delta).includes('.') && delta !== 0 ? '' : ''} vs. prev period
      </div>
    )}
    <div className={`text-3xl font-heading font-bold mb-1 ${color ?? 'text-slate-900'}`}>{value}</div>
    <div className="text-[13px] font-bold text-slate-700 mb-0.5">{label}</div>
    {sub && <div className="text-[11px] font-medium text-slate-400">{sub}</div>}
  </div>
);

const MiniBar = ({ pct, color }: { pct: number; color: string }) => (
  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
    <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
  </div>
);

const DeltaBadge = ({ val, unit = '' }: { val: number; unit?: string }) => (
  <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${val >= 0 ? 'text-green-600' : 'text-red-500'}`}>
    {val >= 0 ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
    {val >= 0 ? '+' : ''}{val}{unit}
  </span>
);

const LangfuseDisconnected = () => (
  <div className="mb-6 flex flex-wrap items-center gap-4 bg-amber-50 border border-amber-200 rounded-[24px] px-6 py-4">
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
        <Link2 size={15} className="text-amber-600" />
      </div>
      <div>
        <div className="text-[13px] font-bold text-amber-900">Langfuse not connected</div>
        <div className="text-[11px] font-medium text-amber-700 mt-0.5">
          Data below is a preview. Set <code className="bg-amber-100 px-1 rounded text-[10px]">LANGFUSE_PUBLIC_KEY</code> and <code className="bg-amber-100 px-1 rounded text-[10px]">LANGFUSE_SECRET_KEY</code> on the server to populate reports with live agent data.
        </div>
      </div>
    </div>
    <a href="https://langfuse.com/docs/get-started" target="_blank" rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 hover:text-amber-900 transition-colors shrink-0">
      Get started <ExternalLink size={11} />
    </a>
  </div>
);

// ─── CSV export helper ────────────────────────────────────────────────────────

function downloadCSV(filename: string, rows: string[][], headers: string[]) {
  const lines = [headers, ...rows].map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','));
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ─── Main page ────────────────────────────────────────────────────────────────

export const ReportsPage = ({ setView, user }: Props) => {
  const [activeTab, setActiveTab]         = useState('executive');
  const [dateRange, setDateRange]         = useState<DateRangeValue>('this-month');
  const [comparison, setComparison]       = useState(false);
  const [hourlyRate, setHourlyRate]       = useState(25);
  const [scheduleEmail, setScheduleEmail] = useState('');
  const [scheduleFreq, setScheduleFreq]   = useState<'weekly' | 'monthly'>('monthly');
  const [scheduleSaved, setScheduleSaved] = useState(false);

  const { connected, loading, error, data, refresh } = useReportsData();
  const { executive, agentActivity, chatInteraction, errorReliability, usageGrowth, roi } = data;

  const roiDollar  = Math.round(roi.hoursSaved * hourlyRate);
  const prevDollar = Math.round(roi.prevPeriodHours * hourlyRate);

  function handleExportCSV() {
    if (activeTab === 'executive') {
      downloadCSV('executive-summary.csv',
        [['Tasks Automated', String(executive.tasksAutomated)], ['Hours Saved', String(executive.timeSavedHours)], ['Success Rate', executive.successRate], ['Cost Efficiency', `${executive.costEfficiencyPct}%`]],
        ['Metric', 'Value']
      );
    } else if (activeTab === 'agent') {
      downloadCSV('agent-activity.csv',
        agentActivity.agents.map(a => [a.name, a.type, String(a.runs), a.completionRate, a.avgDuration, a.topTools.join('; ')]),
        ['Agent', 'Type', 'Runs', 'Completion Rate', 'Avg Duration', 'Top Tools']
      );
    } else if (activeTab === 'roi') {
      downloadCSV('roi-summary.csv',
        [['Hours Saved', String(roi.hoursSaved)], ['Dollar Value Saved', `$${roiDollar}`], ['Tasks Avoided', String(roi.manualTasksAvoided)], ['Hourly Rate Used', `$${hourlyRate}`]],
        ['Metric', 'Value']
      );
    } else {
      downloadCSV('report.csv', [['No CSV export configured for this report type.']], ['Note']);
    }
  }

  function handleSaveSchedule(e: React.FormEvent) {
    e.preventDefault();
    setScheduleSaved(true);
    setTimeout(() => setScheduleSaved(false), 3000);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar setView={setView} user={user} />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-7">
          <button onClick={() => setView('dashboard')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#E61739] transition-colors group">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform"><path d="M15 18l-6-6 6-6"/></svg>
            Dashboard
          </button>
          <span className="text-slate-200 text-xs font-bold">›</span>
          <span className="text-xs font-bold text-slate-700">Reports</span>
        </div>

        {/* Page header */}
        <div className="flex flex-wrap items-start justify-between gap-5 mb-6">
          <div>
            <h1 className="text-2xl font-heading font-bold text-slate-900">Reports</h1>
            <p className="text-slate-500 text-sm font-medium mt-1">Performance reports across all AI programs and interactions.</p>
          </div>

          {/* Controls row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Date range */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-2xl p-1">
              {DATE_RANGES.map(r => (
                <button key={r.value} onClick={() => setDateRange(r.value)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${dateRange === r.value ? 'bg-[#1D1D1F] text-white' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
                  {r.label}
                </button>
              ))}
            </div>

            {/* Comparison toggle */}
            <button onClick={() => setComparison(c => !c)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-bold border transition-all ${comparison ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}>
              <BarChart2 size={13} /> vs. Prev Period
            </button>

            {/* Export */}
            <button onClick={handleExportCSV}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all">
              <Download size={13} /> CSV
            </button>
            <button onClick={() => window.print()}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all">
              <Download size={13} /> PDF
            </button>

            {/* Refresh */}
            <button onClick={refresh} disabled={loading}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-50">
              {loading ? <Loader2 size={13} className="animate-spin" /> : <RefreshCw size={13} />}
            </button>
          </div>
        </div>

        {/* Langfuse banner */}
        {!connected && <LangfuseDisconnected />}

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
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-[28px] text-xs font-bold transition-all whitespace-nowrap ${active ? 'bg-[#1D1D1F] text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
                <Icon size={13} />{tab.label}
              </button>
            );
          })}
        </div>

        {/* ── EXECUTIVE SUMMARY ────────────────────────────────── */}
        {activeTab === 'executive' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard label="Tasks Automated"   value={String(executive.tasksAutomated)} color="text-slate-900"  delta={comparison ? executive.vsPrev.tasksDelta : undefined} sub={dateRange === 'this-month' ? 'This month' : undefined} />
              <StatCard label="Hours Saved"        value={`${executive.timeSavedHours}h`}  color="text-blue-600"   delta={comparison ? executive.vsPrev.timeDelta : undefined}  sub="vs. manual effort" />
              <StatCard label="Success Rate"       value={executive.successRate}            color="text-green-600"  delta={comparison ? executive.vsPrev.successDelta : undefined} sub="tasks completed without error" />
              <StatCard label="Cost Efficiency"    value={`${executive.costEfficiencyPct}%`} color="text-purple-600" sub="savings vs. manual process" />
            </div>

            {/* AI Narrative */}
            <SectionCard>
              <SectionHeader title="AI-Generated Narrative" sub="Plain-English summary suitable for sharing with non-technical stakeholders." />
              <div className="px-8 py-7">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap size={16} className="text-purple-500" />
                  </div>
                  <p className="text-[14px] text-slate-700 font-medium leading-relaxed">{executive.narrative}</p>
                </div>
                <div className="mt-5 pt-5 border-t border-slate-50 flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Generated by</span>
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">Gemini 2.0 Flash</span>
                  <span className="text-[10px] font-medium text-slate-300 ml-auto">Auto-refreshes with each report load</span>
                </div>
              </div>
            </SectionCard>

            {/* Period comparison */}
            {comparison && (
              <SectionCard>
                <SectionHeader title="Period Comparison" sub="Current period vs. previous equivalent period." />
                <div className="px-8 py-7 grid grid-cols-3 gap-6">
                  {[
                    { label: 'Tasks',        curr: executive.tasksAutomated,        prev: executive.tasksAutomated - executive.vsPrev.tasksDelta,        unit: '' },
                    { label: 'Hours Saved',  curr: executive.timeSavedHours,        prev: executive.timeSavedHours - executive.vsPrev.timeDelta,         unit: 'h' },
                    { label: 'Success Rate', curr: parseFloat(executive.successRate), prev: parseFloat(executive.successRate) - executive.vsPrev.successDelta, unit: '%' },
                  ].map((m, i) => (
                    <div key={i}>
                      <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">{m.label}</div>
                      <div className="flex items-end gap-4">
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 mb-1">Current</div>
                          <div className="text-2xl font-heading font-bold text-slate-900">{m.curr}{m.unit}</div>
                        </div>
                        <ChevronRight size={14} className="text-slate-300 mb-1" />
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 mb-1">Previous</div>
                          <div className="text-2xl font-heading font-bold text-slate-400">{Math.round(m.prev * 10) / 10}{m.unit}</div>
                        </div>
                        <div className="mb-1 ml-auto">
                          <DeltaBadge val={Math.round((m.curr - m.prev) * 10) / 10} unit={m.unit} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}
          </div>
        )}

        {/* ── AGENT ACTIVITY ───────────────────────────────────── */}
        {activeTab === 'agent' && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-5">
              <StatCard label="Total Runs"          value={String(agentActivity.totalRuns)}    sub="across all agents" />
              <StatCard label="Avg Completion Rate" value={agentActivity.avgCompletionRate}    color="text-green-600" sub="weighted by run count" />
              <StatCard label="Active Programs"     value={String(agentActivity.agents.length)} color="text-blue-600"  sub="agents with runs this period" />
            </div>

            <SectionCard>
              <SectionHeader title="Breakdown by Agent" sub="Runs, completion rate, and tooling per agent program." />
              <div className="divide-y divide-slate-50">
                {agentActivity.agents.map((a, i) => (
                  <div key={i} className="px-8 py-5">
                    <div className="flex flex-wrap items-start gap-4 mb-3">
                      <div className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 ${a.type === 'Agentic AI' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                        <Bot size={14} className={a.type === 'Agentic AI' ? 'text-purple-600' : 'text-blue-600'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[13px] font-bold text-slate-900">{a.name}</span>
                          <span className={`text-[9px] font-black uppercase tracking-widest border px-2 py-0.5 rounded-full ${a.type === 'Agentic AI' ? 'text-purple-600 bg-purple-50 border-purple-200' : 'text-blue-600 bg-blue-50 border-blue-200'}`}>{a.type}</span>
                        </div>
                        {a.categories.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {a.categories.map((c, j) => <span key={j} className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{c}</span>)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: 'Runs',            val: String(a.runs) },
                        { label: 'Completion Rate', val: a.completionRate },
                        { label: 'Avg Duration',    val: a.avgDuration },
                        { label: 'Top Tools',       val: a.topTools.length > 0 ? a.topTools.join(', ') : '—' },
                      ].map((f, j) => (
                        <div key={j} className="bg-slate-50 rounded-2xl px-4 py-3">
                          <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{f.label}</div>
                          <div className="text-[12px] font-bold text-slate-700 truncate">{f.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* ── CHAT INTERACTION ─────────────────────────────────── */}
        {activeTab === 'chat' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard label="Total Sessions"   value={String(chatInteraction.totalSessions)} sub="this period" />
              <StatCard label="Avg Session Length" value={chatInteraction.avgSessionLength}   color="text-blue-600" />
              <StatCard label="Escalation Rate"  value={chatInteraction.escalationRate}       color="text-amber-600" sub="escalated to a human" />
              <StatCard label="Resolution Rate"  value={chatInteraction.resolutionRate}       color="text-green-600" sub="resolved without escalation" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top topics */}
              <SectionCard>
                <SectionHeader title="Most Common Topics" sub="What clients are asking about most often." />
                <div className="px-8 py-6 space-y-4">
                  {chatInteraction.topTopics.map((t, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[12px] font-bold text-slate-700">{t.topic}</span>
                        <span className="text-[11px] font-bold text-slate-400">{t.count} · {t.pct}%</span>
                      </div>
                      <MiniBar pct={t.pct} color="bg-blue-400" />
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Additional stats */}
              <div className="space-y-5">
                <SectionCard>
                  <div className="px-8 py-6 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                      <MessageSquare size={22} className="text-slate-400" />
                    </div>
                    <div>
                      <div className="text-3xl font-heading font-bold text-slate-900">{chatInteraction.totalMessages}</div>
                      <div className="text-[13px] font-bold text-slate-600 mt-0.5">Total messages exchanged</div>
                      <div className="text-[11px] text-slate-400 font-medium">across all sessions this period</div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard>
                  <div className="px-8 py-6 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
                      <Star size={22} className="text-amber-500" />
                    </div>
                    <div>
                      {chatInteraction.csatScore !== null ? (
                        <>
                          <div className="text-3xl font-heading font-bold text-amber-600">{chatInteraction.csatScore} <span className="text-lg text-slate-400">/ 5</span></div>
                          <div className="text-[13px] font-bold text-slate-600 mt-0.5">CSAT Score</div>
                          <div className="text-[11px] text-slate-400 font-medium">average client satisfaction rating</div>
                        </>
                      ) : (
                        <>
                          <div className="text-[13px] font-bold text-slate-600">CSAT Score</div>
                          <div className="text-[11px] text-slate-400 font-medium mt-1">Not yet collected — configure feedback collection in Settings to enable this metric.</div>
                        </>
                      )}
                    </div>
                  </div>
                </SectionCard>
              </div>
            </div>
          </div>
        )}

        {/* ── ERROR & RELIABILITY ──────────────────────────────── */}
        {activeTab === 'errors' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard label="Total Errors"           value={String(errorReliability.totalErrors)}         color="text-red-600" sub="this period" />
              <StatCard label="Error Rate"             value={errorReliability.errorRate}                   color="text-amber-600" sub="of all task runs" />
              <StatCard label="Avg Time to Resolution" value={`${errorReliability.avgTimeToResolutionMins}m`} color="text-blue-600" sub="from detection to fix" />
              <StatCard label="Uptime"                 value={errorReliability.uptimePct}                   color="text-green-600" sub="of scheduled runs completed" />
            </div>

            <SectionCard>
              <SectionHeader title="Most Common Failure Types" sub="Plain-language descriptions of what went wrong and why." />
              <div className="divide-y divide-slate-50">
                {errorReliability.failureTypes.map((f, i) => (
                  <div key={i} className="px-8 py-6 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle size={14} className="text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <span className="text-[13px] font-bold text-slate-900">{f.type}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-500 border border-red-200 px-2.5 py-0.5 rounded-full">{f.count} occurrence{f.count !== 1 ? 's' : ''}</span>
                      </div>
                      <p className="text-[12px] font-medium text-slate-500 leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                ))}
                {errorReliability.failureTypes.length === 0 && (
                  <div className="px-8 py-10 text-center">
                    <CheckCircle2 size={28} className="text-green-400 mx-auto mb-3" />
                    <div className="text-[13px] font-bold text-slate-600">No errors this period</div>
                    <div className="text-[11px] font-medium text-slate-400 mt-1">All task runs completed without failures.</div>
                  </div>
                )}
              </div>
            </SectionCard>
          </div>
        )}

        {/* ── USAGE & GROWTH ───────────────────────────────────── */}
        {activeTab === 'growth' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard label="Task MoM Growth"    value={`+${usageGrowth.momTaskGrowthPct}%`}    color="text-green-600"  sub="vs. previous month" />
              <StatCard label="Session MoM Growth" value={`+${usageGrowth.momSessionGrowthPct}%`} color="text-blue-600"   sub="vs. previous month" />
              <StatCard label="User Adoption"      value={`${usageGrowth.userAdoptionPct}%`}       color="text-purple-600" sub="of team seats active" />
              <StatCard label="Peak Usage Days"    value={String(usageGrowth.peakPeriods.length)}  sub="recurring high-volume windows" />
            </div>

            {/* Plan utilization */}
            <SectionCard>
              <SectionHeader title="Plan Utilization" sub="How much of your current plan quota has been used this period." />
              <div className="px-8 py-7 space-y-5">
                {([
                  { label: 'Task Runs',     vals: usageGrowth.planUtilization.runs,     color: 'bg-blue-400',   unit: 'runs' },
                  { label: 'Chat Sessions', vals: usageGrowth.planUtilization.sessions, color: 'bg-purple-400', unit: 'sessions' },
                  { label: 'AI Credits',   vals: usageGrowth.planUtilization.credits,  color: 'bg-amber-400',  unit: 'credits' },
                ] as const).map((m, i) => {
                  const pct = Math.round((m.vals[0] / Math.max(m.vals[1], 1)) * 100);
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-bold text-slate-700">{m.label}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-medium text-slate-400">{m.vals[0].toLocaleString()} / {m.vals[1].toLocaleString()} {m.unit}</span>
                          <span className={`text-[12px] font-bold ${pct >= 80 ? 'text-[#E61739]' : 'text-slate-600'}`}>{pct}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${m.color}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            {/* Peak periods */}
            <SectionCard>
              <SectionHeader title="Peak Usage Windows" sub="Recurring periods of highest agent activity." />
              <div className="px-8 py-6 flex flex-wrap gap-3">
                {usageGrowth.peakPeriods.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
                    <Clock size={13} className="text-blue-500" />
                    <span className="text-[12px] font-bold text-blue-700">{p}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* ── ROI SUMMARY ──────────────────────────────────────── */}
        {activeTab === 'roi' && (
          <div className="space-y-6">
            {/* Hourly rate input */}
            <div className="bg-white rounded-[30px] border border-slate-100 shadow-sm px-8 py-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
                  <DollarSign size={15} className="text-green-600" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-slate-800">Hourly Rate for Savings Estimate</div>
                  <div className="text-[11px] font-medium text-slate-400 mt-0.5">Used to calculate the dollar value of time saved. Adjust to match your team's blended rate.</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-slate-500">$</span>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={hourlyRate}
                  onChange={e => setHourlyRate(Math.max(1, Number(e.target.value)))}
                  className="w-20 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-2 focus:ring-[#E61739]/10 transition-all text-center"
                />
                <span className="text-[13px] font-bold text-slate-500">/ hr</span>
              </div>
            </div>

            {/* ROI stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard label="Hours Saved"           value={`${roi.hoursSaved}h`}                   color="text-blue-600"   delta={comparison ? +(roi.hoursSaved - roi.prevPeriodHours).toFixed(1) : undefined} />
              <StatCard label="Dollar Value Saved"    value={`$${roiDollar.toLocaleString()}`}        color="text-green-600"  delta={comparison ? +(roiDollar - prevDollar) : undefined} />
              <StatCard label="Manual Tasks Avoided"  value={String(roi.manualTasksAvoided)}          color="text-purple-600" sub="would have required human effort" />
              <StatCard label="Avg Task Duration"     value={`${roi.avgTaskMins.toFixed(0)}m`}        sub="per automated run" />
            </div>

            {/* ROI breakdown */}
            <SectionCard>
              <SectionHeader title="How This is Calculated" sub="Transparent methodology so you can validate and share the numbers." />
              <div className="px-8 py-7 space-y-4">
                {[
                  { step: '1', label: 'Total task runs this period', val: `${roi.manualTasksAvoided} runs` },
                  { step: '2', label: 'Avg task duration (measured from agent latency)', val: `${roi.avgTaskMins.toFixed(1)} min` },
                  { step: '3', label: 'Total time saved', val: `${roi.manualTasksAvoided} × ${roi.avgTaskMins.toFixed(1)}min ÷ 60 = ${roi.hoursSaved}h` },
                  { step: '4', label: 'Dollar value at configured hourly rate', val: `${roi.hoursSaved}h × $${hourlyRate}/hr = $${roiDollar.toLocaleString()}` },
                ].map((row, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-[10px] font-black text-slate-500 mt-0.5">{row.step}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-bold text-slate-600">{row.label}</div>
                      <div className="text-[13px] font-bold text-slate-900 mt-0.5">{row.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Prev period comparison */}
            {comparison && (
              <SectionCard>
                <SectionHeader title="Period Comparison" />
                <div className="px-8 py-7 grid grid-cols-2 gap-6">
                  {[
                    { label: 'Hours Saved',   curr: roi.hoursSaved, prev: roi.prevPeriodHours, unit: 'h' },
                    { label: 'Dollar Value',  curr: roiDollar,      prev: prevDollar,           unit: '$', prefix: true },
                  ].map((m, i) => (
                    <div key={i}>
                      <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3">{m.label}</div>
                      <div className="flex items-end gap-5">
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 mb-1">Current</div>
                          <div className="text-2xl font-heading font-bold text-slate-900">{m.prefix ? '$' : ''}{typeof m.curr === 'number' ? m.curr.toLocaleString() : m.curr}{!m.prefix ? m.unit : ''}</div>
                        </div>
                        <ChevronRight size={14} className="text-slate-300 mb-1" />
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 mb-1">Previous</div>
                          <div className="text-2xl font-heading font-bold text-slate-400">{m.prefix ? '$' : ''}{typeof m.prev === 'number' ? m.prev.toLocaleString() : m.prev}{!m.prefix ? m.unit : ''}</div>
                        </div>
                        <div className="mb-1">
                          <DeltaBadge val={+(m.curr - m.prev).toFixed(1)} unit={m.prefix ? '' : m.unit} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}
          </div>
        )}

        {/* ── SCHEDULED DELIVERY ────────── always visible footer ── */}
        <div className="mt-10 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-8 pt-8 pb-5 border-b border-slate-50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-2xl bg-[#ad1457]/10 flex items-center justify-center">
              <Mail size={15} className="text-[#E61739]" />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-slate-900">Scheduled Delivery</h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Receive this report automatically by email on a set schedule.</p>
            </div>
          </div>
          <form onSubmit={handleSaveSchedule} className="px-8 py-7">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px] space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Delivery Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={scheduleEmail}
                  onChange={e => setScheduleEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-2 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Frequency</label>
                <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
                  {(['weekly', 'monthly'] as const).map(f => (
                    <button key={f} type="button" onClick={() => setScheduleFreq(f)}
                      className={`px-4 py-2 rounded-lg text-[11px] font-bold capitalize transition-all ${scheduleFreq === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Report Types</label>
                <div className="flex gap-2 flex-wrap">
                  {['Executive', 'ROI', 'Errors'].map(r => (
                    <label key={r} className="flex items-center gap-1.5 cursor-pointer">
                      <div className="w-4 h-4 rounded-md border-2 border-slate-300 bg-white flex items-center justify-center">
                        <CheckCircle2 size={10} className="text-slate-400" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">{r}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-[#1D1D1F] text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">
                {scheduleSaved ? <><CheckCircle2 size={15} /> Saved</> : <><Calendar size={15} /> Schedule</>}
              </button>
            </div>
          </form>
        </div>

      </main>
    </div>
  );
};
