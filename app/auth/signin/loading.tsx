import { Skeleton } from "@/components/ui/skeleton"
import { Navbar } from "@/components/navbar"

export default function SignInLoading() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 pt-16">
        <div className="w-full max-w-md space-y-8 rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-lg">
          <div className="space-y-2 text-center">
            <Skeleton className="mx-auto h-8 w-48" />
            <Skeleton className="mx-auto h-4 w-64" />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>

            <Skeleton className="h-10 w-full" />

            <div className="text-center">
              <Skeleton className="mx-auto h-4 w-48" />
            </div>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <Skeleton className="h-px w-full" />
            </div>
            <div className="relative flex justify-center">
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="pt-4">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </>
  )
}
