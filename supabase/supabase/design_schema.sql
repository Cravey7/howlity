-- Create design system tables
CREATE TABLE IF NOT EXISTS design_systems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS color_palettes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    design_system_id UUID REFERENCES design_systems(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    colors JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS typography (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    design_system_id UUID REFERENCES design_systems(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    font_family TEXT NOT NULL,
    font_size TEXT NOT NULL,
    font_weight TEXT,
    line_height TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS spacing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    design_system_id UUID REFERENCES design_systems(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS icons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    svg_path TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS navigation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES navigation_items(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    path TEXT NOT NULL,
    icon_id UUID REFERENCES icons(id),
    order_index INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ui_components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    props JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS component_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    component_id UUID REFERENCES ui_components(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    props JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE design_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_palettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE typography ENABLE ROW LEVEL SECURITY;
ALTER TABLE spacing ENABLE ROW LEVEL SECURITY;
ALTER TABLE icons ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ui_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE component_variants ENABLE ROW LEVEL SECURITY;

-- Create policies for each table
CREATE POLICY "Enable read access for all users" ON design_systems FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON design_systems FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON design_systems FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON design_systems FOR DELETE USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_design_systems_updated_at
    BEFORE UPDATE ON design_systems
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for DevFlow's design system
INSERT INTO design_systems (name, description) 
VALUES ('DevFlow Design System', 'Design system for DevFlow application');

-- Insert color palette
INSERT INTO color_palettes (design_system_id, name, colors) 
VALUES 
((SELECT id FROM design_systems WHERE name = 'DevFlow Design System'), 'Primary', 
'{
    "primary": "#0F172A",
    "secondary": "#1E293B",
    "accent": "#3B82F6",
    "background": "#F8FAFC",
    "text": "#1E293B",
    "muted": "#64748B"
}'::jsonb);

-- Insert typography
INSERT INTO typography (design_system_id, name, font_family, font_size, font_weight, line_height) 
VALUES 
((SELECT id FROM design_systems WHERE name = 'DevFlow Design System'), 'Heading 1', 'Inter', '2.5rem', '700', '1.2'),
((SELECT id FROM design_systems WHERE name = 'DevFlow Design System'), 'Body', 'Inter', '1rem', '400', '1.5');

-- Insert spacing
INSERT INTO spacing (design_system_id, name, value) 
VALUES 
((SELECT id FROM design_systems WHERE name = 'DevFlow Design System'), 'xs', '0.25rem'),
((SELECT id FROM design_systems WHERE name = 'DevFlow Design System'), 'sm', '0.5rem'),
((SELECT id FROM design_systems WHERE name = 'DevFlow Design System'), 'md', '1rem'),
((SELECT id FROM design_systems WHERE name = 'DevFlow Design System'), 'lg', '1.5rem'),
((SELECT id FROM design_systems WHERE name = 'DevFlow Design System'), 'xl', '2rem');

-- Insert icons
INSERT INTO icons (name, category, svg_path) 
VALUES 
('Home', 'navigation', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>'),
('Settings', 'navigation', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>');

-- Insert navigation items
INSERT INTO navigation_items (name, path, icon_id, order_index) 
VALUES 
('Dashboard', '/dashboard', (SELECT id FROM icons WHERE name = 'Home'), 1),
('Settings', '/settings', (SELECT id FROM icons WHERE name = 'Settings'), 2);

-- Insert UI components
INSERT INTO ui_components (name, category, description, props) 
VALUES 
('Button', 'basic', 'Primary button component', 
'{
    "variant": ["primary", "secondary", "outline"],
    "size": ["sm", "md", "lg"],
    "disabled": "boolean"
}'::jsonb),
('Card', 'layout', 'Container component for content', 
'{
    "variant": ["default", "bordered", "elevated"],
    "padding": ["none", "sm", "md", "lg"]
}'::jsonb);

-- Insert component variants
INSERT INTO component_variants (component_id, name, props) 
VALUES 
((SELECT id FROM ui_components WHERE name = 'Button'), 'Primary Button', 
'{"variant": "primary", "size": "md"}'::jsonb),
((SELECT id FROM ui_components WHERE name = 'Button'), 'Secondary Button', 
'{"variant": "secondary", "size": "md"}'::jsonb); 