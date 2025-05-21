"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

// Sample data
const sectorData = [
  { name: "CleanTech", value: 30, color: "#3b82f6" },
  { name: "HealthTech", value: 25, color: "#8b5cf6" },
  { name: "FinTech", value: 20, color: "#10b981" },
  { name: "AI/ML", value: 15, color: "#f59e0b" },
  { name: "Supply Chain", value: 10, color: "#ef4444" },
]

export function SectorAllocation() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration errors with SSR
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[300px] w-full animate-pulse rounded-md bg-zinc-800/50" />
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 shadow-md">
          <p className="mb-1 font-medium">{payload[0].name}</p>
          <p className="text-sm" style={{ color: payload[0].payload.color }}>
            {payload[0].value}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex h-[300px] w-full flex-col">
      <ChartContainer
        config={{
          sector: {
            label: "Sector Allocation",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-[300px]"
      >
        <div className="flex h-full">
          <ResponsiveContainer width="60%" height="100%">
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
              >
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex w-[40%] flex-col justify-center space-y-2">
            {sectorData.map((sector) => (
              <div key={sector.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: sector.color }}></div>
                <div className="flex w-full justify-between">
                  <span className="text-sm">{sector.name}</span>
                  <span className="text-sm font-medium">{sector.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ChartContainer>
    </div>
  )
}
