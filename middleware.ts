import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    // Log the request path for debugging
    console.log('Middleware processing request:', {
      path: request.nextUrl.pathname,
      method: request.method,
      hasCookies: request.cookies.size > 0,
    });

    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Skip auth check for API routes, static files, and dashboard routes during development
    if (
      request.nextUrl.pathname.startsWith('/api') ||
      request.nextUrl.pathname.startsWith('/_next') ||
      request.nextUrl.pathname.includes('.') ||
      request.nextUrl.pathname.startsWith('/dashboard') // Allow dashboard routes without auth
    ) {
      console.log('Skipping auth check for:', request.nextUrl.pathname);
      return response;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Enhanced environment variable validation
    if (!supabaseUrl) {
      console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
      throw new Error('Missing Supabase URL');
    }
    if (!supabaseAnonKey) {
      console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
      throw new Error('Missing Supabase anon key');
    }

    // Log Supabase initialization (without exposing sensitive data)
    console.log('Initializing Supabase client with URL:', supabaseUrl);

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        async get(name: string) {
          try {
            const cookie = await request.cookies.get(name);
            console.log('Getting cookie:', { name, exists: !!cookie });
            return cookie?.value;
          } catch (error) {
            console.error('Error getting cookie:', {
              name,
              error: error instanceof Error ? error.message : 'Unknown error',
            });
            return undefined;
          }
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            console.log('Setting cookie:', { name, options });
            response.cookies.set({
              name,
              value,
              ...options,
            });
          } catch (error) {
            console.error('Error setting cookie:', {
              name,
              error: error instanceof Error ? error.message : 'Unknown error',
            });
            throw error;
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            console.log('Removing cookie:', { name, options });
            response.cookies.set({
              name,
              value: '',
              ...options,
            });
          } catch (error) {
            console.error('Error removing cookie:', {
              name,
              error: error instanceof Error ? error.message : 'Unknown error',
            });
            throw error;
          }
        },
      },
    });

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Auth error in middleware:', {
        message: error.message,
        name: error.name,
        status: error.status,
      });
      return response;
    }

    // Log session state
    console.log('Session state:', {
      hasSession: !!session,
      userId: session?.user?.id,
      path: request.nextUrl.pathname,
    });

    // If user is not signed in and the current path is not /auth/*,
    // redirect the user to /auth/sign-in
    if (!session && !request.nextUrl.pathname.startsWith('/auth')) {
      console.log('Redirecting to sign-in: No session found');
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }

    // If user is signed in and the current path is /auth/*,
    // redirect the user to /
    if (session && request.nextUrl.pathname.startsWith('/auth')) {
      console.log('Redirecting to home: User already signed in');
      return NextResponse.redirect(new URL('/', request.url));
    }

    return response;
  } catch (error) {
    // Enhanced error logging
    console.error('Middleware error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      path: request.nextUrl.pathname,
    });
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
