import { toast } from '@/components/ui/use-toast'
import { ErrorType } from './error-handlers'

interface ToastErrorOptions {
  title?: string
  description?: string
  type?: ErrorType
  action?: {
    label: string
    onClick: () => void
  }
}

export function toastError(error: Error, options?: ToastErrorOptions) {
  const defaultMessages: Record<ErrorType, string> = {
    AUTH: 'Authentication error occurred',
    VALIDATION: 'Please check your input',
    NETWORK: 'Network error occurred',
    DATABASE: 'Database error occurred',
    UNKNOWN: 'An unexpected error occurred'
  }

  const enhancedError = error as EnhancedError
  const type = enhancedError.type || 'UNKNOWN'

  toast({
    title: options?.title || defaultMessages[type],
    description: options?.description || error.message,
    variant: 'destructive',
    action: options?.action && {
      label: options.action.label,
      onClick: options.action.onClick,
    }
  })
} 