"use client"

import { useState } from "react"
import { ChevronDown, Download, Filter, Plus, Save, Share2, Sliders } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GradientBlob } from "@/components/gradient-blob"
import { InvestorNavbar } from "@/components/investor-navbar"
import { InvestorSidebar } from "@/components/investor-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ScenarioManager } from "@/components/forecasting/scenario-manager"
import { ForecastChart } from "@/components/forecasting/forecast-chart"
import { ScenarioComparison } from "@/components/forecasting/scenario-comparison"
import { SensitivityAnalysis } from "@/components/forecasting/sensitivity-analysis"
import { MonteCarloSimulation } from "@/components/forecasting/monte-carlo-simulation"
import { ScenarioAssumptions } from "@/components/forecasting/scenario-assumptions"
import { ScenarioSelector } from "@/components/forecasting/scenario-selector"
import { ForecastingControls } from "@/components/forecasting/forecasting-controls"
import { ScenarioWizard } from "@/components/forecasting/scenario-wizard"

export default function PortfolioForecasting() {
  const [wizardOpen, setWizardOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <GradientBlob className="absolute -top-40 -left-40 h-[500px] w-[500px] bg-purple-500/20 blur-[120px]" />
        <GradientBlob className="absolute top-[60%] -right-40 h-[400px] w-[400px] bg-blue-500/20 blur-[120px]" />

        <InvestorNavbar />

        <SidebarProvider>
          <div className="flex">
            <InvestorSidebar />

            <main className="flex-1 pb-16 pt-16">
              <div className="container px-4 py-8">
                {/* Dashboard Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h1 className="text-3xl font-bold">Portfolio Forecasting</h1>
                    <p className="text-zinc-400">Model different scenarios for your investment portfolio</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900">
                      <Save className="mr-2 h-4 w-4" /> Save
                    </Button>
                    <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900">
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900">
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => setWizardOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" /> New Scenario
                    </Button>
                  </div>
                </div>

                {/* Scenario Manager */}
                <div className="mb-8">
                  <ScenarioManager />
                </div>

                {/* Main Forecasting Content */}
                <Tabs defaultValue="portfolio" className="mb-8">
                  <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <TabsList>
                      <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                      <TabsTrigger value="individual">Individual Investments</TabsTrigger>
                      <TabsTrigger value="comparison">Scenario Comparison</TabsTrigger>
                      <TabsTrigger value="montecarlo">Monte Carlo</TabsTrigger>
                    </TabsList>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                        <Sliders className="mr-2 h-4 w-4" /> Settings
                      </Button>
                    </div>
                  </div>

                  {/* Portfolio Forecast Tab */}
                  <TabsContent value="portfolio">
                    <div className="grid gap-8 lg:grid-cols-3">
                      <div className="lg:col-span-2">
                        <Card className="border-zinc-800 bg-zinc-900/50">
                          <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                              <CardTitle>Portfolio Value Forecast</CardTitle>
                              <CardDescription>Projected growth over time</CardDescription>
                            </div>
                            <ScenarioSelector />
                          </CardHeader>
                          <CardContent>
                            <ForecastChart />
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-8">
                        <Card className="border-zinc-800 bg-zinc-900/50">
                          <CardHeader className="pb-2">
                            <CardTitle>Scenario Assumptions</CardTitle>
                            <CardDescription>Key parameters for this forecast</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ScenarioAssumptions />
                          </CardContent>
                          <CardFooter className="border-t border-zinc-800 px-6 py-4">
                            <Button
                              variant="outline"
                              className="w-full border-zinc-800 text-zinc-300 hover:bg-zinc-900"
                            >
                              <Sliders className="mr-2 h-4 w-4" /> Adjust Parameters
                            </Button>
                          </CardFooter>
                        </Card>

                        <Card className="border-zinc-800 bg-zinc-900/50">
                          <CardHeader className="pb-2">
                            <CardTitle>Forecasting Controls</CardTitle>
                            <CardDescription>Adjust time horizon and variables</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ForecastingControls />
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Card className="border-zinc-800 bg-zinc-900/50">
                        <CardHeader className="pb-2">
                          <CardTitle>Sensitivity Analysis</CardTitle>
                          <CardDescription>
                            See how changes in key variables affect your portfolio forecast
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <SensitivityAnalysis />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Individual Investments Tab */}
                  <TabsContent value="individual">
                    <div className="grid gap-8 lg:grid-cols-3">
                      <div className="lg:col-span-2">
                        <Card className="border-zinc-800 bg-zinc-900/50">
                          <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                              <CardTitle>Investment Value Forecast</CardTitle>
                              <CardDescription>Projected growth for individual investments</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                                <span>Select Investment</span>
                                <ChevronDown className="ml-2 h-4 w-4" />
                              </Button>
                              <ScenarioSelector />
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ForecastChart individual />
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-8">
                        <Card className="border-zinc-800 bg-zinc-900/50">
                          <CardHeader className="pb-2">
                            <CardTitle>Investment Assumptions</CardTitle>
                            <CardDescription>Key parameters for this investment</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ScenarioAssumptions individual />
                          </CardContent>
                          <CardFooter className="border-t border-zinc-800 px-6 py-4">
                            <Button
                              variant="outline"
                              className="w-full border-zinc-800 text-zinc-300 hover:bg-zinc-900"
                            >
                              <Sliders className="mr-2 h-4 w-4" /> Adjust Parameters
                            </Button>
                          </CardFooter>
                        </Card>

                        <Card className="border-zinc-800 bg-zinc-900/50">
                          <CardHeader className="pb-2">
                            <CardTitle>Forecasting Controls</CardTitle>
                            <CardDescription>Adjust time horizon and variables</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ForecastingControls individual />
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Scenario Comparison Tab */}
                  <TabsContent value="comparison">
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                          <CardTitle>Scenario Comparison</CardTitle>
                          <CardDescription>Compare different forecast scenarios side by side</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                          <span>Select Scenarios</span>
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <ScenarioComparison />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Monte Carlo Tab */}
                  <TabsContent value="montecarlo">
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                          <CardTitle>Monte Carlo Simulation</CardTitle>
                          <CardDescription>
                            Probability distribution of portfolio outcomes based on 10,000 simulations
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                            <span>Simulation Settings</span>
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="h-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            Run Simulation
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <MonteCarloSimulation />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </main>
          </div>
        </SidebarProvider>

        {/* Scenario Creation Wizard */}
        <ScenarioWizard
          open={wizardOpen}
          onOpenChange={setWizardOpen}
          onComplete={(scenarioData) => {
            console.log("New scenario created:", scenarioData)
            // In a real app, this would update the scenarios list
          }}
        />
      </div>
    </div>
  )
}
