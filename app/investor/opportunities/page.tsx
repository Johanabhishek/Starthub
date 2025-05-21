"use client"

import type React from "react"

import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowLeft, ListFilter, LayoutGrid, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { GradientBlob } from "@/components/gradient-blob"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StartupCard } from "@/components/startup-card"
import { InvestorSidebar } from "@/components/investor-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase/client"

// Number of items to display per page for traditional pagination
const ITEMS_PER_PAGE = 6

// Number of items to load initially and on each "load more" for infinite scroll
const INFINITE_SCROLL_BATCH_SIZE = 6

export default function InvestorOpportunitiesPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Get the current page from URL or default to 1
  const currentPage = Number(searchParams.get("page") || 1)
  const [searchQuery, setSearchQuery] = useState("")
  const [industry, setIndustry] = useState("all")
  const [stage, setStage] = useState("all")

  // State for infinite scroll
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(false)
  const [visibleItems, setVisibleItems] = useState(INFINITE_SCROLL_BATCH_SIZE)
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  // State for opportunities
  const [opportunities, setOpportunities] = useState<any[]>([])

  // Fetch opportunities from Supabase
  useEffect(() => {
    async function fetchOpportunities() {
      setIsLoading(true)
      try {
        // Join startups and opportunities tables
        let query = supabase
          .from("opportunities")
          .select(`
            id,
            title,
            description,
            amount,
            equity_offered,
            status,
            created_at,
            startups (
              id,
              name,
              tagline,
              logo_url,
              industry,
              stage,
              founded_year
            )
          `)
          .eq("status", "open")

        // Apply filters if needed
        if (industry !== "all") {
          query = query.eq("startups.industry", industry)
        }

        if (stage !== "all") {
          query = query.eq("startups.stage", stage)
        }

        const { data, error } = await query

        if (error) {
          throw error
        }

        // Transform data to match the expected format
        const formattedData = data.map((item) => ({
          id: item.id,
          name: item.startups.name,
          logo: item.startups.logo_url || "/placeholder.svg",
          category: item.startups.industry,
          stage: item.startups.stage,
          invested: "$0", // Default value
          equity: `${item.equity_offered}%`,
          valuation: `$${(item.amount / (item.equity_offered / 100)).toLocaleString()}`,
          trend: "up" as const, // Default value
          trendValue: "10%", // Default value
          description: item.description || item.startups.tagline,
        }))

        setOpportunities(formattedData)
      } catch (error: any) {
        toast({
          title: "Error fetching opportunities",
          description: error.message,
          variant: "destructive",
        })
        // Fallback to empty array
        setOpportunities([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchOpportunities()
  }, [industry, stage, toast])

  // Filter opportunities based on search
  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch =
      searchQuery === "" ||
      opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  // Calculate pagination values for traditional pagination
  const totalItems = filteredOpportunities.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  // Determine which items to display based on pagination mode
  const currentItems = useInfiniteScroll
    ? filteredOpportunities.slice(0, visibleItems)
    : filteredOpportunities.slice(startIndex, endIndex)

  // Create a new URLSearchParams instance for navigation
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    // Reset pagination
    if (useInfiniteScroll) {
      setVisibleItems(INFINITE_SCROLL_BATCH_SIZE)
      setHasMore(true)
    } else {
      // Reset to page 1 when search changes
      const params = new URLSearchParams(searchParams)
      params.set("page", "1")
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  // Handle industry selection change
  const handleIndustryChange = (value: string) => {
    setIndustry(value)
    // Reset pagination
    if (useInfiniteScroll) {
      setVisibleItems(INFINITE_SCROLL_BATCH_SIZE)
      setHasMore(true)
    } else {
      // Reset to page 1 when filter changes
      const params = new URLSearchParams(searchParams)
      params.set("page", "1")
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  // Handle stage selection change
  const handleStageChange = (value: string) => {
    setStage(value)
    // Reset pagination
    if (useInfiniteScroll) {
      setVisibleItems(INFINITE_SCROLL_BATCH_SIZE)
      setHasMore(true)
    } else {
      // Reset to page 1 when filter changes
      const params = new URLSearchParams(searchParams)
      params.set("page", "1")
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  // Toggle between pagination modes
  const handlePaginationModeChange = (checked: boolean) => {
    setUseInfiniteScroll(checked)
    if (checked) {
      // Switch to infinite scroll
      setVisibleItems(INFINITE_SCROLL_BATCH_SIZE)
      setHasMore(filteredOpportunities.length > INFINITE_SCROLL_BATCH_SIZE)
    }
  }

  // Load more items for infinite scroll
  const loadMoreItems = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      setVisibleItems((prevVisibleItems) => {
        const newVisibleItems = prevVisibleItems + INFINITE_SCROLL_BATCH_SIZE
        setHasMore(newVisibleItems < filteredOpportunities.length)
        return newVisibleItems
      })
      setIsLoading(false)
    }, 800) // Simulate network delay
  }, [filteredOpportunities.length, hasMore, isLoading])

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!useInfiniteScroll || !loadMoreRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreItems()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(loadMoreRef.current)

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [useInfiniteScroll, hasMore, isLoading, loadMoreItems])

  // Reset visible items when filters change
  useEffect(() => {
    if (useInfiniteScroll) {
      setVisibleItems(INFINITE_SCROLL_BATCH_SIZE)
      setHasMore(filteredOpportunities.length > INFINITE_SCROLL_BATCH_SIZE)
    }
  }, [filteredOpportunities.length, useInfiniteScroll])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <GradientBlob className="absolute -top-40 -left-40 h-[500px] w-[500px] bg-purple-500/20 blur-[120px]" />
        <GradientBlob className="absolute top-[30%] -right-40 h-[400px] w-[400px] bg-blue-500/20 blur-[120px]" />
        <GradientBlob className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] bg-pink-500/20 blur-[120px]" />

        <Navbar />

        <SidebarProvider>
          <div className="flex">
            <InvestorSidebar />
            <main className="flex-1 px-4 py-8 md:px-8">
              <div className="mb-8">
                <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
                <h1 className="mt-4 text-3xl font-bold md:text-4xl">Investment Opportunities</h1>
                <p className="mt-2 text-zinc-400">
                  Discover promising startups seeking investment.
                  {totalItems > 0 && (
                    <span className="ml-2">
                      {useInfiniteScroll
                        ? `Showing ${Math.min(visibleItems, totalItems)} of ${totalItems} opportunities`
                        : `Showing ${startIndex + 1}-${Math.min(endIndex, totalItems)} of ${totalItems} opportunities`}
                    </span>
                  )}
                </p>
              </div>

              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 md:max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <Input
                    placeholder="Search opportunities..."
                    className="border-zinc-700 bg-zinc-800/50 pl-10"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <Select value={industry} onValueChange={handleIndustryChange}>
                    <SelectTrigger className="w-[180px] border-zinc-700 bg-zinc-800/50">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="fintech">FinTech</SelectItem>
                      <SelectItem value="healthtech">HealthTech</SelectItem>
                      <SelectItem value="edtech">EdTech</SelectItem>
                      <SelectItem value="cleantech">CleanTech</SelectItem>
                      <SelectItem value="ai-ml">AI/ML</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={stage} onValueChange={handleStageChange}>
                    <SelectTrigger className="w-[180px] border-zinc-700 bg-zinc-800/50">
                      <SelectValue placeholder="Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      <SelectItem value="idea">Idea</SelectItem>
                      <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="series-a">Series A</SelectItem>
                      <SelectItem value="series-b">Series B+</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-zinc-700 bg-zinc-800/50">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </div>
              </div>

              {/* Pagination mode toggle */}
              <div className="mb-6 flex items-center justify-end gap-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <LayoutGrid className={`h-4 w-4 ${!useInfiniteScroll ? "text-purple-400" : "text-zinc-400"}`} />
                    <Label htmlFor="pagination-mode" className="cursor-pointer">
                      Pagination Mode
                    </Label>
                    <Switch
                      id="pagination-mode"
                      checked={useInfiniteScroll}
                      onCheckedChange={handlePaginationModeChange}
                    />
                    <Label htmlFor="pagination-mode" className="cursor-pointer">
                      Infinite Scroll
                    </Label>
                    <ListFilter className={`h-4 w-4 ${useInfiniteScroll ? "text-purple-400" : "text-zinc-400"}`} />
                  </div>
                </div>
              </div>

              {isLoading && currentItems.length === 0 ? (
                <div className="flex h-40 items-center justify-center">
                  <Spinner className="text-purple-500" />
                  <span className="ml-2 text-zinc-400">Loading opportunities...</span>
                </div>
              ) : currentItems.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {currentItems.map((opportunity) => (
                    <Link key={opportunity.id} href={`/startups/${opportunity.id}`}>
                      <StartupCard {...opportunity} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50">
                  <p className="text-center text-zinc-400">
                    No opportunities found matching your criteria. Try adjusting your filters.
                  </p>
                </div>
              )}

              {/* Infinite scroll loading indicator and sentinel */}
              {useInfiniteScroll && (
                <div className="mt-8 flex flex-col items-center">
                  {isLoading && currentItems.length > 0 && (
                    <div className="flex items-center justify-center py-4">
                      <Spinner className="text-purple-500" />
                      <span className="ml-2 text-zinc-400">Loading more opportunities...</span>
                    </div>
                  )}

                  {!isLoading && hasMore && (
                    <Button variant="outline" className="border-zinc-700 bg-zinc-800/50" onClick={loadMoreItems}>
                      Load More Opportunities
                    </Button>
                  )}

                  {/* Invisible element for intersection observer */}
                  <div ref={loadMoreRef} className="h-4 w-full" />

                  {!hasMore && visibleItems > INFINITE_SCROLL_BATCH_SIZE && (
                    <p className="mt-4 text-center text-zinc-400">You've reached the end of the list</p>
                  )}
                </div>
              )}

              {/* Traditional pagination controls */}
              {!useInfiniteScroll && totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious href={createPageURL(currentPage - 1)} />
                        </PaginationItem>
                      )}

                      {/* First page */}
                      {currentPage > 2 && (
                        <PaginationItem>
                          <PaginationLink href={createPageURL(1)}>1</PaginationLink>
                        </PaginationItem>
                      )}

                      {/* Ellipsis if needed */}
                      {currentPage > 3 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      {/* Previous page if not first */}
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationLink href={createPageURL(currentPage - 1)}>{currentPage - 1}</PaginationLink>
                        </PaginationItem>
                      )}

                      {/* Current page */}
                      <PaginationItem>
                        <PaginationLink href={createPageURL(currentPage)} isActive>
                          {currentPage}
                        </PaginationLink>
                      </PaginationItem>

                      {/* Next page if not last */}
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationLink href={createPageURL(currentPage + 1)}>{currentPage + 1}</PaginationLink>
                        </PaginationItem>
                      )}

                      {/* Ellipsis if needed */}
                      {currentPage < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      {/* Last page if not current or next */}
                      {currentPage < totalPages - 1 && (
                        <PaginationItem>
                          <PaginationLink href={createPageURL(totalPages)}>{totalPages}</PaginationLink>
                        </PaginationItem>
                      )}

                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext href={createPageURL(currentPage + 1)} />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </main>
          </div>
        </SidebarProvider>

        <Footer />
      </div>
    </div>
  )
}
