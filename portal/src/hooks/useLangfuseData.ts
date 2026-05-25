/**
 * useLangfuseData — React hook that powers the Agents page.
 *
 * When LANGFUSE_PUBLIC_KEY + LANGFUSE_SECRET_KEY are set on the server:
 *   → fetches real traces, sessions, and metrics from Langfuse
 *   → adapts them into the UI types the page consumes
 *
 * When credentials are absent (not yet configured):
 *   → connected = false
 *   → returns the MOCK_* constants below as preview data
 *   → the page shows an "amber" connection banner
 */

import { useState, useEffect, useCallback } from 'react';
import {
  langfuseClient,
  fmtLatency,
  fmtTimestamp,
  levelToStatus,
  type LangfuseTrace,
  type LangfuseSession,
  type LangfuseStatus,
  type LangfuseDaily,
  type KDCITraceMetadata,
} from '../lib/langfuse';

// ─── UI types (what the page renders) ────────────────────────────────────────

export interface UISession {
  id: string;
  date: string;
  duration: string;
  user: string;
  messages: number;
  model: string;
  status: string;
  summary: string;
  langfuseSessionId?: string;  // links back to Langfuse session
}

export interface UITask {
  id: string;
  name: string;
  desc: string;
  trigger: string;
  status: string;
  start: string;
  end: string;
  steps: [number, number];
  tools: string[];
  result: string;
  error?: string;
  traceId?: string;  // links back to Langfuse trace
  latencyMs?: number;
  costUsd?: number;
}

export interface UIAlert {
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  desc: string;
  time: string;
  traceId?: string;
}

export interface UIAuditEntry {
  actor: string;
  action: string;
  detail: string;
  time: string;
  iconKey: 'play' | 'x-circle' | 'user' | 'settings' | 'check' | 'refresh' | 'shield';
  colorKey: 'blue' | 'red' | 'amber' | 'purple' | 'green' | 'slate' | 'indigo';
  traceId?: string;
}

export interface UIMetrics {
  totalRunsMonth: number;
  activeAgents: number;
  successRate: string;
  tasksAutomated: number;
  runsUsed: number;
  runsLimit: number;
  sessionsUsed: number;
  sessionsLimit: number;
  creditsUsed: number;
  creditsLimit: number;
  costUsd: number;
}

export interface LangfuseDataResult {
  connected: boolean;
  status: LangfuseStatus | null;
  loading: boolean;
  error: string | null;
  sessions: UISession[];
  tasks: UITask[];
  alerts: UIAlert[];
  audit: UIAuditEntry[];
  metrics: UIMetrics;
  refresh: () => void;
}

// ─── Mock preview data ────────────────────────────────────────────────────────
// Matches the UI types exactly. Replaced by real Langfuse data once connected.

const MOCK_SESSIONS: UISession[] = [
  { id: 'SES-0041', date: 'May 25, 2026 · 09:14', duration: '6m 32s',  user: 'Aedan Reyes',  messages: 18, model: 'Gemini 2.0 Flash', status: 'ended',    summary: 'Customer asked about invoice discrepancies and payment timelines.' },
  { id: 'SES-0040', date: 'May 25, 2026 · 07:02', duration: '2m 11s',  user: 'Aedan Reyes',  messages: 6,  model: 'Gemini 2.0 Flash', status: 'escalated', summary: 'Billing dispute escalated to human agent after 3 failed clarification attempts.' },
  { id: 'SES-0039', date: 'May 24, 2026 · 16:48', duration: '11m 05s', user: 'Maria Santos', messages: 31, model: 'Gemini 2.5 Pro',   status: 'ended',    summary: 'Onboarding walkthrough for new staff augmentation SLA terms.' },
  { id: 'SES-0038', date: 'May 24, 2026 · 14:22', duration: '—',       user: 'Aedan Reyes',  messages: 4,  model: 'Gemini 2.0 Flash', status: 'active',   summary: 'Reviewing agent task logs and performance metrics.' },
  { id: 'SES-0037', date: 'May 23, 2026 · 11:37', duration: '4m 50s',  user: 'Maria Santos', messages: 12, model: 'Gemini 2.0 Flash', status: 'ended',    summary: 'FAQ query about data residency and GDPR compliance.' },
];

