-- Drop existing user policies
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Users can view their own sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "Users can delete their own sessions" ON public.user_sessions;
DROP POLICY IF EXISTS "Users can view their own password reset tokens" ON public.password_reset_tokens;
DROP POLICY IF EXISTS "Users can view their own email verification tokens" ON public.email_verification_tokens;

-- Drop existing indexes if they exist
DROP INDEX IF EXISTS idx_user_sessions_user_id;
DROP INDEX IF EXISTS idx_user_sessions_expires_at;
DROP INDEX IF EXISTS idx_password_reset_tokens_user_id;
DROP INDEX IF EXISTS idx_password_reset_tokens_token;
DROP INDEX IF EXISTS idx_email_verification_tokens_user_id;
DROP INDEX IF EXISTS idx_email_verification_tokens_token;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.email_verification_tokens;
DROP TABLE IF EXISTS public.password_reset_tokens;
DROP TABLE IF EXISTS public.user_sessions;

-- Enhance users table with additional profile fields
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS full_name text,
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS role text DEFAULT 'user',
ADD COLUMN IF NOT EXISTS last_sign_in_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS email_verified_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;

-- Create user_sessions table
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    device_info jsonb,
    ip_address text,
    last_active_at timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now(),
    expires_at timestamp with time zone NOT NULL
);

-- Create password_reset_tokens table
CREATE TABLE IF NOT EXISTS public.password_reset_tokens (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    token text NOT NULL UNIQUE,
    used boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    expires_at timestamp with time zone NOT NULL
);

-- Create email_verification_tokens table
CREATE TABLE IF NOT EXISTS public.email_verification_tokens (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    token text NOT NULL UNIQUE,
    used boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    expires_at timestamp with time zone NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON public.user_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON public.password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON public.password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_user_id ON public.email_verification_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_token ON public.email_verification_tokens(token);

-- Enable RLS
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_verification_tokens ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own sessions"
    ON public.user_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions"
    ON public.user_sessions FOR DELETE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own password reset tokens"
    ON public.password_reset_tokens FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own email verification tokens"
    ON public.email_verification_tokens FOR SELECT
    USING (auth.uid() = user_id);

-- Update the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    created_at,
    updated_at,
    role,
    metadata
  )
  VALUES (
    new.id,
    new.email,
    now(),
    now(),
    'user',
    jsonb_build_object(
      'provider', new.raw_app_meta_data->>'provider',
      'provider_id', new.raw_user_meta_data->>'sub'
    )
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT ALL ON public.user_sessions TO authenticated;
GRANT ALL ON public.password_reset_tokens TO authenticated;
GRANT ALL ON public.email_verification_tokens TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated; 