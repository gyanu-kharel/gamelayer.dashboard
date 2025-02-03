import Link from "next/link"
import type React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"


export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Overview
      </Link>
      <Link
        href="/management"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Management
      </Link>
    </nav>
  )
}

