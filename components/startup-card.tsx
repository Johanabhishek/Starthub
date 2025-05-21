import Image from "next/image"
import { ArrowDown, ArrowUp, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface StartupCardProps {
  name: string
  logo: string
  category: string
  stage: string
  invested: string
  equity: string
  valuation: string
  trend: "up" | "down" | "neutral"
  trendValue: string
}

export function StartupCard({
  name,
  logo,
  category,
  stage,
  invested,
  equity,
  valuation,
  trend,
  trendValue,
}: StartupCardProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:bg-zinc-900 hover:shadow-lg hover:shadow-purple-500/5">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-zinc-800">
            <Image
              src={logo || "/placeholder.svg"}
              alt={`${name} logo`}
              width={48}
              height={48}
              className="h-8 w-8 object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{name}</h3>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Badge variant="outline" className="border-blue-800 bg-blue-950/30 text-blue-400">
                    {category}
                  </Badge>
                  <Badge variant="outline" className="border-purple-800 bg-purple-950/30 text-purple-400">
                    {stage}
                  </Badge>
                </div>
              </div>
              <div
                className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  trend === "up"
                    ? "bg-green-950/30 text-green-400"
                    : trend === "down"
                      ? "bg-red-950/30 text-red-400"
                      : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {trend === "up" ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                {trendValue}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md bg-zinc-800/50 p-2">
            <p className="text-xs text-zinc-400">Invested</p>
            <p className="text-sm font-bold">{invested}</p>
          </div>
          <div className="rounded-md bg-zinc-800/50 p-2">
            <p className="text-xs text-zinc-400">Equity</p>
            <p className="text-sm font-bold">{equity}</p>
          </div>
          <div className="rounded-md bg-zinc-800/50 p-2">
            <p className="text-xs text-zinc-400">Valuation</p>
            <p className="text-sm font-bold">{valuation}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-zinc-800 p-4">
        <Button variant="ghost" className="w-full justify-between text-zinc-400 hover:text-white">
          View Details
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
