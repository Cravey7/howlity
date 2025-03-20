import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { serverLogger } from '@/app/lib/logger';
import type { Database } from '@/types/database';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY');
}

export const createClient = async () => {
  try {
    serverLogger.debug('Creating server-side Supabase client');

    const client = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        cookies: {
          get(name: string) {
            return cookies().get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookies().set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookies().set({ name, value: '', ...options });
          },
        },
      }
    );

    serverLogger.debug('Server-side Supabase client created successfully');
    return client;
  } catch (error) {
    serverLogger.error('Error creating server-side Supabase client', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
}; 