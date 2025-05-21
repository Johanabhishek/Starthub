"use client"

import { Separator } from "@/components/ui/separator"

import { useState } from "react"
import Link from "next/link"
import { Bell, Menu, MessageSquare, Search, Settings, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function InvestorNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              Start<span className="text-purple-500">Hub</span>
            </span>
          </Link>
          <span className="rounded-md bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-300">Investor</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative text-zinc-400 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <Settings className="h-5 w-5" />
          </Button>
          <Separator className="mx-2 h-8 w-px bg-zinc-800" />
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="hidden lg:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-zinc-400">Angel Investor</p>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center justify-center rounded-md p-2 text-zinc-400 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-50 border-b border-zinc-800 bg-black md:hidden",
          isMenuOpen ? "block" : "hidden",
        )}
      >
        <div className="container px-4 py-4">
          <div className="flex items-center gap-4 border-b border-zinc-800 pb-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-zinc-400">Angel Investor</p>
            </div>
          </div>
          <nav className="mt-4 flex flex-col gap-2">
            <Button
              variant="ghost"
              className="justify-start text-zinc-400 hover:bg-zinc-900 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="mr-2 h-5 w-5" /> Search
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-zinc-400 hover:bg-zinc-900 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="mr-2 h-5 w-5" /> Messages
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-zinc-400 hover:bg-zinc-900 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <Bell className="mr-2 h-5 w-5" /> Notifications
            </Button>
            <Button
              variant="ghost"
              className="justify-start text-zinc-400 hover:bg-zinc-900 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="mr-2 h-5 w-5" /> Settings
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
