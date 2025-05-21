import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MessageSquare, Search, SlidersHorizontal, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GradientBlob } from "@/components/gradient-blob"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// Sample data for co-founders
const cofounders = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg",
    title: "Full Stack Developer",
    skills: ["React", "Node.js", "AWS"],
    experience: "5+ years",
    location: "San Francisco, CA",
    bio: "Experienced developer with multiple successful startups. Looking to join an innovative team.",
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: "/placeholder.svg",
    title: "Product Manager",
    skills: ["Product Strategy", "UX/UI", "Growth"],
    experience: "7+ years",
    location: "New York, NY",
    bio: "Former PM at Google and two YC startups. Passionate about fintech and healthcare.",
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    avatar: "/placeholder.svg",
    title: "Marketing Specialist",
    skills: ["Growth Marketing", "SEO", "Content Strategy"],
    experience: "4+ years",
    location: "Austin, TX",
    bio: "Growth marketer who helped scale 3 startups to $1M+ ARR. Looking for my next challenge.",
  },
  {
    id: "4",
    name: "Emily Wong",
    avatar: "/placeholder.svg",
    title: "UX/UI Designer",
    skills: ["Figma", "User Research", "Design Systems"],
    experience: "6+ years",
    location: "Seattle, WA",
    bio: "Designer with a focus on creating intuitive, accessible experiences. Previously at Microsoft.",
  },
  {
    id: "5",
    name: "David Kim",
    avatar: "/placeholder.svg",
    title: "AI Engineer",
    skills: ["Machine Learning", "Python", "TensorFlow"],
    experience: "3+ years",
    location: "Boston, MA",
    bio: "AI researcher turned entrepreneur. Looking to join a team working on meaningful problems.",
  },
  {
    id: "6",
    name: "Priya Patel",
    avatar: "/placeholder.svg",
    title: "Business Development",
    skills: ["Sales", "Partnerships", "Strategy"],
    experience: "8+ years",
    location: "Chicago, IL",
    bio: "Experienced in building strategic partnerships and sales teams from the ground up.",
  },
]

export default function CoFoundersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <GradientBlob className="absolute -top-40 -left-40 h-[500px] w-[500px] bg-purple-500/20 blur-[120px]" />
        <GradientBlob className="absolute top-[30%] -right-40 h-[400px] w-[400px] bg-blue-500/20 blur-[120px]" />
        <GradientBlob className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] bg-pink-500/20 blur-[120px]" />

        <Navbar />

        <main className="container relative px-4 py-16">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">Find Co-Founders</h1>
            <p className="mt-2 text-zinc-400">
              Connect with talented individuals who share your vision and complement your skills.
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Search by skill, location, or role..."
                className="border-zinc-700 bg-zinc-800/50 pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Select>
                <SelectTrigger className="w-[180px] border-zinc-700 bg-zinc-800/50">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="product">Product Manager</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] border-zinc-700 bg-zinc-800/50">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Experience</SelectItem>
                  <SelectItem value="0-2">0-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-zinc-700 bg-zinc-800/50">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cofounders.map((cofounder) => (
              <Card
                key={cofounder.id}
                className="border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:bg-zinc-900 hover:shadow-lg hover:shadow-purple-500/5"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-full bg-zinc-800">
                      <Image
                        src={cofounder.avatar || "/placeholder.svg"}
                        alt={cofounder.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{cofounder.name}</h3>
                      <p className="text-sm text-zinc-400">{cofounder.title}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {cofounder.experience} • {cofounder.location}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-zinc-300">{cofounder.bio}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {cofounder.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="border-blue-800 bg-blue-950/30 text-blue-400">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-zinc-800 p-4">
                  <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-800/50">
                    <Star className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Connect
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="border-zinc-700 bg-zinc-800/50">
              Load More Co-Founders
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
