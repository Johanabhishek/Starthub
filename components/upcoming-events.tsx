import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Sample data
const eventsData = [
  {
    id: 1,
    title: "Investor Demo Day",
    date: "Tomorrow",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual",
    attendees: 120,
  },
  {
    id: 2,
    title: "Pitch Meeting: QuantumSecurity",
    date: "May 25, 2023",
    time: "11:00 AM - 12:00 PM",
    location: "Zoom",
    attendees: 5,
  },
  {
    id: 3,
    title: "CleanTech Founders Meetup",
    date: "May 30, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "San Francisco, CA",
    attendees: 45,
  },
]

export function UpcomingEvents() {
  return (
    <div className="space-y-4">
      {eventsData.map((event, index) => (
        <div key={event.id}>
          <div className="space-y-2">
            <h3 className="font-medium">{event.title}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-400">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" /> {event.date}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" /> {event.time}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-1 h-3 w-3" /> {event.location}
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-3 w-3" /> {event.attendees} attendees
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 border-zinc-800 text-zinc-300 hover:bg-zinc-900">
                Details
              </Button>
              <Button
                size="sm"
                className="h-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                RSVP
              </Button>
            </div>
          </div>
          {index < eventsData.length - 1 && <Separator className="my-4 bg-zinc-800" />}
        </div>
      ))}
    </div>
  )
}
