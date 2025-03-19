import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data, error } = await supabase.from('profiles').select('count').limit(1)
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ status: 'connected', data })
  } catch (error) {
    console.error('Connection test error:', error)
    return NextResponse.json({ error: 'Failed to connect to Supabase' }, { status: 500 })
  }
} 