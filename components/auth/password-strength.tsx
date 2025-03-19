"use client"

import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const calculateStrength = (password: string) => {
    let strength = 0
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    }

    // Add 20% for each check passed
    Object.values(checks).forEach((passed) => {
      if (passed) strength += 20
    })

    return {
      score: strength,
      checks,
    }
  }

  const { score, checks } = calculateStrength(password)

  const getStrengthText = (score: number) => {
    if (score === 100) return "Very Strong"
    if (score >= 80) return "Strong"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    if (score >= 20) return "Weak"
    return "Very Weak"
  }

  const getStrengthColor = (score: number) => {
    if (score === 100) return "bg-green-500"
    if (score >= 80) return "bg-green-400"
    if (score >= 60) return "bg-yellow-500"
    if (score >= 40) return "bg-orange-500"
    if (score >= 20) return "bg-red-500"
    return "bg-red-700"
  }

  return (
    <div className="space-y-2">
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-300",
            getStrengthColor(score)
          )}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="text-sm flex justify-between items-center">
        <span className="text-muted-foreground">
          Strength: {getStrengthText(score)}
        </span>
        <span className="text-muted-foreground">
          {score}%
        </span>
      </div>
      <ul className="text-sm space-y-1">
        {!checks.length && (
          <li className={cn(
            "text-muted-foreground",
            checks.length ? "text-green-500" : ""
          )}>
            • At least 8 characters
          </li>
        )}
        {!checks.uppercase && (
          <li className={cn(
            "text-muted-foreground",
            checks.uppercase ? "text-green-500" : ""
          )}>
            • At least one uppercase letter
          </li>
        )}
        {!checks.lowercase && (
          <li className={cn(
            "text-muted-foreground",
            checks.lowercase ? "text-green-500" : ""
          )}>
            • At least one lowercase letter
          </li>
        )}
        {!checks.number && (
          <li className={cn(
            "text-muted-foreground",
            checks.number ? "text-green-500" : ""
          )}>
            • At least one number
          </li>
        )}
        {!checks.special && (
          <li className={cn(
            "text-muted-foreground",
            checks.special ? "text-green-500" : ""
          )}>
            • At least one special character
          </li>
        )}
      </ul>
    </div>
  )
} 