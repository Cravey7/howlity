export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
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
      [_ in never]: never
    }
  }
}

export interface System {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface Application {
  id: string
  name: string
  description: string | null
  system_id: string
  created_at: string
  updated_at: string
  systems: {
    name: string
  }
}

export interface Feature {
  id: string
  name: string
  description: string | null
  application_id: string
  created_at: string
  updated_at: string
  applications: {
    name: string
  }
}

export interface Stack {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface Tool {
  id: string
  name: string
  description: string | null
  stack_id: string
  created_at: string
  updated_at: string
  stacks: {
    name: string
  }
}

export interface EnvironmentVariable {
  id: string
  name: string
  value: string
  application_id: string
  created_at: string
  updated_at: string
  applications: {
    name: string
  }
}

export interface AIPrompt {
  id: string
  name: string
  description: string | null
  content: string
  created_at: string
  updated_at: string
}

export interface AIInstruction {
  id: string
  name: string
  description: string | null
  content: string
  created_at: string
  updated_at: string
}

export interface AIUsageCost {
  id: string
  model: string
  cost_per_token: number
  created_at: string
  updated_at: string
}

export interface AIModel {
  id: string
  name: string
  description: string | null
  provider: string
  created_at: string
  updated_at: string
}

export interface AIAgent {
  id: string
  name: string
  description: string | null
  model_id: string
  created_at: string
  updated_at: string
  models: {
    name: string
  }
}

export interface Page {
  id: string
  name: string
  description: string | null
  application_id: string
  created_at: string
  updated_at: string
  applications: {
    name: string
  }
}

export interface Component {
  id: string
  name: string
  description: string | null
  page_id: string
  created_at: string
  updated_at: string
  pages: {
    name: string
  }
}

export interface Navigation {
  id: string
  name: string
  description: string | null
  application_id: string
  created_at: string
  updated_at: string
  applications: {
    name: string
  }
}

export interface DatabaseTable {
  id: string
  name: string
  description: string | null
  application_id: string
  created_at: string
  updated_at: string
  applications: {
    name: string
  }
}

export interface DatabaseField {
  id: string
  name: string
  type: string
  table_id: string
  created_at: string
  updated_at: string
  tables: {
    name: string
  }
}

export interface DatabaseRelationship {
  id: string
  name: string
  type: string
  source_table_id: string
  target_table_id: string
  created_at: string
  updated_at: string
  source_tables: {
    name: string
  }
  target_tables: {
    name: string
  }
}

export interface DatabaseRole {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface DatabasePermission {
  id: string
  name: string
  description: string | null
  role_id: string
  created_at: string
  updated_at: string
  roles: {
    name: string
  }
}

export interface UnitTest {
  id: string
  name: string
  description: string | null
  application_id: string
  created_at: string
  updated_at: string
  applications: {
    name: string
  }
}

export interface APITest {
  id: string
  name: string
  description: string | null
  application_id: string
  created_at: string
  updated_at: string
  applications: {
    name: string
  }
}

export interface E2ETest {
  id: string
  name: string
  description: string | null
  application_id: string
  created_at: string
  updated_at: string
  applications: {
    name: string
  }
} 