'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { FormMessage, type Message } from '@/components/form-message';
import { Loader2, Eye, EyeOff, Check, X, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { DebugEnv } from '../debug-env';
import { clientLogger } from '@/lib/logger';
import { toast } from '@/components/ui/use-toast';
import { createClient } from '@/lib/supabase/pages-server';

// Password requirements
const passwordRequirements = [
  { id: 'length', label: 'At least 8 characters', regex: /.{8,}/ },
  { id: 'uppercase', label: 'One uppercase letter', regex: /[A-Z]/ },
  { id: 'lowercase', label: 'One lowercase letter', regex: /[a-z]/ },
  { id: 'number', label: 'One number', regex: /[0-9]/ },
  { id: 'special', label: 'One special character', regex: /[^A-Za-z0-9]/ },
];

// Validation schemas
const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

const signUpSchema = signInSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

interface AuthFormProps {
  type: 'sign-in' | 'sign-up';
}

export function AuthForm({ type }: AuthFormProps) {
  const [error, setError] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showRequirements, setShowRequirements] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignInFormData | SignUpFormData>({
    resolver: zodResolver(type === 'sign-in' ? signInSchema : signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
      ...(type === 'sign-up' && { confirmPassword: '' }),
    },
  });

  const password = watch('password');

  useEffect(() => {
    if (password) {
      const strength = passwordRequirements.filter((req) => req.regex.test(password)).length;
      setPasswordStrength((strength / passwordRequirements.length) * 100);
    }
  }, [password]);

  // Log form initialization
  useEffect(() => {
    clientLogger.info('Auth form initialized', { type });
  }, [type]);

  const onSubmit = async (data: SignInFormData | SignUpFormData) => {
    try {
      setLoading(true);
      setError(null);

      clientLogger.info('Starting authentication process', {
        type,
        email: data.email,
        timestamp: new Date().toISOString(),
      });

      const supabase = createClient();

      if (type === 'sign-up') {
        const { error: signUpError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (signUpError) {
          toast({
            title: 'Sign up failed',
            description: signUpError.message,
            variant: 'destructive',
          });
          return;
        }

        clientLogger.info('User signed up successfully', {
          email: data.email,
          timestamp: new Date().toISOString(),
        });

        setVerificationSent(true);
        toast({
          title: 'Check your email',
          description: 'We sent you a confirmation link to verify your account.',
        });
        
        // Redirect to dashboard after successful signup
        router.push('/dashboard');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (signInError) {
          toast({
            title: 'Sign in failed',
            description: signInError.message,
            variant: 'destructive',
          });
          return;
        }

        clientLogger.info('User signed in successfully', {
          email: data.email,
          timestamp: new Date().toISOString(),
        });

        router.push('/dashboard');
      }
    } catch (error) {
      clientLogger.error('Authentication error', {
        message: (error instanceof Error ? error.message : 'Unknown error') as string,
        stack: error instanceof Error ? error.stack || null : null,
        timestamp: new Date().toISOString(),
      });

      if (error instanceof Error) {
        if (error.message.includes('Invalid login credentials')) {
          setError({ error: 'Invalid email or password.' });
        } else if (error.message.includes('rate limit')) {
          setError({ error: 'Too many attempts. Please try again later.' });
        } else {
          setError({ error: error.message });
        }
      } else {
        setError({ error: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const formErrors = errors as Record<string, { message?: string }>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' noValidate>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            {...register('email')}
            aria-invalid={!!formErrors['email']}
            aria-describedby={formErrors['email'] ? 'email-error' : undefined}
            className={cn(formErrors['email'] && 'border-red-500')}
            placeholder='you@example.com'
            disabled={loading}
          />
          {formErrors['email'] && (
            <p id='email-error' className='text-sm text-red-500' role='alert'>
              {formErrors['email'].message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password'>Password</Label>
          <div className='relative'>
            <PasswordInput
              id='password'
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              aria-invalid={!!formErrors['password']}
              aria-describedby={formErrors['password'] ? 'password-error' : undefined}
              className={cn(formErrors['password'] && 'border-red-500')}
              placeholder='••••••••'
              disabled={loading}
              onFocus={() => setShowRequirements(true)}
              onBlur={() => setShowRequirements(false)}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {formErrors['password'] && (
            <p id='password-error' className='text-sm text-red-500' role='alert'>
              {formErrors['password'].message}
            </p>
          )}
          {type === 'sign-up' && showRequirements && (
            <div className='mt-2 space-y-2 rounded-md bg-gray-50 p-3 text-sm'>
              <div className='flex items-center justify-between'>
                <span className='font-medium'>Password Strength</span>
                <span className='text-gray-500'>{Math.round(passwordStrength)}%</span>
              </div>
              <Progress value={passwordStrength} className='h-1' />
              <div className='space-y-1'>
                {passwordRequirements.map((req) => (
                  <div key={req.id} className='flex items-center gap-2'>
                    {req.regex.test(password || '') ? (
                      <Check className='h-4 w-4 text-green-500' />
                    ) : (
                      <X className='h-4 w-4 text-gray-400' />
                    )}
                    <span
                      className={cn(
                        'text-sm',
                        req.regex.test(password || '') ? 'text-green-500' : 'text-gray-500'
                      )}
                    >
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {type === 'sign-up' && (
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <PasswordInput
              id='confirmPassword'
              type={showPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              aria-invalid={!!formErrors['confirmPassword']}
              aria-describedby={
                formErrors['confirmPassword'] ? 'confirm-password-error' : undefined
              }
              className={cn(formErrors['confirmPassword'] && 'border-red-500')}
              placeholder='••••••••'
              disabled={loading}
            />
            {formErrors['confirmPassword'] && (
              <p id='confirm-password-error' className='text-sm text-red-500' role='alert'>
                {formErrors['confirmPassword'].message}
              </p>
            )}
          </div>
        )}

        {type === 'sign-in' && (
          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              id='rememberMe'
              {...register('rememberMe')}
              className='h-4 w-4 rounded border-gray-300'
            />
            <Label htmlFor='rememberMe' className='text-sm'>
              Remember me
            </Label>
          </div>
        )}

        {error && <FormMessage message={error} />}

        <Button
          type='submit'
          className='w-full'
          disabled={loading || isSubmitting}
          aria-busy={loading || isSubmitting}
        >
          {loading || isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              {type === 'sign-up' ? 'Creating account...' : 'Signing in...'}
            </>
          ) : type === 'sign-up' ? (
            'Create account'
          ) : (
            'Sign in'
          )}
        </Button>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <Separator className='w-full' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <Button
            type='button'
            variant='outline'
            className='w-full'
            onClick={() => {
              /* Implement Google sign in */
            }}
          >
            <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24'>
              <path
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                fill='#4285F4'
              />
              <path
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                fill='#34A853'
              />
              <path
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                fill='#FBBC05'
              />
              <path
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                fill='#EA4335'
              />
            </svg>
            Google
          </Button>
          <Button
            type='button'
            variant='outline'
            className='w-full'
            onClick={() => {
              /* Implement GitHub sign in */
            }}
          >
            <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24'>
              <path
                d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
                fill='currentColor'
              />
            </svg>
            GitHub
          </Button>
        </div>

        {verificationSent && (
          <div className='rounded-md bg-blue-50 p-4 text-sm text-blue-700'>
            <div className='flex items-center gap-2'>
              <AlertCircle className='h-4 w-4' />
              <p>Verification email sent! Please check your inbox.</p>
            </div>
          </div>
        )}
      </form>
      <DebugEnv />
    </>
  );
}
