-- Create systems table
CREATE TABLE systems (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create applications table
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  system_id UUID NOT NULL REFERENCES systems(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create features table
CREATE TABLE features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create stacks table
CREATE TABLE stacks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Note: Environment variables table is defined in environment_variables.sql
-- This allows for better organization and separation of concerns

-- Create RLS policies
ALTER TABLE systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE stacks ENABLE ROW LEVEL SECURITY;

-- Create policies for systems
CREATE POLICY "Systems are viewable by everyone" ON systems
  FOR SELECT USING (true);

CREATE POLICY "Systems are insertable by everyone" ON systems
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Systems are updatable by everyone" ON systems
  FOR UPDATE USING (true);

CREATE POLICY "Systems are deletable by everyone" ON systems
  FOR DELETE USING (true);

-- Create policies for applications
CREATE POLICY "Applications are viewable by everyone" ON applications
  FOR SELECT USING (true);

CREATE POLICY "Applications are insertable by everyone" ON applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Applications are updatable by everyone" ON applications
  FOR UPDATE USING (true);

CREATE POLICY "Applications are deletable by everyone" ON applications
  FOR DELETE USING (true);

-- Create policies for features
CREATE POLICY "Features are viewable by everyone" ON features
  FOR SELECT USING (true);

CREATE POLICY "Features are insertable by everyone" ON features
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Features are updatable by everyone" ON features
  FOR UPDATE USING (true);

CREATE POLICY "Features are deletable by everyone" ON features
  FOR DELETE USING (true);

-- Create policies for stacks
CREATE POLICY "Stacks are viewable by everyone" ON stacks
  FOR SELECT USING (true);

CREATE POLICY "Stacks are insertable by everyone" ON stacks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Stacks are updatable by everyone" ON stacks
  FOR UPDATE USING (true);

CREATE POLICY "Stacks are deletable by everyone" ON stacks
  FOR DELETE USING (true);

-- Create functions to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_systems_updated_at
  BEFORE UPDATE ON systems
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_features_updated_at
  BEFORE UPDATE ON features
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stacks_updated_at
  BEFORE UPDATE ON stacks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 