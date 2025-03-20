import { createClient } from '@supabase/supabase-js';
import type { SupabaseClientType } from './types';
import { serverLogger } from '@/lib/logger';

// Load environment variables with fallback
const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseServiceKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !supabaseServiceKey) {
  serverLogger.error('Missing Supabase environment variables', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseServiceKey,
  });
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Create Supabase client with service role key
export const supabase: SupabaseClientType = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-client-info': 'supabase-js/2.39.3',
    },
  },
});

// Export a function to get the client instance with error handling
export const getSupabaseClient = () => {
  try {
    return supabase;
  } catch (error) {
    serverLogger.error('Failed to get Supabase client', { error });
    throw new Error('Failed to initialize Supabase client');
  }
};