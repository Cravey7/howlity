"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/app/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { handleApiError } from "@/lib/utils/error-handlers"
import { Icons } from "@/components/ui/icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface VerificationStatusProps {
  email: string
}

export function VerificationStatus({ email }: VerificationStatusProps) {
  const [isResending, setIsResending] = useState(false)
  const supabase = createClient()
  const { toast } = useToast()

  const handleResendEmail = async () => {
    try {
      setIsResending(true)
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      })
      if (error) throw error

      toast({
        title: "Success",
        description: "Verification email has been resent. Please check your inbox.",
      })
    } catch (error) {
      const enhancedError = await handleApiError(error)
      toast({
        title: "Error",
        description: enhancedError.message,
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Alert>
      <Icons.mail className="h-4 w-4" />
      <AlertTitle>Verify your email</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-2">
          We&apos;ve sent a verification email to <strong>{email}</strong>.
          Please check your inbox and click the verification link to complete your registration.
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResendEmail}
            disabled={isResending}
          >
            {isResending ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : (
              <>
                <Icons.refresh className="mr-2 h-4 w-4" />
                Resend Email
              </>
            )}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
} 