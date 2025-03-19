-- Create profiles table with enhanced fields
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    role user_role DEFAULT 'user',
    status user_status DEFAULT 'active',
    last_active_at TIMESTAMP WITH TIME ZONE,
    timezone TEXT DEFAULT 'UTC',
    locale TEXT DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_settings table with enhanced options
CREATE TABLE IF NOT EXISTS public.user_settings (
    user_id UUID REFERENCES public.profiles(id) PRIMARY KEY,
    theme_mode theme_mode DEFAULT 'system',
    notifications_enabled BOOLEAN DEFAULT true,
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    in_app_notifications BOOLEAN DEFAULT true,
    notification_frequency TEXT DEFAULT 'realtime',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
    user_id UUID REFERENCES public.profiles(id) PRIMARY KEY,
    dashboard_layout JSONB DEFAULT '{"layout": "default"}'::jsonb,
    sidebar_collapsed BOOLEAN DEFAULT false,
    compact_mode BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_sessions table for tracking active sessions
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    device_info JSONB,
    ip_address TEXT,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_activity_log table
CREATE TABLE IF NOT EXISTS public.user_activity_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    action TEXT NOT NULL,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type notification_type NOT NULL,
    status notification_status DEFAULT 'unread',
    link TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    read_at TIMESTAMP WITH TIME ZONE
);

-- Create user_relationships table
CREATE TABLE IF NOT EXISTS public.user_relationships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    related_user_id UUID REFERENCES public.profiles(id) NOT NULL,
    status relationship_status DEFAULT 'pending',
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, related_user_id)
);

-- Create user_preference_history table
CREATE TABLE IF NOT EXISTS public.user_preference_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    preference_type user_preference_type NOT NULL,
    old_value JSONB,
    new_value JSONB,
    changed_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_verification table
CREATE TABLE IF NOT EXISTS public.user_verification (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    type TEXT NOT NULL,
    token TEXT NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_audit_log table
CREATE TABLE IF NOT EXISTS public.user_audit_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    old_values JSONB,
    new_values JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preference_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
    ON public.profiles FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for user_settings
CREATE POLICY "Users can view own settings" 
    ON public.user_settings FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" 
    ON public.user_settings FOR UPDATE 
    USING (auth.uid() = user_id);

-- RLS Policies for user_preferences
CREATE POLICY "Users can view own preferences" 
    ON public.user_preferences FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" 
    ON public.user_preferences FOR UPDATE 
    USING (auth.uid() = user_id);

-- RLS Policies for user_sessions
CREATE POLICY "Users can view own sessions" 
    ON public.user_sessions FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" 
    ON public.user_sessions FOR DELETE 
    USING (auth.uid() = user_id);

-- RLS Policies for user_activity_log
CREATE POLICY "Users can view own activity" 
    ON public.user_activity_log FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all activity" 
    ON public.user_activity_log FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications" 
    ON public.notifications FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" 
    ON public.notifications FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications" 
    ON public.notifications FOR DELETE 
    USING (auth.uid() = user_id);

-- RLS Policies for user_relationships
CREATE POLICY "Users can view own relationships" 
    ON public.user_relationships FOR SELECT 
    USING (auth.uid() = user_id OR auth.uid() = related_user_id);

CREATE POLICY "Users can update own relationships" 
    ON public.user_relationships FOR UPDATE 
    USING (auth.uid() = user_id OR auth.uid() = related_user_id);

CREATE POLICY "Users can delete own relationships" 
    ON public.user_relationships FOR DELETE 
    USING (auth.uid() = user_id OR auth.uid() = related_user_id);

-- RLS Policies for user_preference_history
CREATE POLICY "Users can view own preference history" 
    ON public.user_preference_history FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all preference history" 
    ON public.user_preference_history FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for user_verification
CREATE POLICY "Users can view own verifications" 
    ON public.user_verification FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own verifications" 
    ON public.user_verification FOR UPDATE 
    USING (auth.uid() = user_id);

-- RLS Policies for user_audit_log
CREATE POLICY "Users can view own audit log" 
    ON public.user_audit_log FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all audit logs" 
    ON public.user_audit_log FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Grant access to tables
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_settings TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_preferences TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_sessions TO authenticated;
GRANT SELECT ON public.user_activity_log TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_relationships TO authenticated;
GRANT SELECT ON public.user_preference_history TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_verification TO authenticated;
GRANT SELECT ON public.user_audit_log TO authenticated; 