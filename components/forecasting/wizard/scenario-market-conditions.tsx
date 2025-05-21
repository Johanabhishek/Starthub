"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

interface ScenarioMarketConditionsProps {
  data: any
  updateData: (data: any) => void
}

export function ScenarioMarketConditions({ data, updateData }: ScenarioMarketConditionsProps) {
  const [marketSize, setMarketSize] = useState([Number.parseInt(data.marketSize) / 1000000000])
  const [marketGrowth, setMarketGrowth] = useState([Number.parseInt(data.marketGrowth)])

  const handleMarketSizeChange = (value: number[]) => {
    setMarketSize(value)
    // Convert to full number before storing
    updateData({ marketSize: (value[0] * 1000000000).toString() })
  }

  const handleMarketGrowthChange = (value: number[]) => {
    setMarketGrowth(value)
    updateData({ marketGrowth: value[0].toString() })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="market-size">Total Addressable Market (TAM) in Billions</Label>
          <span className="text-sm font-medium">${marketSize[0]}B</span>
        </div>
        <Slider
          id="market-size"
          min={0.1}
          max={10}
          step={0.1}
          value={marketSize}
          onValueChange={handleMarketSizeChange}
        />
        <p className="text-xs text-zinc-400">The total size of the target market for your startup</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="market-growth">Market Growth Rate (% YoY)</Label>
          <span className="text-sm font-medium">{marketGrowth[0]}%</span>
        </div>
        <Slider
          id="market-growth"
          min={0}
          max={50}
          step={1}
          value={marketGrowth}
          onValueChange={handleMarketGrowthChange}
        />
        <p className="text-xs text-zinc-400">Expected annual growth rate of the total market</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="competition-intensity">Competition Intensity</Label>
        <Select
          id="competition-intensity"
          value={data.competitionIntensity}
          onValueChange={(value) => updateData({ competitionIntensity: value })}
        >
          <SelectTrigger className="border-zinc-800 bg-zinc-900">
            <SelectValue placeholder="Select competition intensity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low - Few competitors, blue ocean</SelectItem>
            <SelectItem value="medium">Medium - Growing competition</SelectItem>
            <SelectItem value="high">High - Crowded market space</SelectItem>
            <SelectItem value="extreme">Extreme - Saturated market</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-zinc-400">The level of competitive pressure in the market</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="regulatory-risk">Regulatory Risk</Label>
        <RadioGroup
          id="regulatory-risk"
          value={data.regulatoryRisk}
          onValueChange={(value) => updateData({ regulatoryRisk: value })}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="regulatory-low" />
            <Label htmlFor="regulatory-low" className="font-normal">
              Low - Stable, established regulations
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="regulatory-medium" />
            <Label htmlFor="regulatory-medium" className="font-normal">
              Medium - Some regulatory uncertainty
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="regulatory-high" />
            <Label htmlFor="regulatory-high" className="font-normal">
              High - Significant regulatory challenges
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="evolving" id="regulatory-evolving" />
            <Label htmlFor="regulatory-evolving" className="font-normal">
              Evolving - Regulations still forming
            </Label>
          </div>
        </RadioGroup>
        <p className="text-xs text-zinc-400">The level of regulatory risk affecting this market</p>
      </div>
    </div>
  )
}
