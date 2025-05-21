"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function ScenarioSelector() {
  const [scenario, setScenario] = useState("base")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
          <span>Base Case</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Select Scenario</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={scenario} onValueChange={setScenario}>
          <DropdownMenuRadioItem value="base">Base Case</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bull">Bull Market</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bear">Bear Market</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="recession">Recession</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="custom">Custom Scenario</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
