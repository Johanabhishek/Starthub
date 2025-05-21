"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Session, User } from "@supabase/supabase-js"

import { getSupabaseClient } from "@/lib/supabase/client"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, metadata: any) => Promise<{ error: any; user: any }>
  signOut: () => Promise<void>
}

// Mock user for demo purposes
const mockUser = {
  id: "demo-user-id",
  email: "test@example.com",
  user_metadata: {
    user_type: "investor",
    first_name: "Demo",
    last_name: "User",
  },
} as unknown as User

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = getSupabaseClient()

  useEffect(() => {
    // Get session from Supabase or use mock for demo
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth...")

        // Check for existing session in localStorage for demo
        const demoLoggedIn = localStorage.getItem("demoLoggedIn") === "true"

        if (demoLoggedIn) {
          console.log("Demo user is logged in")
          setUser(mockUser)
          setSession({ user: mockUser } as unknown as Session)
          setIsLoading(false)
          return
        }

        // Try to get real session from Supabase
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
        }

        if (session) {
          console.log("Session found:", session.user.id)
          setSession(session)
          setUser(session.user)
        } else {
          console.log("No session found")
        }

        // Set up auth state change listener
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          console.log("Auth state changed:", _event, session?.user?.id)
          setSession(session)
          setUser(session?.user ?? null)
        })

        return () => {
          subscription.unsubscribe()
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in with:", email)

      // Demo account bypass
      if (email === "test@example.com" && password === "password123") {
        console.log("Using demo account")
        setUser(mockUser)
        setSession({ user: mockUser } as unknown as Session)
        localStorage.setItem("demoLoggedIn", "true")
        return { error: null }
      }

      // Real authentication with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        console.error("Sign in error:", error)
        return { error }
      }

      if (data.user) {
        console.log("Signed in successfully:", data.user.id)
        setUser(data.user)
        setSession(data.session)
      }

      return { error: null }
    } catch (error: any) {
      console.error("Error signing in:", error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string, metadata: any) => {
    try {
      console.log("Signing up with:", email, metadata)

      // Demo account bypass
      if (email === "test@example.com") {
        console.log("Using demo account for sign up")
        setUser(mockUser)
        setSession({ user: mockUser } as unknown as Session)
        localStorage.setItem("demoLoggedIn", "true")
        return { error: null, user: mockUser }
      }

      // Real sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      })

      if (error) {
        console.error("Sign up error:", error)
        return { error, user: null }
      }

      if (data.user) {
        console.log("Signed up successfully:", data.user.id)
      }

      return { error: null, user: data.user }
    } catch (error: any) {
      console.error("Error signing up:", error)
      return { error, user: null }
    }
  }

  const signOut = async () => {
    try {
      console.log("Signing out...")

      // Clear demo session if using demo account
      if (user?.email === "test@example.com") {
        localStorage.removeItem("demoLoggedIn")
        setUser(null)
        setSession(null)
        router.push("/")
        return
      }

      // Real sign out with Supabase
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error("Sign out error:", error)
      } else {
        console.log("Signed out successfully")
        setUser(null)
        setSession(null)
      }

      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
