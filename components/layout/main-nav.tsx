"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { siteConfig } from "@/config/site"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex w-full items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6">
        <Link href="/login">
          <Button variant="ghost">Sign In</Button>
        </Link>
        <Link href="/register">
          <Button>Get Started</Button>
        </Link>
        <ThemeToggle />
      </nav>
    </div>
  )
} 