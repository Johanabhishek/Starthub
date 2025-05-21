import { Linkedin } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface TeamMemberProps {
  name: string
  role: string
  image: string
  bio: string
  linkedin?: string
}

export function TeamMember({ name, role, image, bio, linkedin }: TeamMemberProps) {
  // Get initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:bg-zinc-900 hover:shadow-lg hover:shadow-purple-500/5">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={image || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <h3 className="mt-4 font-bold">{name}</h3>
          <p className="text-sm text-zinc-400">{role}</p>
          <p className="mt-2 text-sm text-zinc-300">{bio}</p>
          {linkedin && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              asChild
            >
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
