"use client"

import { useState } from "react"
import {
  BarChart3,
  Users,
  MessageSquare,
  Calendar,
  Bell,
  Settings,
  PlusCircle,
  TrendingUp,
  DollarSign,
  UserPlus,
  Briefcase,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"

// Mock data
const STARTUP_DATA = {
  name: "TechNova",
  logo: "/placeholder.svg?height=80&width=80",
  metrics: {
    views: 1243,
    connections: 28,
    messages: 15,
    meetings: 3,
  },
  tasks: [
    { id: 1, title: "Complete company profile", completed: true },
    { id: 2, title: "Upload pitch deck", completed: true },
    { id: 3, title: "Add team members", completed: false },
    { id: 4, title: "Set funding goals", completed: false },
    { id: 5, title: "Connect social profiles", completed: false },
  ],
  recentActivity: [
    { id: 1, type: "view", user: "John D.", company: "Sequoia Capital", time: "2 hours ago" },
    { id: 2, type: "connection", user: "Sarah M.", company: "Y Combinator", time: "1 day ago" },
    { id: 3, type: "message", user: "Michael R.", company: "Andreessen Horowitz", time: "2 days ago" },
    { id: 4, type: "meeting", user: "Lisa K.", company: "First Round Capital", time: "1 week ago" },
  ],
  upcomingMeetings: [
    { id: 1, title: "Pitch Practice", with: "Startup Mentors Group", date: "Tomorrow, 2:00 PM" },
    { id: 2, title: "Investor Meeting", with: "Michael R., Andreessen Horowitz", date: "May 25, 10:00 AM" },
  ],
  recommendedInvestors: [
    { id: 1, name: "Emily Chen", company: "Innovation Ventures", match: "92%" },
    { id: 2, name: "David Wilson", company: "TechFund Partners", match: "88%" },
    { id: 3, name: "Sophia Rodriguez", company: "Horizon Capital", match: "85%" },
  ],
}

export default function StartupDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gray-800 rounded-full p-1 w-16 h-16 flex items-center justify-center">
              <img src={STARTUP_DATA.logo || "/placeholder.svg"} alt={STARTUP_DATA.name} className="rounded-full" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{STARTUP_DATA.name}</h1>
              <p className="text-gray-400">Startup Dashboard</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-700">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Content
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-800">
              Overview
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gray-800">
              Profile
            </TabsTrigger>
            <TabsTrigger value="investors" className="data-[state=active]:bg-gray-800">
              Investors
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-800">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-gray-800">
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                  <BarChart3 className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{STARTUP_DATA.metrics.views}</div>
                  <p className="text-xs text-gray-400">+12% from last month</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Connections</CardTitle>
                  <Users className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{STARTUP_DATA.metrics.connections}</div>
                  <p className="text-xs text-gray-400">+5 new this week</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{STARTUP_DATA.metrics.messages}</div>
                  <p className="text-xs text-gray-400">3 unread</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Meetings</CardTitle>
                  <Calendar className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{STARTUP_DATA.metrics.meetings}</div>
                  <p className="text-xs text-gray-400">Next: Tomorrow, 2:00 PM</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left Column */}
              <div className="space-y-4 lg:col-span-2">
                {/* Getting Started */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>Complete these tasks to set up your profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {STARTUP_DATA.tasks.map((task) => (
                        <div key={task.id} className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${task.completed ? "bg-green-500" : "border border-gray-600"}`}
                          >
                            {task.completed && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                          <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
                          {!task.completed && (
                            <Button variant="link" className="ml-auto text-purple-400 p-0">
                              Complete
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <div className="w-full bg-gray-800 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">Profile completion: 40%</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest interactions with your profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {STARTUP_DATA.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 
                            ${
                              activity.type === "view"
                                ? "bg-blue-900 text-blue-300"
                                : activity.type === "connection"
                                  ? "bg-green-900 text-green-300"
                                  : activity.type === "message"
                                    ? "bg-purple-900 text-purple-300"
                                    : "bg-orange-900 text-orange-300"
                            }`}
                          >
                            {activity.type === "view" ? (
                              <BarChart3 size={16} />
                            ) : activity.type === "connection" ? (
                              <UserPlus size={16} />
                            ) : activity.type === "message" ? (
                              <MessageSquare size={16} />
                            ) : (
                              <Calendar size={16} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {activity.user}
                              <span className="font-normal text-gray-400">
                                {activity.type === "view"
                                  ? " viewed your profile"
                                  : activity.type === "connection"
                                    ? " connected with you"
                                    : activity.type === "message"
                                      ? " sent you a message"
                                      : " scheduled a meeting"}
                              </span>
                            </p>
                            <p className="text-sm text-gray-500">
                              {activity.company} • {activity.time}
                            </p>
                          </div>
                          {activity.type === "message" && (
                            <Button variant="outline" size="sm" className="ml-auto border-gray-700">
                              Reply
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Upcoming Meetings */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Upcoming Meetings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {STARTUP_DATA.upcomingMeetings.length > 0 ? (
                      <div className="space-y-4">
                        {STARTUP_DATA.upcomingMeetings.map((meeting) => (
                          <div key={meeting.id} className="border-l-2 border-purple-500 pl-4 py-1">
                            <p className="font-medium">{meeting.title}</p>
                            <p className="text-sm text-gray-400">With: {meeting.with}</p>
                            <p className="text-sm text-gray-400">{meeting.date}</p>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full border-gray-700">
                          View Calendar
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Calendar className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-gray-400">No upcoming meetings</p>
                        <Button variant="outline" className="mt-4 border-gray-700">
                          Schedule a Meeting
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recommended Investors */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Recommended Investors</CardTitle>
                    <CardDescription>Based on your profile and industry</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {STARTUP_DATA.recommendedInvestors.map((investor) => (
                        <div key={investor.id} className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                            <Briefcase size={16} />
                          </div>
                          <div>
                            <p className="font-medium">{investor.name}</p>
                            <p className="text-sm text-gray-400">{investor.company}</p>
                          </div>
                          <div className="ml-auto text-right">
                            <p className="text-sm font-medium text-green-400">{investor.match} match</p>
                            <Button variant="link" className="p-0 h-auto text-sm text-purple-400">
                              Connect
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full border-gray-700">
                        View All Matches
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="border-gray-700 flex flex-col h-auto py-4">
                      <TrendingUp className="h-5 w-5 mb-1" />
                      <span className="text-xs">Update Metrics</span>
                    </Button>
                    <Button variant="outline" className="border-gray-700 flex flex-col h-auto py-4">
                      <DollarSign className="h-5 w-5 mb-1" />
                      <span className="text-xs">Funding Goals</span>
                    </Button>
                    <Button variant="outline" className="border-gray-700 flex flex-col h-auto py-4">
                      <UserPlus className="h-5 w-5 mb-1" />
                      <span className="text-xs">Add Team</span>
                    </Button>
                    <Button variant="outline" className="border-gray-700 flex flex-col h-auto py-4">
                      <Bell className="h-5 w-5 mb-1" />
                      <span className="text-xs">Notifications</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your startup profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Profile management content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investors">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Investors</CardTitle>
                <CardDescription>Find and connect with potential investors</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Investor matching content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Track your startup's performance and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Analytics content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Communicate with investors and partners</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Messaging content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
