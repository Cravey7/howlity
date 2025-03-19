-- Create systems table
CREATE TABLE IF NOT EXISTS public.systems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.systems ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" ON public.systems
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create policy to allow read access for anonymous users
CREATE POLICY "Allow read access for anonymous users" ON public.systems
    FOR SELECT
    TO anon
    USING (true);

-- Insert sample data
INSERT INTO public.systems (name, description)
VALUES 
    ('Sample System 1', 'This is a sample system for testing'),
    ('Sample System 2', 'Another sample system with a description'),
    ('Sample System 3', 'A third sample system for demonstration')
ON CONFLICT DO NOTHING; 