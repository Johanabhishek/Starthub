import { ArrowUp, DollarSign, Percent, TrendingUp } from "lucide-react"

export function PortfolioOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-zinc-400">Total Portfolio Value</p>
            <h3 className="mt-1 text-2xl font-bold">$1.85M</h3>
            <p className="mt-1 flex items-center text-xs text-green-400">
              <ArrowUp className="mr-1 h-3 w-3" /> 15.2% from initial investment
            </p>
          </div>
          <div className="rounded-full bg-blue-950/30 p-2 text-blue-400">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-zinc-400">Unrealized Gains</p>
            <h3 className="mt-1 text-2xl font-bold">$350K</h3>
            <p className="mt-1 flex items-center text-xs text-green-400">
              <ArrowUp className="mr-1 h-3 w-3" /> 28.0% ROI
            </p>
          </div>
          <div className="rounded-full bg-green-950/30 p-2 text-green-400">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-zinc-400">Realized Returns</p>
            <h3 className="mt-1 text-2xl font-bold">$125K</h3>
            <p className="mt-1 flex items-center text-xs text-green-400">
              <ArrowUp className="mr-1 h-3 w-3" /> 2 successful exits
            </p>
          </div>
          <div className="rounded-full bg-purple-950/30 p-2 text-purple-400">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-zinc-400">Portfolio IRR</p>
            <h3 className="mt-1 text-2xl font-bold">22.5%</h3>
            <p className="mt-1 flex items-center text-xs text-green-400">
              <ArrowUp className="mr-1 h-3 w-3" /> 5.3% above target
            </p>
          </div>
          <div className="rounded-full bg-yellow-950/30 p-2 text-yellow-400">
            <Percent className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  )
}
