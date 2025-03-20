import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Define the log entry schema
const logEntrySchema = z.object({
  event_message: z.string(),
  metadata: z.record(z.any()).optional(),
  timestamp: z.number(),
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();

    // Validate the log entry
    const validatedEntry = logEntrySchema.parse(body);

    // Create Supabase client with service role
    const supabase = createServerClient();

    // Insert the log entry
    const { error } = await supabase
      .from('logs')
      .insert([validatedEntry]);

    if (error) {
      console.error('Error inserting log:', error);
      return NextResponse.json(
        { error: 'Failed to insert log entry' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in log endpoint:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid log entry format', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createServerClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const level = searchParams.get('level');
    const source = searchParams.get('source');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = supabase
      .from('logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (level) {
      query = query.eq('level', level);
    }

    if (source) {
      query = query.eq('source', source);
    }

    if (startDate) {
      query = query.gte('timestamp', startDate);
    }

    if (endDate) {
      query = query.lte('timestamp', endDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Failed to fetch logs:', error);
      return NextResponse.json(
        { error: 'Failed to fetch logs', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Log API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
