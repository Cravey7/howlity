-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enum types
CREATE TYPE user_role AS ENUM ('user', 'admin', 'moderator');
CREATE TYPE theme_mode AS ENUM ('light', 'dark', 'system');
CREATE TYPE notification_type AS ENUM ('email', 'push', 'in_app');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'banned');
CREATE TYPE notification_status AS ENUM ('unread', 'read', 'archived');
CREATE TYPE relationship_status AS ENUM ('pending', 'accepted', 'blocked');
CREATE TYPE user_preference_type AS ENUM ('general', 'privacy', 'notifications', 'appearance');

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

-- Functions and Triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.handle_new_user_settings()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_settings (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.handle_new_user_preferences()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_preferences (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.handle_notification_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'read' AND OLD.status = 'unread' THEN
        NEW.read_at = TIMEZONE('utc'::text, NOW());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.track_preference_changes()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_preference_history (
        user_id,
        preference_type,
        old_value,
        new_value,
        changed_by
    ) VALUES (
        NEW.user_id,
        NEW.preference_type,
        OLD.value,
        NEW.value,
        auth.uid()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Helper Functions
CREATE OR REPLACE FUNCTION public.get_unread_notifications_count(user_id UUID)
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)
        FROM public.notifications
        WHERE user_id = $1 AND status = 'unread'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_active_sessions(user_id UUID)
RETURNS TABLE (
    id UUID,
    device_info JSONB,
    ip_address TEXT,
    last_active_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        us.id,
        us.device_info,
        us.ip_address,
        us.last_active_at
    FROM public.user_sessions us
    WHERE us.user_id = $1
    ORDER BY us.last_active_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_user_relationships(user_id UUID)
RETURNS TABLE (
    related_user_id UUID,
    status relationship_status,
    metadata JSONB,
    related_user_profile JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ur.related_user_id,
        ur.status,
        ur.metadata,
        jsonb_build_object(
            'id', p.id,
            'username', p.username,
            'full_name', p.full_name,
            'avatar_url', p.avatar_url
        ) as related_user_profile
    FROM public.user_relationships ur
    JOIN public.profiles p ON p.id = ur.related_user_id
    WHERE ur.user_id = $1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.create_notification(
    p_user_id UUID,
    p_title TEXT,
    p_message TEXT,
    p_type notification_type,
    p_link TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_notification_id UUID;
BEGIN
    INSERT INTO public.notifications (
        user_id,
        title,
        message,
        type,
        link,
        metadata
    ) VALUES (
        p_user_id,
        p_title,
        p_message,
        p_type,
        p_link,
        p_metadata
    ) RETURNING id INTO v_notification_id;
    
    RETURN v_notification_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.update_user_preferences(
    p_user_id UUID,
    p_preferences JSONB
)
RETURNS void AS $$
BEGIN
    UPDATE public.user_preferences
    SET 
        dashboard_layout = COALESCE(p_preferences->'dashboard_layout', dashboard_layout),
        sidebar_collapsed = COALESCE((p_preferences->>'sidebar_collapsed')::boolean, sidebar_collapsed),
        compact_mode = COALESCE((p_preferences->>'compact_mode')::boolean, compact_mode),
        updated_at = TIMEZONE('utc'::text, NOW())
    WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
    DELETE FROM public.user_sessions
    WHERE last_active_at < TIMEZONE('utc'::text, NOW() - INTERVAL '30 days');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.archive_old_notifications()
RETURNS void AS $$
BEGIN
    UPDATE public.notifications
    SET status = 'archived'
    WHERE status = 'read'
    AND created_at < TIMEZONE('utc'::text, NOW() - INTERVAL '30 days');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS on_profile_updated ON public.profiles;
CREATE TRIGGER on_profile_updated
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;
CREATE TRIGGER on_profile_created
    AFTER INSERT ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_settings();

DROP TRIGGER IF EXISTS on_profile_created_preferences ON public.profiles;
CREATE TRIGGER on_profile_created_preferences
    AFTER INSERT ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_preferences();

DROP TRIGGER IF EXISTS on_notification_status_change ON public.notifications;
CREATE TRIGGER on_notification_status_change
    BEFORE UPDATE ON public.notifications
    FOR EACH ROW
    WHEN (OLD.status IS DISTINCT FROM NEW.status)
    EXECUTE FUNCTION public.handle_notification_status();

-- Views
CREATE OR REPLACE VIEW public.user_dashboard_data AS
SELECT 
    p.id as user_id,
    p.username,
    p.full_name,
    p.avatar_url,
    p.role,
    p.status,
    us.theme_mode,
    us.notifications_enabled,
    us.email_notifications,
    us.push_notifications,
    us.in_app_notifications,
    us.notification_frequency,
    up.dashboard_layout,
    up.sidebar_collapsed,
    up.compact_mode,
    (
        SELECT COUNT(*)
        FROM public.notifications n
        WHERE n.user_id = p.id AND n.status = 'unread'
    ) as unread_notifications_count,
    (
        SELECT COUNT(*)
        FROM public.user_relationships ur
        WHERE ur.user_id = p.id AND ur.status = 'pending'
    ) as pending_relationships_count
FROM public.profiles p
LEFT JOIN public.user_settings us ON us.user_id = p.id
LEFT JOIN public.user_preferences up ON up.user_id = p.id;

CREATE OR REPLACE VIEW public.user_activity_summary AS
SELECT 
    p.id as user_id,
    p.username,
    p.full_name,
    p.last_active_at,
    (
        SELECT COUNT(*)
        FROM public.user_activity_log al
        WHERE al.user_id = p.id
        AND al.created_at >= TIMEZONE('utc'::text, NOW() - INTERVAL '7 days')
    ) as activity_count_7d,
    (
        SELECT COUNT(*)
        FROM public.user_sessions us
        WHERE us.user_id = p.id
        AND us.last_active_at >= TIMEZONE('utc'::text, NOW() - INTERVAL '24 hours')
    ) as active_sessions_24h,
    (
        SELECT COUNT(*)
        FROM public.user_verification uv
        WHERE uv.user_id = p.id
        AND uv.verified_at IS NULL
    ) as pending_verifications
FROM public.profiles p;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_user_id ON public.user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_created_at ON public.user_activity_log(created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON public.notifications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_user_relationships_user_id ON public.user_relationships(user_id);
CREATE INDEX IF NOT EXISTS idx_user_relationships_related_user_id ON public.user_relationships(related_user_id);
CREATE INDEX IF NOT EXISTS idx_user_relationships_status ON public.user_relationships(status);
CREATE INDEX IF NOT EXISTS idx_user_preference_history_user_id ON public.user_preference_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preference_history_type ON public.user_preference_history(preference_type);
CREATE INDEX IF NOT EXISTS idx_user_verification_user_id ON public.user_verification(user_id);
CREATE INDEX IF NOT EXISTS idx_user_verification_type ON public.user_verification(type);
CREATE INDEX IF NOT EXISTS idx_user_audit_log_user_id ON public.user_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_audit_log_action ON public.user_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_user_audit_log_created_at ON public.user_audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_user_dashboard_data_user_id ON public.user_dashboard_data(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_summary_user_id ON public.user_activity_summary(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_summary_last_active_at ON public.user_activity_summary(last_active_at);

-- Create scheduled jobs for maintenance
SELECT cron.schedule(
    'cleanup-expired-sessions',
    '0 0 * * *', -- Run daily at midnight
    $$
    SELECT public.cleanup_expired_sessions();
    $$
);

SELECT cron.schedule(
    'archive-old-notifications',
    '0 1 * * *', -- Run daily at 1 AM
    $$
    SELECT public.archive_old_notifications();
    $$
);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

-- Grant access to functions
GRANT EXECUTE ON FUNCTION public.get_unread_notifications_count(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_active_sessions(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_relationships(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_notification(UUID, TEXT, TEXT, notification_type, TEXT, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_user_preferences(UUID, JSONB) TO authenticated;

-- Grant access to views
GRANT SELECT ON public.user_dashboard_data TO authenticated;
GRANT SELECT ON public.user_activity_summary TO authenticated;

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

-- Grant access to sequences
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Insert seed data
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at
) VALUES 
(
    '00000000-0000-0000-0000-000000000000',
    'admin@devflow.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    now()
),
(
    '11111111-1111-1111-1111-111111111111',
    'test@devflow.com',
    crypt('test123', gen_salt('bf')),
    now(),
    now(),
    now()
),
(
    '22222222-2222-2222-2222-222222222222',
    'moderator@devflow.com',
    crypt('mod123', gen_salt('bf')),
    now(),
    now(),
    now()
);

-- Insert profiles
INSERT INTO public.profiles (
    id,
    email,
    full_name,
    username,
    role,
    status,
    bio,
    timezone,
    locale
) VALUES 
(
    '00000000-0000-0000-0000-000000000000',
    'admin@devflow.com',
    'System Administrator',
    'admin',
    'admin',
    'active',
    'System administrator with full access to all features.',
    'UTC',
    'en'
),
(
    '11111111-1111-1111-1111-111111111111',
    'test@devflow.com',
    'Test User',
    'testuser',
    'user',
    'active',
    'Regular user for testing purposes.',
    'UTC',
    'en'
),
(
    '22222222-2222-2222-2222-222222222222',
    'moderator@devflow.com',
    'Moderator User',
    'moderator',
    'moderator',
    'active',
    'Community moderator with elevated privileges.',
    'UTC',
    'en'
);

-- Insert user settings
INSERT INTO public.user_settings (
    user_id,
    theme_mode,
    notifications_enabled,
    email_notifications,
    push_notifications,
    in_app_notifications,
    notification_frequency
) VALUES 
(
    '00000000-0000-0000-0000-000000000000',
    'system',
    true,
    true,
    true,
    true,
    'realtime'
),
(
    '11111111-1111-1111-1111-111111111111',
    'light',
    true,
    true,
    false,
    true,
    'daily'
),
(
    '22222222-2222-2222-2222-222222222222',
    'dark',
    true,
    true,
    true,
    true,
    'realtime'
);

-- Insert user preferences
INSERT INTO public.user_preferences (
    user_id,
    dashboard_layout,
    sidebar_collapsed,
    compact_mode
) VALUES 
(
    '00000000-0000-0000-0000-000000000000',
    '{"layout": "default", "widgets": ["activity", "notifications", "stats"]}'::jsonb,
    false,
    false
),
(
    '11111111-1111-1111-1111-111111111111',
    '{"layout": "compact", "widgets": ["notifications"]}'::jsonb,
    true,
    true
),
(
    '22222222-2222-2222-2222-222222222222',
    '{"layout": "default", "widgets": ["activity", "notifications", "stats"]}'::jsonb,
    false,
    false
);

-- Insert notifications
INSERT INTO public.notifications (
    user_id,
    title,
    message,
    type,
    status,
    link,
    metadata
) VALUES 
(
    '11111111-1111-1111-1111-111111111111',
    'Welcome to DevFlow!',
    'Thank you for joining our community. We hope you enjoy your experience.',
    'in_app',
    'read',
    '/dashboard',
    '{"priority": "high"}'::jsonb
),
(
    '11111111-1111-1111-1111-111111111111',
    'Profile Update Required',
    'Please complete your profile to access all features.',
    'email',
    'unread',
    '/profile/settings',
    '{"priority": "medium"}'::jsonb
),
(
    '22222222-2222-2222-2222-222222222222',
    'New Moderator Assignment',
    'You have been assigned as a moderator for the General Discussion section.',
    'in_app',
    'read',
    '/moderator/dashboard',
    '{"section": "general_discussion"}'::jsonb
);

-- Insert user relationships
INSERT INTO public.user_relationships (
    user_id,
    related_user_id,
    status,
    metadata
) VALUES 
(
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    'accepted',
    '{"notes": "Team member"}'::jsonb
),
(
    '22222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000000',
    'accepted',
    '{"notes": "Administrator"}'::jsonb
);

-- Insert preference history
INSERT INTO public.user_preference_history (
    user_id,
    preference_type,
    old_value,
    new_value,
    changed_by
) VALUES 
(
    '11111111-1111-1111-1111-111111111111',
    'appearance',
    '{"theme": "light"}'::jsonb,
    '{"theme": "dark"}'::jsonb,
    '11111111-1111-1111-1111-111111111111'
),
(
    '22222222-2222-2222-2222-222222222222',
    'notifications',
    '{"email_notifications": false}'::jsonb,
    '{"email_notifications": true}'::jsonb,
    '22222222-2222-2222-2222-222222222222'
);

-- Insert verifications
INSERT INTO public.user_verification (
    user_id,
    type,
    token,
    expires_at,
    verified_at
) VALUES 
(
    '11111111-1111-1111-1111-111111111111',
    'email',
    'abc123',
    TIMEZONE('utc'::text, NOW() + INTERVAL '24 hours'),
    TIMEZONE('utc'::text, NOW())
),
(
    '22222222-2222-2222-2222-222222222222',
    'phone',
    'xyz789',
    TIMEZONE('utc'::text, NOW() + INTERVAL '24 hours'),
    NULL
);

-- Insert audit logs
INSERT INTO public.user_audit_log (
    user_id,
    action,
    entity_type,
    entity_id,
    old_values,
    new_values,
    ip_address,
    user_agent
) VALUES 
(
    '00000000-0000-0000-0000-000000000000',
    'create',
    'user',
    '11111111-1111-1111-1111-111111111111',
    NULL,
    '{"email": "test@devflow.com", "role": "user"}'::jsonb,
    '127.0.0.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
),
(
    '22222222-2222-2222-2222-222222222222',
    'update',
    'profile',
    '11111111-1111-1111-1111-111111111111',
    '{"bio": null}'::jsonb,
    '{"bio": "Regular user for testing purposes."}'::jsonb,
    '127.0.0.1',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
); 