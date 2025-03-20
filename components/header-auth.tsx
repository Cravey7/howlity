import { signOutAction } from '@/app/actions';
import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { createClient } from '@/lib/supabase/pages-server';
import { Skeleton } from './ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface User {
  email: string;
  id: string;
}

export default async function AuthButton() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    if (!hasEnvVars()) {
      return (
        <div className='flex gap-4 items-center'>
          <div>
            <Badge
              variant='destructive'
              className='font-normal pointer-events-none flex items-center gap-2'
            >
              <AlertCircle className='h-4 w-4' />
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className='flex gap-2'>
            <Button
              asChild
              size='sm'
              variant='outline'
              disabled
              className='opacity-75 cursor-none pointer-events-none'
            >
              <Link href='/sign-in'>Sign in</Link>
            </Button>
            <Button
              asChild
              size='sm'
              variant='default'
              disabled
              className='opacity-75 cursor-none pointer-events-none'
            >
              <Link href='/sign-up'>Sign up</Link>
            </Button>
          </div>
        </div>
      );
    }

    return user ? (
      <div className='flex items-center gap-4'>
        <span className='text-sm text-muted-foreground'>Hey, {user.email}!</span>
        <form action={signOutAction}>
          <Button type='submit' variant='outline' size='sm'>
            Sign out
          </Button>
        </form>
      </div>
    ) : (
      <div className='flex gap-2'>
        <Button asChild size='sm' variant='outline'>
          <Link href='/sign-in'>Sign in</Link>
        </Button>
        <Button asChild size='sm' variant='default'>
          <Link href='/sign-up'>Sign up</Link>
        </Button>
      </div>
    );
  } catch (error) {
    console.error('Auth error:', error);
    return (
      <div className='flex items-center gap-4'>
        <Badge variant='destructive' className='font-normal'>
          Authentication error
        </Badge>
        <div className='flex gap-2'>
          <Button asChild size='sm' variant='outline'>
            <Link href='/sign-in'>Sign in</Link>
          </Button>
          <Button asChild size='sm' variant='default'>
            <Link href='/sign-up'>Sign up</Link>
          </Button>
        </div>
      </div>
    );
  }
}
