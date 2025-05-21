import { ArrowDown, ArrowUp, Minus } from "lucide-react"

interface StartupMetricProps {
  label: string
  value: string
  change?: string
  trend?: "up" | "down" | "neutral"
}

export function StartupMetric({ label, value, change, trend }: StartupMetricProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-zinc-400">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      {change && (
        <div
          className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            trend === "up"
              ? "bg-green-950/30 text-green-400"
              : trend === "down"
                ? "bg-red-950/30 text-red-400"
                : "bg-zinc-800 text-zinc-400"
          }`}
        >
          {trend === "up" ? (
            <ArrowUp className="mr-1 h-3 w-3" />
          ) : trend === "down" ? (
            <ArrowDown className="mr-1 h-3 w-3" />
          ) : (
            <Minus className="mr-1 h-3 w-3" />
          )}
          {change}
        </div>
      )}
    </div>
  )
}
