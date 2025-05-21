import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ScenarioAssumptionsProps {
  individual?: boolean
}

export function ScenarioAssumptions({ individual = false }: ScenarioAssumptionsProps) {
  // Portfolio-level assumptions
  const portfolioAssumptions = [
    {
      name: "Annual Growth Rate",
      value: "20%",
      tooltip: "Expected annual growth rate for the portfolio",
    },
    {
      name: "Market Volatility",
      value: "Medium",
      tooltip: "Expected market volatility affecting portfolio performance",
    },
    {
      name: "Exit Multiple",
      value: "3.5x",
      tooltip: "Average exit multiple for portfolio companies",
    },
    {
      name: "Exit Timeline",
      value: "5-7 years",
      tooltip: "Expected time to liquidity for portfolio companies",
    },
    {
      name: "Success Rate",
      value: "30%",
      tooltip: "Percentage of investments expected to succeed",
    },
    {
      name: "Failure Rate",
      value: "25%",
      tooltip: "Percentage of investments expected to fail",
    },
  ]

  // Individual investment assumptions
  const investmentAssumptions = [
    {
      name: "Annual Growth Rate",
      value: "30%",
      tooltip: "Expected annual growth rate for this investment",
    },
    {
      name: "Revenue Growth",
      value: "45% YoY",
      tooltip: "Expected year-over-year revenue growth",
    },
    {
      name: "Burn Rate",
      value: "$120K/mo",
      tooltip: "Monthly cash burn rate",
    },
    {
      name: "Runway",
      value: "18 months",
      tooltip: "Remaining runway before next funding round",
    },
    {
      name: "Exit Multiple",
      value: "5.0x",
      tooltip: "Expected exit multiple",
    },
    {
      name: "Exit Timeline",
      value: "4 years",
      tooltip: "Expected time to liquidity",
    },
  ]

  const assumptions = individual ? investmentAssumptions : portfolioAssumptions

  return (
    <TooltipProvider>
      <div className="space-y-3">
        {assumptions.map((assumption) => (
          <div key={assumption.name} className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm text-zinc-400">{assumption.name}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 cursor-help text-zinc-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{assumption.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="text-sm font-medium">{assumption.value}</span>
          </div>
        ))}
      </div>
    </TooltipProvider>
  )
}
