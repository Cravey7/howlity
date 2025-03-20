import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

export type SupabaseClientType = SupabaseClient<Database>;

export interface SupabaseError {
  message: string;
  status?: number;
  name?: string;
  stack?: string;
}

export interface SupabaseResponse<T = any> {
  data: T | null;
  error: SupabaseError | null;
}

export interface QueryOptions {
  filter?: Record<string, any>;
  orderBy?: {
    column: string;
    ascending?: boolean;
  };
  limit?: number;
  offset?: number;
} 