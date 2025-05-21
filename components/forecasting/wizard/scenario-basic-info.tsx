"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ScenarioBasicInfoProps {
  data: any
  updateData: (data: any) => void
}

export function ScenarioBasicInfo({ data, updateData }: ScenarioBasicInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="scenario-name">Scenario Name</Label>
        <Input
          id="scenario-name"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
          placeholder="e.g. Optimistic Growth Scenario"
          className="border-zinc-700 bg-zinc-800"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="scenario-description">Description</Label>
        <Textarea
          id="scenario-description"
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          placeholder="Describe the key assumptions and goals of this scenario"
          className="min-h-24 border-zinc-700 bg-zinc-800"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeframe">Forecast Timeframe (Years)</Label>
        <Select value={data.timeframe} onValueChange={(value) => updateData({ timeframe: value })}>
          <SelectTrigger id="timeframe" className="border-zinc-700 bg-zinc-800">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 Years</SelectItem>
            <SelectItem value="5">5 Years</SelectItem>
            <SelectItem value="7">7 Years</SelectItem>
            <SelectItem value="10">10 Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="startup-type">Startup Type</Label>
        <Select value={data.startupType} onValueChange={(value) => updateData({ startupType: value })}>
          <SelectTrigger id="startup-type" className="border-zinc-700 bg-zinc-800">
            <SelectValue placeholder="Select startup type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="saas">SaaS</SelectItem>
            <SelectItem value="marketplace">Marketplace</SelectItem>
            <SelectItem value="ecommerce">E-commerce</SelectItem>
            <SelectItem value="hardware">Hardware</SelectItem>
            <SelectItem value="biotech">Biotech</SelectItem>
            <SelectItem value="fintech">Fintech</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="initial-investment">Initial Investment ($)</Label>
        <Input
          id="initial-investment"
          type="number"
          value={data.initialInvestment}
          onChange={(e) => updateData({ initialInvestment: e.target.value })}
          placeholder="e.g. 500000"
          className="border-zinc-700 bg-zinc-800"
        />
      </div>
    </div>
  )
}
