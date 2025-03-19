-- Insert admin user
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'admin@devflow.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    now()
);

-- Insert admin profile
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
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'admin@devflow.com',
    'System Administrator',
    'admin',
    'admin',
    'active',
    'System administrator with full access to all features.',
    'UTC',
    'en'
);

-- Insert admin settings
INSERT INTO public.user_settings (
    user_id,
    theme_mode,
    notifications_enabled,
    email_notifications,
    push_notifications,
    in_app_notifications,
    notification_frequency
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    'system',
    true,
    true,
    true,
    true,
    'realtime'
);

-- Insert admin preferences
INSERT INTO public.user_preferences (
    user_id,
    dashboard_layout,
    sidebar_collapsed,
    compact_mode
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    '{"layout": "default", "widgets": ["activity", "notifications", "stats"]}'::jsonb,
    false,
    false
);

-- Insert test users
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at
) VALUES 
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

-- Insert test profiles
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

-- Insert test user settings
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

-- Insert test user preferences
INSERT INTO public.user_preferences (
    user_id,
    dashboard_layout,
    sidebar_collapsed,
    compact_mode
) VALUES 
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

-- Insert sample activity logs
INSERT INTO public.user_activity_log (
    user_id,
    action,
    details,
    ip_address
) VALUES 
(
    '00000000-0000-0000-0000-000000000000',
    'system_init',
    '{"message": "System initialized"}'::jsonb,
    '127.0.0.1'
),
(
    '11111111-1111-1111-1111-111111111111',
    'user_login',
    '{"device": "Chrome", "platform": "Windows"}'::jsonb,
    '127.0.0.1'
),
(
    '22222222-2222-2222-2222-222222222222',
    'mod_action',
    '{"action": "user_warn", "target_user": "testuser"}'::jsonb,
    '127.0.0.1'
);

-- Insert sample sessions
INSERT INTO public.user_sessions (
    user_id,
    device_info,
    ip_address
) VALUES 
(
    '00000000-0000-0000-0000-000000000000',
    '{"browser": "Chrome", "os": "Windows", "device": "Desktop"}'::jsonb,
    '127.0.0.1'
),
(
    '11111111-1111-1111-1111-111111111111',
    '{"browser": "Firefox", "os": "MacOS", "device": "Desktop"}'::jsonb,
    '127.0.0.1'
),
(
    '22222222-2222-2222-2222-222222222222',
    '{"browser": "Safari", "os": "iOS", "device": "Mobile"}'::jsonb,
    '127.0.0.1'
); 