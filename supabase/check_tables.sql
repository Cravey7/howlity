-- Check if navigation_items table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'navigation_items'
);

-- If table doesn't exist, create it
CREATE TABLE IF NOT EXISTS public.navigation_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    path TEXT NOT NULL,
    icon_id TEXT,
    order_index INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" ON public.navigation_items
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create policy to allow read access for anonymous users
CREATE POLICY "Allow read access for anonymous users" ON public.navigation_items
    FOR SELECT
    TO anon
    USING (true);

-- Insert sample navigation items if the table is empty
INSERT INTO public.navigation_items (name, path, order_index, is_active)
VALUES 
    ('Dashboard', '/dashboard', 1, true),
    ('Settings', '/settings', 2, true),
    ('Design System', '/design-system', 3, true),
    ('Components', '/components', 4, true)
ON CONFLICT DO NOTHING;

-- Verify the data
SELECT * FROM public.navigation_items ORDER BY order_index; 