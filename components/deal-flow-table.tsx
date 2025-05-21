import { ArrowUpRight, ChevronRight, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data
const dealFlowData = [
  {
    id: 1,
    name: "NeuraTech",
    logo: "/placeholder.svg?height=40&width=40",
    category: "AI/ML",
    stage: "Seed",
    status: "screening",
    raising: "$2M",
    progress: 40,
    valuation: "$8M",
    lastContact: "2 days ago",
  },
  {
    id: 2,
    name: "SpaceHarbor",
    logo: "/placeholder.svg?height=40&width=40",
    category: "Space Tech",
    stage: "Pre-seed",
    status: "diligence",
    raising: "$750K",
    progress: 60,
    valuation: "$3M",
    lastContact: "Yesterday",
  },
  {
    id: 3,
    name: "QuantumSecurity",
    logo: "/placeholder.svg?height=40&width=40",
    category: "Cybersecurity",
    stage: "Pre-seed",
    status: "negotiation",
    raising: "$1.5M",
    progress: 85,
    valuation: "$6M",
    lastContact: "Today",
  },
  {
    id: 4,
    name: "AgroTech Solutions",
    logo: "/placeholder.svg?height=40&width=40",
    category: "AgTech",
    stage: "Seed",
    status: "screening",
    raising: "$3M",
    progress: 25,
    valuation: "$12M",
    lastContact: "5 days ago",
  },
]

interface DealFlowTableProps {
  filter?: string
}

export function DealFlowTable({ filter }: DealFlowTableProps) {
  const filteredData = filter ? dealFlowData.filter((deal) => deal.status === filter) : dealFlowData

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "screening":
        return (
          <Badge variant="outline" className="border-blue-800 bg-blue-950/30 text-blue-400">
            Screening
          </Badge>
        )
      case "diligence":
        return (
          <Badge variant="outline" className="border-yellow-800 bg-yellow-950/30 text-yellow-400">
            Due Diligence
          </Badge>
        )
      case "negotiation":
        return (
          <Badge variant="outline" className="border-purple-800 bg-purple-950/30 text-purple-400">
            Negotiation
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
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">Status</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">Raising</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">Valuation</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">Last Contact</th>
            <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-zinc-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((deal) => (
            <tr key={deal.id} className="border-b border-zinc-800 hover:bg-zinc-900/50">
              <td className="whitespace-nowrap px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={deal.logo || "/placeholder.svg"} alt={deal.name} />
                    <AvatarFallback>{deal.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{deal.name}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-zinc-300">{deal.category}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <Badge variant="outline" className="border-zinc-800 bg-zinc-900">
                  {deal.stage}
                </Badge>
              </td>
              <td className="whitespace-nowrap px-4 py-3">{getStatusBadge(deal.status)}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <div className="w-24">
                  <div className="flex items-center justify-between text-xs">
                    <span>{deal.raising}</span>
                    <span className="text-zinc-500">{deal.progress}%</span>
                  </div>
                  <Progress value={deal.progress} className="h-1 bg-zinc-800" />
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm">{deal.valuation}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <div className="flex items-center text-xs text-zinc-400">
                  <Clock className="mr-1 h-3 w-3" /> {deal.lastContact}
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
