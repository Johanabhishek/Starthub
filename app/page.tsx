import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Users, Lightbulb, Code, Compass, Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FeatureCard } from "@/components/feature-card"
import { StartupShowcase } from "@/components/startup-showcase"
import { GradientBlob } from "@/components/gradient-blob"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <GradientBlob className="absolute -top-40 -left-40 h-[500px] w-[500px] bg-purple-500/20 blur-[120px]" />
        <GradientBlob className="absolute top-[30%] -right-40 h-[400px] w-[400px] bg-blue-500/20 blur-[120px]" />
        <GradientBlob className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] bg-pink-500/20 blur-[120px]" />

        <Navbar />

        <main className="relative">
          {/* Hero Section */}
          <section className="container px-4 pt-20 pb-16 md:pt-32 md:pb-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Where{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  ideas
                </span>{" "}
                meet{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  resources
                </span>
              </h1>
              <p className="mb-10 text-xl text-zinc-400 md:text-2xl">
                The platform for passionate founders to connect, build teams, and get funded. Your startup journey
                starts here.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/startup/create">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/startups">
                  <Button size="lg" variant="outline" className="border-zinc-800 text-zinc-300 hover:bg-zinc-900">
                    Explore Startups
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="container px-4 py-16 md:py-24">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">How StartHub Works</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Link href="/cofounders" className="block">
                <FeatureCard
                  icon={<Users className="h-10 w-10 text-blue-400" />}
                  title="Find Co-Founders"
                  description="Connect with talented individuals who share your vision and complement your skills."
                />
              </Link>
              <Link href="/showcase" className="block">
                <FeatureCard
                  icon={<Lightbulb className="h-10 w-10 text-purple-400" />}
                  title="Showcase Ideas"
                  description="Present your startup concept to a community of innovators, mentors, and investors."
                />
              </Link>
              <Link href="/resources" className="block">
                <FeatureCard
                  icon={<Code className="h-10 w-10 text-pink-400" />}
                  title="Access Resources"
                  description="Get templates, tools, and guidance to build your MVP and scale your startup."
                />
              </Link>
              <Link href="/mentorship" className="block">
                <FeatureCard
                  icon={<Compass className="h-10 w-10 text-green-400" />}
                  title="Find Mentorship"
                  description="Learn from experienced entrepreneurs who've been through the startup journey."
                />
              </Link>
              <Link href="/funding" className="block">
                <FeatureCard
                  icon={<Rocket className="h-10 w-10 text-yellow-400" />}
                  title="Secure Funding"
                  description="Connect with angel investors and VCs looking for promising early-stage startups."
                />
              </Link>
              <Link href="/community" className="block">
                <FeatureCard
                  icon={<Users className="h-10 w-10 text-red-400" />}
                  title="Build Community"
                  description="Join a supportive network of founders facing similar challenges and opportunities."
                />
              </Link>
            </div>
          </section>

          {/* Investors Section */}
          <section className="relative py-16 md:py-24">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/0 via-zinc-900 to-zinc-900/0"></div>
            <div className="container relative px-4">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-6 text-3xl font-bold md:text-4xl">Investor Corner</h2>
                <p className="mb-10 text-lg text-zinc-400">
                  Discover promising early-stage startups before they take off. Connect directly with passionate
                  founders and be part of the next big thing.
                </p>
                <Link href="/investor/opportunities">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Explore Investment Opportunities
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Startup Showcase */}
          <section className="container px-4 py-16 md:py-24">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Trending Startups</h2>
            <StartupShowcase />
            <div className="mt-12 text-center">
              <Link href="/startups" className="text-zinc-400 hover:text-white">
                View all startups <ArrowRight className="ml-1 inline-block h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 p-8 text-center md:p-12">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to launch your startup?</h2>
              <p className="mb-8 text-lg text-zinc-400">
                Join thousands of founders who are building the future on StartHub.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/startup/create">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Create Your Profile
                  </Button>
                </Link>
                <Link href="/investor/register">
                  <Button size="lg" variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                    Join as Investor
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
