export type UserScript = {
  id: string
  name: string
  is_enabled: boolean
  script: string
  draft: string
  url_pattern: string
  created_at: Date
  updated_at: Date
}