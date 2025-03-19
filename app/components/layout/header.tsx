"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

export function Header() {
  const pathname = usePathname()
  const isAuthPage = ["/login", "/register"].includes(pathname)
  const isDashboard = pathname.startsWith("/dashboard")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">{siteConfig.name}</span>
          </Link>

          {!isAuthPage && !isDashboard && (
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {siteConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-foreground/80"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {!isAuthPage && !isDashboard && (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
} 