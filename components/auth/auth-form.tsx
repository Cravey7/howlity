"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { handleApiError } from "@/lib/utils/error-handlers"
import { usernameSchema } from "@/lib/utils/validation"
import { PasswordStrength } from "./password-strength"
import { VerificationStatus } from "./verification-status"
import { Eye, EyeOff } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  rememberMe: z.boolean().optional(),
})

const registerSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  username: usernameSchema,
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

interface AuthFormProps {
  type: "login" | "register"
}

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  const form = useForm<z.infer<typeof loginSchema> | z.infer<typeof registerSchema>>({
    resolver: zodResolver(type === "login" ? loginSchema : registerSchema),
    defaultValues: type === "login" ? {
      email: "",
      password: "",
      rememberMe: false,
    } : {
      email: "",
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  })

  const onSubmit = async (data: z.infer<typeof loginSchema> | z.infer<typeof registerSchema>) => {
    try {
      setIsLoading(true)
      console.log('Starting registration process...')

      if (type === "register") {
        const registerValues = data as z.infer<typeof registerSchema>
        const { error: signUpError, data: signUpData } = await supabase.auth.signUp({
          email: registerValues.email,
          password: registerValues.password,
          options: {
            data: {
              full_name: registerValues.fullName,
              username: registerValues.username,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (signUpError) {
          console.error('Sign up error:', signUpError)
          toast({
            title: "Registration Failed",
            description: signUpError.message,
            variant: "destructive",
          })
          return
        }

        // Create profile in public.profiles table
        if (signUpData?.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: signUpData.user.id,
                email: registerValues.email,
                username: registerValues.username,
                full_name: registerValues.fullName,
                role: 'user',
                status: 'active',
              },
            ])

          if (profileError) {
            console.error('Profile creation error:', profileError)
            toast({
              title: "Profile Creation Failed",
              description: "Account created but profile setup failed. Please contact support.",
              variant: "destructive",
            })
            return
          }
        }

        setRegisteredEmail(registerValues.email)
        setShowVerification(true)
        toast({
          title: "Success",
          description: "Registration successful. Please check your email to confirm your account.",
        })
      } else {
        const loginValues = data as z.infer<typeof loginSchema>
        const { error, data: loginData } = await supabase.auth.signInWithPassword({
          email: loginValues.email,
          password: loginValues.password,
        })

        if (error) {
          console.error('Login error:', error)
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive",
          })
          return
        }

        // Handle remember me
        if (loginValues.rememberMe) {
          localStorage.setItem("rememberMe", "true")
          localStorage.setItem("email", loginValues.email)
        } else {
          localStorage.removeItem("rememberMe")
          localStorage.removeItem("email")
        }

        toast({
          title: "Success",
          description: "Logged in successfully",
        })

        // Redirect to dashboard
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Get the current password value for the strength indicator
  const password = form.watch("password")

  return (
    <div className="space-y-6">
      {showVerification ? (
        <VerificationStatus email={registeredEmail} />
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        type="email" 
                        {...field} 
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {type === "register" && (
                <>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Choose a username" 
                            {...field} 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormDescription>
                          This will be your unique identifier on the platform.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            {...field} 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="Enter your password" 
                          type={showPassword ? "text" : "password"}
                          {...field} 
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    {type === "register" && field.value && (
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <p className={field.value.length >= 8 ? "text-green-500" : ""}>
                          • At least 8 characters
                        </p>
                        <p className={/[A-Z]/.test(field.value) ? "text-green-500" : ""}>
                          • At least one uppercase letter
                        </p>
                        <p className={/[a-z]/.test(field.value) ? "text-green-500" : ""}>
                          • At least one lowercase letter
                        </p>
                        <p className={/[0-9]/.test(field.value) ? "text-green-500" : ""}>
                          • At least one number
                        </p>
                        <p className={/[^A-Za-z0-9]/.test(field.value) ? "text-green-500" : ""}>
                          • At least one special character
                        </p>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {type === "register" && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Confirm your password" 
                            type={showConfirmPassword ? "text" : "password"}
                            {...field} 
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {type === "login" && (
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Remember me</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              )}

              {type === "register" && (
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I accept the{" "}
                          <a
                            href="/terms"
                            className="text-primary hover:underline"
                          >
                            terms and conditions
                          </a>
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : type === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  )
} 