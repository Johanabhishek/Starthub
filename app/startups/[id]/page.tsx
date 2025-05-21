import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink,
  Flag,
  Globe,
  Heart,
  MessageSquare,
  Share2,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GradientBlob } from "@/components/gradient-blob"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StartupMetric } from "@/components/startup-metric"
import { TeamMember } from "@/components/team-member"
import { StartupGallery } from "@/components/startup-gallery"
import { StartupShowcase } from "@/components/startup-showcase"

// This would typically come from a database or API
const startupData = {
  id: "ecotech-solutions",
  name: "EcoTech Solutions",
  tagline: "Sustainable technology for reducing carbon footprints in urban environments",
  logo: "/placeholder.svg?height=120&width=120",
  coverImage: "/placeholder.svg?height=400&width=1200",
  description:
    "EcoTech Solutions is developing innovative IoT devices and software that help businesses and municipalities monitor and reduce their carbon emissions. Our proprietary sensors and analytics platform provide real-time data on energy usage, waste management, and air quality, enabling our clients to make informed decisions that benefit both their bottom line and the environment.",
  problem:
    "Urban areas account for over 70% of global carbon emissions, yet most cities and businesses lack the tools to effectively measure and reduce their environmental impact. Traditional monitoring systems are expensive, difficult to deploy, and provide limited actionable insights.",
  solution:
    "Our integrated hardware-software solution combines affordable IoT sensors with powerful AI analytics to provide comprehensive environmental monitoring and actionable recommendations. Our platform is easy to deploy, scalable, and delivers measurable ROI through energy savings and improved sustainability metrics.",
  founded: "2021",
  location: "San Francisco, CA",
  website: "https://ecotechsolutions.example",
  stage: "Seed",
  category: "CleanTech",
  tags: ["IoT", "Sustainability", "Smart Cities", "Climate Tech", "AI"],
  metrics: [
    {
      label: "Pilot Deployments",
      value: "12",
      change: "+3",
      trend: "up",
    },
    {
      label: "Monthly Users",
      value: "1.2k",
      change: "+15%",
      trend: "up",
    },
    {
      label: "Carbon Reduction",
      value: "450t",
      change: "+50t",
      trend: "up",
    },
    {
      label: "Revenue",
      value: "$125k",
      change: "+32%",
      trend: "up",
    },
  ],
  funding: {
    raised: "$1.2M",
    goal: "$3M",
    progress: 40,
    investors: 8,
    round: "Seed",
    closingIn: "45 days",
  },
  team: [
    {
      name: "Sarah Chen",
      role: "Co-Founder & CEO",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Former sustainability lead at Tesla with 10+ years experience in cleantech. PhD in Environmental Engineering from Stanford.",
      linkedin: "#",
    },
    {
      name: "Marcus Johnson",
      role: "Co-Founder & CTO",
      image: "/placeholder.svg?height=200&width=200",
      bio: "IoT expert with previous exits in the smart home space. MS in Computer Science from MIT.",
      linkedin: "#",
    },
    {
      name: "Priya Patel",
      role: "Head of Product",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Product leader from Google's sustainability team. MBA from Berkeley Haas.",
      linkedin: "#",
    },
    {
      name: "David Kim",
      role: "Lead Data Scientist",
      image: "/placeholder.svg?height=200&width=200",
      bio: "AI researcher specializing in environmental data modeling. Previously at NASA JPL.",
      linkedin: "#",
    },
  ],
  gallery: [
    {
      type: "image",
      url: "/placeholder.svg?height=600&width=800",
      caption: "Our sensor network deployed in downtown San Francisco",
    },
    {
      type: "image",
      url: "/placeholder.svg?height=600&width=800",
      caption: "Dashboard showing real-time emissions data",
    },
    {
      type: "image",
      url: "/placeholder.svg?height=600&width=800",
      caption: "EcoTech team at CES 2023",
    },
  ],
  updates: [
    {
      date: "June 15, 2023",
      title: "Completed pilot with City of San Francisco",
      content:
        "Successfully deployed 50 sensors across downtown SF, resulting in 15% energy savings for participating buildings.",
    },
    {
      date: "April 3, 2023",
      title: "Secured partnership with Siemens",
      content:
        "Signed agreement to integrate our sensors with Siemens building management systems for commercial deployments.",
    },
    {
      date: "February 20, 2023",
      title: "Awarded EPA Innovation Grant",
      content: "Received $250,000 non-dilutive funding from the EPA's Climate Innovation Program.",
    },
  ],
}

