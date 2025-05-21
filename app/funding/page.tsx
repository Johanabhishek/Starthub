import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { GradientBlob } from "@/components/gradient-blob"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function FundingPage() {
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
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">Secure Funding</h1>
            <p className="mt-2 text-zinc-400">
              Connect with angel investors and VCs looking for promising early-stage startups.
            </p>
          </div>

          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Coming Soon</h2>
              <p className="mt-2 text-zinc-400">We're working on this feature. Check back soon!</p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
