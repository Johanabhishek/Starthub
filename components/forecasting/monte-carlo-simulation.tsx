"use client"

import { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for Monte Carlo simulation
const simulationData = [
  { year: 2023, p10: 1850000, p25: 1850000, p50: 1850000, p75: 1850000, p90: 1850000 },
  { year: 2024, p10: 1950000, p25: 2050000, p50: 2220000, p75: 2350000, p90: 2500000 },
  { year: 2025, p10: 2050000, p25: 2300000, p50: 2664000, p75: 2950000, p90: 3250000 },
  { year: 2026, p10: 2150000, p25: 2600000, p50: 3196800, p75: 3700000, p90: 4200000 },
  { year: 2027, p10: 2250000, p25: 2950000, p50: 3836160, p75: 4600000, p90: 5400000 },
  { year: 2028, p10: 2350000, p25: 3350000, p50: 4603392, p75: 5750000, p90: 7000000 },
]

// Sample data for probability distribution
const distributionData = [
  { value: "< $2.5M", probability: 5, color: "#ef4444" },
  { value: "$2.5M - $3.5M", probability: 15, color: "#f59e0b" },
  { value: "$3.5M - $4.5M", probability: 30, color: "#3b82f6" },
  { value: "$4.5M - $5.5M", probability: 25, color: "#8b5cf6" },
  { value: "$5.5M - $6.5M", probability: 15, color: "#10b981" },
  { value: "> $6.5M", probability: 10, color: "#6366f1" },
]

export function MonteCarloSimulation() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration errors with SSR
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[500px] w-full animate-pulse rounded-md bg-zinc-800/50" />
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

  const SimulationTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-md">
          <p className="mb-2 font-medium">{label}</p>
          <div className="space-y-1">
            <p className="flex items-center justify-between text-sm">
              <span className="text-purple-400">90th Percentile:</span>
              <span className="font-medium text-white">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(payload[4].value)}
              </span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span className="text-blue-400">75th Percentile:</span>
              <span className="font-medium text-white">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(payload[3].value)}
              </span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span className="text-green-400">Median (50th):</span>
              <span className="font-medium text-white">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(payload[2].value)}
              </span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span className="text-yellow-400">25th Percentile:</span>
              <span className="font-medium text-white">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(payload[1].value)}
              </span>
            </p>
            <p className="flex items-center justify-between text-sm">
              <span className="text-red-400">10th Percentile:</span>
              <span className="font-medium text-white">
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

  const DistributionTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-md">
          <p className="mb-1 font-medium">{data.value}</p>
          <p className="text-sm" style={{ color: data.color }}>
            Probability: {data.probability}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="simulation">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="simulation">Simulation Paths</TabsTrigger>
          <TabsTrigger value="distribution">Probability Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="simulation" className="pt-4">
          <div className="h-[400px] w-full">
            <ChartContainer
              config={{
                p90: {
                  label: "90th Percentile",
                  color: "hsl(var(--chart-1))",
                },
                p75: {
                  label: "75th Percentile",
                  color: "hsl(var(--chart-2))",
                },
                p50: {
                  label: "Median (50th)",
                  color: "hsl(var(--chart-3))",
                },
                p25: {
                  label: "25th Percentile",
                  color: "hsl(var(--chart-4))",
                },
                p10: {
                  label: "10th Percentile",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulationData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorP5090" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorP2575" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6"  x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
                  <YAxis
                    tickFormatter={formatYAxis}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#71717a", fontSize: 12 }}
                  />
                  <Tooltip content={<SimulationTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="p10"
                    stroke="#ef4444"
                    fill="none"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="p25"
                    stroke="#f59e0b"
                    fill="none"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="p50"
                    stroke="#10b981"
                    fill="none"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="p75"
                    stroke="#3b82f6"
                    fill="url(#colorP2575)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="p90"
                    stroke="#8b5cf6"
                    fill="url(#colorP5090)"
                    strokeWidth={2}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-purple-500"></div>
              <span className="text-xs text-zinc-400">90th Percentile</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-blue-500"></div>
              <span className="text-xs text-zinc-400">75th Percentile</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-green-500"></div>
              <span className="text-xs text-zinc-400">Median (50th)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-yellow-500"></div>
              <span className="text-xs text-zinc-400">25th Percentile</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-red-500"></div>
              <span className="text-xs text-zinc-400">10th Percentile</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="pt-4">
          <div className="h-[400px] w-full">
            <ChartContainer
              config={{
                probability: {
                  label: "Probability",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={distributionData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="value" axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
                  <YAxis
                    tickFormatter={(value) => `${value}%`}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#71717a", fontSize: 12 }}
                  />
                  <Tooltip content={<DistributionTooltip />} />
                  <Bar dataKey="probability" radius={[4, 4, 0, 0]}>
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <p className="mt-4 text-center text-sm text-zinc-400">
            Probability distribution of portfolio value in 2028 based on 10,000 simulations
          </p>
        </TabsContent>
      </Tabs>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        <h3 className="mb-2 font-medium">Simulation Results</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-zinc-800/50 p-3">
            <p className="text-xs text-zinc-400">Expected Value</p>
            <p className="text-xl font-bold">$4.6M</p>
          </div>
          <div className="rounded-lg bg-zinc-800/50 p-3">
            <p className="text-xs text-zinc-400">Probability of 2x Return</p>
            <p className="text-xl font-bold">78%</p>
          </div>
          <div className="rounded-lg bg-zinc-800/50 p-3">
            <p className="text-xs text-zinc-400">Probability of 3x Return</p>
            <p className="text-xl font-bold">42%</p>
          </div>
          <div className="rounded-lg bg-zinc-800/50 p-3">
            <p className="text-xs text-zinc-400">Downside Risk (10th %)</p>
            <p className="text-xl font-bold">$2.35M</p>
          </div>
        </div>
      </div>
    </div>
  );
}
