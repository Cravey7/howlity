import { createServerClient } from '@supabase/ssr';

export const createClient = () => {
  return createServerClient(
    process.env['NEXT_PUBLIC_SUPABASE_URL']!,
    process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
    {
      cookies: {
        get(name: string) {
          // Handle both server and client contexts
          if (typeof window === 'undefined') {
            // Server-side context
            return process.env[`COOKIE_${name}`];
          }
          // Client-side context
          return document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`))
            ?.split('=')[1];
        },
        set(name: string, value: string) {
          if (typeof window === 'undefined') {
            // Server-side context
            process.env[`COOKIE_${name}`] = value;
          } else {
            // Client-side context
            document.cookie = `${name}=${value}; path=/`;
          }
        },
        remove(name: string) {
          if (typeof window === 'undefined') {
            // Server-side context
            delete process.env[`COOKIE_${name}`];
          } else {
            // Client-side context
            document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          }
        },
      },
    }
  );
};
