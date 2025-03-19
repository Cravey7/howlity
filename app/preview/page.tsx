'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card'

export default function PreviewPage() {
  const [systems, setSystems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">DevFlow Component Preview</h1>
        
        {/* Navigation Preview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
          <Card>
            <CardContent className="p-4">
              <nav className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start">
                  <span className="text-lg mr-2">🏠</span>
                  Dashboard
                </Button>
                <Button variant="ghost" className="justify-start">
                  <span className="text-lg mr-2">📊</span>
                  Systems
                </Button>
                <Button variant="ghost" className="justify-start">
                  <span className="text-lg mr-2">⚙️</span>
                  Settings
                </Button>
              </nav>
            </CardContent>
          </Card>
        </section>

        {/* System Cards Preview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">System Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* System Card 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>DevFlow</CardTitle>
                <CardDescription>
                  Developer workflow and system architecture documentation tool
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">3 Applications</span>
                <Button variant="link">View Details →</Button>
              </CardFooter>
            </Card>

            {/* System Card 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>E-Commerce</CardTitle>
                <CardDescription>
                  Online shopping platform with inventory management
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">2 Applications</span>
                <Button variant="link">View Details →</Button>
              </CardFooter>
            </Card>

            {/* System Card 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Data analytics and reporting platform
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">1 Application</span>
                <Button variant="link">View Details →</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Feature List Preview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Feature List</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 hover:bg-accent rounded-md">
                  <span className="text-lg">✅</span>
                  <div>
                    <h4 className="font-medium">System Management</h4>
                    <p className="text-sm text-muted-foreground">Manage and organize your systems</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 hover:bg-accent rounded-md">
                  <span className="text-lg">✅</span>
                  <div>
                    <h4 className="font-medium">Application Tracking</h4>
                    <p className="text-sm text-muted-foreground">Track and monitor applications</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 hover:bg-accent rounded-md">
                  <span className="text-lg">✅</span>
                  <div>
                    <h4 className="font-medium">Stack Documentation</h4>
                    <p className="text-sm text-muted-foreground">Document your tech stack</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stack Preview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Frontend Stack */}
            <Card>
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">⚛️</span>
                    <span>Next.js</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🎨</span>
                    <span>Tailwind CSS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📦</span>
                    <span>Shadcn UI</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backend Stack */}
            <Card>
              <CardHeader>
                <CardTitle>Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🗄️</span>
                    <span>Supabase</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🐘</span>
                    <span>PostgreSQL</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🔒</span>
                    <span>Auth.js</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Button Variants Preview */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
} 