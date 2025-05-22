import * as React from "react"
import { TooltipProps } from "recharts"

export interface ChartProps {
  type: "simulation" | "distribution"
  data: any[]
  tooltipContent: (props: TooltipProps<any, any>) => React.ReactNode
  formatYAxis?: (value: number) => string
}

export function Chart(props: ChartProps): React.ReactElement 