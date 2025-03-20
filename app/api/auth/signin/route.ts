import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { serverLogger } from '@/lib/logger';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = signInSchema.parse(body);

    // Initialize Supabase client
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Attempt sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (error) {
      console.error('Sign in error:', {
        message: error.message,
        status: error.status,
        name: error.name,
      });

      // Handle specific error cases
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Too many attempts. Please try again later.' },
          { status: 429 }
        );
      }

      if (error.message.includes('Invalid login credentials')) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      return NextResponse.json(
        { error: 'Authentication failed. Please try again.' },
        { status: 400 }
      );
    }

    if (!data?.user) {
      console.error('No user data returned from sign in');
      return NextResponse.json(
        { error: 'Authentication failed. Please try again.' },
        { status: 400 }
      );
    }

    // Check if email is verified
    if (!data.user.email_confirmed_at) {
      return NextResponse.json(
        { error: 'Please verify your email before signing in.' },
        { status: 403 }
      );
    }

    // Set session cookie
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error('Session error:', sessionError);
      return NextResponse.json(
        { error: 'Failed to create session. Please try again.' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
      },
    });
  } catch (error) {
    console.error('Sign in route error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
