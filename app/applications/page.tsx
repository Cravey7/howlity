'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../supabase/client';
import { ApplicationForm } from '../components/forms/application-form';

interface Application {
  id: string;
  name: string;
  description: string;
  system_id: string;
  created_at: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  async function fetchApplications() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, [supabase]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Applications</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Create New Application</h2>
            <ApplicationForm onSuccess={fetchApplications} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Existing Applications</h2>
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <h3 className="text-xl font-semibold">{application.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{application.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    System ID: {application.system_id}
                  </p>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(application.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 