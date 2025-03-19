-- Insert sample notifications
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

-- Insert sample user relationships
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

-- Insert sample preference history
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

-- Insert sample verifications
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

-- Insert sample audit logs
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