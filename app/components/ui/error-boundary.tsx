'use client'

import { useEffect } from 'react'
import { Button } from './button'
import { ErrorType } from '@/lib/utils/error-handlers'

interface ErrorBoundaryProps {
  error: Error
  type?: ErrorType
  reset: () => void
  className?: string
}

export function ErrorBoundary({ error, type = 'UNKNOWN_ERROR', reset, className }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error:', {
      message: error.message,
      type,
      stack: error.stack
    })
  }, [error, type])

  const errorMessages: Record<ErrorType, string> = {
    VALIDATION_ERROR: 'The submitted data was invalid. Please check your input and try again.',
    AUTH_ERROR: 'There was an authentication error. Please try signing in again.',
    API_ERROR: 'There was an error communicating with the server. Please try again.',
    NETWORK_ERROR: 'There was a network error. Please check your connection and try again.',
    NOT_FOUND: 'The requested resource was not found.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
  }

  return (
    <div className={`rounded-lg border bg-destructive/10 p-6 ${className}`}>
      <h2 className="text-lg font-semibold text-destructive">Error</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {errorMessages[type]}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {error.message}
      </p>
      <div className="mt-4 space-x-4">
        <Button onClick={() => reset()} variant="secondary">
          Try again
        </Button>
        <Button onClick={() => window.location.reload()} variant="outline">
          Reload page
        </Button>
      </div>
    </div>
  )
} 