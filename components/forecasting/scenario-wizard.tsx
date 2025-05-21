"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent } from "@/components/ui/tabs"

import { ScenarioBasicInfo } from "./wizard/scenario-basic-info"
import { ScenarioGrowthAssumptions } from "./wizard/scenario-growth-assumptions"
import { ScenarioExitAssumptions } from "./wizard/scenario-exit-assumptions"
import { ScenarioRiskParameters } from "./wizard/scenario-risk-parameters"
import { ScenarioMarketConditions } from "./wizard/scenario-market-conditions"
import { ScenarioSummary } from "./wizard/scenario-summary"

const steps = [
  { id: "basic-info", label: "Basic Info" },
  { id: "growth", label: "Growth" },
  { id: "exit", label: "Exit" },
  { id: "risk", label: "Risk" },
  { id: "market", label: "Market" },
  { id: "summary", label: "Summary" },
]

interface ScenarioWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete?: (scenarioData: any) => void
}

export function ScenarioWizard({ open, onOpenChange, onComplete }: ScenarioWizardProps) {
  const [currentStep, setCurrentStep] = useState("basic-info")
  const [scenarioData, setScenarioData] = useState({
    name: "",
    description: "",
    timeframe: "5",
    startupType: "saas",
    initialInvestment: "500000",
    growthRate: "30",
    growthDecay: "5",
    churnRate: "5",
    acquisitionCost: "1000",
    exitMultiple: "10",
    exitYear: "5",
    exitProbability: "70",
    discountRate: "15",
    failureRate: "20",
    volatility: "25",
    marketSize: "1000000000",
    marketGrowth: "15",
    competitionIntensity: "medium",
    regulatoryRisk: "low",
  })

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  const updateScenarioData = (data: Partial<typeof scenarioData>) => {
    setScenarioData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id)
    } else {
      // Complete the wizard
      onComplete?.(scenarioData)
      onOpenChange(false)
    }
  }

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id)
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-zinc-800 bg-zinc-900 p-0 text-white">
        <DialogHeader className="border-b border-zinc-800 p-6">
          <DialogTitle className="text-xl font-bold">Create New Scenario</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Define the parameters for your investment scenario.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-3">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                  currentStep === step.id
                    ? "border-purple-500 bg-purple-500/20 text-purple-400"
                    : currentStepIndex > index
                      ? "border-green-500 bg-green-500/20 text-green-400"
                      : "border-zinc-700 bg-zinc-800 text-zinc-400"
                }`}
              >
                {currentStepIndex > index ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <span className={`mt-1 text-xs ${currentStep === step.id ? "text-white" : "text-zinc-500"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <Tabs value={currentStep} className="min-h-[400px]">
          <TabsContent value="basic-info" className="m-0 p-6">
            <ScenarioBasicInfo data={scenarioData} updateData={updateScenarioData} />
          </TabsContent>
          <TabsContent value="growth" className="m-0 p-6">
            <ScenarioGrowthAssumptions data={scenarioData} updateData={updateScenarioData} />
          </TabsContent>
          <TabsContent value="exit" className="m-0 p-6">
            <ScenarioExitAssumptions data={scenarioData} updateData={updateScenarioData} />
          </TabsContent>
          <TabsContent value="risk" className="m-0 p-6">
            <ScenarioRiskParameters data={scenarioData} updateData={updateScenarioData} />
          </TabsContent>
          <TabsContent value="market" className="m-0 p-6">
            <ScenarioMarketConditions data={scenarioData} updateData={updateScenarioData} />
          </TabsContent>
          <TabsContent value="summary" className="m-0 p-6">
            <ScenarioSummary data={scenarioData} />
          </TabsContent>
        </Tabs>

        <DialogFooter className="border-t border-zinc-800 p-6">
          <div className="flex w-full items-center justify-between">
            <div>
              {currentStepIndex > 0 ? (
                <Button variant="outline" onClick={handlePrevious} className="border-zinc-700 bg-zinc-800">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              ) : (
                <Button variant="outline" onClick={handleCancel} className="border-zinc-700 bg-zinc-800">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              )}
            </div>
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {currentStepIndex === steps.length - 1 ? "Create Scenario" : "Next"}
              {currentStepIndex < steps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