export default function StartupProfile() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <GradientBlob className="absolute -top-40 -left-40 h-[500px] w-[500px] bg-green-500/20 blur-[120px]" />
        <GradientBlob className="absolute top-[60%] -right-40 h-[400px] w-[400px] bg-blue-500/20 blur-[120px]" />

        <Navbar />

        <main className="relative pt-16">
          {/* Breadcrumb */}
          <div className="container px-4 py-4">
            <div className="flex items-center gap-1 text-sm text-zinc-400">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/startups" className="hover:text-white">
                Startups
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-zinc-300">{startupData.name}</span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative h-48 w-full overflow-hidden bg-zinc-900 md:h-64 lg:h-80">
            <Image
              src={startupData.coverImage || "/placeholder.svg"}
              alt={`${startupData.name} cover image`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>

          {/* Startup Header */}
          <div className="container px-4">
            <div className="relative -mt-20 flex flex-col items-start gap-4 md:flex-row md:items-end">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-xl border-4 border-black bg-zinc-900 md:h-40 md:w-40">
                <Image
                  src={startupData.logo || "/placeholder.svg"}
                  alt={`${startupData.name} logo`}
                  width={120}
                  height={120}
                  className="h-24 w-24 object-contain md:h-32 md:w-32"
                />
              </div>

              <div className="flex-1 pt-2 md:pb-4">
                <h1 className="text-3xl font-bold md:text-4xl">{startupData.name}</h1>
                <p className="mt-1 text-lg text-zinc-400">{startupData.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-green-800 bg-green-950/30 text-green-400">
                    {startupData.category}
                  </Badge>
                  <Badge variant="outline" className="border-purple-800 bg-purple-950/30 text-purple-400">
                    {startupData.stage}
                  </Badge>
                  {startupData.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="border-zinc-800 bg-zinc-900">
                      {tag}
                    </Badge>
                  ))}
                  {startupData.tags.length > 3 && (
                    <Badge variant="outline" className="border-zinc-800 bg-zinc-900">
                      +{startupData.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mt-4 flex w-full flex-wrap gap-2 md:mt-0 md:w-auto">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  Connect
                </Button>
                <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900">
                  <Heart className="mr-2 h-4 w-4" /> Follow
                </Button>
                <Button variant="outline" size="icon" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Calendar className="h-4 w-4 text-zinc-500" />
                <span>Founded {startupData.founded}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Building2 className="h-4 w-4 text-zinc-500" />
                <span>{startupData.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Globe className="h-4 w-4 text-zinc-500" />
                <a
                  href={startupData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white"
                >
                  Website <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Users className="h-4 w-4 text-zinc-500" />
                <span>{startupData.team.length} Team Members</span>
              </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="mt-8">
              <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-none md:auto-cols-auto md:grid-flow-col">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="funding">Funding</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader>
                        <CardTitle>About {startupData.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-zinc-300">{startupData.description}</p>

                        <div>
                          <h3 className="mb-2 font-semibold text-green-400">The Problem</h3>
                          <p className="text-zinc-300">{startupData.problem}</p>
                        </div>

                        <div>
                          <h3 className="mb-2 font-semibold text-blue-400">Our Solution</h3>
                          <p className="text-zinc-300">{startupData.solution}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <StartupGallery gallery={startupData.gallery} className="mt-8" />
                  </div>

                  <div className="space-y-8">
                    {/* Metrics Card */}
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart3 className="mr-2 h-5 w-5 text-blue-400" /> Key Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        {startupData.metrics.map((metric) => (
                          <StartupMetric key={metric.label} {...metric} />
                        ))}
                      </CardContent>
                    </Card>

                    {/* Funding Card */}
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader>
                        <CardTitle>Current Funding Round</CardTitle>
                        <CardDescription>
                          Raising {startupData.funding.goal} • {startupData.funding.round} Round
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-zinc-400">
                              {startupData.funding.raised} of {startupData.funding.goal}
                            </span>
                            <span className="text-sm font-medium text-green-400">{startupData.funding.progress}%</span>
                          </div>
                          <Progress value={startupData.funding.progress} className="h-2 bg-zinc-800" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="rounded-lg bg-zinc-800/50 p-3">
                            <p className="text-sm text-zinc-400">Investors</p>
                            <p className="text-xl font-bold">{startupData.funding.investors}</p>
                          </div>
                          <div className="rounded-lg bg-zinc-800/50 p-3">
                            <p className="text-sm text-zinc-400">Closing In</p>
                            <div className="flex items-center justify-center gap-1">
                              <Clock className="h-4 w-4 text-yellow-400" />
                              <p className="text-lg font-bold">{startupData.funding.closingIn}</p>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                          Request Investment Details
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Team Tab */}
              <TabsContent value="team" className="mt-6">
                <Card className="border-zinc-800 bg-zinc-900/50">
                  <CardHeader>
                    <CardTitle>Meet the Team</CardTitle>
                    <CardDescription>The people behind {startupData.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {startupData.team.map((member) => (
                        <TeamMember key={member.name} {...member} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Updates Tab */}
              <TabsContent value="updates" className="mt-6">
                <Card className="border-zinc-800 bg-zinc-900/50">
                  <CardHeader>
                    <CardTitle>Latest Updates</CardTitle>
                    <CardDescription>Recent milestones and announcements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {startupData.updates.map((update, index) => (
                        <div key={index} className="relative pl-6">
                          {index !== startupData.updates.length - 1 && (
                            <div className="absolute left-[11px] top-6 h-full w-[2px] bg-zinc-800"></div>
                          )}
                          <div className="absolute left-0 top-1 h-6 w-6 rounded-full border-2 border-blue-500 bg-zinc-900"></div>
                          <div className="space-y-1 pb-6">
                            <p className="text-sm text-zinc-500">{update.date}</p>
                            <h3 className="font-medium text-blue-400">{update.title}</h3>
                            <p className="text-zinc-300">{update.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Funding Tab */}
              <TabsContent value="funding" className="mt-6">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader>
                        <CardTitle>Investment Opportunity</CardTitle>
                        <CardDescription>
                          {startupData.name} is raising {startupData.funding.goal} in their {startupData.funding.round}{" "}
                          round
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="font-semibold">Investment Highlights</h3>
                          <ul className="space-y-2 text-zinc-300">
                            <li className="flex items-start gap-2">
                              <Flag className="mt-1 h-4 w-4 text-green-400 shrink-0" />
                              <span>
                                Addressing a $50B market opportunity in urban sustainability and carbon reduction
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Flag className="mt-1 h-4 w-4 text-green-400 shrink-0" />
                              <span>
                                Proprietary sensor technology with 3 pending patents and 40% lower cost than competitors
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Flag className="mt-1 h-4 w-4 text-green-400 shrink-0" />
                              <span>
                                Proven traction with 12 pilot deployments and partnerships with major municipalities
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Flag className="mt-1 h-4 w-4 text-green-400 shrink-0" />
                              <span>
                                Experienced founding team with previous exits and deep expertise in cleantech and IoT
                              </span>
                            </li>
                          </ul>
                        </div>

                        <Separator className="bg-zinc-800" />

                        <div className="space-y-4">
                          <h3 className="font-semibold">Use of Funds</h3>
                          <div className="space-y-3">
                            <div>
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm text-zinc-400">Product Development</span>
                                <span className="text-sm font-medium">40%</span>
                              </div>
                              <Progress value={40} className="h-2 bg-zinc-800" />
                            </div>
                            <div>
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm text-zinc-400">Sales & Marketing</span>
                                <span className="text-sm font-medium">30%</span>
                              </div>
                              <Progress value={30} className="h-2 bg-zinc-800" />
                            </div>
                            <div>
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm text-zinc-400">Team Expansion</span>
                                <span className="text-sm font-medium">20%</span>
                              </div>
                              <Progress value={20} className="h-2 bg-zinc-800" />
                            </div>
                            <div>
                              <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm text-zinc-400">Operations</span>
                                <span className="text-sm font-medium">10%</span>
                              </div>
                              <Progress value={10} className="h-2 bg-zinc-800" />
                            </div>
                          </div>
                        </div>

                        <Separator className="bg-zinc-800" />

                        <div className="space-y-4">
                          <h3 className="font-semibold">Investment Terms</h3>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-lg bg-zinc-800/50 p-4">
                              <p className="text-sm text-zinc-400">Minimum Investment</p>
                              <p className="text-xl font-bold">$25,000</p>
                            </div>
                            <div className="rounded-lg bg-zinc-800/50 p-4">
                              <p className="text-sm text-zinc-400">Valuation Cap</p>
                              <p className="text-xl font-bold">$12M</p>
                            </div>
                            <div className="rounded-lg bg-zinc-800/50 p-4">
                              <p className="text-sm text-zinc-400">Instrument</p>
                              <p className="text-xl font-bold">SAFE</p>
                            </div>
                            <div className="rounded-lg bg-zinc-800/50 p-4">
                              <p className="text-sm text-zinc-400">Discount</p>
                              <p className="text-xl font-bold">20%</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-8">
                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader>
                        <CardTitle>Current Round</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-zinc-400">
                              {startupData.funding.raised} of {startupData.funding.goal}
                            </span>
                            <span className="text-sm font-medium text-green-400">{startupData.funding.progress}%</span>
                          </div>
                          <Progress value={startupData.funding.progress} className="h-2 bg-zinc-800" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="rounded-lg bg-zinc-800/50 p-3">
                            <p className="text-sm text-zinc-400">Investors</p>
                            <p className="text-xl font-bold">{startupData.funding.investors}</p>
                          </div>
                          <div className="rounded-lg bg-zinc-800/50 p-3">
                            <p className="text-sm text-zinc-400">Closing In</p>
                            <div className="flex items-center justify-center gap-1">
                              <Clock className="h-4 w-4 text-yellow-400" />
                              <p className="text-lg font-bold">{startupData.funding.closingIn}</p>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                          Request Investment Details
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-zinc-800 bg-zinc-900/50">
                      <CardHeader>
                        <CardTitle>Investor Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start border-zinc-800 text-zinc-300">
                          <MessageSquare className="mr-2 h-4 w-4" /> Message Founders
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-zinc-800 text-zinc-300">
                          <Calendar className="mr-2 h-4 w-4" /> Schedule a Call
                        </Button>
                        <Button variant="outline" className="w-full justify-start border-zinc-800 text-zinc-300">
                          <Share2 className="mr-2 h-4 w-4" /> Share with Network
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Similar Startups */}
            <section className="mt-16 pb-16">
              <h2 className="mb-8 text-2xl font-bold">Similar Startups</h2>
              <StartupShowcase />
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Startups
                </Button>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
