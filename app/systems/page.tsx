'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SystemForm } from '../components/forms/system-form';

interface System {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export default function SystemsPage() {
  const [systems, setSystems] = useState<System[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchSystems() {
      try {
        const { data, error } = await supabase
          .from('systems')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSystems(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchSystems();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-destructive/10">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Systems</h1>
          <p className="text-muted-foreground">
            A list of all systems in your organization.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          Add system
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {systems.map((system) => (
          <Card key={system.id}>
            <CardHeader>
              <CardTitle>{system.name}</CardTitle>
              <CardDescription>
                {system.description || 'No description'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Created {new Date(system.created_at).toLocaleDateString()}
                </p>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
          <div className="container flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle>Add New System</CardTitle>
                <CardDescription>
                  Create a new system in your organization.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SystemForm onSuccess={() => {
                  setShowForm(false);
                  // Refresh the systems list
                  fetchSystems();
                }} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
} 