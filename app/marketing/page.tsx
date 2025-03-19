import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Marketing | DevFlow",
  description: "Welcome to DevFlow - Your Development Workflow Solution",
}

export default function MarketingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <span className="text-blue-600">
            DevFlow
          </span>
        </h1>

        <p className="mt-3 text-2xl">
          Your Development Workflow Solution
        </p>
      </main>
    </div>
  )
} 