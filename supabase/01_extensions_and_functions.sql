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

-- Essential Functions
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

-- Grant access to functions
GRANT EXECUTE ON FUNCTION public.get_unread_notifications_count(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_active_sessions(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_relationships(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_notification(UUID, TEXT, TEXT, notification_type, TEXT, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_user_preferences(UUID, JSONB) TO authenticated; 