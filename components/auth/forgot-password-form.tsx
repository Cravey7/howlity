'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormMessage } from '@/components/form-message';
import { Loader2 } from 'lucide-react';
import { useFormState } from 'react-dom';

interface FormState {
  message: string;
  error: string;
  success: string;
  loading: boolean;
}

interface ForgotPasswordFormProps {
  formAction: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initialState: FormState;
}

export function ForgotPasswordForm({ formAction, initialState }: ForgotPasswordFormProps) {
  const [state, formActionWithState] = useFormState(formAction, initialState);

  return (
    <form action={formActionWithState} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          type='email'
          required
          placeholder='you@example.com'
          aria-describedby='email-description'
          aria-invalid={!!state.error}
          disabled={state.loading}
        />
        <p id='email-description' className='text-sm text-muted-foreground'>
          Enter the email address associated with your account
        </p>
      </div>
      <Button
        type='submit'
        className='w-full'
        aria-label='Send password reset link'
        disabled={state.loading}
      >
        {state.loading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Sending...
          </>
        ) : (
          'Send reset link'
        )}
      </Button>
      <FormMessage
        message={
          state.error
            ? { error: state.error }
            : state.success
              ? { success: state.success }
              : { message: '' }
        }
      />
    </form>
  );
} 