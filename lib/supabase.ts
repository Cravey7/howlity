import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type System = {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
}

export type Application = {
  id: string
  name: string
  description: string | null
  system_id: string
  created_at: string
  updated_at: string
}

export type Feature = {
  id: string
  name: string
  description: string | null
  application_id: string
  created_at: string
  updated_at: string
}

export type Stack = {
  id: string
  name: string
  description: string | null
  application_id: string
  created_at: string
  updated_at: string
}

// Test the connection
supabase.from('systems').select('count').single()
  .then(({ error }) => {
    if (error) {
      console.error('Supabase connection test failed:', error)
    } else {
      console.log('Supabase connection test successful')
    }
  }) 