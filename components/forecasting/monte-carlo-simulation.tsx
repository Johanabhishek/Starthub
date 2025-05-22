"use client"

import { useEffect, useState } from "react"
import dynamic from 'next/dynamic'
import { ChartContainer } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { TooltipProps } from "recharts"

const Chart = dynamic(
  () => import('./chart-wrapper').then((mod) => mod.Chart),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] w-full items-center justify-center rounded-md bg-zinc-800/50">
        <div className="text-sm text-zinc-400">Loading charts...</div>
      </div>
    ),
  }
)

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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center rounded-md bg-zinc-800/50">
        <div className="text-sm text-zinc-400">Loading charts...</div>
      </div>
    )
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

  const SimulationTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
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

  const DistributionTooltip = ({ active, payload }: TooltipProps<any, any>) => {
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
                  color: "#8b5cf6",
                },
                p75: {
                  label: "75th Percentile",
                  color: "#3b82f6",
                },
                p50: {
                  label: "Median (50th)",
                  color: "#10b981",
                },
                p25: {
                  label: "25th Percentile",
                  color: "#f59e0b",
                },
                p10: {
                  label: "10th Percentile",
                  color: "#ef4444",
                },
              }}
              className="h-[400px]"
            >
              <Chart
                type="simulation"
                data={simulationData}
                tooltipContent={SimulationTooltip}
                formatYAxis={formatYAxis}
              />
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
                  color: "#3b82f6",
                },
              }}
              className="h-[400px]"
            >
              <Chart
                type="distribution"
                data={distributionData}
                tooltipContent={DistributionTooltip}
              />
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