const MOCK_TASKS: UITask[] = [
  { id: 'TSK-0118', name: 'Monthly Invoice Summary',   desc: 'Compile and email invoice summaries for all active contracts.',       trigger: 'Schedule · 1st of month',  status: 'completed', start: 'May 1, 2026 · 00:00',  end: 'May 1, 2026 · 00:03',  steps: [5, 5], tools: ['Sent email', 'Generated PDF'], result: 'Invoice summary sent to 3 recipients.' },
  { id: 'TSK-0117', name: 'CRM Contact Sync',          desc: 'Push updated client records to HubSpot.',                            trigger: 'Event · form submission',  status: 'completed', start: 'May 24, 2026 · 15:12', end: 'May 24, 2026 · 15:12', steps: [3, 3], tools: ['Updated CRM'],             result: '2 contact records updated.' },
  { id: 'TSK-0116', name: 'SLA Breach Checker',        desc: 'Scan open tickets and flag any approaching SLA thresholds.',         trigger: 'Schedule · every 4 hrs',   status: 'running',   start: 'May 25, 2026 · 08:00', end: '—',                    steps: [2, 4], tools: ['Read tickets'],            result: '—' },
  { id: 'TSK-0115', name: 'Candidate Pipeline Digest', desc: 'Summarise new applicants and score against role criteria.',          trigger: 'Schedule · daily 07:00',   status: 'failed',    start: 'May 25, 2026 · 07:00', end: 'May 25, 2026 · 07:01', steps: [1, 5], tools: [],                          result: '', error: 'Could not connect to the recruitment database. It may be temporarily offline — no data was lost.' },
  { id: 'TSK-0114', name: 'Weekly KPI Report',         desc: 'Aggregate KPIs and post to the client dashboard.',                   trigger: 'Schedule · Mon 06:00',     status: 'completed', start: 'May 19, 2026 · 06:00', end: 'May 19, 2026 · 06:04', steps: [6, 6], tools: ['Generated PDF', 'Sent email'], result: 'KPI report delivered to 5 stakeholders.' },
  { id: 'TSK-0113', name: 'Onboarding Doc Generator',  desc: 'Create onboarding pack for newly signed contracts.',                 trigger: 'User · Aedan Reyes',       status: 'queued',    start: '—',                    end: '—',                    steps: [0, 4], tools: [],                          result: '' },
];

const MOCK_ALERTS: UIAlert[] = [
  { type: 'error',   title: 'Task failed: Candidate Pipeline Digest',  desc: 'Recruitment database was unreachable at 07:00. The task will retry at the next scheduled run.',  time: 'May 25, 2026 · 07:01' },
  { type: 'warning', title: 'Long-running task: SLA Breach Checker',   desc: 'This task has been running for 2+ hours. Expected completion is under 10 minutes.',               time: 'May 25, 2026 · 10:03' },
  { type: 'info',    title: 'Unusual spike in chat sessions',           desc: '12 sessions opened in the last hour, compared to an average of 3. No errors detected.',           time: 'May 25, 2026 · 09:55' },
  { type: 'success', title: 'Monthly Invoice Summary completed',        desc: 'All 3 recipients received their invoice summaries. No issues reported.',                           time: 'May 1, 2026 · 00:03' },
];

