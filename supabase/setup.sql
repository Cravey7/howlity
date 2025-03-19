-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Apply migrations in order
\i migrations/20240318_auth_tables.sql
\i migrations/20240318_enhanced_features.sql
\i migrations/20240318_helper_functions.sql

-- Apply seed data
\i seed.sql
\i seed_enhanced.sql

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