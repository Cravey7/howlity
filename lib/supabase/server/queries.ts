import { createClient } from './index';
import type { SupabaseQueryOptions, SupabaseResponse } from '../types';
import type { Database } from '@/types/database';
import { serverLogger } from '@/app/lib/logger';

type TableName = keyof Database['public']['Tables'];
type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];

export async function queryTable<T extends TableName>(
  table: T,
  options: SupabaseQueryOptions = {}
): Promise<SupabaseResponse<TableRow<T>[]>> {
  try {
    const supabase = await createClient();
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

    if (error) {
      serverLogger.error(`Error querying table ${table}`, { error });
    }

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
    serverLogger.error(`Error in queryTable for table ${table}`, { error });
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
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      serverLogger.error(`Error getting record from table ${table}`, { error, id });
    }

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
    serverLogger.error(`Error in getById for table ${table}`, { error, id });
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    };
  }
}

export async function createRecord<T extends TableName>(
  table: T,
  data: Partial<TableRow<T>>
): Promise<SupabaseResponse<TableRow<T>>> {
  try {
    const supabase = await createClient();
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) {
      serverLogger.error(`Error creating record in table ${table}`, { error, data });
    }

    return {
      data: result as TableRow<T>,
      error: error ? {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      } : null,
    };
  } catch (error) {
    serverLogger.error(`Error in createRecord for table ${table}`, { error, data });
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    };
  }
}

export async function updateRecord<T extends TableName>(
  table: T,
  id: string,
  data: Partial<TableRow<T>>
): Promise<SupabaseResponse<TableRow<T>>> {
  try {
    const supabase = await createClient();
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      serverLogger.error(`Error updating record in table ${table}`, { error, id, data });
    }

    return {
      data: result as TableRow<T>,
      error: error ? {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      } : null,
    };
  } catch (error) {
    serverLogger.error(`Error in updateRecord for table ${table}`, { error, id, data });
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    };
  }
}

export async function deleteRecord<T extends TableName>(
  table: T,
  id: string
): Promise<SupabaseResponse<boolean>> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      serverLogger.error(`Error deleting record from table ${table}`, { error, id });
    }

    return {
      data: !error,
      error: error ? {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      } : null,
    };
  } catch (error) {
    serverLogger.error(`Error in deleteRecord for table ${table}`, { error, id });
    return {
      data: false,
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    };
  }
} 