const MOCK_AUDIT: UIAuditEntry[] = [
  { actor: 'Aedan Reyes',  action: 'Triggered task manually',      detail: 'Onboarding Doc Generator · TSK-0113',                       time: 'May 25, 2026 · 10:41', iconKey: 'play',    colorKey: 'blue'   },
  { actor: 'System',       action: 'Task failed',                   detail: 'Candidate Pipeline Digest · TSK-0115',                      time: 'May 25, 2026 · 07:01', iconKey: 'x-circle',colorKey: 'red'    },
  { actor: 'Maria Santos', action: 'Escalated chat to human',       detail: 'Session SES-0040',                                          time: 'May 25, 2026 · 07:06', iconKey: 'user',    colorKey: 'amber'  },
  { actor: 'Aedan Reyes',  action: 'Updated agent configuration',   detail: 'SLA Breach Checker · check interval changed to 4 hrs',      time: 'May 24, 2026 · 17:30', iconKey: 'settings',colorKey: 'purple' },
  { actor: 'System',       action: 'Task completed',                 detail: 'CRM Contact Sync · TSK-0117',                               time: 'May 24, 2026 · 15:12', iconKey: 'check',   colorKey: 'green'  },
  { actor: 'System',       action: 'Agent auto-resumed',             detail: 'SLA Breach Checker restarted after idle timeout',           time: 'May 24, 2026 · 08:01', iconKey: 'refresh', colorKey: 'slate'  },
  { actor: 'Aedan Reyes',  action: 'Human override applied',         detail: 'Overrode agent decision on billing dispute (SES-0040)',     time: 'May 25, 2026 · 07:08', iconKey: 'shield',  colorKey: 'indigo' },
];

const MOCK_METRICS: UIMetrics = {
  totalRunsMonth: 142,
  activeAgents: 2,
  successRate: '96.5%',
  tasksAutomated: 1204,
  runsUsed: 142,
  runsLimit: 500,
  sessionsUsed: 41,
  sessionsLimit: 200,
  creditsUsed: 68,
  creditsLimit: 100,
  costUsd: 42.80,
};

// ─── Adapters: Langfuse → UI types ───────────────────────────────────────────

function adaptTrace(t: LangfuseTrace, idx: number): UITask {
  const meta = (t.metadata ?? {}) as KDCITraceMetadata;
  const status = levelToStatus(t.level, t.endTime as string | null);
  const obsCount = t.observations.length;
  return {
    id:       t.id.slice(0, 8).toUpperCase(),
    name:     meta.agentName ?? t.name ?? `Trace ${idx + 1}`,
    desc:     meta.summary ?? '',
    trigger:  meta.triggeredBy ?? (t.userId ? `User · ${t.userId}` : 'System'),
    status,
    start:    fmtTimestamp(t.timestamp),
    end:      t.level !== 'DEFAULT' || obsCount > 0 ? fmtTimestamp((t as any).endTime) : '—',
    steps:    [obsCount, obsCount] as [number, number],
    tools:    meta.toolsUsed ?? [],
    result:   typeof t.output === 'string' ? t.output : (t.output ? JSON.stringify(t.output) : ''),
    error:    t.statusMessage ?? undefined,
    traceId:  t.id,
    latencyMs: t.latency,
    costUsd:  t.totalCost,
  };
}

function adaptSession(s: LangfuseSession, idx: number): UISession {
  const firstTrace = s.traces[0];
  const meta = (firstTrace?.metadata ?? {}) as KDCITraceMetadata;
  const lastTrace = s.traces[s.traces.length - 1];
  const totalMs   = s.traces.reduce((acc, t) => acc + (t.latency ?? 0), 0);
  const escalated = s.traces.some(t => (t.metadata as KDCITraceMetadata)?.escalated);
  const status    = escalated ? 'escalated' : (firstTrace?.level === 'ERROR' ? 'ended' : 'ended');
  const genObs    = s.traces.flatMap(t => t.observations);
  const models    = s.traces.flatMap(t => (t as any).modelId ? [(t as any).modelId] : []);

  return {
    id:               s.id.slice(0, 10).toUpperCase(),
    date:             fmtTimestamp(s.createdAt),
    duration:         fmtLatency(totalMs),
    user:             firstTrace?.userId ?? 'Unknown',
    messages:         genObs.length || s.traces.length,
    model:            models[0] ?? 'Gemini 2.0 Flash',
    status,
    summary:          meta.summary ?? (firstTrace?.name ?? 'No summary available.'),
    langfuseSessionId: s.id,
  };
}

