import type { Account, ActiveRun, Job, ParserRunForAnalysis, PostAnalysis, PostAnalysisAiSettings, PostFileValidation, Run, StartModePayload, User, UserLimits } from './types'

const API = '/api'

export type AdminUserRunLogPayload = {
  user_id: string
  login: string
  run: {
    id: string
    mode: string
    status: string
    current_step: string | null
    started_at: string | null
    finished_at: string | null
    created_at: string
    updated_at: string
    account_id: string
    account_username?: string | null
    is_active: boolean
  } | null
  log: string
  line_count: number
  max_lines: number
  truncated: boolean
  cleared?: boolean
}

function readCookie(name: string): string | null {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1] ?? null
}

export function newIdempotencyKey(): string {
  return `${Date.now()}-${crypto.randomUUID()}`
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {})
  const csrf = readCookie('csrf_token')
  if (csrf && !headers.has('X-CSRF-Token')) headers.set('X-CSRF-Token', decodeURIComponent(csrf))
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  const response = await fetch(`${API}${path}`, { ...options, headers, credentials: 'include' })
  const text = await response.text()
  const data = text ? JSON.parse(text) : null
  if (!response.ok) {
    const detail = data?.detail
    const message = detail?.message || detail?.code || response.statusText
    throw new Error(message)
  }
  return data as T
}

export const api = {
  login: (login: string, password: string) => request<{ user: User; csrf_token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ login, password })
  }),
  logout: () => request<{ status: string }>('/auth/logout', { method: 'POST' }),
  me: () => request<User>('/auth/me'),
  userLimits: () => request<UserLimits>('/auth/me/limits'),
  accounts: () => request<Account[]>('/accounts'),
  addAccount: (form: FormData, idem: string) => request<{ account_id: string; job_id: string; status: string }>('/accounts', {
    method: 'POST',
    headers: { 'Idempotency-Key': idem },
    body: form
  }),
  updateProxy: (accountId: string, proxy: string, idem: string) => request<Account>(`/accounts/${accountId}/proxy`, {
    method: 'PATCH',
    headers: { 'Idempotency-Key': idem },
    body: JSON.stringify({ proxy })
  }),
  deleteAccount: (accountId: string, idem: string) => request<{ status: string }>(`/accounts/${accountId}`, {
    method: 'DELETE',
    headers: { 'Idempotency-Key': idem }
  }),
  startMode: (accountId: string, payload: StartModePayload, idem: string) => request<{ run_id: string; job_id: string; status: string }>(`/accounts/${accountId}/run`, {
    method: 'POST',
    headers: { 'Idempotency-Key': idem },
    body: JSON.stringify(payload)
  }),
  job: (jobId: string) => request<Job>(`/jobs/${jobId}`),
  activeRun: () => request<ActiveRun>('/runs/active'),
  lastRun: () => request<Run | null>('/runs/last'),
  stopRun: (runId: string) => request<{ status: string }>(`/runs/${runId}/stop`, { method: 'POST' }),
  runLogs: (runId: string) => request<{ site_log: string; backend_log: string }>(`/runs/${runId}/logs`),
  resultFileUrl: (runId: string) => `${API}/runs/${runId}/result-file`,
  postAnalyses: () => request<{ analyses: PostAnalysis[] }>('/post-analyses'),
  activePostAnalysis: () => request<PostAnalysis | null>('/post-analyses/active'),
  postAnalysis: (id: string) => request<PostAnalysis>(`/post-analyses/${id}`),
  cancelPostAnalysis: (id: string) => request<PostAnalysis>(`/post-analyses/${id}/cancel`, { method: 'POST' }),
  parserRunsForAnalysis: () => request<ParserRunForAnalysis[]>('/post-analyses/parser-runs'),
  validatePostAnalysisFile: (form: FormData) => request<PostFileValidation>('/post-analyses/validate-file', { method: 'POST', body: form }),
  startPostAnalysis: (form: FormData, idem: string) => request<{ analysis_id: string; job_id: string; status: string }>('/post-analyses/start', {
    method: 'POST',
    headers: { 'Idempotency-Key': idem },
    body: form
  }),
  getSettings: () => request<Record<string, any>>('/settings'),
  patchSettings: (payload: Record<string, any>) => request<Record<string, any>>('/settings', { method: 'PATCH', body: JSON.stringify(payload) }),
  adminUsers: () => request<any[]>('/admin/users'),
  adminCreateUser: (payload: { login: string; password: string; role: string; daily_parsed_posts_limit?: number; daily_comments_limit?: number }) => request<any>('/admin/users', { method: 'POST', body: JSON.stringify(payload) }),
  adminUpdateLimits: (id: string, payload: { daily_parsed_posts_limit?: number; daily_comments_limit?: number }) => request<any>(`/admin/users/${id}/limits`, { method: 'PATCH', body: JSON.stringify(payload) }),
  adminBan: (id: string) => request(`/admin/users/${id}/ban`, { method: 'POST' }),
  adminUnban: (id: string) => request(`/admin/users/${id}/unban`, { method: 'POST' }),
  adminDelete: (id: string) => request(`/admin/users/${id}`, { method: 'DELETE' }),
  adminForceStop: (id: string) => request(`/admin/users/${id}/force-stop`, { method: 'POST' }),
  adminQueues: () => request<any>('/admin/queues'),
  adminUserRunLogs: (login: string) => request<AdminUserRunLogPayload>(`/admin/user-run-logs?login=${encodeURIComponent(login)}`),
  adminClearUserRunLogs: (login: string) => request<AdminUserRunLogPayload>(`/admin/user-run-logs/clear?login=${encodeURIComponent(login)}`, { method: 'POST' }),
  adminWorkSettings: () => request<Record<string, any>>('/admin/work-settings'),
  adminUpdateWorkSettings: (payload: Record<string, any>) => request<Record<string, any>>('/admin/work-settings', { method: 'PATCH', body: JSON.stringify(payload) }),
  adminPostAnalysisAiSettings: () => request<PostAnalysisAiSettings>('/admin/post-analysis-ai-settings'),
  adminUpdatePostAnalysisAiSettings: (payload: PostAnalysisAiSettings) => request<PostAnalysisAiSettings>('/admin/post-analysis-ai-settings', { method: 'PATCH', body: JSON.stringify(payload) })
}
