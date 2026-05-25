/**
 * Langfuse REST API client for the KDCI Client Portal.
 *
 * All requests are proxied through /portal/api/langfuse/* on the Express server
 * so that LANGFUSE_PUBLIC_KEY / LANGFUSE_SECRET_KEY never touch the browser.
 *
 * Langfuse docs: https://api.reference.langfuse.com
 */

// ─── Langfuse API types ───────────────────────────────────────────────────────

/** Top-level container for one agent run or LLM request. Maps to → Task Runs. */
export interface LangfuseTrace {
  id: string;
  timestamp: string;                        // ISO 8601
  name: string | null;
  input: unknown;
  output: unknown;
  sessionId: string | null;
  userId: string | null;
  metadata: Record<string, unknown> | null; // custom fields injected by KDCI SDK
  tags: string[];
  latency: number;                          // ms (end-to-end)
  totalCost: number;                        // USD
  level: 'DEFAULT' | 'DEBUG' | 'WARNING' | 'ERROR';
  statusMessage: string | null;             // human-readable error
  observations: string[];                   // child observation IDs (steps)
  bookmarked: boolean;
}

/** A group of traces sharing a sessionId. Maps to → Chat Sessions. */
export interface LangfuseSession {
  id: string;
  createdAt: string;
  projectId: string;
  bookmarked: boolean;
  public: boolean;
  traces: LangfuseTrace[];
}

/**
 * A single step inside a trace.
 * GENERATION = LLM call, SPAN = tool/code block, EVENT = a point-in-time log.
 * Maps to → steps within a Task Run expand view.
 */
export interface LangfuseObservation {
  id: string;
  traceId: string;
  type: 'GENERATION' | 'SPAN' | 'EVENT';
  name: string;
  startTime: string;
  endTime: string | null;
  model: string | null;
  input: unknown;
  output: unknown;
  usage: {
    input: number;
    output: number;
    total: number;
    unit: 'TOKENS' | 'CHARACTERS' | 'MILLISECONDS' | 'SECONDS' | 'IMAGES' | 'REQUESTS';
    inputCost: number;
    outputCost: number;
    totalCost: number;
  } | null;
  metadata: Record<string, unknown> | null;
  level: 'DEFAULT' | 'DEBUG' | 'WARNING' | 'ERROR';
  statusMessage: string | null;
  parentObservationId: string | null;
  latency: number | null;                   // ms
  calculatedTotalCost: number | null;
}

/** Aggregated daily metrics. Maps to → Overview stats and Usage bars. */
export interface LangfuseDaily {
  date: string;
  countTraces: number;
  countObservations: number;
  totalCost: number;
  usage: Array<{
    model: string;
    countTraces: number;
    countObservations: number;
    totalTokens: number;
    inputCost: number;
    outputCost: number;
    totalCost: number;
  }>;
}

/** Score attached to a trace or observation. Maps to → success-rate calculation. */
export interface LangfuseScore {
  id: string;
  timestamp: string;
  traceId: string;
  observationId: string | null;
  name: string;
  value: number;
  source: 'API' | 'REVIEW';
  comment: string | null;
}

/** Status response from /portal/api/langfuse/status */
export interface LangfuseStatus {
  configured: boolean;
  projectId?: string;
  projectName?: string;
  host?: string;
  error?: string;
}

// ─── Pagination wrapper returned by list endpoints ────────────────────────────

export interface LangfusePage<T> {
  data: T[];
  meta: { page: number; limit: number; totalItems: number; totalPages: number };
}

// ─── Custom metadata schema (injected by your Langfuse SDK calls) ─────────────
//
// To make real data appear in this portal, instrument your agents with:
//
//   langfuse.trace({
//     name: 'SLA Breach Checker',
//     sessionId: '<conversation-id>',
//     userId: '<client-user-id>',
//     metadata: {
//       agentName:    'SLA Breach Checker',
//       agentType:    'agentic-ai',           // or 'human-oversight'
//       triggeredBy:  'Schedule · every 4 hrs',
//       toolsUsed:    ['Read tickets', 'Sent email'],
//       summary:      'Scanned 14 open tickets; 1 flagged.',
//       escalated:    false,
//     },
//     tags: ['production', 'sla'],
//   });

export interface KDCITraceMetadata {
  agentName?: string;
  agentType?: 'agentic-ai' | 'human-oversight';
  triggeredBy?: string;
  toolsUsed?: string[];
  summary?: string;
  escalated?: boolean;
}

// ─── API client ───────────────────────────────────────────────────────────────

const BASE = '/portal/api/langfuse';

async function get<T>(path: string, params?: Record<string, string | number>): Promise<T> {
  const qs = params ? '?' + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : '';
  const res = await fetch(`${BASE}${path}${qs}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`Langfuse proxy ${path}: ${res.status}`);
  return res.json();
}

export const langfuseClient = {
  /** Check whether Langfuse credentials are configured server-side. */
  status: () => get<LangfuseStatus>('/status'),

  /** Fetch paginated traces. Use `limit` and `page` for pagination. */
  traces: (params?: { limit?: number; page?: number; sessionId?: string; userId?: string; tags?: string; name?: string }) =>
    get<LangfusePage<LangfuseTrace>>('/traces', params as any),

  /** Fetch paginated sessions. */
  sessions: (params?: { limit?: number; page?: number }) =>
    get<LangfusePage<LangfuseSession>>('/sessions', params as any),

  /** Fetch all observations (steps) for a single trace. */
  traceObservations: (traceId: string) =>
    get<{ data: LangfuseObservation[] }>(`/traces/${traceId}/observations`),

  /** Fetch daily aggregated metrics for the given date range. */
  dailyMetrics: (params?: { fromTimestamp?: string; toTimestamp?: string }) =>
    get<{ data: LangfuseDaily[] }>('/metrics/daily', params as any),

  /** Fetch scores (used for success-rate computation). */
  scores: (params?: { limit?: number; page?: number }) =>
    get<LangfusePage<LangfuseScore>>('/scores', params as any),
};

// ─── Utility helpers ──────────────────────────────────────────────────────────

/** Format a latency value (ms) to a human-readable string. */
export function fmtLatency(ms: number | null | undefined): string {
  if (ms == null) return '—';
  if (ms < 1000) return `${Math.round(ms)}ms`;
  const s = ms / 1000;
  if (s < 60) return `${s.toFixed(1)}s`;
  const m = Math.floor(s / 60);
  const rem = Math.round(s % 60);
  return `${m}m ${rem}s`;
}

/** Format an ISO timestamp to the portal's display format. */
export function fmtTimestamp(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    + ' · ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

/** Map a Langfuse level to a portal status string. */
export function levelToStatus(level: LangfuseTrace['level'], endTime?: string | null): string {
  if (level === 'ERROR') return 'failed';
  if (!endTime) return 'running';
  return 'completed';
}
