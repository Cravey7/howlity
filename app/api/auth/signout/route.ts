import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import { serverLogger } from '@/lib/logger';

export async function POST() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Signout error:', error);
      return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signout route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
