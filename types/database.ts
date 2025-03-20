import { Database } from '@supabase/supabase-js';

/**
 * Represents the database schema
 */
export type Schema = Database['public']['Tables'];

/**
 * Represents a database table name
 */
export type TableName = keyof Schema;

/**
 * Represents a database row
 */
export type Row<T extends TableName> = Schema[T]['Row'];

/**
 * Represents a database insert
 */
export type Insert<T extends TableName> = Schema[T]['Insert'];

/**
 * Represents a database update
 */
export type Update<T extends TableName> = Schema[T]['Update'];

/**
 * Represents a database query result
 */
export type QueryResult<T extends TableName> = {
  data: Row<T>[] | null;
  error: Error | null;
  count: number | null;
};

/**
 * Represents a database query options
 */
export type QueryOptions = {
  select?: string;
  where?: string;
  orderBy?: string;
  limit?: number;
  offset?: number;
};

/**
 * Represents a database transaction
 */
export type Transaction = {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  startedAt: Date;
  completedAt?: Date;
  error?: string;
};

/**
 * Represents a database migration
 */
export type Migration = {
  id: string;
  name: string;
  version: number;
  appliedAt: Date;
  status: 'pending' | 'applied' | 'failed';
  error?: string;
};

/**
 * Represents a database backup
 */
export type Backup = {
  id: string;
  createdAt: Date;
  size: number;
  status: 'pending' | 'completed' | 'failed';
  error?: string;
  url?: string;
};

/**
 * Represents a database index
 */
export type Index = {
  name: string;
  table: string;
  columns: string[];
  unique: boolean;
};

/**
 * Represents a database constraint
 */
export type Constraint = {
  name: string;
  table: string;
  type: 'primary' | 'foreign' | 'unique' | 'check';
  definition: string;
};

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          role: string;
          last_sign_in_at: string | null;
          email_verified_at: string | null;
          metadata: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          role?: string;
          last_sign_in_at?: string | null;
          email_verified_at?: string | null;
          metadata?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          role?: string;
          last_sign_in_at?: string | null;
          email_verified_at?: string | null;
          metadata?: Record<string, any>;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_sessions: {
        Row: {
          id: string;
          user_id: string;
          session_token: string;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
          expires_at: string;
          last_activity_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          session_token: string;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          expires_at: string;
          last_activity_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          session_token?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
          expires_at?: string;
          last_activity_at?: string;
        };
      };
      password_reset_tokens: {
        Row: {
          id: string;
          user_id: string;
          token: string;
          created_at: string;
          expires_at: string;
          used_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          token: string;
          created_at?: string;
          expires_at: string;
          used_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          token?: string;
          created_at?: string;
          expires_at?: string;
          used_at?: string | null;
        };
      };
      email_verification_tokens: {
        Row: {
          id: string;
          user_id: string;
          token: string;
          created_at: string;
          expires_at: string;
          verified_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          token: string;
          created_at?: string;
          expires_at: string;
          verified_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          token?: string;
          created_at?: string;
          expires_at?: string;
          verified_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

/**
 * Database schema types
 */

/**
 * System status
 */
export enum SystemStatus {
  Active = 'active',
  Archived = 'archived',
  Deleted = 'deleted',
}

/**
 * System visibility
 */
export enum SystemVisibility {
  Public = 'public',
  Private = 'private',
  Shared = 'shared',
}

/**
 * Application status
 */
export enum ApplicationStatus {
  Draft = 'draft',
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

/**
 * Application type
 */
export enum ApplicationType {
  Web = 'web',
  Mobile = 'mobile',
  Desktop = 'desktop',
  Api = 'api',
}

/**
 * Application environment
 */
export enum ApplicationEnvironment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
}

/**
 * Feature status
 */
export enum FeatureStatus {
  Planned = 'planned',
  InProgress = 'in-progress',
  Completed = 'completed',
  Blocked = 'blocked',
}

/**
 * Feature priority
 */
export enum FeaturePriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Urgent = 'urgent',
}

/**
 * Feature complexity
 */
export enum FeatureComplexity {
  Simple = 'simple',
  Moderate = 'moderate',
  Complex = 'complex',
}

/**
 * Stack type
 */
export enum StackType {
  Frontend = 'frontend',
  Backend = 'backend',
  Fullstack = 'fullstack',
  DevOps = 'devops',
}

/**
 * Tool type
 */
export enum ToolType {
  Development = 'development',
  Testing = 'testing',
  Deployment = 'deployment',
  Monitoring = 'monitoring',
}

/**
 * Environment variable type
 */
export enum EnvironmentVariableType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Secret = 'secret',
}

