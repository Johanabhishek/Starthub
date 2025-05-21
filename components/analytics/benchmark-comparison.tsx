"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const benchmarkData = [
  { month: "Jan", portfolio: 5.2, ventureFund: 4.1, techIndex: 3.8, privateEquity: 2.5 },
  { month: "Feb", portfolio: 4.8, ventureFund: 3.9, techIndex: 4.2, privateEquity: 2.8 },
  { month: "Mar", portfolio: 6.1, ventureFund: 4.5, techIndex: 5.0, privateEquity: 3.2 },
  { month: "Apr", portfolio: 5.7, ventureFund: 4.8, techIndex: 4.5, privateEquity: 3.5 },
  { month: "May", portfolio: 7.2, ventureFund: 5.2, techIndex: 4.8, privateEquity: 3.8 },
  { month: "Jun", portfolio: 8.5, ventureFund: 5.5, techIndex: 5.2, privateEquity: 4.0 },
  { month: "Jul", portfolio: 7.8, ventureFund: 5.8, techIndex: 5.5, privateEquity: 4.2 },
  { month: "Aug", portfolio: 8.2, ventureFund: 6.0, techIndex: 5.8, privateEquity: 4.5 },
  { month: "Sep", portfolio: 9.0, ventureFund: 6.2, techIndex: 6.0, privateEquity: 4.8 },
  { month: "Oct", portfolio: 8.5, ventureFund: 6.5, techIndex: 5.5, privateEquity: 5.0 },
  { month: "Nov", portfolio: 9.5, ventureFund: 6.8, techIndex: 6.2, privateEquity: 5.2 },
  { month: "Dec", portfolio: 10.2, ventureFund: 7.0, techIndex: 6.5, privateEquity: 5.5 },
]

export function BenchmarkComparison() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration errors with SSR
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[300px] w-full animate-pulse rounded-md bg-zinc-800/50" />
  }

  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={{
          portfolio: {
            label: "Your Portfolio",
            color: "hsl(var(--chart-1))",
          },
          ventureFund: {
            label: "Venture Fund Index",
            color: "hsl(var(--chart-2))",
          },
          techIndex: {
            label: "Tech Index",
            color: "hsl(var(--chart-3))",
          },
          privateEquity: {
            label: "Private Equity",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={benchmarkData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} dy={10} />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#71717a", fontSize: 12 }}
              dx={-10}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => <span className="text-xs text-zinc-400">{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="portfolio"
              stroke="var(--color-portfolio)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#8b5cf6" }}
            />
            <Line
              type="monotone"
              dataKey="ventureFund"
              stroke="var(--color-ventureFund)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="techIndex"
              stroke="var(--color-techIndex)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#10b981" }}
            />
            <Line
              type="monotone"
              dataKey="privateEquity"
              stroke="var(--color-privateEquity)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#f59e0b" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
