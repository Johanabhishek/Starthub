"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ScenarioRiskParametersProps {
  data: any
  updateData: (data: any) => void
}

export function ScenarioRiskParameters({ data, updateData }: ScenarioRiskParametersProps) {
  const [successRate, setSuccessRate] = useState([data.successRate])
  const [failureRate, setFailureRate] = useState([data.failureRate])
  const [confidenceInterval, setConfidenceInterval] = useState([data.confidenceInterval])

  const handleSuccessRateChange = (value: number[]) => {
    setSuccessRate(value)
    updateData({ successRate: value[0] })
  }

  const handleFailureRateChange = (value: number[]) => {
    setFailureRate(value)
    updateData({ failureRate: value[0] })
  }

  const handleConfidenceIntervalChange = (value: number[]) => {
    setConfidenceInterval(value)
    updateData({ confidenceInterval: value[0] })
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Label htmlFor="success-rate">Success Rate (%)</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 cursor-help text-zinc-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">Percentage of investments expected to succeed (3x+ return)</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="text-sm font-medium">{successRate[0]}%</span>
          </div>
          <Slider
            id="success-rate"
            min={0}
            max={100}
            step={1}
            value={successRate}
            onValueChange={handleSuccessRateChange}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Label htmlFor="failure-rate">Failure Rate (%)</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 cursor-help text-zinc-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">Percentage of investments expected to fail (0-0.5x return)</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="text-sm font-medium">{failureRate[0]}%</span>
          </div>
          <Slider
            id="failure-rate"
            min={0}
            max={100}
            step={1}
            value={failureRate}
            onValueChange={handleFailureRateChange}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Label htmlFor="confidence-interval">Confidence Interval (%)</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 cursor-help text-zinc-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    Statistical confidence level for forecast bounds (higher = wider bounds)
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <span className="text-sm font-medium">{confidenceInterval[0]}%</span>
          </div>
          <Slider
            id="confidence-interval"
            min={50}
            max={95}
            step={5}
            value={confidenceInterval}
            onValueChange={handleConfidenceIntervalChange}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-1">
            <Label htmlFor="volatility">Market Volatility</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 cursor-help text-zinc-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">Expected level of market volatility in this scenario</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <RadioGroup
            id="volatility"
            value={data.volatility}
            onValueChange={(value) => updateData({ volatility: value })}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="volatility-low" />
              <Label htmlFor="volatility-low" className="font-normal">
                Low - Stable markets with minimal fluctuations
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="volatility-medium" />
              <Label htmlFor="volatility-medium" className="font-normal">
                Medium - Moderate market fluctuations
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="volatility-high" />
              <Label htmlFor="volatility-high" className="font-normal">
                High - Significant market swings and uncertainty
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="extreme" id="volatility-extreme" />
              <Label htmlFor="volatility-extreme" className="font-normal">
                Extreme - Severe market turbulence and disruption
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </TooltipProvider>
  )
}
