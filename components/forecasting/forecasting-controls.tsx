"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ForecastingControlsProps {
  individual?: boolean
}

export function ForecastingControls({ individual = false }: ForecastingControlsProps) {
  const [timeHorizon, setTimeHorizon] = useState([5])
  const [confidenceInterval, setConfidenceInterval] = useState([80])
  const [showActuals, setShowActuals] = useState(true)
  const [showBounds, setShowBounds] = useState(true)

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="time-horizon" className="text-sm text-zinc-400">
            Time Horizon (Years)
          </Label>
          <span className="text-sm font-medium">{timeHorizon[0]}</span>
        </div>
        <Slider
          id="time-horizon"
          min={1}
          max={10}
          step={1}
          value={timeHorizon}
          onValueChange={setTimeHorizon}
          className="py-1"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="confidence-interval" className="text-sm text-zinc-400">
            Confidence Interval
          </Label>
          <span className="text-sm font-medium">{confidenceInterval[0]}%</span>
        </div>
        <Slider
          id="confidence-interval"
          min={50}
          max={95}
          step={5}
          value={confidenceInterval}
          onValueChange={setConfidenceInterval}
          className="py-1"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="growth-model" className="text-sm text-zinc-400">
          Growth Model
        </Label>
        <Select defaultValue="compound">
          <SelectTrigger id="growth-model" className="border-zinc-800 bg-zinc-900">
            <SelectValue placeholder="Select growth model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="compound">Compound Growth</SelectItem>
            <SelectItem value="linear">Linear Growth</SelectItem>
            <SelectItem value="s-curve">S-Curve Growth</SelectItem>
            <SelectItem value="custom">Custom Growth</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show-actuals" className="text-sm text-zinc-400">
          Show Historical Data
        </Label>
        <Switch id="show-actuals" checked={showActuals} onCheckedChange={setShowActuals} />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show-bounds" className="text-sm text-zinc-400">
          Show Confidence Bounds
        </Label>
        <Switch id="show-bounds" checked={showBounds} onCheckedChange={setShowBounds} />
      </div>

      {individual && (
        <div className="space-y-3">
          <Label htmlFor="exit-scenario" className="text-sm text-zinc-400">
            Exit Scenario
          </Label>
          <Select defaultValue="acquisition">
            <SelectTrigger id="exit-scenario" className="border-zinc-800 bg-zinc-900">
              <SelectValue placeholder="Select exit scenario" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acquisition">Strategic Acquisition</SelectItem>
              <SelectItem value="ipo">IPO</SelectItem>
              <SelectItem value="secondary">Secondary Sale</SelectItem>
              <SelectItem value="no-exit">No Exit</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}
