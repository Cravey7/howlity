'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../supabase/client';

interface System {
  id: string;
  name: string;
}

interface ApplicationFormProps {
  onSuccess?: () => void;
}

export function ApplicationForm({ onSuccess }: ApplicationFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [systemId, setSystemId] = useState('');
  const [systems, setSystems] = useState<System[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchSystems() {
      try {
        const { data, error } = await supabase
          .from('systems')
          .select('id, name')
          .order('name');

        if (error) throw error;
        setSystems(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    }

    fetchSystems();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('applications')
        .insert([
          {
            name,
            description,
            system_id: systemId,
          },
        ]);

      if (error) throw error;

      setName('');
      setDescription('');
      setSystemId('');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      <div>
        <label htmlFor="system" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          System
        </label>
        <select
          id="system"
          value={systemId}
          onChange={(e) => setSystemId(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="">Select a system</option>
          {systems.map((system) => (
            <option key={system.id} value={system.id}>
              {system.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Application'}
      </button>
    </form>
  );
} 