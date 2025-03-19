import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { z } from 'zod'
import { createClient } from '@/app/supabase/client'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

interface AuthFormProps {
  type: 'login' | 'register'
}

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [formError, setFormError] = useState<string | null>(null)
  const supabase = createClient()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setFormError(null)
      setIsLoading(true)
      if (type === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        })
        if (error) throw new Error(error.message)
      } else {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        })
        if (error) throw new Error(error.message)
      }

      toast({
        title: "Success",
        description: type === "login" 
          ? "Logged in successfully" 
          : "Registration successful. Please check your email.",
      })
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'An unexpected error occurred')
      toast({
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      // Log the error to your error reporting service
      console.error('Auth error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // ... rest of the component

  {formError && (
    <div className="text-sm text-destructive mt-2">
      {formError}
    </div>
  )}
} 