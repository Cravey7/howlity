export interface System {
  id: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  name: string
  description?: string
  system_id: string
  created_at: string
  updated_at: string
}

export interface Feature {
  id: string
  name: string
  description?: string
  application_id: string
  created_at: string
  updated_at: string
}

export interface Stack {
  id: string
  name: string
  description?: string
  version?: string
  application_id: string
  created_at: string
  updated_at: string
} 