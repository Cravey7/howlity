-- Create additional enum types
CREATE TYPE notification_status AS ENUM ('unread', 'read', 'archived');
CREATE TYPE relationship_status AS ENUM ('pending', 'accepted', 'blocked');
CREATE TYPE user_preference_type AS ENUM ('general', 'privacy', 'notifications', 'appearance');

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

-- Enable RLS on new tables
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preference_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_audit_log ENABLE ROW LEVEL SECURITY;

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

-- Functions for notification handling
CREATE OR REPLACE FUNCTION public.handle_notification_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'read' AND OLD.status = 'unread' THEN
        NEW.read_at = TIMEZONE('utc'::text, NOW());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function for tracking preference changes
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

-- Triggers
DROP TRIGGER IF EXISTS on_notification_status_change ON public.notifications;
CREATE TRIGGER on_notification_status_change
    BEFORE UPDATE ON public.notifications
    FOR EACH ROW
    WHEN (OLD.status IS DISTINCT FROM NEW.status)
    EXECUTE FUNCTION public.handle_notification_status();

-- Create indexes for better performance
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