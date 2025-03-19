"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/app/supabase/client"
import { Navigation } from "@/components/layout/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.push("/login")
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase.auth])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto py-6">{children}</main>
    </div>
  )
} 