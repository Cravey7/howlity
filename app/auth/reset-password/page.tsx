import Link from 'next/link';
import type { Metadata } from 'next';
import { createClient } from '@/app/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/form-message';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export const metadata: Metadata = {
  title: 'Reset Password | DevFlow',
  description: 'Reset your DevFlow account password.',
};

export const dynamic = 'force-dynamic';

export default function ResetPassword() {
  async function updatePassword(formData: FormData) {
    'use server';

    const password = formData.get('password') as string;
    const supabase = await createClient();

    if (!password) {
      return { error: 'Password is required' };
    }

    if (password.length < 6) {
      return { error: 'Password must be at least 6 characters' };
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: 'Password updated successfully' };
  }

  return (
    <div className='container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='font-bold'>DevFlow</span>
          </Link>
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              "DevFlow has transformed how our team manages development projects. It's become an
              essential part of our workflow."
            </p>
            <footer className='text-sm'>Sofia Davis, Lead Developer</footer>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Reset your password</h1>
            <p className='text-sm text-muted-foreground'>Enter your new password below</p>
          </div>
          <form action={updatePassword} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='password'>New Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                required
                placeholder='••••••••'
                minLength={6}
              />
            </div>
            <Button type='submit' className='w-full'>
              Update password
            </Button>
            <FormMessage />
          </form>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            <Link href='/auth/sign-in' className='underline underline-offset-4 hover:text-primary'>
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
