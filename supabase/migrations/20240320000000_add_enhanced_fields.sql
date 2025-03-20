-- Add enhanced fields to systems table
ALTER TABLE systems
ADD COLUMN status text CHECK (status IN ('active', 'archived', 'deleted')) DEFAULT 'active',
ADD COLUMN visibility text CHECK (visibility IN ('public', 'private', 'shared')) DEFAULT 'private',
ADD COLUMN tags text[] DEFAULT '{}',
ADD COLUMN metadata jsonb DEFAULT '{}',
ADD COLUMN version text DEFAULT '1.0.0',
ADD COLUMN parent_id uuid REFERENCES systems(id),
ADD COLUMN settings jsonb DEFAULT '{}';

-- Add enhanced fields to applications table
ALTER TABLE applications
ADD COLUMN status text CHECK (status IN ('draft', 'development', 'staging', 'production')) DEFAULT 'draft',
ADD COLUMN type text CHECK (type IN ('web', 'mobile', 'desktop', 'api')) DEFAULT 'web',
ADD COLUMN framework text,
ADD COLUMN deployment jsonb DEFAULT '{}',
ADD COLUMN environment text CHECK (environment IN ('development', 'staging', 'production')) DEFAULT 'development',
ADD COLUMN version text DEFAULT '1.0.0',
ADD COLUMN dependencies jsonb DEFAULT '{}',
ADD COLUMN build_config jsonb DEFAULT '{}';

-- Add enhanced fields to features table
ALTER TABLE features
ADD COLUMN status text CHECK (status IN ('planned', 'in-progress', 'completed', 'blocked')) DEFAULT 'planned',
ADD COLUMN priority text CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
ADD COLUMN complexity text CHECK (complexity IN ('simple', 'moderate', 'complex')) DEFAULT 'moderate',
ADD COLUMN estimated_hours numeric,
ADD COLUMN assigned_to uuid REFERENCES users(id),
ADD COLUMN dependencies uuid[] DEFAULT '{}',
ADD COLUMN acceptance_criteria jsonb DEFAULT '{}',
ADD COLUMN tags text[] DEFAULT '{}',
ADD COLUMN attachments jsonb DEFAULT '{}';

-- Add enhanced fields to stacks table
ALTER TABLE stacks
ADD COLUMN type text CHECK (type IN ('frontend', 'backend', 'fullstack', 'devops')) DEFAULT 'fullstack',
ADD COLUMN version text DEFAULT '1.0.0',
ADD COLUMN compatibility jsonb DEFAULT '{}',
ADD COLUMN requirements jsonb DEFAULT '{}',
ADD COLUMN documentation jsonb DEFAULT '{}',
ADD COLUMN tags text[] DEFAULT '{}',
ADD COLUMN is_default boolean DEFAULT false;

-- Add enhanced fields to tools table
ALTER TABLE tools
ADD COLUMN type text CHECK (type IN ('development', 'testing', 'deployment', 'monitoring')) DEFAULT 'development',
ADD COLUMN version text DEFAULT '1.0.0',
ADD COLUMN configuration jsonb DEFAULT '{}',
ADD COLUMN documentation jsonb DEFAULT '{}',
ADD COLUMN compatibility jsonb DEFAULT '{}',
ADD COLUMN license text,
ADD COLUMN is_required boolean DEFAULT false,
ADD COLUMN tags text[] DEFAULT '{}';

-- Add enhanced fields to environment_variables table
ALTER TABLE environment_variables
ADD COLUMN type text CHECK (type IN ('string', 'number', 'boolean', 'secret')) DEFAULT 'string',
ADD COLUMN scope text CHECK (scope IN ('global', 'environment', 'feature')) DEFAULT 'environment',
ADD COLUMN is_secret boolean DEFAULT false,
ADD COLUMN description text,
ADD COLUMN validation jsonb DEFAULT '{}',
ADD COLUMN default_value text,
ADD COLUMN is_required boolean DEFAULT false,
ADD COLUMN tags text[] DEFAULT '{}';

-- Add enhanced fields to ai_prompts table
ALTER TABLE ai_prompts
ADD COLUMN type text CHECK (type IN ('system', 'user', 'assistant')) DEFAULT 'user',
ADD COLUMN category text,
ADD COLUMN version text DEFAULT '1.0.0',
ADD COLUMN parameters jsonb DEFAULT '{}',
ADD COLUMN examples jsonb DEFAULT '{}',
ADD COLUMN tags text[] DEFAULT '{}',
ADD COLUMN metadata jsonb DEFAULT '{}',
ADD COLUMN is_template boolean DEFAULT false;

