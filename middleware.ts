import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of public routes that don't require authentication
const publicRoutes = ["/", "/login", "/register", "/dashboard"]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Bypass authentication for now
  return res

  // Original authentication logic (commented out for now)
  /*
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If the user is not signed in and trying to access a protected route,
  // redirect them to the login page
  if (!session && !publicRoutes.includes(req.nextUrl.pathname)) {
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If the user is signed in and trying to access an auth route,
  // redirect them to the dashboard
  if (session && ["/login", "/register"].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
  */
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
} 