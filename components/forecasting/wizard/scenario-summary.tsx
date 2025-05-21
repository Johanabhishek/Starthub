"use client"

interface ScenarioSummaryProps {
  data: any
}

export function ScenarioSummary({ data }: ScenarioSummaryProps) {
  // Format values for display
  const formatCurrency = (value: string) => {
    const num = Number.parseInt(value)
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`
    } else {
      return `$${num}`
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md bg-zinc-800/50 p-4">
        <h3 className="font-medium text-lg mb-4">Summary</h3>

        <div className="space-y-4">
          {/* Basic Info */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-purple-400">Basic Information</h4>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-zinc-500">Name</dt>
                <dd>{data.name || "Untitled Scenario"}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Time Horizon</dt>
                <dd>{data.timeframe || data.timeHorizon || "5"} years</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-zinc-500">Description</dt>
                <dd className="truncate">{data.description || "No description provided"}</dd>
              </div>
            </dl>
          </div>

          {/* Growth Assumptions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-purple-400">Growth Assumptions</h4>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-zinc-500">Annual Growth Rate</dt>
                <dd>{data.annualGrowthRate || data.growthRate || "20"}%</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Churn Rate</dt>
                <dd>{data.churnRate || "5"}%</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Acquisition Cost</dt>
                <dd>{formatCurrency(data.acquisitionCost || "1000")}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Growth Model</dt>
                <dd>
                  {data.growthModel === "compound"
                    ? "Compound Growth"
                    : data.growthModel === "linear"
                      ? "Linear Growth"
                      : data.growthModel === "s-curve"
                        ? "S-Curve Growth"
                        : "Custom Growth"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Exit Assumptions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-purple-400">Exit Assumptions</h4>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-zinc-500">Exit Multiple</dt>
                <dd>{data.exitMultiple || "3.5"}x</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Exit Timeline</dt>
                <dd>Year {data.exitTimeline || data.exitYear || "5"}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Exit Type</dt>
                <dd>
                  {data.exitType === "acquisition"
                    ? "Strategic Acquisition"
                    : data.exitType === "ipo"
                      ? "IPO"
                      : data.exitType === "secondary"
                        ? "Secondary Sale"
                        : data.exitType === "merger"
                          ? "Merger"
                          : "No Exit"}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Exit Probability</dt>
                <dd>{data.exitProbability || "70"}%</dd>
              </div>
            </dl>
          </div>

          {/* Risk Parameters */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-purple-400">Risk Parameters</h4>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-zinc-500">Success Rate</dt>
                <dd>{data.successRate || "30"}%</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Failure Rate</dt>
                <dd>{data.failureRate || "25"}%</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Volatility</dt>
                <dd className="capitalize">{data.volatility || "medium"}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Discount Rate</dt>
                <dd>{data.discountRate || "15"}%</dd>
              </div>
            </dl>
          </div>

          {/* Market Conditions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-purple-400">Market Conditions</h4>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-zinc-500">Market Environment</dt>
                <dd className="capitalize">{data.marketEnvironment || "neutral"}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Market Growth</dt>
                <dd>{data.marketGrowth || "15"}%</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Competition Intensity</dt>
                <dd className="capitalize">{data.competitionIntensity || "moderate"}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Regulatory Risk</dt>
                <dd className="capitalize">{data.regulatoryRisk || "neutral"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-zinc-400">
        Review the information above. Click "Create Scenario" to save or make changes by going back to previous steps.
      </div>
    </div>
  )
}
