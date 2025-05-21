"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for sensitivity analysis
const sensitivityData = [
  {
    parameter: "Growth Rate",
    impact: 35,
    description: "Annual growth rate of portfolio companies",
    color: "#3b82f6",
  },
  {
    parameter: "Exit Multiple",
    impact: 25,
    description: "Multiple at which companies exit",
    color: "#8b5cf6",
  },
  {
    parameter: "Time to Exit",
    impact: 15,
    description: "Years until liquidity event",
    color: "#10b981",
  },
  {
    parameter: "Success Rate",
    impact: 12,
    description: "Percentage of investments that succeed",
    color: "#f59e0b",
  },
  {
    parameter: "Follow-on Ratio",
    impact: 8,
    description: "Ratio of follow-on to initial investments",
    color: "#ef4444",
  },
  {
    parameter: "Market Conditions",
    impact: 5,
    description: "Overall market environment",
    color: "#6366f1",
  },
]

export function SensitivityAnalysis() {
  const [mounted, setMounted] = useState(false)
  const [metric, setMetric] = useState("portfolio-value")

  // Prevent hydration errors with SSR
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[300px] w-full animate-pulse rounded-md bg-zinc-800/50" />
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-md">
          <p className="mb-1 font-medium">{data.parameter}</p>
          <p className="text-sm" style={{ color: data.color }}>
            Impact: {data.impact}%
          </p>
          <p className="mt-2 text-xs text-zinc-400">{data.description}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={metric} onValueChange={setMetric}>
          <SelectTrigger className="w-[240px] border-zinc-800 bg-zinc-900">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portfolio-value">Portfolio Value</SelectItem>
            <SelectItem value="irr">Internal Rate of Return (IRR)</SelectItem>
            <SelectItem value="cash-multiple">Cash Multiple</SelectItem>
            <SelectItem value="time-to-liquidity">Time to Liquidity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[300px] w-full">
        <ChartContainer
          config={{
            impact: {
              label: "Impact",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sensitivityData} layout="vertical" margin={{ top: 20, right: 20, left: 120, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717a", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis
                dataKey="parameter"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717a", fontSize: 12 }}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="impact">
                {sensitivityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <p className="text-center text-sm text-zinc-400">
        This chart shows the relative impact of each parameter on the selected metric.
      </p>
    </div>
  )
}
