import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/app-server';
import { serverLogger } from '@/lib/logger';

export async function POST(request: Request) {
  const startTime = Date.now();
  await serverLogger.info('Signup request received', {
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    url: request.url,
  });

  try {
    const supabase = await createClient();
    await serverLogger.debug('Supabase client created', {
      duration: `${Date.now() - startTime}ms`,
    });

    const body = await request.json();
    await serverLogger.debug('Request body parsed', {
      email: body.email,
      hasPassword: !!body.password,
    });

    if (!body.email || !body.password) {
      await serverLogger.warn('Missing required fields', {
        hasEmail: !!body.email,
        hasPassword: !!body.password,
      });
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await serverLogger.info('Attempting Supabase signup', {
      email: body.email,
    });

    const { data, error } = await supabase.auth.signUp({
      email: body.email,
      password: body.password,
      options: {
        emailRedirectTo: `${request.headers.get('origin')}/auth/callback`,
      },
    });

    if (error) {
      await serverLogger.error('Supabase signup error', {
        message: error.message,
        status: error.status,
        name: error.name,
        stack: error.stack,
      });
      return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    }

    await serverLogger.info('Signup successful', {
      email: body.email,
      userId: data.user?.id,
      duration: `${Date.now() - startTime}ms`,
    });

    return NextResponse.json({ data });
  } catch (error) {
    await serverLogger.error('Signup route error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      duration: `${Date.now() - startTime}ms`,
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
