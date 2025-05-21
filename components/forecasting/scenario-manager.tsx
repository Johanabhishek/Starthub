"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScenarioWizard } from "@/components/forecasting/scenario-wizard"

interface Scenario {
  id: string
  name: string
  description: string
  color: string
}

interface ScenarioManagerProps {
  scenarios?: Scenario[]
}

export function ScenarioManager({ scenarios: initialScenarios = [] }: ScenarioManagerProps) {
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios)

  const handleComplete = (scenarioData: any) => {
    const newScenario = {
      id: `scenario-${scenarios.length + 1}`,
      name: scenarioData.name || "Untitled Scenario",
      description: scenarioData.description || "",
      color: scenarioData.color || "#3b82f6",
    }

    setScenarios([...scenarios, newScenario])
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Forecasting Scenarios</h3>
        <Button
          onClick={() => setIsWizardOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Scenario
        </Button>
      </div>

      <ScenarioWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} onComplete={handleComplete} />
    </div>
  )
}
