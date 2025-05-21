"use client"

import { useEffect, useState } from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

// Sample data
const riskData = [
  { category: "Diversification", value: 80, fullMark: 100 },
  { category: "Liquidity", value: 40, fullMark: 100 },
  { category: "Market Risk", value: 65, fullMark: 100 },
  { category: "Operational", value: 75, fullMark: 100 },
  { category: "Regulatory", value: 60, fullMark: 100 },
  { category: "Valuation", value: 70, fullMark: 100 },
]

export function RiskAssessment() {
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
          risk: {
            label: "Risk Assessment",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={riskData}>
            <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
            <PolarAngleAxis dataKey="category" tick={{ fill: "#71717a", fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#71717a", fontSize: 10 }} />
            <Radar
              name="Risk Profile"
              dataKey="value"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.6}
              animationDuration={500}
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
