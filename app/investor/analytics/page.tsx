import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  Download,
  Filter,
  LineChart,
  PieChart,
  Share2,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GradientBlob } from "@/components/gradient-blob"
import { InvestorNavbar } from "@/components/investor-navbar"
import { InvestorSidebar } from "@/components/investor-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { PortfolioOverview } from "@/components/analytics/portfolio-overview"
import { PerformanceChart } from "@/components/analytics/performance-chart"
import { SectorAllocation } from "@/components/analytics/sector-allocation"
import { StageAllocation } from "@/components/analytics/stage-allocation"
import { InvestmentTimeline } from "@/components/analytics/investment-timeline"
import { RiskAssessment } from "@/components/analytics/risk-assessment"
import { StartupPerformanceTable } from "@/components/analytics/startup-performance-table"
import { BenchmarkComparison } from "@/components/analytics/benchmark-comparison"
import { ReturnProjections } from "@/components/analytics/return-projections"
import { PortfolioMetrics } from "@/components/analytics/portfolio-metrics"

export default function PortfolioAnalytics() {
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
                    <h1 className="text-3xl font-bold">Portfolio Analytics</h1>
                    <p className="text-zinc-400">Detailed insights into your investment performance</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900">
                      <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900">
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900">
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <TrendingUp className="mr-2 h-4 w-4" /> Generate Report
                    </Button>
                  </div>
                </div>

                {/* Time Period Selector */}
                <div className="mb-8 flex items-center justify-between">
                  <Tabs defaultValue="1y" className="w-[400px]">
                    <TabsList>
                      <TabsTrigger value="1m">1M</TabsTrigger>
                      <TabsTrigger value="3m">3M</TabsTrigger>
                      <TabsTrigger value="6m">6M</TabsTrigger>
                      <TabsTrigger value="1y">1Y</TabsTrigger>
                      <TabsTrigger value="all">All</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                    <span>Custom Range</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                {/* Portfolio Overview */}
                <div className="mb-8">
                  <PortfolioOverview />
                </div>

                {/* Performance Charts */}
                <div className="mb-8 grid gap-8 lg:grid-cols-2">
                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle>Portfolio Performance</CardTitle>
                        <CardDescription>Value over time with key events</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                          <LineChart className="mr-2 h-4 w-4" /> Line
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                          <BarChart3 className="mr-2 h-4 w-4" /> Bar
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <PerformanceChart />
                    </CardContent>
                  </Card>

                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle>Benchmark Comparison</CardTitle>
                        <CardDescription>Performance vs. market indices</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                        <span>Select Benchmarks</span>
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <BenchmarkComparison />
                    </CardContent>
                  </Card>
                </div>

                {/* Portfolio Allocation */}
                <div className="mb-8 grid gap-8 lg:grid-cols-2">
                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle>Sector Allocation</CardTitle>
                        <CardDescription>Distribution across industries</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                        <PieChart className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <SectorAllocation />
                    </CardContent>
                  </Card>

                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle>Stage Allocation</CardTitle>
                        <CardDescription>Distribution across funding stages</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                        <PieChart className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <StageAllocation />
                    </CardContent>
                  </Card>
                </div>

                {/* Investment Timeline & Risk Assessment */}
                <div className="mb-8 grid gap-8 lg:grid-cols-2">
                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="pb-2">
                      <CardTitle>Investment Timeline</CardTitle>
                      <CardDescription>History of your investments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <InvestmentTimeline />
                    </CardContent>
                  </Card>

                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="pb-2">
                      <CardTitle>Risk Assessment</CardTitle>
                      <CardDescription>Portfolio risk analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RiskAssessment />
                    </CardContent>
                  </Card>
                </div>

                {/* Portfolio Metrics */}
                <div className="mb-8">
                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="pb-2">
                      <CardTitle>Portfolio Metrics</CardTitle>
                      <CardDescription>Key performance indicators</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <PortfolioMetrics />
                    </CardContent>
                  </Card>
                </div>

                {/* Return Projections */}
                <div className="mb-8">
                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle>Return Projections</CardTitle>
                        <CardDescription>Estimated future performance</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                        <span>Projection Settings</span>
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <ReturnProjections />
                    </CardContent>
                  </Card>
                </div>

                {/* Startup Performance Table */}
                <div className="mb-8">
                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle>Startup Performance</CardTitle>
                        <CardDescription>Detailed metrics for each investment</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <StartupPerformanceTable />
                    </CardContent>
                    <CardFooter className="border-t border-zinc-800 px-6 py-4">
                      <Button variant="ghost" className="ml-auto text-zinc-400 hover:text-white">
                        View All Startups <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  )
}
