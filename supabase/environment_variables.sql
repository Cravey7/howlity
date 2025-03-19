-- Create environment variables table
CREATE TABLE environment_variables (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  is_secret BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(application_id, name)
);

-- Enable RLS
ALTER TABLE environment_variables ENABLE ROW LEVEL SECURITY;

-- Create policies for environment variables
CREATE POLICY "Environment variables are viewable by everyone" ON environment_variables
  FOR SELECT USING (true);

CREATE POLICY "Environment variables are insertable by everyone" ON environment_variables
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Environment variables are updatable by everyone" ON environment_variables
  FOR UPDATE USING (true);

CREATE POLICY "Environment variables are deletable by everyone" ON environment_variables
  FOR DELETE USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_environment_variables_updated_at
  BEFORE UPDATE ON environment_variables
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 