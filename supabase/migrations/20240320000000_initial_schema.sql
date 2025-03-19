CREATE TYPE notification_type AS ENUM (
    'system',
    'mention',
    'follow',
    'like',
    'comment',
    'message',
    'welcome'
); 