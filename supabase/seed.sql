-- Insert sample system
INSERT INTO systems (name, description) 
VALUES ('E-commerce Platform', 'A modern e-commerce platform with multiple applications');

-- Insert sample applications
INSERT INTO applications (system_id, name, description) 
VALUES 
((SELECT id FROM systems WHERE name = 'E-commerce Platform'), 'Customer Portal', 'Main customer-facing application'),
((SELECT id FROM systems WHERE name = 'E-commerce Platform'), 'Admin Dashboard', 'Administrative interface for managing the platform'),
((SELECT id FROM systems WHERE name = 'E-commerce Platform'), 'Inventory System', 'Backend system for managing product inventory');

-- Insert sample features
INSERT INTO features (application_id, name, description) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'User Authentication', 'Secure user login and registration'),
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'Product Search', 'Advanced product search with filters'),
((SELECT id FROM applications WHERE name = 'Admin Dashboard'), 'User Management', 'Manage user accounts and permissions'),
((SELECT id FROM applications WHERE name = 'Inventory System'), 'Stock Tracking', 'Real-time inventory tracking');

-- Insert sample stacks
INSERT INTO stacks (application_id, name, description) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'Frontend Stack', 'Modern React-based frontend'),
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'Backend Stack', 'Node.js backend with PostgreSQL'),
((SELECT id FROM applications WHERE name = 'Admin Dashboard'), 'Admin Stack', 'Vue.js admin interface');

-- Insert sample frontend stack
INSERT INTO frontend_stack (stack_id, framework, libraries, components) 
VALUES 
((SELECT id FROM stacks WHERE name = 'Frontend Stack'), 'Next.js', 
'["Tailwind CSS", "React Query", "Zustand"]'::jsonb,
'["Button", "Card", "Modal", "Form"]'::jsonb);

-- Insert sample backend stack
INSERT INTO backend_stack (stack_id, database, authentication_methods, storage, edge_functions) 
VALUES 
((SELECT id FROM stacks WHERE name = 'Backend Stack'), 'PostgreSQL',
'["JWT", "OAuth2"]'::jsonb,
'["S3", "CloudFront"]'::jsonb,
'["Auth", "Image Processing"]'::jsonb);

-- Insert sample tools
INSERT INTO tools (stack_id, name, type, purpose) 
VALUES 
((SELECT id FROM stacks WHERE name = 'Frontend Stack'), 'ESLint', 'Linter', 'Code quality'),
((SELECT id FROM stacks WHERE name = 'Frontend Stack'), 'Jest', 'Testing', 'Unit testing'),
((SELECT id FROM stacks WHERE name = 'Backend Stack'), 'Docker', 'Containerization', 'Deployment');

-- Insert sample environment variables
INSERT INTO environment_variables (application_id, name, value, is_secret) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'NEXT_PUBLIC_API_URL', 'https://api.example.com', false),
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'DATABASE_URL', 'postgresql://user:pass@localhost:5432/db', true);

-- Insert sample AI prompts
INSERT INTO ai_prompts (application_id, prompt_text, context) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'Generate product descriptions', '{"tone": "professional", "language": "English"}'::jsonb);

-- Insert sample AI instructions
INSERT INTO ai_instructions (application_id, instruction_text, context) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'Analyze customer feedback sentiment', '{"model": "gpt-4", "max_tokens": 100}'::jsonb);

-- Insert sample AI usage cost
INSERT INTO ai_usage_cost (application_id, cost, usage_type) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 0.50, 'text-generation');

-- Insert sample AI models
INSERT INTO ai_models (application_id, model_name, version, provider) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'gpt-4', '1.0', 'OpenAI');

-- Insert sample AI agents
INSERT INTO ai_agents (application_id, agent_name, role, status) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'Customer Support Bot', 'Support', 'active');

-- Insert sample pages
INSERT INTO pages (application_id, name, route) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'Home', '/'),
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'Products', '/products'),
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'Cart', '/cart');

-- Insert sample components
INSERT INTO components (page_id, name, type) 
VALUES 
((SELECT id FROM pages WHERE name = 'Home'), 'Hero', 'section'),
((SELECT id FROM pages WHERE name = 'Products'), 'ProductGrid', 'grid'),
((SELECT id FROM pages WHERE name = 'Cart'), 'CartSummary', 'summary');

-- Insert sample navigation
INSERT INTO navigation (application_id, structure) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 
'{"main": ["Home", "Products", "Cart"], "footer": ["About", "Contact", "Terms"]}'::jsonb);

-- Insert sample database tables
INSERT INTO tables (application_id, name, description) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'users', 'User accounts and profiles'),
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'products', 'Product catalog');

-- Insert sample fields
INSERT INTO fields (table_id, name, type, nullable, default_value) 
VALUES 
((SELECT id FROM tables WHERE name = 'users'), 'id', 'uuid', false, 'uuid_generate_v4()'),
((SELECT id FROM tables WHERE name = 'users'), 'email', 'text', false, null),
((SELECT id FROM tables WHERE name = 'products'), 'id', 'uuid', false, 'uuid_generate_v4()'),
((SELECT id FROM tables WHERE name = 'products'), 'name', 'text', false, null);

-- Insert sample relationships
INSERT INTO relationships (table1_id, table2_id, relationship_type) 
VALUES 
((SELECT id FROM tables WHERE name = 'users'), (SELECT id FROM tables WHERE name = 'products'), 'many-to-many');

-- Insert sample roles
INSERT INTO roles (application_id, name, description) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'admin', 'Administrator role'),
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'user', 'Regular user role');

-- Insert sample permissions
INSERT INTO permissions (role_id, table_id, action) 
VALUES 
((SELECT id FROM roles WHERE name = 'admin'), (SELECT id FROM tables WHERE name = 'users'), 'all'),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM tables WHERE name = 'products'), 'read');

-- Insert sample tests
INSERT INTO unit_tests (application_id, name, description) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'User Authentication', 'Test user login and registration');

INSERT INTO api_tests (application_id, name, description) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'Product API', 'Test product CRUD operations');

INSERT INTO e2e_tests (application_id, name, description) 
VALUES 
((SELECT id FROM applications WHERE name = 'Customer Portal'), 'Checkout Flow', 'Test complete checkout process'); 