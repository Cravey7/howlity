-- Create logs table
CREATE TABLE IF NOT EXISTS logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_message TEXT NOT NULL,
    metadata JSONB,
    timestamp BIGINT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on timestamp for faster queries
CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs(timestamp);

-- Enable Row Level Security
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert logs
CREATE POLICY "Service role can insert logs"
    ON logs FOR INSERT
    TO service_role
    WITH CHECK (true);

-- Create policy to allow service role to read logs
CREATE POLICY "Service role can read logs"
    ON logs FOR SELECT
    TO service_role
    USING (true);

-- Grant necessary permissions
GRANT ALL ON logs TO service_role;
GRANT USAGE ON SCHEMA public TO service_role; 