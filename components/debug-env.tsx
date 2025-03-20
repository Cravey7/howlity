'use client';

export function DebugEnv() {
  return (
    <div className='fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-sm'>
      <pre>
        {JSON.stringify(
          {
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            keyExists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}
