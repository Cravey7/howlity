import { supabase } from './index';
import type { SupabaseQueryOptions, SupabaseResponse } from '../types';
import type { Database } from '@/types/database';

type TableName = keyof Database['public']['Tables'];
type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];

export async function queryTable<T extends TableName>(
  table: T,
  options: SupabaseQueryOptions = {}
): Promise<SupabaseResponse<TableRow<T>[]>> {
  try {
    let query = supabase.from(table).select('*');

    // Apply filters
    if (options.filters) {
      options.filters.forEach((filter) => {
        query = query.filter(filter.column, filter.operator, filter.value);
      });
    }

    // Apply ordering
    if (options.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending ?? true,
      });
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit ?? 10) - 1);
    }

    const { data, error } = await query;

    return {
      data: data as TableRow<T>[],
      error: error ? {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      } : null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    };
  }
}

export async function getById<T extends TableName>(
  table: T,
  id: string
): Promise<SupabaseResponse<TableRow<T>>> {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    return {
      data: data as TableRow<T>,
      error: error ? {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      } : null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    };
  }
} 