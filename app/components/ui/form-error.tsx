import { AlertCircle } from 'lucide-react'

interface FormErrorProps {
  id?: string
  message?: string
}

export function FormError({ id, message }: FormErrorProps) {
  if (!message) return null

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="flex items-center gap-2 text-sm text-destructive mt-2"
    >
      <AlertCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
} 