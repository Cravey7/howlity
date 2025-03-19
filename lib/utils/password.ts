export interface PasswordValidationResult {
  strength: number
  recommendations: string[]
  isValid: boolean
}

export function validatePassword(password: string): PasswordValidationResult {
  const recommendations: string[] = []
  let strength = 0

  // Length check
  if (password.length < 8) {
    recommendations.push("Password should be at least 8 characters long")
  } else {
    strength += 25
  }

  // Contains number
  if (!/\d/.test(password)) {
    recommendations.push("Add at least one number")
  } else {
    strength += 25
  }

  // Contains lowercase letter
  if (!/[a-z]/.test(password)) {
    recommendations.push("Add at least one lowercase letter")
  } else {
    strength += 25
  }

  // Contains uppercase letter
  if (!/[A-Z]/.test(password)) {
    recommendations.push("Add at least one uppercase letter")
  } else {
    strength += 25
  }

  // Contains special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    recommendations.push("Add at least one special character")
  } else {
    strength += 25
  }

  return {
    strength: Math.min(strength, 100),
    recommendations,
    isValid: recommendations.length === 0
  }
} 