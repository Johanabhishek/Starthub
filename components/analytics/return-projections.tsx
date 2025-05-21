"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

// Sample data
const projectionData = [
  { year: 2023, conservative: 1850000, expected: 1850000, optimistic: 1850000 },
  { year: 2024, conservative: 2035000, expected: 2220000, optimistic: 2405000 },
  { year: 2025, conservative: 2238500, expected: 2664000, optimistic: 3126500 },
  { year: 2026, conservative: 2462350, expected: 3196800, optimistic: 4064450 },
  { year: 2027, conservative: 2708585, expected: 3836160, optimistic: 5283785 },
  { year: 2028, conservative: 2979444, expected: 4603392, optimistic: 6868921 },
]

export function ReturnProjections() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration errors with SSR
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[300px] w-full animate-pulse rounded-md bg-zinc-800/50" />
  }

  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value}`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-md">
          <p className="mb-2 font-medium">{label}</p>
          <div className="space-y-1">
            <p className="flex items-center justify-between text-sm">
              <span className="text-green-400">Optimistic:</span>
              <span className="font-medium">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(payload[2].value)}
              </span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span className="text-blue-400">Expected:</span>
              <span className="font-medium">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(payload[1].value)}
              </span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span className="text-yellow-400">Conservative:</span>
              <span className="font-medium">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(payload[0].value)}
              </span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={{
          optimistic: {
            label: "Optimistic",
            color: "hsl(var(--chart-1))",
          },
          expected: {
            label: "Expected",
            color: "hsl(var(--chart-2))",
          },
          conservative: {
            label: "Conservative",
            color: "hsl(var(--chart-3))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={projectionData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorOptimistic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorConservative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} dy={10} />
            <YAxis
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#71717a", fontSize: 12 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="conservative"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#colorConservative)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="expected"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorExpected)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="optimistic"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorOptimistic)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="mt-4 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-green-500"></div>
          <span className="text-xs text-zinc-400">Optimistic (30% CAGR)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-blue-500"></div>
          <span className="text-xs text-zinc-400">Expected (20% CAGR)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-yellow-500"></div>
          <span className="text-xs text-zinc-400">Conservative (10% CAGR)</span>
        </div>
      </div>
    </div>
  )
}
