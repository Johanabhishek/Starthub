import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { LoadingState } from "@/components/ui/loading-state"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Starthub - Startup Ecosystem Platform",
  description: "Connect with startups, investors, and mentors in the startup ecosystem.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

export function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingState size="lg" text="Loading Starthub..." />
    </div>
  )
}
