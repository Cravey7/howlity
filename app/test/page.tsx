"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function TestPage() {
  const [config, setConfig] = useState<{
    url: string | null;
    hasKey: boolean;
    error: string | null;
  }>({
    url: null,
    hasKey: false,
    error: null
  });

  useEffect(() => {
    try {
      const supabase = createClientComponentClient();
      setConfig({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        error: null
      });
    } catch (error) {
      setConfig(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supabase Configuration Test</h1>
      <div className="space-y-2">
        <p>URL: {config.url || 'Not found'}</p>
        <p>Has Anon Key: {config.hasKey ? 'Yes' : 'No'}</p>
        {config.error && (
          <p className="text-red-500">Error: {config.error}</p>
        )}
      </div>
    </div>
  );
} 