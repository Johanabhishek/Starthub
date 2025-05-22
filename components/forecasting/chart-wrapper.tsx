"use client"

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
  TooltipProps,
} from "recharts"

interface ChartProps {
  type: "simulation" | "distribution"
  data: any[]
  tooltipContent: (props: TooltipProps<any, any>) => React.ReactNode
  formatYAxis?: (value: number) => string
}

export function Chart({ type, data, tooltipContent, formatYAxis }: ChartProps) {
  if (type === "simulation") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorP5090" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorP2575" x1="0" y1="0" x2="0" y2="1">
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
          <Tooltip content={tooltipContent} />
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
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis dataKey="value" axisLine={false} tickLine={false} tick={{ fill: "#71717a", fontSize: 12 }} />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#71717a", fontSize: 12 }}
          label={{ value: "Probability (%)", angle: -90, position: "insideLeft", fill: "#71717a" }}
        />
        <Tooltip content={tooltipContent} />
        <Bar dataKey="probability">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
} 