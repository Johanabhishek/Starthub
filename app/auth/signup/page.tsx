"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "@/components/navbar"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [accountType, setAccountType] = useState("founder")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!termsAccepted) {
      toast({
        title: "Terms Required",
        description: "You must accept the terms and conditions to create an account.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      console.log("Starting sign up process...")

      // Sign up with Supabase Auth - include user_type in metadata
      // The database trigger will automatically create the profile
      const { error, user } = await signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
        user_type: accountType,
      })

      if (error) {
        console.error("Sign up error:", error)
        toast({
          title: "Error creating account",
          description: error.message,
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      console.log("User created:", user)

      if (!user) {
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link to complete your registration.",
        })
        setIsLoading(false)
        return
      }

      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      })

      // Redirect based on account type
      if (accountType === "founder") {
        router.push("/startup/create")
      } else {
        router.push("/investor/register")
      }
    } catch (error: any) {
      console.error("Unexpected error:", error)
      toast({
        title: "Error",
        description: error.message || "An error occurred during sign up",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 pt-16">
        <div className="w-full max-w-md space-y-8 rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">Create an Account</h1>
            <p className="text-zinc-400">Join StartHub and start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    required
                    className="border-zinc-800 bg-zinc-900 text-white"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    required
                    className="border-zinc-800 bg-zinc-900 text-white"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="border-zinc-800 bg-zinc-900 pr-10 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-zinc-500">
                  Must be at least 8 characters and include a number and a special character
                </p>
              </div>

              <div className="space-y-2">
                <Label>I am a</Label>
                <RadioGroup
                  defaultValue="founder"
                  className="grid grid-cols-2 gap-4"
                  value={accountType}
                  onValueChange={setAccountType}
                >
                  <div className="flex items-center space-x-2 rounded-md border border-zinc-800 bg-zinc-900 p-3">
                    <RadioGroupItem value="founder" id="founder" />
                    <Label htmlFor="founder" className="cursor-pointer font-normal">
                      Founder
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border border-zinc-800 bg-zinc-900 p-3">
                    <RadioGroupItem value="investor" id="investor" />
                    <Label htmlFor="investor" className="cursor-pointer font-normal">
                      Investor
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Link href="/terms" className="text-purple-500 hover:text-purple-400">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-purple-500 hover:text-purple-400">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>

            <div className="text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-purple-500 hover:text-purple-400">
                Sign in
              </Link>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-zinc-950 px-2 text-zinc-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
              onClick={() => {
                setIsLoading(true)
                // Will implement OAuth later
                toast({
                  title: "Coming soon",
                  description: "Social login will be available soon",
                })
                setIsLoading(false)
              }}
            >
              Google
            </Button>
            <Button
              variant="outline"
              className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
              onClick={() => {
                setIsLoading(true)
                // Will implement OAuth later
                toast({
                  title: "Coming soon",
                  description: "Social login will be available soon",
                })
                setIsLoading(false)
              }}
            >
              GitHub
            </Button>
          </div>

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
