"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ScenarioExitAssumptionsProps {
  data: any
  updateData: (data: any) => void
}

export function ScenarioExitAssumptions({ data, updateData }: ScenarioExitAssumptionsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="exit-multiple">Exit Multiple</Label>
        <div className="flex items-center gap-4">
          <Slider
            id="exit-multiple"
            value={[Number.parseInt(data.exitMultiple)]}
            onValueChange={(value) => updateData({ exitMultiple: value[0].toString() })}
            min={1}
            max={30}
            step={1}
            className="flex-1"
          />
          <Input
            type="number"
            value={data.exitMultiple}
            onChange={(e) => updateData({ exitMultiple: e.target.value })}
            className="w-20 border-zinc-700 bg-zinc-800"
          />
        </div>
        <p className="text-xs text-zinc-400">Revenue or EBITDA multiple for company valuation at exit</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="exit-year">Expected Exit Year</Label>
        <Select value={data.exitYear} onValueChange={(value) => updateData({ exitYear: value })}>
          <SelectTrigger id="exit-year" className="border-zinc-700 bg-zinc-800">
            <SelectValue placeholder="Select exit year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">Year 3</SelectItem>
            <SelectItem value="5">Year 5</SelectItem>
            <SelectItem value="7">Year 7</SelectItem>
            <SelectItem value="10">Year 10</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-zinc-400">When you expect the company to be acquired or go public</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="exit-probability">Exit Probability (%)</Label>
        <div className="flex items-center gap-4">
          <Slider
            id="exit-probability"
            value={[Number.parseInt(data.exitProbability)]}
            onValueChange={(value) => updateData({ exitProbability: value[0].toString() })}
            min={0}
            max={100}
            step={1}
            className="flex-1"
          />
          <Input
            type="number"
            value={data.exitProbability}
            onChange={(e) => updateData({ exitProbability: e.target.value })}
            className="w-20 border-zinc-700 bg-zinc-800"
          />
        </div>
        <p className="text-xs text-zinc-400">Probability of a successful exit (acquisition or IPO)</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="discount-rate">Discount Rate (%)</Label>
        <div className="flex items-center gap-4">
          <Slider
            id="discount-rate"
            value={[Number.parseInt(data.discountRate)]}
            onValueChange={(value) => updateData({ discountRate: value[0].toString() })}
            min={0}
            max={50}
            step={1}
            className="flex-1"
          />
          <Input
            type="number"
            value={data.discountRate}
            onChange={(e) => updateData({ discountRate: e.target.value })}
            className="w-20 border-zinc-700 bg-zinc-800"
          />
        </div>
        <p className="text-xs text-zinc-400">Rate used to discount future cash flows to present value</p>
      </div>
    </div>
  )
}
