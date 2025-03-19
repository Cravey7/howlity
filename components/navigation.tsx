"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavigationItem {
  id: string
  name: string
  href: string
}

export default function Navigation() {
  const [items, setItems] = useState<NavigationItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const fetchNavigationItems = async () => {
      try {
        console.log("Attempting to fetch navigation items...")
        
        const { data, error } = await supabase
          .from("navigation")
          .select("*")
          .order("id", { ascending: true })

        if (error) {
          console.error("Supabase error details:", {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          })
          setError(error.message || "Failed to fetch navigation items")
          return
        }

        console.log("Successfully fetched navigation items:", data)
        setItems(data || [])
      } catch (error) {
        console.error("Unexpected error:", error)
        setError(error instanceof Error ? error.message : "An unexpected error occurred")
      }
    }

    fetchNavigationItems()
  }, [])

  if (error) {
    return (
      <nav className="text-red-500">
        Error loading navigation: {error}
      </nav>
    )
  }

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {items.length === 0 ? (
        <span className="text-muted-foreground">No navigation items found.</span>
      ) : (
        items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === item.href
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {item.name}
          </Link>
        ))
      )}
    </nav>
  )
} 