-- Add enhanced fields to ai_instructions table
ALTER TABLE ai_instructions
ADD COLUMN type text CHECK (type IN ('system', 'user', 'assistant')) DEFAULT 'user',
ADD COLUMN priority integer DEFAULT 0,
ADD COLUMN conditions jsonb DEFAULT '{}',
ADD COLUMN validation jsonb DEFAULT '{}',
ADD COLUMN examples jsonb DEFAULT '{}',
ADD COLUMN tags text[] DEFAULT '{}',
ADD COLUMN metadata jsonb DEFAULT '{}';

-- Add enhanced fields to ai_usage_costs table
ALTER TABLE ai_usage_costs
ADD COLUMN provider text,
ADD COLUMN currency text DEFAULT 'USD',
ADD COLUMN billing_period text CHECK (billing_period IN ('monthly', 'daily', 'hourly')) DEFAULT 'monthly',
ADD COLUMN usage_metrics jsonb DEFAULT '{}',
ADD COLUMN budget numeric,
ADD COLUMN alerts jsonb DEFAULT '{}',
ADD COLUMN tags text[] DEFAULT '{}';

-- Add enhanced fields to ai_models table
ALTER TABLE ai_models
ADD COLUMN version text DEFAULT '1.0.0',
ADD COLUMN capabilities jsonb DEFAULT '{}',
ADD COLUMN limitations jsonb DEFAULT '{}',
ADD COLUMN cost jsonb DEFAULT '{}',
ADD COLUMN performance jsonb DEFAULT '{}',
ADD COLUMN documentation jsonb DEFAULT '{}',
ADD COLUMN tags text[] DEFAULT '{}',
ADD COLUMN is_active boolean DEFAULT true;

-- Add enhanced fields to ai_agents table
ALTER TABLE ai_agents
ADD COLUMN type text CHECK (type IN ('assistant', 'worker', 'manager')) DEFAULT 'assistant',
ADD COLUMN capabilities jsonb DEFAULT '{}',
ADD COLUMN personality jsonb DEFAULT '{}',
ADD COLUMN settings jsonb DEFAULT '{}',
ADD COLUMN status text CHECK (status IN ('active', 'inactive', 'training')) DEFAULT 'active',
ADD COLUMN performance jsonb DEFAULT '{}',
ADD COLUMN tags text[] DEFAULT '{}',
ADD COLUMN metadata jsonb DEFAULT '{}';

-- Add enhanced fields to pages table
ALTER TABLE pages
ADD COLUMN type text CHECK (type IN ('static', 'dynamic', 'api')) DEFAULT 'static',
ADD COLUMN route text,
ADD COLUMN layout text,
ADD COLUMN metadata jsonb DEFAULT '{}',
ADD COLUMN permissions jsonb DEFAULT '{}',
ADD COLUMN dependencies uuid[] DEFAULT '{}',
ADD COLUMN tags text[] DEFAULT '{}',
ADD COLUMN is_published boolean DEFAULT false;

-- Add enhanced fields to components table
ALTER TABLE components
ADD COLUMN type text CHECK (type IN ('ui', 'layout', 'container', 'form')) DEFAULT 'ui',
ADD COLUMN props jsonb DEFAULT '{}',
ADD COLUMN styles jsonb DEFAULT '{}',
ADD COLUMN dependencies uuid[] DEFAULT '{}',
ADD COLUMN documentation jsonb DEFAULT '{}',
ADD COLUMN tags text[] DEFAULT '{}',
ADD COLUMN is_reusable boolean DEFAULT false,
ADD COLUMN version text DEFAULT '1.0.0';

-- Add enhanced fields to navigation table
ALTER TABLE navigation
ADD COLUMN type text CHECK (type IN ('main', 'footer', 'sidebar', 'mobile')) DEFAULT 'main',
ADD COLUMN items jsonb DEFAULT '{}',
ADD COLUMN settings jsonb DEFAULT '{}',
ADD COLUMN permissions jsonb DEFAULT '{}',
ADD COLUMN tags text[] DEFAULT '{}',
ADD COLUMN is_active boolean DEFAULT true,
ADD COLUMN version text DEFAULT '1.0.0';

-- Add enhanced fields to database_tables table
ALTER TABLE database_tables
ADD COLUMN schema jsonb DEFAULT '{}',
ADD COLUMN relationships jsonb DEFAULT '{}',
ADD COLUMN indexes jsonb DEFAULT '{}',
ADD COLUMN constraints jsonb DEFAULT '{}',
ADD COLUMN permissions jsonb DEFAULT '{}',
ADD COLUMN tags text[] DEFAULT '{}',
ADD COLUMN is_system boolean DEFAULT false,
ADD COLUMN version text DEFAULT '1.0.0'; 