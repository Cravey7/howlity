import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/app-server';
import { serverLogger } from '@/lib/logger';
import { z } from 'zod';

const profileSchema = z.object({
  full_name: z.string().min(1, 'Full name is required').optional(),
  avatar_url: z.string().url('Invalid avatar URL').optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional(),
  metadata: z.record(z.unknown()).optional(),
});

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    
    // Get the current user's session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = profileSchema.parse(body);

    // Update the user's profile
    const { data, error } = await supabase
      .from('users')
      .update(validatedData)
      .eq('id', session.user.id)
      .select()
      .single();

    if (error) {
      serverLogger.error('Failed to update user profile', {
        error: error.message,
        userId: session.user.id,
      });
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    serverLogger.info('User profile updated successfully', {
      userId: session.user.id,
      updatedFields: Object.keys(validatedData),
    });

    return NextResponse.json({ data });
  } catch (error) {
    serverLogger.error('Profile update error', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    
    // Get the current user's session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the user's profile
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
      serverLogger.error('Failed to fetch user profile', {
        error: error.message,
        userId: session.user.id,
      });
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    serverLogger.error('Profile fetch error', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 