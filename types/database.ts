export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'user' | 'admin' | 'moderator'
export type ThemeMode = 'light' | 'dark' | 'system'
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'banned'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          username: string | null
          avatar_url: string | null
          bio: string | null
          role: UserRole
          status: UserStatus
          last_active_at: string | null
          timezone: string
          locale: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: UserRole
          status?: UserStatus
          last_active_at?: string | null
          timezone?: string
          locale?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: UserRole
          status?: UserStatus
          last_active_at?: string | null
          timezone?: string
          locale?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          user_id: string
          theme_mode: ThemeMode
          notifications_enabled: boolean
          email_notifications: boolean
          push_notifications: boolean
          in_app_notifications: boolean
          notification_frequency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          theme_mode?: ThemeMode
          notifications_enabled?: boolean
          email_notifications?: boolean
          push_notifications?: boolean
          in_app_notifications?: boolean
          notification_frequency?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          theme_mode?: ThemeMode
          notifications_enabled?: boolean
          email_notifications?: boolean
          push_notifications?: boolean
          in_app_notifications?: boolean
          notification_frequency?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          user_id: string
          dashboard_layout: Json
          sidebar_collapsed: boolean
          compact_mode: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          dashboard_layout?: Json
          sidebar_collapsed?: boolean
          compact_mode?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          dashboard_layout?: Json
          sidebar_collapsed?: boolean
          compact_mode?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_sessions: {
        Row: {
          id: string
          user_id: string
          device_info: Json | null
          ip_address: string | null
          last_active_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          device_info?: Json | null
          ip_address?: string | null
          last_active_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          device_info?: Json | null
          ip_address?: string | null
          last_active_at?: string
          created_at?: string
        }
      }
      user_activity_log: {
        Row: {
          id: string
          user_id: string
          action: string
          details: Json | null
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action: string
          details?: Json | null
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action?: string
          details?: Json | null
          ip_address?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: UserRole
      theme_mode: ThemeMode
      user_status: UserStatus
    }
  }
} 