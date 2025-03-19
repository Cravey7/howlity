import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to DevFlow</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Manage your systems, applications, features, and stacks
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Systems</CardTitle>
              <CardDescription>Manage your development systems</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/systems">View Systems</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
              <CardDescription>Track your applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/applications">View Applications</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>Manage feature development</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/features">View Features</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
