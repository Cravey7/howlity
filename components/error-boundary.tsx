'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  className?: string;
}

export function ErrorBoundary({ error, reset, className }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      name: error.name,
    });
  }, [error]);

  return (
    <div className={cn('flex min-h-screen flex-col items-center justify-center p-4', className)}>
      <div className='mx-auto flex max-w-[400px] flex-col items-center justify-center text-center'>
        <AlertCircle className='h-10 w-10 text-destructive' />
        <h2 className='mt-4 text-lg font-semibold'>Something went wrong!</h2>
        <p className='mt-2 text-sm text-muted-foreground'>
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className='mt-4 flex gap-2'>
          <Button onClick={reset} variant='outline'>
            Try again
          </Button>
          <Button onClick={() => (window.location.href = '/')} variant='default'>
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
