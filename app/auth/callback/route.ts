import { createClient } from '@/app/lib/supabase/server';
import { NextResponse } from 'next/server';
import { serverLogger } from '@/lib/logger';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const redirectTo = requestUrl.searchParams.get('redirect_to')?.toString();
    const origin = requestUrl.origin;

    if (!code) {
      return NextResponse.redirect(`${origin}/auth/sign-in?error=No authentication code provided`);
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        `${origin}/auth/sign-in?error=${encodeURIComponent(error.message)}`
      );
    }

    // Successfully exchanged code for session
    if (redirectTo) {
      return NextResponse.redirect(`${origin}${redirectTo}`);
    }

    return NextResponse.redirect(origin);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    const requestUrl = new URL(request.url);
    return NextResponse.redirect(
      `${requestUrl.origin}/auth/sign-in?error=${encodeURIComponent(errorMessage)}`
    );
  }
}
