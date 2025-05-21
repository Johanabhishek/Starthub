import type { ReactNode } from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:bg-zinc-900 hover:shadow-lg hover:shadow-purple-500/5">
      <CardHeader className="pb-2">
        <div className="mb-2">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-zinc-400">{description}</p>
      </CardContent>
    </Card>
  )
}
