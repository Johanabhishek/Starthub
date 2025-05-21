"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "@/components/navbar"
import { useToast } from "@/components/ui/use-toast"
import { getSupabaseClient } from "@/lib/supabase/client"

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("password123")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = getSupabaseClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Attempting to sign in with:", email)

      // For demo purposes, bypass actual authentication
      if (email === "test@example.com" && password === "password123") {
        console.log("Using demo bypass")
        toast({
          title: "Welcome to StartHub!",
          description: "You've been signed in with the demo account.",
        })

        // Simulate a delay for realism
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Redirect to investor dashboard
        router.push("/investor/dashboard")
        return
      }

      // Real authentication with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Sign in error:", error)
        toast({
          title: "Error signing in",
          description: error.message || "Invalid login credentials",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      console.log("Sign in successful:", data.user?.id)
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      })

      // Redirect based on user type
      const userType = data.user?.user_metadata?.user_type || "investor"
      if (userType === "founder") {
        router.push("/startup/dashboard")
      } else {
        router.push("/investor/dashboard")
      }
    } catch (error: any) {
      console.error("Unexpected error during sign in:", error)
      toast({
        title: "Error",
        description: error.message || "An error occurred during sign in",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const useDemoAccount = () => {
    setEmail("test@example.com")
    setPassword("password123")
    toast({
      title: "Demo credentials set",
      description: "Click Sign In to continue with the demo account",
    })
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 pt-16">
        <div className="w-full max-w-md space-y-8 rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">Sign In</h1>
            <p className="text-zinc-400">Welcome to StartHub</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="border-zinc-800 bg-zinc-900 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/auth/forgot-password" className="text-sm text-purple-500 hover:text-purple-400">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="border-zinc-800 bg-zinc-900 pr-10 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center text-sm text-zinc-400">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-purple-500 hover:text-purple-400">
                Sign up
              </Link>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-zinc-950 px-2 text-zinc-400">Or</span>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
            onClick={useDemoAccount}
          >
            Use Demo Account
          </Button>

          <div className="pt-4">
            <Button
              variant="ghost"
              className="flex w-full items-center justify-center text-zinc-400 hover:text-white"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