/**
 * Environment variable scope
 */
export enum EnvironmentVariableScope {
  Global = 'global',
  Environment = 'environment',
  Feature = 'feature',
}

/**
 * AI prompt type
 */
export enum AIPromptType {
  System = 'system',
  User = 'user',
  Assistant = 'assistant',
}

/**
 * AI instruction type
 */
export enum AIInstructionType {
  System = 'system',
  User = 'user',
  Assistant = 'assistant',
}

/**
 * AI agent type
 */
export enum AIAgentType {
  Assistant = 'assistant',
  Worker = 'worker',
  Manager = 'manager',
}

/**
 * AI agent status
 */
export enum AIAgentStatus {
  Active = 'active',
  Inactive = 'inactive',
  Training = 'training',
}

/**
 * Page type
 */
export enum PageType {
  Static = 'static',
  Dynamic = 'dynamic',
  Api = 'api',
}

/**
 * Component type
 */
export enum ComponentType {
  UI = 'ui',
  Layout = 'layout',
  Container = 'container',
  Form = 'form',
}

/**
 * Navigation type
 */
export enum NavigationType {
  Main = 'main',
  Footer = 'footer',
  Sidebar = 'sidebar',
  Mobile = 'mobile',
}

/**
 * System
 */
export interface System {
  id: string;
  name: string;
  description: string;
  userId: string;
  status: SystemStatus;
  visibility: SystemVisibility;
  tags: string[];
  metadata: Record<string, unknown>;
  version: string;
  parentId?: string;
  settings: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Application
 */
export interface Application {
  id: string;
  name: string;
  description: string;
  systemId: string;
  status: ApplicationStatus;
  type: ApplicationType;
  framework?: string;
  deployment: Record<string, unknown>;
  environment: ApplicationEnvironment;
  version: string;
  dependencies: Record<string, unknown>;
  buildConfig: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Feature
 */
export interface Feature {
  id: string;
  name: string;
  description: string;
  applicationId: string;
  status: FeatureStatus;
  priority: FeaturePriority;
  complexity: FeatureComplexity;
  estimatedHours?: number;
  assignedTo?: string;
  dependencies: string[];
  acceptanceCriteria: Record<string, unknown>;
  tags: string[];
  attachments: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Stack
 */
export interface Stack {
  id: string;
  name: string;
  description: string;
  systemId: string;
  type: StackType;
  version: string;
  compatibility: Record<string, unknown>;
  requirements: Record<string, unknown>;
  documentation: Record<string, unknown>;
  tags: string[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Tool
 */
export interface Tool {
  id: string;
  name: string;
  description: string;
  stackId: string;
  type: ToolType;
  version: string;
  configuration: Record<string, unknown>;
  documentation: Record<string, unknown>;
  compatibility: Record<string, unknown>;
  license?: string;
  isRequired: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Environment Variable
 */
export interface EnvironmentVariable {
  id: string;
  name: string;
  value: string;
  applicationId: string;
  type: EnvironmentVariableType;
  scope: EnvironmentVariableScope;
  isSecret: boolean;
  description?: string;
  validation: Record<string, unknown>;
  defaultValue?: string;
  isRequired: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * AI Prompt
 */
export interface AIPrompt {
  id: string;
  content: string;
  modelId: string;
  type: AIPromptType;
  category?: string;
  version: string;
  parameters: Record<string, unknown>;
  examples: Record<string, unknown>;
  tags: string[];
  metadata: Record<string, unknown>;
  isTemplate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * AI Instruction
 */
export interface AIInstruction {
  id: string;
  content: string;
  promptId: string;
  type: AIInstructionType;
  priority: number;
  conditions: Record<string, unknown>;
  validation: Record<string, unknown>;
  examples: Record<string, unknown>;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * AI Usage Cost
 */
export interface AIUsageCost {
  id: string;
  modelId: string;
  cost: number;
  provider?: string;
  currency: string;
  billingPeriod: 'monthly' | 'daily' | 'hourly';
  usageMetrics: Record<string, unknown>;
  budget?: number;
  alerts: Record<string, unknown>;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * AI Model
 */
export interface AIModel {
  id: string;
  name: string;
  provider: string;
  version: string;
  capabilities: Record<string, unknown>;
  limitations: Record<string, unknown>;
  cost: Record<string, unknown>;
  performance: Record<string, unknown>;
  documentation: Record<string, unknown>;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * AI Agent
 */
export interface AIAgent {
  id: string;
  name: string;
  modelId: string;
  type: AIAgentType;
  capabilities: Record<string, unknown>;
  personality: Record<string, unknown>;
  settings: Record<string, unknown>;
  status: AIAgentStatus;
  performance: Record<string, unknown>;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Page
 */
export interface Page {
  id: string;
  name: string;
  applicationId: string;
  type: PageType;
  route?: string;
  layout?: string;
  metadata: Record<string, unknown>;
  permissions: Record<string, unknown>;
  dependencies: string[];
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Component
 */
export interface Component {
  id: string;
  name: string;
  pageId: string;
  type: ComponentType;
  props: Record<string, unknown>;
  styles: Record<string, unknown>;
  dependencies: string[];
  documentation: Record<string, unknown>;
  tags: string[];
  isReusable: boolean;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Navigation
 */
export interface Navigation {
  id: string;
  name: string;
  applicationId: string;
  type: NavigationType;
  items: Record<string, unknown>;
  settings: Record<string, unknown>;
  permissions: Record<string, unknown>;
  tags: string[];
  isActive: boolean;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Database Table
 */
export interface DatabaseTable {
  id: string;
  name: string;
  applicationId: string;
  schema: Record<string, unknown>;
  relationships: Record<string, unknown>;
  indexes: Record<string, unknown>;
  constraints: Record<string, unknown>;
  permissions: Record<string, unknown>;
  tags: string[];
  isSystem: boolean;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseField {
  id: string;
  name: string;
  type: string;
  table_id: string;
  created_at: string;
  updated_at: string;
  tables: {
    name: string;
  };
}

export interface DatabaseRelationship {
  id: string;
  name: string;
  type: string;
  source_table_id: string;
  target_table_id: string;
  created_at: string;
  updated_at: string;
  source_tables: {
    name: string;
  };
  target_tables: {
    name: string;
  };
}

export interface DatabaseRole {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface DatabasePermission {
  id: string;
  name: string;
  description: string | null;
  role_id: string;
  created_at: string;
  updated_at: string;
  roles: {
    name: string;
  };
}

export interface UnitTest {
  id: string;
  name: string;
  description: string | null;
  application_id: string;
  created_at: string;
  updated_at: string;
  applications: {
    name: string;
  };
}

export interface APITest {
  id: string;
  name: string;
  description: string | null;
  application_id: string;
  created_at: string;
  updated_at: string;
  applications: {
    name: string;
  };
}

export interface E2ETest {
  id: string;
  name: string;
  description: string | null;
  application_id: string;
  created_at: string;
  updated_at: string;
  applications: {
    name: string;
  };
}
