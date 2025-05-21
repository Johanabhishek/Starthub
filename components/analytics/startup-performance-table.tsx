import Image from "next/image"
import { ArrowDown, ArrowUp, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Sample data
const startupData = [
  {
    id: 1,
    name: "EcoTech Solutions",
    logo: "/placeholder.svg?height=40&width=40",
    category: "CleanTech",
    stage: "Series A",
    invested: "$250K",
    currentValue: "$375K",
    roi: 50,
    roiTrend: "up",
    holdingPeriod: "15 months",
    lastValuation: "$12M",
    status: "active",
  },
  {
    id: 2,
    name: "MindfulAI",
    logo: "/placeholder.svg?height=40&width=40",
    category: "HealthTech",
    stage: "Pre-seed",
    invested: "$100K",
    currentValue: "$220K",
    roi: 120,
    roiTrend: "up",
    holdingPeriod: "12 months",
    lastValuation: "$1.8M",
    status: "active",
  },
  {
    id: 3,
    name: "FinFlow",
    logo: "/placeholder.svg?height=40&width=40",
    category: "FinTech",
    stage: "Series A",
    invested: "$500K",
    currentValue: "$475K",
    roi: -5,
    roiTrend: "down",
    holdingPeriod: "6 months",
    lastValuation: "$16.7M",
    status: "active",
  },
  {
    id: 4,
    name: "LogistiX",
    logo: "/placeholder.svg?height=40&width=40",
    category: "Supply Chain",
    stage: "Seed",
    invested: "$200K",
    currentValue: "$216K",
    roi: 8,
    roiTrend: "up",
    holdingPeriod: "9 months",
    lastValuation: "$5M",
    status: "active",
  },
  {
    id: 5,
    name: "DataSync",
    logo: "/placeholder.svg?height=40&width=40",
    category: "Enterprise SaaS",
    stage: "Series B",
    invested: "$50K",
    currentValue: "$125K",
    roi: 150,
    roiTrend: "up",
    holdingPeriod: "24 months",
    lastValuation: "$35M",
    status: "partial_exit",
  },
]

export function StartupPerformanceTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="border-blue-800 bg-blue-950/30 text-blue-400">
            Active
          </Badge>
        )
      case "partial_exit":
        return (
          <Badge variant="outline" className="border-green-800 bg-green-950/30 text-green-400">
            Partial Exit
          </Badge>
        )
      case "exit":
        return (
          <Badge variant="outline" className="border-purple-800 bg-purple-950/30 text-purple-400">
            Full Exit
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-zinc-800 bg-zinc-900 text-zinc-400">
            {status}
          </Badge>
        )
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">Startup</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">Category</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">Stage</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">Invested</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">Current Value</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">ROI</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">Holding Period</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">Status</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {startupData.map((startup) => (
            <tr key={startup.id} className="border-b border-zinc-800 hover:bg-zinc-900/50">
              <td className="whitespace-nowrap px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-zinc-800">
                    <Image
                      src={startup.logo || "/placeholder.svg"}
                      alt={`${startup.name} logo`}
                      width={32}
                      height={32}
                      className="h-5 w-5 object-contain"
                    />
                  </div>
                  <span className="font-medium">{startup.name}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-zinc-300">{startup.category}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <Badge variant="outline" className="border-zinc-800 bg-zinc-900">
                  {startup.stage}
                </Badge>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm">{startup.invested}</td>
              <td className="whitespace-nowrap px-4 py-3 text-sm">{startup.currentValue}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <div
                  className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    startup.roiTrend === "up"
                      ? "bg-green-950/30 text-green-400"
                      : startup.roiTrend === "down"
                        ? "bg-red-950/30 text-red-400"
                        : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {startup.roiTrend === "up" ? (
                    <ArrowUp className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3" />
                  )}
                  {startup.roi}%
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-zinc-300">{startup.holdingPeriod}</td>
              <td className="whitespace-nowrap px-4 py-3">{getStatusBadge(startup.status)}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white">
                  <ExternalLink className="mr-1 h-4 w-4" /> Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
