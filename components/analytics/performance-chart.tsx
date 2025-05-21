"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

// Sample data
const performanceData = [
  { date: "2022-06", value: 1000000, event: null },
  { date: "2022-07", value: 1050000, event: null },
  { date: "2022-08", value: 1080000, event: null },
  { date: "2022-09", value: 1150000, event: "New Investment: EcoTech" },
  { date: "2022-10", value: 1200000, event: null },
  { date: "2022-11", value: 1180000, event: null },
  { date: "2022-12", value: 1250000, event: "New Investment: MindfulAI" },
  { date: "2023-01", value: 1300000, event: null },
  { date: "2023-02", value: 1350000, event: null },
  { date: "2023-03", value: 1400000, event: null },
  { date: "2023-04", value: 1450000, event: "EcoTech Series A" },
  { date: "2023-05", value: 1550000, event: null },
  { date: "2023-06", value: 1650000, event: "Partial Exit: DataSync" },
  { date: "2023-07", value: 1700000, event: null },
  { date: "2023-08", value: 1750000, event: null },
  { date: "2023-09", value: 1800000, event: null },
  { date: "2023-10", value: 1780000, event: null },
  { date: "2023-11", value: 1820000, event: null },
  { date: "2023-12", value: 1850000, event: "New Investment: FinFlow" },
]

export function PerformanceChart() {
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

  const formatDate = (date: string) => {
    const [year, month] = date.split("-")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${monthNames[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={{
          value: {
            label: "Portfolio Value",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#71717a", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#71717a", fontSize: 12 }}
              dx={-10}
            />
            <ChartTooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-md">
                      <p className="mb-1 font-medium">{formatDate(data.date)}</p>
                      <p className="text-sm text-green-400">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        }).format(data.value)}
                      </p>
                      {data.event && <p className="mt-2 text-xs text-zinc-400">{data.event}</p>}
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
