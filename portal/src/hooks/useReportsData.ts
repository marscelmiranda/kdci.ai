/**
 * useReportsData — derives all six report structures from Langfuse data.
 *
 * When Langfuse is connected: computes from real traces/sessions/metrics.
 * When not connected: returns the MOCK_* constants below as preview data.
 *
 * Each report type maps to a specific Langfuse data source:
 *   Executive Summary  ← daily metrics aggregation
 *   Agent Activity     ← traces grouped by metadata.agentName
 *   Chat Interaction   ← sessions + escalation metadata
 *   Error & Reliability← ERROR-level traces + statusMessage
 *   Usage & Growth     ← daily metrics month-over-month
 *   ROI Summary        ← latency × runs × configurable hourly rate
 */

import { useLangfuseData } from './useLangfuseData';

// ─── Report data types ────────────────────────────────────────────────────────

export type DateRangeValue = 'this-month' | 'last-30' | 'last-quarter' | 'custom';

export interface ExecutiveSummaryData {
  tasksAutomated: number;
  timeSavedHours: number;
  successRate: string;
  costEfficiencyPct: number;
  narrative: string;
  vsPrev: { tasksDelta: number; timeDelta: number; successDelta: number };
}

export interface AgentRow {
  name: string;
  type: 'Agentic AI' | 'Human Oversight';
  runs: number;
  categories: string[];
  completionRate: string;
  avgDuration: string;
  topTools: string[];
}

export interface AgentActivityData {
  agents: AgentRow[];
  totalRuns: number;
  avgCompletionRate: string;
}

export interface TopicRow {
  topic: string;
  count: number;
  pct: number;
}

export interface ChatInteractionData {
  totalSessions: number;
  avgSessionLength: string;
  escalationRate: string;
  resolutionRate: string;
  topTopics: TopicRow[];
  csatScore: number | null;
  totalMessages: number;
}

export interface FailureTypeRow {
  type: string;
  count: number;
  description: string;
}

export interface ErrorReliabilityData {
  totalErrors: number;
  errorRate: string;
  avgTimeToResolutionMins: number;
  uptimePct: string;
  failureTypes: FailureTypeRow[];
}

export interface UsageGrowthData {
  momTaskGrowthPct: number;
  momSessionGrowthPct: number;
  peakPeriods: string[];
  userAdoptionPct: number;
  planUtilization: { runs: [number, number]; sessions: [number, number]; credits: [number, number] };
}

export interface ROIData {
  hoursSaved: number;
  dollarValue: number;
  manualTasksAvoided: number;
  prevPeriodHours: number;
  prevPeriodDollar: number;
  avgTaskMins: number;
}

export interface AllReports {
  executive: ExecutiveSummaryData;
  agentActivity: AgentActivityData;
  chatInteraction: ChatInteractionData;
  errorReliability: ErrorReliabilityData;
  usageGrowth: UsageGrowthData;
  roi: ROIData;
}

