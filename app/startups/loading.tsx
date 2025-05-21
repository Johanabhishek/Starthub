import { Skeleton } from "@/components/ui/skeleton"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function StartupsLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-10 w-64 bg-gray-800 mb-6" />

        {/* Search and Filter Bar Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Skeleton className="h-10 flex-grow bg-gray-800" />
            <Skeleton className="h-10 w-24 bg-gray-800" />
            <Skeleton className="h-10 w-36 bg-gray-800" />
          </div>

          <Skeleton className="h-4 w-40 bg-gray-800" />
        </div>

        {/* Startups Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="h-12 w-12 rounded-full bg-gray-800" />
                    <Skeleton className="h-6 w-32 bg-gray-800" />
                  </div>
                  <Skeleton className="h-4 w-full bg-gray-800 mb-2" />
                  <Skeleton className="h-4 w-3/4 bg-gray-800 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16 rounded-full bg-gray-800" />
                    <Skeleton className="h-6 w-16 rounded-full bg-gray-800" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <Skeleton className="h-12 bg-gray-800" />
                    <Skeleton className="h-12 bg-gray-800" />
                    <Skeleton className="h-12 bg-gray-800" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
