-- Create views for common queries
-- User dashboard data view
CREATE OR REPLACE VIEW public.user_dashboard_data AS
SELECT 
    p.id,
    p.email,
    p.full_name,
    p.username,
    p.avatar_url,
    p.role,
    p.status,
    p.last_active_at,
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
        WHERE n.user_id = p.id
        AND n.status = 'unread'
    ) as unread_notifications_count,
    (
        SELECT COUNT(*)
        FROM public.user_relationships ur
        WHERE ur.user_id = p.id
        AND ur.status = 'pending'
    ) as pending_relationships_count
FROM public.profiles p
LEFT JOIN public.user_settings us ON us.user_id = p.id
LEFT JOIN public.user_preferences up ON up.user_id = p.id;

-- User activity summary view
CREATE OR REPLACE VIEW public.user_activity_summary AS
SELECT 
    p.id as user_id,
    p.email,
    p.full_name,
    p.last_active_at,
    (
        SELECT COUNT(*)
        FROM public.user_activity_log al
        WHERE al.user_id = p.id
        AND al.created_at >= NOW() - INTERVAL '24 hours'
    ) as activity_count_24h,
    (
        SELECT COUNT(*)
        FROM public.user_sessions us
        WHERE us.user_id = p.id
        AND us.last_active_at >= NOW() - INTERVAL '24 hours'
    ) as active_sessions_24h,
    (
        SELECT COUNT(*)
        FROM public.notifications n
        WHERE n.user_id = p.id
        AND n.status = 'unread'
    ) as unread_notifications
FROM public.profiles p;

-- User relationships view
CREATE OR REPLACE VIEW public.user_relationships_view AS
SELECT 
    ur.id,
    ur.user_id,
    ur.related_user_id,
    ur.status as relationship_status,
    ur.metadata,
    ur.created_at,
    ur.updated_at,
    p1.email as user_email,
    p1.full_name as user_name,
    p1.avatar_url as user_avatar,
    p2.email as related_user_email,
    p2.full_name as related_user_name,
    p2.avatar_url as related_user_avatar
FROM public.user_relationships ur
JOIN public.profiles p1 ON p1.id = ur.user_id
JOIN public.profiles p2 ON p2.id = ur.related_user_id;

-- Seed data for testing
-- Note: This is just test data for development
-- In production, users should be created through Supabase Auth UI or API

-- First, create users in auth.users
DO $$
DECLARE
    test_user1_id UUID := '11111111-1111-1111-1111-111111111111';
    test_user2_id UUID := '22222222-2222-2222-2222-222222222222';
    test_user3_id UUID := '33333333-3333-3333-3333-333333333333';
BEGIN
    -- Insert test users into auth.users if they don't exist
    INSERT INTO auth.users (
        id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        role
    )
    VALUES 
        (
            test_user1_id,
            'test1@example.com',
            crypt('testpassword123', gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            'authenticated'
        ),
        (
            test_user2_id,
            'test2@example.com',
            crypt('testpassword123', gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            'authenticated'
        ),
        (
            test_user3_id,
            'test3@example.com',
            crypt('testpassword123', gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            'authenticated'
        )
    ON CONFLICT (id) DO NOTHING;
END $$;

-- Now create profiles for the test users
INSERT INTO public.profiles (id, email, full_name, username, role, status)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'test1@example.com', 'Test User 1', 'testuser1', 'user', 'active'),
    ('22222222-2222-2222-2222-222222222222', 'test2@example.com', 'Test User 2', 'testuser2', 'user', 'active'),
    ('33333333-3333-3333-3333-333333333333', 'test3@example.com', 'Test User 3', 'testuser3', 'user', 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert test notifications
INSERT INTO public.notifications (user_id, title, message, type, status, link)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Welcome!', 'Welcome to our platform!', 'email', 'unread', '/dashboard'),
    ('11111111-1111-1111-1111-111111111111', 'Profile Update', 'Please complete your profile', 'in_app', 'unread', '/profile'),
    ('22222222-2222-2222-2222-222222222222', 'Welcome!', 'Welcome to our platform!', 'push', 'read', '/dashboard')
ON CONFLICT DO NOTHING;

-- Insert test user relationships
INSERT INTO public.user_relationships (user_id, related_user_id, status)
VALUES 
    ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'pending'),
    ('22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'accepted')
ON CONFLICT DO NOTHING;

-- Insert test user activity
INSERT INTO public.user_activity_log (user_id, action, details)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'login', '{"ip": "127.0.0.1", "device": "Chrome"}'),
    ('11111111-1111-1111-1111-111111111111', 'profile_update', '{"field": "avatar"}'),
    ('22222222-2222-2222-2222-222222222222', 'login', '{"ip": "127.0.0.1", "device": "Firefox"}')
ON CONFLICT DO NOTHING;

-- Insert test user sessions
INSERT INTO public.user_sessions (user_id, device_info, ip_address)
VALUES 
    ('11111111-1111-1111-1111-111111111111', '{"browser": "Chrome", "os": "Windows"}', '127.0.0.1'),
    ('22222222-2222-2222-2222-222222222222', '{"browser": "Firefox", "os": "MacOS"}', '127.0.0.1')
ON CONFLICT DO NOTHING;

-- Insert test user preferences
INSERT INTO public.user_preferences (user_id, dashboard_layout, sidebar_collapsed, compact_mode)
VALUES 
    ('11111111-1111-1111-1111-111111111111', '{"layout": "grid", "widgets": ["activity", "notifications"]}', false, false),
    ('22222222-2222-2222-2222-222222222222', '{"layout": "list", "widgets": ["notifications"]}', true, true)
ON CONFLICT (user_id) DO NOTHING;

-- Insert test user settings
INSERT INTO public.user_settings (user_id, theme_mode, notifications_enabled, email_notifications, push_notifications, in_app_notifications)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'light', true, true, true, true),
    ('22222222-2222-2222-2222-222222222222', 'dark', true, false, true, true)
ON CONFLICT (user_id) DO NOTHING;

-- Insert test user verification
INSERT INTO public.user_verification (user_id, type, token, expires_at)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'email', 'test-token-1', NOW() + INTERVAL '24 hours'),
    ('22222222-2222-2222-2222-222222222222', 'email', 'test-token-2', NOW() + INTERVAL '24 hours')
ON CONFLICT DO NOTHING;

-- Insert test user audit logs
INSERT INTO public.user_audit_log (user_id, action, entity_type, entity_id, old_values, new_values, ip_address, user_agent)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'update', 'profile', '11111111-1111-1111-1111-111111111111', '{"theme": "light"}', '{"theme": "dark"}', '127.0.0.1', 'Chrome'),
    ('22222222-2222-2222-2222-222222222222', 'create', 'notification', 'test-notification-id', NULL, '{"type": "welcome"}', '127.0.0.1', 'Firefox')
ON CONFLICT DO NOTHING; 