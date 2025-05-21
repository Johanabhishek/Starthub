import { createClient } from "@supabase/supabase-js"

// Create a singleton instance for the client-side Supabase client
let supabaseInstance: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance

  // Log the environment variables (without exposing sensitive data)
  console.log("NEXT_PUBLIC_SUPABASE_URL exists:", !!process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase URL or anon key is missing")
    throw new Error("Supabase URL and anon key must be defined")
  }

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    console.log("Supabase client initialized successfully")
    return supabaseInstance
  } catch (error) {
    console.error("Error initializing Supabase client:", error)
    throw error
  }
}

// For backward compatibility
export const supabase = getSupabaseClient()
