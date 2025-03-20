import Link from 'next/link';
import type { Metadata } from 'next';
import { getSupabaseClient } from '@/lib/supabase/server';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { AuthLayout } from '@/components/auth/auth-layout';
import { serverLogger } from '@/lib/logger';

export const metadata: Metadata = {
  title: 'Reset Password | DevFlow',
  description: 'Reset your DevFlow account password.',
};

export const dynamic = 'force-dynamic';

interface FormState {
  message: string;
  error: string;
  success: string;
  loading: boolean;
}

const initialState: FormState = {
  message: '',
  error: '',
  success: '',
  loading: false,
};

async function resetPassword(prevState: FormState, formData: FormData): Promise<FormState> {
  'use server';

  // Set loading state while preserving previous message
  const loadingState = { ...prevState, loading: true };

  try {
    const email = formData.get('email') as string;
    
    if (!email) {
      return { ...loadingState, loading: false, error: 'Email is required' };
    }

    const supabase = getSupabaseClient();
    
    if (!supabase) {
      serverLogger.error('Failed to initialize Supabase client');
      return { ...loadingState, loading: false, error: 'Failed to initialize authentication service' };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env['NEXT_PUBLIC_SITE_URL']}/auth/reset-password`,
    });

    if (error) {
      serverLogger.error('Password reset error', { error: error.message });
      return { ...loadingState, loading: false, error: error.message };
    }

    serverLogger.info('Password reset email sent', { email });
    return { ...loadingState, loading: false, success: 'Check your email for the password reset link' };
  } catch (error) {
    serverLogger.error('Unexpected error during password reset', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    return { ...loadingState, loading: false, error: 'An unexpected error occurred. Please try again.' };
  }
}

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Reset password</h1>
        <p className='text-sm text-muted-foreground'>
          Enter your email address and we'll send you a link to reset your password
        </p>
      </div>
      <ForgotPasswordForm formAction={resetPassword} initialState={initialState} />
      <p className='px-8 text-center text-sm text-muted-foreground'>
        Remember your password?{' '}
        <Link
          href='/auth/sign-in'
          className='underline underline-offset-4 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
