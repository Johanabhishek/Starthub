"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GalleryItem {
  type: "image" | "video"
  url: string
  caption?: string
}

interface StartupGalleryProps {
  gallery: GalleryItem[]
  className?: string
}

export function StartupGallery({ gallery, className }: StartupGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))
  }

  const openLightbox = (index: number) => {
    setActiveIndex(index)
    setShowLightbox(true)
  }

  return (
    <>
      <Card className={cn("border-zinc-800 bg-zinc-900/50", className)}>
        <CardHeader>
          <CardTitle>Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-video cursor-pointer overflow-hidden rounded-md bg-zinc-800"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={item.url || "/placeholder.svg"}
                  alt={item.caption || `Gallery item ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-white hover:bg-zinc-800"
            onClick={() => setShowLightbox(false)}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-zinc-800"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="relative max-h-[80vh] max-w-[90vw]">
            <Image
              src={gallery[activeIndex].url || "/placeholder.svg"}
              alt={gallery[activeIndex].caption || `Gallery item ${activeIndex + 1}`}
              width={1200}
              height={800}
              className="max-h-[80vh] rounded-md object-contain"
            />
            {gallery[activeIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-center text-white">
                {gallery[activeIndex].caption}
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-zinc-800"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      )}
    </>
  )
}
