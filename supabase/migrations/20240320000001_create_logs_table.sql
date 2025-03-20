-- Create logs table
CREATE TABLE IF NOT EXISTS logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  level TEXT NOT NULL CHECK (level IN ('info', 'warn', 'error', 'debug')),
  message TEXT NOT NULL,
  data JSONB,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source TEXT NOT NULL CHECK (source IN ('client', 'server')),
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS logs_timestamp_idx ON logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS logs_level_idx ON logs(level);
CREATE INDEX IF NOT EXISTS logs_source_idx ON logs(source);
CREATE INDEX IF NOT EXISTS logs_user_id_idx ON logs(user_id);

-- Add RLS policies
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read their own logs
CREATE POLICY "Users can read their own logs"
  ON logs FOR SELECT
  USING (auth.uid() = user_id);

-- Allow authenticated users to insert their own logs
CREATE POLICY "Users can insert their own logs"
  ON logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow service role to read all logs
CREATE POLICY "Service role can read all logs"
  ON logs FOR SELECT
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Allow service role to insert all logs
CREATE POLICY "Service role can insert all logs"
  ON logs FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role'); 