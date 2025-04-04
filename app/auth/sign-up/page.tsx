import Link from 'next/link';
import { AuthForm } from '@/components/auth/auth-form';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/app-server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sign Up | DevFlow',
  description: 'Create your DevFlow account to streamline your development workflow.',
};

export const dynamic = 'force-dynamic';

async function checkSession() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export default async function SignUp() {
  const session = await checkSession();

  // Redirect if user is already signed in
  if (session) {
    redirect('/');
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
            <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email below to create your account
            </p>
          </div>
          <Suspense
            fallback={
              <div className='flex items-center justify-center p-4'>
                <Loader2 className='h-6 w-6 animate-spin' />
              </div>
            }
          >
            <AuthForm type='sign-up' />
          </Suspense>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link href='/auth/sign-in' className='underline underline-offset-4 hover:text-primary'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
