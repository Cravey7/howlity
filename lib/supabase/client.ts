import { createClient } from '@supabase/supabase-js';
import type { SupabaseClientType } from './types';
import { clientLogger } from '@/lib/logger';

// Load environment variables with fallback
const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseAnonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseAnonKey) {
  clientLogger.error('Missing Supabase environment variables', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
  });
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

// Create Supabase client
export const supabase: SupabaseClientType = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
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

// Create browser-specific client
export const createBrowserClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
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
};

// Export a function to get the client instance with error handling
export const getSupabaseClient = () => {
  try {
    return supabase;
  } catch (error) {
    clientLogger.error('Failed to get Supabase client', { error });
    throw new Error('Failed to initialize Supabase client');
  }
};
