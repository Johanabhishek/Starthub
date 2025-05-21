import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the user is authenticated
  const isAuthenticated = !!session

  // Define protected routes
  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/investor/dashboard") ||
    req.nextUrl.pathname.startsWith("/investor/opportunities") ||
    req.nextUrl.pathname.startsWith("/investor/forecasting") ||
    req.nextUrl.pathname.startsWith("/investor/analytics") ||
    req.nextUrl.pathname.startsWith("/startup/dashboard")

  // Redirect unauthenticated users from protected routes to the login page
  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = new URL("/auth/signin", req.url)
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    "/investor/dashboard/:path*",
    "/investor/opportunities/:path*",
    "/investor/forecasting/:path*",
    "/investor/analytics/:path*",
    "/startup/dashboard/:path*",
  ],
}
