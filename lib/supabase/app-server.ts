import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { serverLogger } from '@/lib/logger';

export const createClient = async () => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      serverLogger.error('Missing Supabase environment variables', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseAnonKey,
      });
      throw new Error('Missing Supabase environment variables');
    }

    serverLogger.debug('Creating app-server Supabase client', {
      url: supabaseUrl,
      hasKey: !!supabaseAnonKey,
    });

    const cookieStore = cookies();

    const client = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        async get(name: string) {
          try {
            const cookie = await cookieStore.get(name);
            return cookie?.value;
          } catch (error) {
            serverLogger.warn('Error getting cookie', { name, error: error instanceof Error ? error.message : 'Unknown error' });
            return undefined;
          }
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            await cookieStore.set({ name, value, ...options });
          } catch (error) {
            serverLogger.warn('Error setting cookie', { 
              name, 
              error: error instanceof Error ? error.message : 'Unknown error' 
            });
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            await cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            serverLogger.warn('Error removing cookie', { 
              name, 
              error: error instanceof Error ? error.message : 'Unknown error' 
            });
          }
        },
      },
    });

    serverLogger.debug('App-server Supabase client created successfully');
    return client;
  } catch (error) {
    serverLogger.error('Error creating app-server Supabase client', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
}; 