import { Calendar, MessageSquare, Star, TrendingUp, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data
const activityData = [
  {
    id: 1,
    type: "update",
    title: "EcoTech Solutions closed their seed round",
    time: "2 hours ago",
    icon: <TrendingUp className="h-4 w-4 text-green-400" />,
  },
  {
    id: 2,
    type: "message",
    title: "Sarah Chen sent you a message",
    time: "Yesterday",
    icon: <MessageSquare className="h-4 w-4 text-blue-400" />,
    avatar: "/placeholder.svg?height=32&width=32",
    avatarFallback: "SC",
  },
  {
    id: 3,
    type: "event",
    title: "Investor Demo Day is tomorrow",
    time: "1 day ago",
    icon: <Calendar className="h-4 w-4 text-purple-400" />,
  },
  {
    id: 4,
    type: "watchlist",
    title: "QuantumSecurity added to your watchlist",
    time: "3 days ago",
    icon: <Star className="h-4 w-4 text-yellow-400" />,
  },
  {
    id: 5,
    type: "connection",
    title: "Marcus Johnson accepted your connection",
    time: "1 week ago",
    icon: <Users className="h-4 w-4 text-blue-400" />,
    avatar: "/placeholder.svg?height=32&width=32",
    avatarFallback: "MJ",
  },
]

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      {activityData.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800">
            {activity.avatar ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} alt="User" />
                <AvatarFallback>{activity.avatarFallback}</AvatarFallback>
              </Avatar>
            ) : (
              activity.icon
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm">{activity.title}</p>
            <p className="text-xs text-zinc-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
