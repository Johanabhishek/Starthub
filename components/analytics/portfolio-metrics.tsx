import { ArrowDown, ArrowUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function PortfolioMetrics() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Internal Rate of Return (IRR)</h3>
          <div className="flex items-center text-sm text-green-400">
            <ArrowUp className="mr-1 h-3 w-3" /> 22.5%
          </div>
        </div>
        <Progress value={75} className="h-2 bg-zinc-800" />
        <p className="text-xs text-zinc-500">Benchmark: 15% for early-stage venture investments</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Cash-on-Cash Multiple</h3>
          <div className="flex items-center text-sm text-green-400">
            <ArrowUp className="mr-1 h-3 w-3" /> 1.8x
          </div>
        </div>
        <Progress value={60} className="h-2 bg-zinc-800" />
        <p className="text-xs text-zinc-500">Benchmark: 3.0x for early-stage venture investments</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Time to Liquidity</h3>
          <div className="flex items-center text-sm text-zinc-300">3.5 years (est.)</div>
        </div>
        <Progress value={58} className="h-2 bg-zinc-800" />
        <p className="text-xs text-zinc-500">Benchmark: 5-7 years for early-stage venture investments</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Portfolio Diversification</h3>
          <div className="flex items-center text-sm text-green-400">
            <ArrowUp className="mr-1 h-3 w-3" /> High
          </div>
        </div>
        <Progress value={80} className="h-2 bg-zinc-800" />
        <p className="text-xs text-zinc-500">5 sectors, 12 companies across different stages</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Loss Ratio</h3>
          <div className="flex items-center text-sm text-green-400">
            <ArrowDown className="mr-1 h-3 w-3" /> 8.3%
          </div>
        </div>
        <Progress value={25} className="h-2 bg-zinc-800" />
        <p className="text-xs text-zinc-500">Benchmark: 25-30% for early-stage venture investments</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Unrealized to Total Value</h3>
          <div className="flex items-center text-sm text-yellow-400">73.7%</div>
        </div>
        <Progress value={74} className="h-2 bg-zinc-800" />
        <p className="text-xs text-zinc-500">$1.35M unrealized value out of $1.85M total portfolio value</p>
      </div>
    </div>
  )
}
