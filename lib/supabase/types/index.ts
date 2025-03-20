import type { Database } from '@/types/database';

export type SupabaseClient = ReturnType<typeof import('../client').createClient>;
export type SupabaseServerClient = Awaited<ReturnType<typeof import('../server').createClient>>;

export interface SupabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

export interface SupabaseResponse<T> {
  data: T | null;
  error: SupabaseError | null;
}

export interface SupabaseQueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: {
    column: keyof Database['public']['Tables'];
    ascending?: boolean;
  };
  filters?: {
    column: keyof Database['public']['Tables'];
    operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'ilike' | 'in';
    value: any;
  }[];
} 