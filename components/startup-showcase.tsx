import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const startups = [
  {
    id: 1,
    name: "EcoTech Solutions",
    description: "Sustainable technology for reducing carbon footprints in urban environments.",
    logo: "/placeholder.svg?height=80&width=80",
    category: "CleanTech",
    fundingStage: "Seed",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    name: "MindfulAI",
    description: "AI-powered mental health platform for personalized wellness journeys.",
    logo: "/placeholder.svg?height=80&width=80",
    category: "HealthTech",
    fundingStage: "Pre-seed",
    location: "Boston, MA",
  },
  {
    id: 3,
    name: "FinFlow",
    description: "Democratizing financial services for underserved communities globally.",
    logo: "/placeholder.svg?height=80&width=80",
    category: "FinTech",
    fundingStage: "Series A",
    location: "New York, NY",
  },
]

export function StartupShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {startups.map((startup) => (
        <Card
          key={startup.id}
          className="border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:bg-zinc-900 hover:shadow-lg hover:shadow-purple-500/5"
        >
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-zinc-800">
              <Image
                src={startup.logo || "/placeholder.svg"}
                alt={`${startup.name} logo`}
                width={80}
                height={80}
                className="h-12 w-12 object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold">{startup.name}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-blue-800 bg-blue-950/30 text-blue-400">
                  {startup.category}
                </Badge>
                <Badge variant="outline" className="border-purple-800 bg-purple-950/30 text-purple-400">
                  {startup.fundingStage}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-400">{startup.description}</p>
            <p className="mt-2 text-xs text-zinc-500">{startup.location}</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full justify-between text-zinc-400 hover:text-white">
              View Details
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
