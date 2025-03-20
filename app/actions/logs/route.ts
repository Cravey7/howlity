import { createServerClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { NextResponse } from 'next/server';

// Define the log entry schema
const logEntrySchema = z.object({
  event_message: z.string(),
  metadata: z.record(z.any()).optional(),
  timestamp: z.number(),
});

type LogEntry = z.infer<typeof logEntrySchema>;

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
    console.error('Error in logEvent:', error);
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