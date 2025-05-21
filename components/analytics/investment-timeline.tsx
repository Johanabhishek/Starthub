"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample data
const timelineData = [
  {
    id: 1,
    date: "Dec 2023",
    type: "investment",
    name: "FinFlow",
    logo: "/placeholder.svg?height=40&width=40",
    amount: "$500K",
    stage: "Series A",
    valuation: "$16.7M",
    details: "Led the Series A round with strategic investors",
  },
  {
    id: 2,
    date: "Jun 2023",
    type: "exit",
    name: "DataSync",
    logo: "/placeholder.svg?height=40&width=40",
    amount: "$125K",
    returnMultiple: "2.5x",
    details: "Partial exit following acquisition by TechGiant",
  },
  {
    id: 3,
    date: "Apr 2023",
    type: "followOn",
    name: "EcoTech Solutions",
    logo: "/placeholder.svg?height=40&width=40",
    amount: "$150K",
    stage: "Series A",
    valuation: "$12M",
    details: "Follow-on investment in Series A round",
  },
  {
    id: 4,
    date: "Dec 2022",
    type: "investment",
    name: "MindfulAI",
    logo: "/placeholder.svg?height=40&width=40",
    amount: "$100K",
    stage: "Pre-seed",
    valuation: "$1.25M",
    details: "Initial investment in mental health AI platform",
  },
  {
    id: 5,
    date: "Sep 2022",
    type: "investment",
    name: "EcoTech Solutions",
    logo: "/placeholder.svg?height=40&width=40",
    amount: "$100K",
    stage: "Seed",
    valuation: "$5M",
    details: "Initial investment in sustainable technology startup",
  },
]

export function InvestmentTimeline() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration errors with SSR
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[300px] w-full animate-pulse rounded-md bg-zinc-800/50" />
  }

  const getEventBadge = (type: string) => {
    switch (type) {
      case "investment":
        return (
          <Badge variant="outline" className="border-blue-800 bg-blue-950/30 text-blue-400">
            New Investment
          </Badge>
        )
      case "followOn":
        return (
          <Badge variant="outline" className="border-purple-800 bg-purple-950/30 text-purple-400">
            Follow-on
          </Badge>
        )
      case "exit":
        return (
          <Badge variant="outline" className="border-green-800 bg-green-950/30 text-green-400">
            Exit
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-zinc-800 bg-zinc-900 text-zinc-400">
            {type}
          </Badge>
        )
    }
  }

  return (
    <div className="h-[300px] overflow-y-auto pr-2">
      <div className="space-y-6">
        {timelineData.map((event, index) => (
          <div key={event.id} className="relative pl-6">
            {index !== timelineData.length - 1 && (
              <div className="absolute left-[11px] top-6 h-full w-[2px] bg-zinc-800"></div>
            )}
            <div
              className={`absolute left-0 top-1 h-6 w-6 rounded-full border-2 ${
                event.type === "investment"
                  ? "border-blue-500 bg-zinc-900"
                  : event.type === "followOn"
                    ? "border-purple-500 bg-zinc-900"
                    : "border-green-500 bg-zinc-900"
              }`}
            ></div>
            <div className="space-y-1 pb-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{event.date}</p>
                {getEventBadge(event.type)}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-zinc-800">
                  <Image
                    src={event.logo || "/placeholder.svg"}
                    alt={`${event.name} logo`}
                    width={32}
                    height={32}
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <h3 className="font-medium">{event.name}</h3>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <span className="text-zinc-300">
                  <span className="text-zinc-500">Amount:</span> {event.amount}
                </span>
                {event.stage && (
                  <span className="text-zinc-300">
                    <span className="text-zinc-500">Stage:</span> {event.stage}
                  </span>
                )}
                {event.valuation && (
                  <span className="text-zinc-300">
                    <span className="text-zinc-500">Valuation:</span> {event.valuation}
                  </span>
                )}
                {event.returnMultiple && (
                  <span className="flex items-center text-green-400">
                    <ArrowUp className="mr-1 h-3 w-3" /> {event.returnMultiple} return
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-400">{event.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
