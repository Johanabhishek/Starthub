"use client"

import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

// Sample data for portfolio forecast
const portfolioForecastData = [
  { year: 2023, actual: 1850000, forecast: 1850000, lower: 1850000, upper: 1850000 },
  { year: 2024, actual: null, forecast: 2220000, lower: 2035000, upper: 2405000 },
  { year: 2025, actual: null, forecast: 2664000, lower: 2238500, upper: 3126500 },
  { year: 2026, actual: null, forecast: 3196800, lower: 2462350, upper: 4064450 },
  { year: 2027, actual: null, forecast: 3836160, lower: 2708585, upper: 5283785 },
  { year: 2028, actual: null, forecast: 4603392, lower: 2979444, upper: 6868921 },
]

// Sample data for individual investment forecast
const investmentForecastData = [
  { year: 2023, actual: 250000, forecast: 250000, lower: 250000, upper: 250000 },
  { year: 2024, actual: null, forecast: 325000, lower: 287500, upper: 362500 },
  { year: 2025, actual: null, forecast: 422500, lower: 345000, upper: 507000 },
  { year: 2026, actual: null, forecast: 549250, lower: 414000, upper: 710000 },
  { year: 2027, actual: null, forecast: 714025, lower: 496800, upper: 994000 },
  { year: 2028, actual: null, forecast: 928233, lower: 596160, upper: 1391600 },
]

interface ForecastChartProps {
  individual?: boolean
}

export function ForecastChart({ individual = false }: ForecastChartProps) {
  const [mounted, setMounted] = useState(false)
  const data = individual ? investmentForecastData : portfolioForecastData

  // Prevent hydration errors with SSR
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[400px] w-full animate-pulse rounded-md bg-zinc-800/50" />
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
            {payload[0].payload.actual !== null && (
              <p className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Actual:</span>
                <span className="font-medium text-white">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(payload[0].payload.actual)}
                </span>
              </p>
            )}
            <p className="flex items-center justify-between text-sm">
              <span className="text-blue-400">Forecast:</span>
              <span className="font-medium text-white">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(payload[0].payload.forecast)}
              </span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span className="text-green-400">Upper Bound:</span>
              <span className="font-medium text-white">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(payload[0].payload.upper)}
              </span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span className="text-yellow-400">Lower Bound:</span>
              <span className="font-medium text-white">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(payload[0].payload.lower)}
              </span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-[400px] w-full">
      <ChartContainer
        config={{
          forecast: {
            label: "Forecast",
            color: "hsl(var(--chart-1))",
          },
          actual: {
            label: "Actual",
            color: "hsl(var(--chart-2))",
          },
          upper: {
            label: "Upper Bound",
            color: "hsl(var(--chart-3))",
          },
          lower: {
            label: "Lower Bound",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="h-[400px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorUpper" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLower" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
            <ChartTooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="upper"
              stroke="#10b981"
              strokeWidth={1}
              strokeDasharray="3 3"
              fillOpacity={1}
              fill="url(#colorUpper)"
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="#f59e0b"
              strokeWidth={1}
              strokeDasharray="3 3"
              fillOpacity={1}
              fill="url(#colorLower)"
            />
            <Area
              type="monotone"
              dataKey="forecast"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorForecast)"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#ffffff"
              strokeWidth={3}
              dot={{ r: 4, fill: "#ffffff", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="mt-4 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-white"></div>
          <span className="text-xs text-zinc-400">Actual</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-blue-500"></div>
          <span className="text-xs text-zinc-400">Forecast</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-green-500"></div>
          <span className="text-xs text-zinc-400">Upper Bound</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-yellow-500"></div>
          <span className="text-xs text-zinc-400">Lower Bound</span>
        </div>
      </div>
    </div>
  )
}
