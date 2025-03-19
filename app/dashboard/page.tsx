"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

interface System {
  id: string;
  name: string;
  description: string;
}

export default function DashboardPage() {
  const [systems, setSystems] = useState<System[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        console.log("Attempting to fetch systems...");
        
        const { data, error } = await supabase
          .from("systems")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase error details:", {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          setError(error.message || "Failed to fetch systems");
          return;
        }

        console.log("Successfully fetched systems:", data);
        setSystems(data || []);
      } catch (error) {
        console.error("Unexpected error:", error);
        setError(error instanceof Error ? error.message : "An unexpected error occurred");
      }
    };

    fetchSystems();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="text-red-500">
          Error loading systems: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button>Create New System</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground">
            No systems found. Create your first system to get started.
          </div>
        ) : (
          systems.map((system) => (
            <Card key={system.id}>
              <CardHeader>
                <CardTitle>{system.name}</CardTitle>
                <CardDescription>{system.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  System ID: {system.id}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">View Details</Button>
                <Button>Edit</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 