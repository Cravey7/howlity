import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Get the user data
    const { data: { user } } = await supabase.auth.getUser()

    // If this is a new user, create their profile
    if (user) {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single()

      if (!existingProfile) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata.full_name || user.email?.split('@')[0],
              username: user.user_metadata.username || user.email?.split('@')[0],
              role: 'user',
              status: 'active',
            },
          ])

        if (profileError) {
          console.error('Error creating profile:', profileError)
        }
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL("/dashboard", requestUrl.origin))
} 