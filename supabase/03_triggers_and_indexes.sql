-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create trigger for handling new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Create trigger for handling new user settings
CREATE OR REPLACE TRIGGER on_user_created_settings
    AFTER INSERT ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user_settings();

-- Create trigger for handling new user preferences
CREATE OR REPLACE TRIGGER on_user_created_preferences
    AFTER INSERT ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user_preferences();

-- Create trigger for handling notification status updates
CREATE OR REPLACE TRIGGER on_notification_status_update
    AFTER UPDATE OF status ON public.notifications
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_notification_status();

-- Create trigger for tracking preference changes
CREATE OR REPLACE TRIGGER on_preference_change
    AFTER UPDATE ON public.user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION public.track_preference_changes();

-- Create trigger for updating timestamps
CREATE OR REPLACE TRIGGER on_profile_updated
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER on_user_settings_updated
    BEFORE UPDATE ON public.user_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER on_user_preferences_updated
    BEFORE UPDATE ON public.user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER on_user_relationships_updated
    BEFORE UPDATE ON public.user_relationships
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better query performance
-- Profiles table indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_last_active_at ON public.profiles(last_active_at);

-- User settings table indexes
CREATE INDEX IF NOT EXISTS idx_user_settings_theme_mode ON public.user_settings(theme_mode);
CREATE INDEX IF NOT EXISTS idx_user_settings_notifications_enabled ON public.user_settings(notifications_enabled);

-- User preferences table indexes
CREATE INDEX IF NOT EXISTS idx_user_preferences_dashboard_layout ON public.user_preferences USING GIN (dashboard_layout);

-- User sessions table indexes
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_last_active_at ON public.user_sessions(last_active_at);

-- User activity log table indexes
CREATE INDEX IF NOT EXISTS idx_user_activity_log_user_id ON public.user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_action ON public.user_activity_log(action);
CREATE INDEX IF NOT EXISTS idx_user_activity_log_created_at ON public.user_activity_log(created_at);

-- Notifications table indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON public.notifications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON public.notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at);

-- User relationships table indexes
CREATE INDEX IF NOT EXISTS idx_user_relationships_user_id ON public.user_relationships(user_id);
CREATE INDEX IF NOT EXISTS idx_user_relationships_related_user_id ON public.user_relationships(related_user_id);
CREATE INDEX IF NOT EXISTS idx_user_relationships_status ON public.user_relationships(status);

-- User preference history table indexes
CREATE INDEX IF NOT EXISTS idx_user_preference_history_user_id ON public.user_preference_history(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preference_history_preference_type ON public.user_preference_history(preference_type);
CREATE INDEX IF NOT EXISTS idx_user_preference_history_created_at ON public.user_preference_history(created_at);

-- User verification table indexes
CREATE INDEX IF NOT EXISTS idx_user_verification_user_id ON public.user_verification(user_id);
CREATE INDEX IF NOT EXISTS idx_user_verification_type ON public.user_verification(type);
CREATE INDEX IF NOT EXISTS idx_user_verification_token ON public.user_verification(token);
CREATE INDEX IF NOT EXISTS idx_user_verification_expires_at ON public.user_verification(expires_at);

-- User audit log table indexes
CREATE INDEX IF NOT EXISTS idx_user_audit_log_user_id ON public.user_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_audit_log_action ON public.user_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_user_audit_log_entity_type ON public.user_audit_log(entity_type);
CREATE INDEX IF NOT EXISTS idx_user_audit_log_created_at ON public.user_audit_log(created_at);

-- Create scheduled jobs for maintenance tasks
DO $$
BEGIN
    -- Only create the jobs if pg_cron is available
    IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
        -- Cleanup expired sessions
        EXECUTE format(
            'SELECT cron.schedule(%L, %L, %L)',
            'cleanup-expired-sessions',
            '0 0 * * *', -- Run daily at midnight
            'SELECT public.cleanup_expired_sessions()'
        );

        -- Archive old notifications
        EXECUTE format(
            'SELECT cron.schedule(%L, %L, %L)',
            'archive-old-notifications',
            '0 1 * * *', -- Run daily at 1 AM
            'SELECT public.archive_old_notifications()'
        );
    END IF;
END $$; 