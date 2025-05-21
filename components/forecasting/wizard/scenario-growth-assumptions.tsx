"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface ScenarioGrowthAssumptionsProps {
  data: any
  updateData: (data: any) => void
}

export function ScenarioGrowthAssumptions({ data, updateData }: ScenarioGrowthAssumptionsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="growth-rate">Annual Growth Rate (%)</Label>
        <div className="flex items-center gap-4">
          <Slider
            id="growth-rate"
            value={[Number.parseInt(data.growthRate)]}
            onValueChange={(value) => updateData({ growthRate: value[0].toString() })}
            min={0}
            max={100}
            step={1}
            className="flex-1"
          />
          <Input
            type="number"
            value={data.growthRate}
            onChange={(e) => updateData({ growthRate: e.target.value })}
            className="w-20 border-zinc-700 bg-zinc-800"
          />
        </div>
        <p className="text-xs text-zinc-400">Expected annual revenue growth rate</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="growth-decay">Growth Decay Rate (%)</Label>
        <div className="flex items-center gap-4">
          <Slider
            id="growth-decay"
            value={[Number.parseInt(data.growthDecay)]}
            onValueChange={(value) => updateData({ growthDecay: value[0].toString() })}
            min={0}
            max={50}
            step={1}
            className="flex-1"
          />
          <Input
            type="number"
            value={data.growthDecay}
            onChange={(e) => updateData({ growthDecay: e.target.value })}
            className="w-20 border-zinc-700 bg-zinc-800"
          />
        </div>
        <p className="text-xs text-zinc-400">How much the growth rate decreases each year as the company matures</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="churn-rate">Customer Churn Rate (%)</Label>
        <div className="flex items-center gap-4">
          <Slider
            id="churn-rate"
            value={[Number.parseInt(data.churnRate)]}
            onValueChange={(value) => updateData({ churnRate: value[0].toString() })}
            min={0}
            max={50}
            step={1}
            className="flex-1"
          />
          <Input
            type="number"
            value={data.churnRate}
            onChange={(e) => updateData({ churnRate: e.target.value })}
            className="w-20 border-zinc-700 bg-zinc-800"
          />
        </div>
        <p className="text-xs text-zinc-400">Percentage of customers that stop using the product each year</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="acquisition-cost">Customer Acquisition Cost ($)</Label>
        <Input
          id="acquisition-cost"
          type="number"
          value={data.acquisitionCost}
          onChange={(e) => updateData({ acquisitionCost: e.target.value })}
          className="border-zinc-700 bg-zinc-800"
        />
        <p className="text-xs text-zinc-400">Average cost to acquire a new customer</p>
      </div>
    </div>
  )
}