function derivedAlerts(tasks: UITask[]): UIAlert[] {
  const alerts: UIAlert[] = [];
  tasks.forEach(t => {
    if (t.status === 'failed') {
      alerts.push({ type: 'error', title: `Task failed: ${t.name}`, desc: t.error ?? 'This task did not complete successfully.', time: t.end, traceId: t.traceId });
    }
    if (t.status === 'running' && t.latencyMs && t.latencyMs > 120_000) {
      alerts.push({ type: 'warning', title: `Long-running task: ${t.name}`, desc: `This task has been running for ${fmtLatency(t.latencyMs)}, which is above the expected threshold.`, time: t.start, traceId: t.traceId });
    }
  });
  return alerts;
}

function computeMetrics(traces: LangfuseTrace[], daily: LangfuseDaily[]): UIMetrics {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const monthTraces = traces.filter(t => new Date(t.timestamp).getTime() >= monthStart);
  const failed = monthTraces.filter(t => t.level === 'ERROR').length;
  const successRate = monthTraces.length > 0
    ? `${(((monthTraces.length - failed) / monthTraces.length) * 100).toFixed(1)}%`
    : '—';
  const totalCost = daily.reduce((s, d) => s + d.totalCost, 0);
  const totalTokens = daily.reduce((s, d) => s + d.usage.reduce((u, m) => u + m.totalTokens, 0), 0);

  return {
    totalRunsMonth:  monthTraces.length,
    activeAgents:    traces.filter(t => !t.observations.length).length,
    successRate,
    tasksAutomated:  traces.length,
    runsUsed:        monthTraces.length,
    runsLimit:       500,
    sessionsUsed:    new Set(traces.map(t => t.sessionId).filter(Boolean)).size,
    sessionsLimit:   200,
    creditsUsed:     Math.round(totalTokens / 1000),
    creditsLimit:    100,
    costUsd:         totalCost,
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLangfuseData(): LangfuseDataResult {
  const [lfStatus, setLfStatus]     = useState<LangfuseStatus | null>(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [sessions, setSessions]     = useState<UISession[]>(MOCK_SESSIONS);
  const [tasks, setTasks]           = useState<UITask[]>(MOCK_TASKS);
  const [alerts, setAlerts]         = useState<UIAlert[]>(MOCK_ALERTS);
  const [metrics, setMetrics]       = useState<UIMetrics>(MOCK_METRICS);
  const [tick, setTick]             = useState(0);

  const refresh = useCallback(() => setTick(n => n + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const status = await langfuseClient.status();
        if (cancelled) return;
        setLfStatus(status);

        if (!status.configured) {
          // Not connected — keep mock data, return early
          setLoading(false);
          return;
        }

        // Connected — fetch real data in parallel
        const [tracesRes, sessionsRes, dailyRes] = await Promise.all([
          langfuseClient.traces({ limit: 50 }),
          langfuseClient.sessions({ limit: 50 }),
          langfuseClient.dailyMetrics(),
        ]);
        if (cancelled) return;

        const uiTasks = tracesRes.data.map(adaptTrace);
        const uiSessions = sessionsRes.data.map(adaptSession);
        const uiAlerts = derivedAlerts(uiTasks);
        const uiMetrics = computeMetrics(tracesRes.data, dailyRes.data);

        setTasks(uiTasks);
        setSessions(uiSessions);
        setAlerts(uiAlerts);
        setMetrics(uiMetrics);
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? 'Failed to load agent data.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [tick]);

  return {
    connected: lfStatus?.configured ?? false,
    status:    lfStatus,
    loading,
    error,
    sessions,
    tasks,
    alerts,
    audit:   MOCK_AUDIT,   // Audit log is always sourced from portal DB (not Langfuse)
    metrics,
    refresh,
  };
}
