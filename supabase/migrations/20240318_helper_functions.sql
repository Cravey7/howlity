-- Helper function to get user's unread notifications count
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

-- Helper function to get user's active sessions
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

-- Helper function to get user's relationships
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

-- Helper function to create notification
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

-- Helper function to update user preferences
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

-- View for user dashboard data
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

-- View for user activity summary
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

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
    DELETE FROM public.user_sessions
    WHERE last_active_at < TIMEZONE('utc'::text, NOW() - INTERVAL '30 days');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to archive old notifications
CREATE OR REPLACE FUNCTION public.archive_old_notifications()
RETURNS void AS $$
BEGIN
    UPDATE public.notifications
    SET status = 'archived'
    WHERE status = 'read'
    AND created_at < TIMEZONE('utc'::text, NOW() - INTERVAL '30 days');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for the views
CREATE INDEX IF NOT EXISTS idx_user_dashboard_data_user_id ON public.user_dashboard_data(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_summary_user_id ON public.user_activity_summary(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_summary_last_active_at ON public.user_activity_summary(last_active_at); 