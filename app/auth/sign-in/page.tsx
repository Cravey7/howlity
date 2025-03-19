import Link from 'next/link'
import { AuthForm } from '@/components/auth/auth-form'

export const dynamic = 'force-dynamic'

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/sign-up" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
        <AuthForm type="sign-in" />
      </div>
    </div>
  )
} 