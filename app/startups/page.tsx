"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StartupCard } from "@/components/startup-card"

// Mock data for startups
const MOCK_STARTUPS = [
  {
    id: "1",
    name: "TechNova",
    logo: "/placeholder.svg?height=80&width=80",
    tagline: "Revolutionizing the way people work",
    description: "TechNova is building the next generation of productivity tools for remote teams.",
    industry: "SaaS",
    stage: "Seed",
    location: "San Francisco, CA",
    foundedYear: 2021,
    raised: "$2.5M",
    metrics: {
      mrr: "$125K",
      growth: "+15%",
      customers: 250,
    },
  },
  {
    id: "2",
    name: "FinEdge",
    logo: "/placeholder.svg?height=80&width=80",
    tagline: "Banking for the digital generation",
    description: "FinEdge provides accessible financial services for underserved communities.",
    industry: "Fintech",
    stage: "Series A",
    location: "New York, NY",
    foundedYear: 2020,
    raised: "$8M",
    metrics: {
      mrr: "$350K",
      growth: "+22%",
      customers: 15000,
    },
  },
  {
    id: "3",
    name: "HealthPulse",
    logo: "/placeholder.svg?height=80&width=80",
    tagline: "Personalized healthcare at your fingertips",
    description: "HealthPulse uses AI to provide personalized health recommendations and monitoring.",
    industry: "Health Tech",
    stage: "Seed",
    location: "Boston, MA",
    foundedYear: 2022,
    raised: "$1.8M",
    metrics: {
      mrr: "$85K",
      growth: "+30%",
      customers: 5000,
    },
  },
  {
    id: "4",
    name: "EcoSmart",
    logo: "/placeholder.svg?height=80&width=80",
    tagline: "Sustainable solutions for a better planet",
    description: "EcoSmart develops eco-friendly alternatives to everyday products.",
    industry: "Clean Tech",
    stage: "Pre-seed",
    location: "Portland, OR",
    foundedYear: 2023,
    raised: "$500K",
    metrics: {
      mrr: "$25K",
      growth: "+40%",
      customers: 1200,
    },
  },
  {
    id: "5",
    name: "LearnLoop",
    logo: "/placeholder.svg?height=80&width=80",
    tagline: "Making education accessible to everyone",
    description: "LearnLoop is an AI-powered platform that personalizes learning experiences.",
    industry: "EdTech",
    stage: "Series A",
    location: "Austin, TX",
    foundedYear: 2019,
    raised: "$12M",
    metrics: {
      mrr: "$420K",
      growth: "+18%",
      customers: 50000,
    },
  },
  {
    id: "6",
    name: "DataMind",
    logo: "/placeholder.svg?height=80&width=80",
    tagline: "Turning data into actionable insights",
    description: "DataMind helps businesses make better decisions with AI-powered analytics.",
    industry: "AI/ML",
    stage: "Series B",
    location: "Seattle, WA",
    foundedYear: 2018,
    raised: "$25M",
    metrics: {
      mrr: "$1.2M",
      growth: "+25%",
      customers: 300,
    },
  },
]

// Filter options
const INDUSTRIES = ["All", "SaaS", "Fintech", "Health Tech", "E-commerce", "EdTech", "AI/ML", "Clean Tech"]
const STAGES = ["All", "Idea", "Pre-seed", "Seed", "Series A", "Series B", "Series C+"]
const SORT_OPTIONS = ["Newest", "Oldest", "Most Funded", "Least Funded"]

export default function StartupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedStage, setSelectedStage] = useState("All")
  const [sortOption, setSortOption] = useState("Newest")
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort startups
  const filteredStartups = MOCK_STARTUPS.filter((startup) => {
    const matchesSearch =
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.tagline.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesIndustry = selectedIndustry === "All" || startup.industry === selectedIndustry
    const matchesStage = selectedStage === "All" || startup.stage === selectedStage

    return matchesSearch && matchesIndustry && matchesStage
  }).sort((a, b) => {
    switch (sortOption) {
      case "Newest":
        return b.foundedYear - a.foundedYear
      case "Oldest":
        return a.foundedYear - b.foundedYear
      case "Most Funded":
        return Number.parseFloat(b.raised.replace(/[^0-9.]/g, "")) - Number.parseFloat(a.raised.replace(/[^0-9.]/g, ""))
      case "Least Funded":
        return Number.parseFloat(a.raised.replace(/[^0-9.]/g, "")) - Number.parseFloat(b.raised.replace(/[^0-9.]/g, ""))
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Discover Startups</h1>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search startups..."
                className="pl-10 bg-gray-900 border-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="border-gray-700 flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filters
            </Button>
            <div className="relative">
              <Button
                variant="outline"
                className="border-gray-700 flex items-center gap-2 w-full md:w-auto"
                onClick={(e) => {
                  const nextIndex = (SORT_OPTIONS.indexOf(sortOption) + 1) % SORT_OPTIONS.length
                  setSortOption(SORT_OPTIONS[nextIndex])
                }}
              >
                <ArrowUpDown size={18} />
                Sort: {sortOption}
              </Button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <Card className="bg-gray-900 border-gray-800 mb-4">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Industry</h3>
                    <div className="flex flex-wrap gap-2">
                      {INDUSTRIES.map((industry) => (
                        <Button
                          key={industry}
                          variant={selectedIndustry === industry ? "default" : "outline"}
                          size="sm"
                          className={
                            selectedIndustry === industry ? "bg-purple-600 hover:bg-purple-700" : "border-gray-700"
                          }
                          onClick={() => setSelectedIndustry(industry)}
                        >
                          {industry}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Stage</h3>
                    <div className="flex flex-wrap gap-2">
                      {STAGES.map((stage) => (
                        <Button
                          key={stage}
                          variant={selectedStage === stage ? "default" : "outline"}
                          size="sm"
                          className={selectedStage === stage ? "bg-purple-600 hover:bg-purple-700" : "border-gray-700"}
                          onClick={() => setSelectedStage(stage)}
                        >
                          {stage}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-sm text-gray-400">Showing {filteredStartups.length} startups</div>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup) => (
            <Link href={`/startups/${startup.id}`} key={startup.id}>
              <StartupCard
                name={startup.name}
                logo={startup.logo}
                tagline={startup.tagline}
                description={startup.description}
                industry={startup.industry}
                stage={startup.stage}
                metrics={startup.metrics}
                raised={startup.raised}
              />
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredStartups.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No startups found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <Button
              variant="outline"
              className="border-gray-700"
              onClick={() => {
                setSearchQuery("")
                setSelectedIndustry("All")
                setSelectedStage("All")
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
