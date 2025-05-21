import type React from "react"
import { cn } from "@/lib/utils"

interface GradientBlobProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GradientBlob({ className, ...props }: GradientBlobProps) {
  return <div className={cn("animate-pulse rounded-full opacity-70 blur-3xl", className)} {...props} />
}
