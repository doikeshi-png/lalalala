export type User = {
  id: string
  login: string
  role: 'user' | 'admin'
  status: string
  last_login_at?: string | null
}

export type Account = {
  id: string
  username: string | null
  display_name: string | null
  status: string
  proxy_masked: string | null
  last_auth_check_at: string | null
  last_run_at: string | null
  last_error: string | null
  created_at: string
  updated_at: string
}

export type Job = {
  id: string
  user_id: string
  account_id: string | null
  run_id: string | null
  job_type: string
  status: string
  payload_json: Record<string, unknown>
  result_json: Record<string, unknown>
  error_message: string | null
  sleep_until?: string | null
  created_at: string
  started_at: string | null
  finished_at: string | null
}

export type RunStats = Record<string, any> & {
  result_file_ready?: boolean
  result_file_name?: string | null
  result_file_url?: string | null
  parsed_posts?: number
  rows_count?: number
  parsed_post_items_count?: number
  replies_success?: number
  replies_failed?: number
  likes_success?: number
  likes_done?: number
  comment_like_success?: number
  reposts_success?: number
  skipped_post_items_count?: number
  skipped_post_items_visible_count?: number
  reply_errors_count?: number
  error_items_count?: number
  post_like_items_count?: number
  comment_like_items_count?: number
  repost_items_count?: number
  parsed_post_items?: Array<Record<string, unknown>>
  skipped_post_items?: Array<Record<string, unknown>>
  reply_success_items?: Array<Record<string, unknown>>
  reply_errors?: Array<Record<string, unknown>>
  error_items?: Array<Record<string, unknown>>
  post_like_items?: Array<Record<string, unknown>>
  comment_like_items?: Array<Record<string, unknown>>
  repost_items?: Array<Record<string, unknown>>
}

export type Run = {
  id: string
  user_id: string
  account_id: string
  account_username?: string | null
  mode: string
  status: string
  started_at: string | null
  finished_at: string | null
  current_step: string | null
  stats_json: RunStats
  error_message: string | null
  sleep_until?: string | null
  created_at: string
  updated_at: string
}

export type ActiveRun = {
  active: boolean
  run: Run | null
  account_username?: string | null
  proxy_masked?: string | null
  auth_status?: string | null
}

export type StartModePayload = {
  mode: 'parser' | 'replies'
  resources: Record<string, any>
}

export type UserLimits = {
  usage_date: string
  daily_parsed_posts_limit: number
  daily_comments_limit: number
  parsed_posts_used_today: number
  comments_used_today: number
  parsed_posts_remaining_today: number
  comments_remaining_today: number
}


export type PostAnalysis = {
  id: string
  user_id: string
  job_id: string | null
  source_run_id: string | null
  source_type: 'parser_run' | 'upload' | string
  source_label: string
  source_file_name: string | null
  status: string
  posts_count: number
  prompt_chars: number
  input_preview_json: { posts?: string[]; columns?: string[]; warnings?: string[] }
  input_stats_json: Record<string, unknown>
  result_text: string | null
  error_message: string | null
  error_code: string | null
  started_at: string | null
  finished_at: string | null
  created_at: string
  updated_at: string
}

export type ParserRunForAnalysis = {
  id: string
  label: string
  status: string
  created_at: string
  finished_at: string | null
  posts_count: number
  result_file_name: string | null
  validation_stats: Record<string, unknown>
}

export type PostFileValidation = {
  accepted: boolean
  posts_count: number
  prompt_chars: number
  preview: { posts?: string[]; columns?: string[]; warnings?: string[] }
  warnings: string[]
  stats: Record<string, unknown>
}

export type PostAnalysisAiSettings = {
  'Нейросеть': string
  'OPENAI API KEY': string
  'Модель нейросети': string
  temperature: string | number
  max_tokens: string | number
  'Промпт OPENAI': string
}