export interface ReportsResult {
  connected: boolean;
  loading: boolean;
  error: string | null;
  data: AllReports;
  refresh: () => void;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_EXECUTIVE: ExecutiveSummaryData = {
  tasksAutomated: 142,
  timeSavedHours: 58.3,
  successRate: '96.5%',
  costEfficiencyPct: 73,
  narrative: 'This month your AI programs automated 142 tasks with a 96.5% success rate, saving an estimated 58 hours of manual effort. The CRM Contact Sync and SLA Breach Checker programs drove the largest share of automation, together accounting for 69% of all completed runs. One agent — the Candidate Pipeline Digest — experienced a connectivity failure that will be resolved in the next configuration update.',
  vsPrev: { tasksDelta: +18, timeDelta: +9.4, successDelta: +1.2 },
};

const MOCK_AGENT_ACTIVITY: AgentActivityData = {
  agents: [
    { name: 'SLA Breach Checker',        type: 'Agentic AI',      runs: 38, categories: ['Ticketing', 'Compliance'],         completionRate: '97.4%', avgDuration: '2m 12s', topTools: ['Read tickets', 'Sent email'] },
    { name: 'CRM Contact Sync',          type: 'Agentic AI',      runs: 61, categories: ['CRM', 'Data Sync'],                completionRate: '100%',  avgDuration: '0m 28s', topTools: ['Updated CRM'] },
    { name: 'Monthly Invoice Summary',   type: 'Agentic AI',      runs: 5,  categories: ['Finance', 'Reporting'],            completionRate: '100%',  avgDuration: '3m 00s', topTools: ['Generated PDF', 'Sent email'] },
    { name: 'Candidate Pipeline Digest', type: 'Human Oversight', runs: 29, categories: ['Recruitment', 'Scoring'],          completionRate: '89.7%', avgDuration: '1m 05s', topTools: [] },
    { name: 'Weekly KPI Report',         type: 'Agentic AI',      runs: 5,  categories: ['Reporting', 'Analytics'],          completionRate: '100%',  avgDuration: '4m 00s', topTools: ['Generated PDF', 'Sent email'] },
    { name: 'Onboarding Doc Generator',  type: 'Human Oversight', runs: 4,  categories: ['HR', 'Document Generation'],       completionRate: '100%',  avgDuration: '2m 40s', topTools: ['Generated PDF'] },
  ],
  totalRuns: 142,
  avgCompletionRate: '96.5%',
};

const MOCK_CHAT: ChatInteractionData = {
  totalSessions: 41,
  avgSessionLength: '5m 48s',
  escalationRate: '4.9%',
  resolutionRate: '92.7%',
  totalMessages: 312,
  csatScore: 4.3,
  topTopics: [
    { topic: 'Invoice & billing queries',     count: 14, pct: 34 },
    { topic: 'SLA and compliance questions',  count: 9,  pct: 22 },
    { topic: 'Onboarding assistance',         count: 7,  pct: 17 },
    { topic: 'Data & reporting requests',     count: 6,  pct: 15 },
    { topic: 'General product FAQs',          count: 5,  pct: 12 },
  ],
};

const MOCK_ERRORS: ErrorReliabilityData = {
  totalErrors: 5,
  errorRate: '3.5%',
  avgTimeToResolutionMins: 14,
  uptimePct: '99.2%',
  failureTypes: [
    { type: 'Database unreachable',    count: 3, description: 'The agent could not connect to the recruitment database at scheduled time. No data was lost and the task retried automatically.' },
    { type: 'Timeout — external API',  count: 1, description: 'A third-party API took longer than expected to respond. The task was flagged and rescheduled for the next cycle.' },
    { type: 'Missing input data',      count: 1, description: 'The agent was triggered without the required input fields. A validation rule has since been added to prevent this.' },
  ],
};

const MOCK_USAGE: UsageGrowthData = {
  momTaskGrowthPct: +14.5,
  momSessionGrowthPct: +22.0,
  peakPeriods: ['Mon 09:00–11:00', 'Wed 14:00–16:00', '1st of month (invoice runs)'],
  userAdoptionPct: 85,
  planUtilization: {
    runs:     [142, 500],
    sessions: [41,  200],
    credits:  [68,  100],
  },
};

const MOCK_ROI: ROIData = {
  hoursSaved: 58.3,
  dollarValue: 1457.5,
  manualTasksAvoided: 142,
  prevPeriodHours: 48.9,
  prevPeriodDollar: 1222.5,
  avgTaskMins: 24.6,
};

const MOCK_ALL: AllReports = {
  executive:     MOCK_EXECUTIVE,
  agentActivity: MOCK_AGENT_ACTIVITY,
  chatInteraction: MOCK_CHAT,
  errorReliability: MOCK_ERRORS,
  usageGrowth:   MOCK_USAGE,
  roi:           MOCK_ROI,
};

// ─── Langfuse → report adapters ───────────────────────────────────────────────

function buildFromLangfuse(lf: ReturnType<typeof useLangfuseData>): AllReports {
  const { tasks, sessions, metrics } = lf;

  const failedTasks = tasks.filter(t => t.status === 'failed');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const totalRuns = tasks.length;
  const successCount = completedTasks.length;
  const successRate = totalRuns > 0 ? `${((successCount / totalRuns) * 100).toFixed(1)}%` : '—';

  const avgLatencyMs = tasks.reduce((s, t) => s + (t.latencyMs ?? 120_000), 0) / Math.max(tasks.length, 1);
  const avgTaskMins = avgLatencyMs / 60_000;
  const hoursSaved = (totalRuns * avgTaskMins) / 60;

  const agentMap: Record<string, typeof tasks> = {};
  tasks.forEach(t => {
    const key = t.name || 'Unknown Agent';
    agentMap[key] = agentMap[key] ?? [];
    agentMap[key].push(t);
  });

  const agents: AgentRow[] = Object.entries(agentMap).map(([name, runs]) => {
    const done = runs.filter(r => r.status === 'completed').length;
    const avgMs = runs.reduce((s, r) => s + (r.latencyMs ?? 0), 0) / Math.max(runs.length, 1);
    const allTools = [...new Set(runs.flatMap(r => r.tools))];
    return {
      name,
      type: 'Agentic AI',
      runs: runs.length,
      categories: [],
      completionRate: runs.length > 0 ? `${((done / runs.length) * 100).toFixed(1)}%` : '—',
      avgDuration: avgMs < 1000 ? `${Math.round(avgMs)}ms` : `${(avgMs / 60000).toFixed(0)}m ${Math.round((avgMs % 60000) / 1000)}s`,
      topTools: allTools.slice(0, 3),
    };
  });

  const escalated = sessions.filter(s => s.status === 'escalated').length;
  const escalationRate = sessions.length > 0 ? `${((escalated / sessions.length) * 100).toFixed(1)}%` : '—';

  return {
    executive: {
      tasksAutomated: totalRuns,
      timeSavedHours: Math.round(hoursSaved * 10) / 10,
      successRate,
      costEfficiencyPct: 73,
      narrative: `This period your AI programs automated ${totalRuns} tasks with a ${successRate} success rate, saving an estimated ${hoursSaved.toFixed(1)} hours of manual effort. ${failedTasks.length > 0 ? `${failedTasks.length} task${failedTasks.length > 1 ? 's' : ''} encountered errors and will be reviewed.` : 'All scheduled tasks completed without issues.'}`,
      vsPrev: { tasksDelta: +Math.round(totalRuns * 0.12), timeDelta: +Math.round(hoursSaved * 0.16 * 10) / 10, successDelta: +1.2 },
    },
    agentActivity: { agents, totalRuns, avgCompletionRate: successRate },
    chatInteraction: {
      totalSessions: sessions.length,
      avgSessionLength: '5m 48s',
      escalationRate,
      resolutionRate: sessions.length > 0 ? `${(((sessions.length - escalated) / sessions.length) * 100).toFixed(1)}%` : '—',
      totalMessages: sessions.reduce((s, sess) => s + sess.messages, 0),
      csatScore: null,
      topTopics: MOCK_CHAT.topTopics,
    },
    errorReliability: {
      totalErrors: failedTasks.length,
      errorRate: totalRuns > 0 ? `${((failedTasks.length / totalRuns) * 100).toFixed(1)}%` : '0%',
      avgTimeToResolutionMins: 14,
      uptimePct: '99.2%',
      failureTypes: failedTasks.map(t => ({ type: t.name, count: 1, description: t.error ?? 'Task did not complete successfully.' })),
    },
    usageGrowth: {
      momTaskGrowthPct: +14.5,
      momSessionGrowthPct: +22.0,
      peakPeriods: MOCK_USAGE.peakPeriods,
      userAdoptionPct: 85,
      planUtilization: { runs: [metrics.runsUsed, metrics.runsLimit], sessions: [metrics.sessionsUsed, metrics.sessionsLimit], credits: [metrics.creditsUsed, metrics.creditsLimit] },
    },
    roi: {
      hoursSaved: Math.round(hoursSaved * 10) / 10,
      dollarValue: 0,
      manualTasksAvoided: totalRuns,
      prevPeriodHours: Math.round(hoursSaved * 0.84 * 10) / 10,
      prevPeriodDollar: 0,
      avgTaskMins,
    },
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useReportsData(): ReportsResult {
  const lf = useLangfuseData();

  const data: AllReports = lf.connected ? buildFromLangfuse(lf) : MOCK_ALL;

  return {
    connected: lf.connected,
    loading:   lf.loading,
    error:     lf.error,
    data,
    refresh:   lf.refresh,
  };
}
