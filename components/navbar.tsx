"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const { user, signOut, isLoading } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
            StartHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-6 md:flex">
          <Link href="/startups" className="text-sm text-zinc-400 transition-colors hover:text-white">
            Explore
          </Link>
          <Link href="/cofounders" className="text-sm text-zinc-400 transition-colors hover:text-white">
            For Founders
          </Link>
          <Link href="/investor/opportunities" className="text-sm text-zinc-400 transition-colors hover:text-white">
            For Investors
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden space-x-4 md:flex">
          {isLoading ? (
            <div className="h-10 w-20 animate-pulse rounded bg-zinc-800"></div>
          ) : user ? (
            <>
              <Button
                variant="ghost"
                className="text-zinc-400 hover:text-white"
                onClick={() => {
                  if (user.user_metadata?.user_type === "founder") {
                    router.push("/startup/dashboard")
                  } else {
                    router.push("/investor/dashboard")
                  }
                }}
              >
                Dashboard
              </Button>
              <Button
                variant="outline"
                className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="text-zinc-400 hover:text-white"
                onClick={() => router.push("/auth/signin")}
              >
                Sign In
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => router.push("/auth/signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center justify-center md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-zinc-400" /> : <Menu className="h-6 w-6 text-zinc-400" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-16 z-50 border-b border-zinc-800 bg-black p-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/startups"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/cofounders"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              For Founders
            </Link>
            <Link
              href="/investor/opportunities"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              For Investors
            </Link>

            <div className="pt-4">
              {isLoading ? (
                <div className="h-10 w-full animate-pulse rounded bg-zinc-800"></div>
              ) : user ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-zinc-400 hover:text-white"
                    onClick={() => {
                      if (user.user_metadata?.user_type === "founder") {
                        router.push("/startup/dashboard")
                      } else {
                        router.push("/investor/dashboard")
                      }
                      setIsMenuOpen(false)
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    className="mt-2 w-full border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800"
                    onClick={() => {
                      signOut()
                      setIsMenuOpen(false)
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-zinc-400 hover:text-white"
                    onClick={() => {
                      router.push("/auth/signin")
                      setIsMenuOpen(false)
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="mt-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => {
                      router.push("/auth/signup")
                      setIsMenuOpen(false)
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
