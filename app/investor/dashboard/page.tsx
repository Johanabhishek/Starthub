import Image from "next/image"
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Calendar,
  ChevronDown,
  DollarSign,
  Filter,
  LineChart,
  Plus,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { GradientBlob } from "@/components/gradient-blob"
import { InvestorNavbar } from "@/components/investor-navbar"
import { InvestorSidebar } from "@/components/investor-sidebar"
import { PortfolioChart } from "@/components/portfolio-chart"
import { DealFlowTable } from "@/components/deal-flow-table"
import { StartupCard } from "@/components/startup-card"
import { ActivityFeed } from "@/components/activity-feed"
import { UpcomingEvents } from "@/components/upcoming-events"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function InvestorDashboard() {
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
                    <h1 className="text-3xl font-bold">Investor Dashboard</h1>
                    <p className="text-zinc-400">Track your investments and discover new opportunities</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900">
                      <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Plus className="mr-2 h-4 w-4" /> Add Investment
                    </Button>
                  </div>
                </div>

                {/* Overview Cards */}
                <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-zinc-400">Total Invested</p>
                          <h3 className="mt-1 text-2xl font-bold">$1.25M</h3>
                          <p className="mt-1 flex items-center text-xs text-green-400">
                            <ArrowUp className="mr-1 h-3 w-3" /> 12.5% from last month
                          </p>
                        </div>
                        <div className="rounded-full bg-blue-950/30 p-2 text-blue-400">
                          <DollarSign className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-zinc-400">Active Investments</p>
                          <h3 className="mt-1 text-2xl font-bold">12</h3>
                          <p className="mt-1 flex items-center text-xs text-green-400">
                            <ArrowUp className="mr-1 h-3 w-3" /> 2 new this quarter
                          </p>
                        </div>
                        <div className="rounded-full bg-purple-950/30 p-2 text-purple-400">
                          <Activity className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-zinc-400">Watchlist</p>
                          <h3 className="mt-1 text-2xl font-bold">24</h3>
                          <p className="mt-1 flex items-center text-xs text-yellow-400">
                            <ArrowUp className="mr-1 h-3 w-3" /> 5 added recently
                          </p>
                        </div>
                        <div className="rounded-full bg-yellow-950/30 p-2 text-yellow-400">
                          <Star className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-zinc-800 bg-zinc-900/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-zinc-400">Potential ROI</p>
                          <h3 className="mt-1 text-2xl font-bold">3.2x</h3>
                          <p className="mt-1 flex items-center text-xs text-green-400">
                            <TrendingUp className="mr-1 h-3 w-3" /> Projected
                          </p>
                        </div>
                        <div className="rounded-full bg-green-950/30 p-2 text-green-400">
                          <LineChart className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content */}
                <div className="grid gap-8 lg:grid-cols-3">
                  {/* Portfolio and Deal Flow (Left Column) */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Portfolio Performance */}
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                          <CardTitle>Portfolio Performance</CardTitle>
                          <CardDescription>Track your investment growth over time</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                            <span>Last 12 Months</span>
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <PortfolioChart />
                      </CardContent>
                    </Card>

                    {/* Deal Flow */}
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                          <CardTitle>Deal Flow</CardTitle>
                          <CardDescription>Track your pipeline of potential investments</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                          </Button>
                          <Button
                            size="sm"
                            className="h-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Startup
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Tabs defaultValue="all">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="screening">Screening</TabsTrigger>
                            <TabsTrigger value="diligence">Diligence</TabsTrigger>
                            <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
                          </TabsList>
                          <TabsContent value="all" className="mt-4">
                            <DealFlowTable />
                          </TabsContent>
                          <TabsContent value="screening" className="mt-4">
                            <DealFlowTable filter="screening" />
                          </TabsContent>
                          <TabsContent value="diligence" className="mt-4">
                            <DealFlowTable filter="diligence" />
                          </TabsContent>
                          <TabsContent value="negotiation" className="mt-4">
                            <DealFlowTable filter="negotiation" />
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                      <CardFooter className="border-t border-zinc-800 px-6 py-4">
                        <Button variant="ghost" className="ml-auto text-zinc-400 hover:text-white">
                          View All Deals <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Active Investments */}
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                          <CardTitle>Active Investments</CardTitle>
                          <CardDescription>Your current portfolio of startups</CardDescription>
                        </div>
                        <Button variant="ghost" className="text-zinc-400 hover:text-white">
                          View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <StartupCard
                            name="EcoTech Solutions"
                            logo="/placeholder.svg?height=80&width=80"
                            category="CleanTech"
                            stage="Seed"
                            invested="$250K"
                            equity="5%"
                            valuation="$5M"
                            trend="up"
                            trendValue="+15%"
                          />
                          <StartupCard
                            name="MindfulAI"
                            logo="/placeholder.svg?height=80&width=80"
                            category="HealthTech"
                            stage="Pre-seed"
                            invested="$100K"
                            equity="8%"
                            valuation="$1.25M"
                            trend="up"
                            trendValue="+22%"
                          />
                          <StartupCard
                            name="FinFlow"
                            logo="/placeholder.svg?height=80&width=80"
                            category="FinTech"
                            stage="Series A"
                            invested="$500K"
                            equity="3%"
                            valuation="$16.7M"
                            trend="down"
                            trendValue="-5%"
                          />
                          <StartupCard
                            name="LogistiX"
                            logo="/placeholder.svg?height=80&width=80"
                            category="Supply Chain"
                            stage="Seed"
                            invested="$200K"
                            equity="4%"
                            valuation="$5M"
                            trend="up"
                            trendValue="+8%"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                      <Input
                        placeholder="Search startups, founders..."
                        className="border-zinc-800 bg-zinc-900/50 pl-10 text-zinc-300 placeholder:text-zinc-500"
                      />
                    </div>

                    {/* Watchlist */}
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle>Watchlist</CardTitle>
                          <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white">
                            View All
                          </Button>
                        </div>
                        <CardDescription>Startups you're monitoring</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          {/* Watchlist Item 1 */}
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-zinc-800">
                              <Image
                                src="/placeholder.svg?height=40&width=40"
                                alt="Startup logo"
                                width={40}
                                height={40}
                                className="h-6 w-6 object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="truncate font-medium">NeuraTech</h4>
                                <Badge variant="outline" className="border-purple-800 bg-purple-950/30 text-purple-400">
                                  Seed
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-zinc-400">AI/ML • $4M Valuation</p>
                                <p className="flex items-center text-xs text-green-400">
                                  <ArrowUp className="mr-1 h-3 w-3" /> 12%
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Watchlist Item 2 */}
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-zinc-800">
                              <Image
                                src="/placeholder.svg?height=40&width=40"
                                alt="Startup logo"
                                width={40}
                                height={40}
                                className="h-6 w-6 object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="truncate font-medium">SpaceHarbor</h4>
                                <Badge variant="outline" className="border-blue-800 bg-blue-950/30 text-blue-400">
                                  Pre-seed
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-zinc-400">Space Tech • $2M Valuation</p>
                                <p className="flex items-center text-xs text-green-400">
                                  <ArrowUp className="mr-1 h-3 w-3" /> 8%
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Watchlist Item 3 */}
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-zinc-800">
                              <Image
                                src="/placeholder.svg?height=40&width=40"
                                alt="Startup logo"
                                width={40}
                                height={40}
                                className="h-6 w-6 object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="truncate font-medium">CryptoFlow</h4>
                                <Badge variant="outline" className="border-green-800 bg-green-950/30 text-green-400">
                                  Series A
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-zinc-400">Blockchain • $12M Valuation</p>
                                <p className="flex items-center text-xs text-red-400">
                                  <ArrowDown className="mr-1 h-3 w-3" /> 3%
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full border-zinc-800 text-zinc-300 hover:bg-zinc-900">
                          <Plus className="mr-2 h-4 w-4" /> Add to Watchlist
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Activity Feed */}
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader className="pb-2">
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest updates from your portfolio</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ActivityFeed />
                      </CardContent>
                      <CardFooter className="border-t border-zinc-800 px-6 py-4">
                        <Button variant="ghost" className="w-full text-zinc-400 hover:text-white">
                          View All Activity
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Upcoming Events */}
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle>Upcoming Events</CardTitle>
                          <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300">
                            <Calendar className="mr-2 h-4 w-4" /> Calendar
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <UpcomingEvents />
                      </CardContent>
                    </Card>

                    {/* Recommended Startups */}
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader className="pb-2">
                        <CardTitle>Recommended For You</CardTitle>
                        <CardDescription>Based on your investment history</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Recommended Startup 1 */}
                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-zinc-800">
                              <Image
                                src="/placeholder.svg?height=48&width=48"
                                alt="Startup logo"
                                width={48}
                                height={48}
                                className="h-8 w-8 object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium">AgroTech Solutions</h4>
                                  <p className="text-xs text-zinc-400">AgTech • Seed Stage</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                                  <Star className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="mt-1 text-sm text-zinc-300">
                                AI-powered solutions for sustainable farming and crop management.
                              </p>
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center gap-1 text-xs text-zinc-400">
                                  <Users className="h-3 w-3" /> 12 investors interested
                                </div>
                                <Badge variant="outline" className="border-green-800 bg-green-950/30 text-green-400">
                                  95% Match
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Recommended Startup 2 */}
                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-zinc-800">
                              <Image
                                src="/placeholder.svg?height=48&width=48"
                                alt="Startup logo"
                                width={48}
                                height={48}
                                className="h-8 w-8 object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium">QuantumSecurity</h4>
                                  <p className="text-xs text-zinc-400">Cybersecurity • Pre-seed</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                                  <Star className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="mt-1 text-sm text-zinc-300">
                                Quantum-resistant encryption for enterprise data security.
                              </p>
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center gap-1 text-xs text-zinc-400">
                                  <Users className="h-3 w-3" /> 8 investors interested
                                </div>
                                <Badge variant="outline" className="border-green-800 bg-green-950/30 text-green-400">
                                  87% Match
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button variant="ghost" className="w-full text-zinc-400 hover:text-white">
                          View More Recommendations <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  )
}
