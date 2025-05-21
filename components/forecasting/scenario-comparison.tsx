"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for scenario comparison
const scenarioComparisonData = [
  {
    year: 2024,
    "Base Case": 2220000,
    "Bull Market": 2405000,
    "Bear Market": 2035000,
    Recession: 1850000,
  },
  {
    year: 2025,
    "Base Case": 2664000,
    "Bull Market": 3126500,
    "Bear Market": 2238500,
    Recession: 1757500,
  },
  {
    year: 2026,
    "Base Case": 3196800,
    "Bull Market": 4064450,
    "Bear Market": 2462350,
    Recession: 1669625,
  },
  {
    year: 2027,
    "Base Case": 3836160,
    "Bull Market": 5283785,
    "Bear Market": 2708585,
    Recession: 1586144,
  },
  {
    year: 2028,
    "Base Case": 4603392,
    "Bull Market": 6868921,
    "Bear Market": 2979444,
    Recession: 1506837,
  },
]

// Sample data for key metrics comparison
const keyMetricsData = [
  {
    name: "Final Value",
    "Base Case": 4603392,
    "Bull Market": 6868921,
    "Bear Market": 2979444,
    Recession: 1506837,
  },
  {
    name: "CAGR",
    "Base Case": 20,
    "Bull Market": 30,
    "Bear Market": 10,
    Recession: -4,
  },
  {
    name: "IRR",
    "Base Case": 22.5,
    "Bull Market": 32.5,
    "Bear Market": 12.5,
    Recession: -2.5,
  },
  {
    name: "Multiple",
    "Base Case": 2.5,
    "Bull Market": 3.7,
    "Bear Market": 1.6,
    Recession: 0.8,
  },
]

// Colors for scenarios
const scenarioColors = {
  "Base Case": "#3b82f6",
  "Bull Market": "#10b981",
  "Bear Market": "#f59e0b",
  Recession: "#ef4444",
}

export function ScenarioComparison() {
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

  const formatValue = (value: number, metric: string) => {
    if (metric === "Final Value") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value)
    } else if (metric === "CAGR" || metric === "IRR") {
      return `${value}%`
    } else if (metric === "Multiple") {
      return `${value}x`
    }
    return value
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-md">
          <p className="mb-2 font-medium">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <p key={`item-${index}`} className="flex items-center justify-between text-sm">
                <span style={{ color: entry.fill }}>{entry.name}:</span>
                <span className="font-medium text-white">
                  {typeof entry.payload[entry.name] === "number" && entry.name !== "year"
                    ? formatValue(entry.payload[entry.name], payload[0].payload.name || "")
                    : entry.value}
                </span>
              </p>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="timeline">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timeline">Timeline Comparison</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="pt-4">
          <div className="h-[400px] w-full">
            <ChartContainer
              config={{
                "Base Case": {
                  label: "Base Case",
                  color: scenarioColors["Base Case"],
                },
                "Bull Market": {
                  label: "Bull Market",
                  color: scenarioColors["Bull Market"],
                },
                "Bear Market": {
                  label: "Bear Market",
                  color: scenarioColors["Bear Market"],
                },
                Recession: {
                  label: "Recession",
                  color: scenarioColors.Recession,
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scenarioComparisonData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
                  <YAxis
                    tickFormatter={formatYAxis}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#71717a", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="Base Case" fill={scenarioColors["Base Case"]} />
                  <Bar dataKey="Bull Market" fill={scenarioColors["Bull Market"]} />
                  <Bar dataKey="Bear Market" fill={scenarioColors["Bear Market"]} />
                  <Bar dataKey="Recession" fill={scenarioColors.Recession} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="pt-4">
          <div className="h-[400px] w-full">
            <ChartContainer
              config={{
                "Base Case": {
                  label: "Base Case",
                  color: scenarioColors["Base Case"],
                },
                "Bull Market": {
                  label: "Bull Market",
                  color: scenarioColors["Bull Market"],
                },
                "Bear Market": {
                  label: "Bear Market",
                  color: scenarioColors["Bear Market"],
                },
                Recession: {
                  label: "Recession",
                  color: scenarioColors.Recession,
                },
              }}
              className="h-[400px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={keyMetricsData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#71717a", fontSize: 12 }}
                    tickFormatter={(value) => {
                      const metric = keyMetricsData.find((d) => {
                        return (
                          d["Base Case"] === value ||
                          d["Bull Market"] === value ||
                          d["Bear Market"] === value ||
                          d.Recession === value
                        )
                      })
                      if (metric) {
                        return formatValue(value, metric.name)
                      }
                      return value
                    }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#71717a", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="Base Case">
                    {keyMetricsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={scenarioColors["Base Case"]} />
                    ))}
                  </Bar>
                  <Bar dataKey="Bull Market">
                    {keyMetricsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={scenarioColors["Bull Market"]} />
                    ))}
                  </Bar>
                  <Bar dataKey="Bear Market">
                    {keyMetricsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={scenarioColors["Bear Market"]} />
                    ))}
                  </Bar>
                  <Bar dataKey="Recession">
                    {keyMetricsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={scenarioColors.Recession} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap justify-center gap-6">
        {Object.entries(scenarioColors).map(([name, color]) => (
          <div key={name} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }}></div>
            <span className="text-xs text-zinc-400">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
