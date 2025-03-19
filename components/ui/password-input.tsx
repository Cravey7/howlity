import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Progress } from "./progress"

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showPassword?: boolean
  onTogglePassword?: () => void
  strength?: number
  recommendations?: string[]
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showPassword, onTogglePassword, strength, recommendations, ...props }, ref) => {
    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
        {strength !== undefined && (
          <div className="mt-2">
            <Progress value={strength} className="h-1" />
            <p className="mt-1 text-xs text-gray-500">
              Password strength: {strength < 25 ? "Weak" : strength < 50 ? "Fair" : strength < 75 ? "Good" : "Strong"}
            </p>
          </div>
        )}
        {recommendations && recommendations.length > 0 && (
          <ul className="mt-2 text-xs text-gray-500">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput } 