# DevFlow - Modern Business Dashboard

A comprehensive business dashboard built with Next.js, TypeScript, and modern UI components.

## Features

- **Modern Tech Stack**
  - Next.js 14 with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Shadcn UI components
  - Recharts for data visualization
  - Supabase for backend

- **Dashboard Sections**
  - Systems Overview
  - Financial Management
  - Business Analytics
  - Team Management

- **Financial Features**
  - Revenue Tracking
  - Cost Analysis
  - Budget Management
  - Financial Health Metrics
  - Investment Tracking
  - Client Management
  - Team Performance
  - Market Analysis
  - Risk Assessment
  - Tax Management
  - Compliance Monitoring

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/devflow.git
   cd devflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Update the variables in `.env.local` with your values.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
devflow/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   │   ├── financial/    # Financial section
│   │   ├── business/     # Business section
│   │   └── team/         # Team section
│   ├── api/              # API routes
│   └── auth/             # Authentication pages
├── components/           # Reusable UI components
├── lib/                  # Shared utilities and constants
│   ├── constants.ts     # Global constants
│   └── mock-data/       # Mock data for development
├── styles/              # Global styles
└── types/               # TypeScript type definitions
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img alt="Next.js and Supabase Starter Kit - the fastest way to build apps with Next.js and Supabase" src="https://demo-nextjs-with-supabase.vercel.app/opengraph-image.png">
  <h1 align="center">Next.js and Supabase Starter Kit</h1>
</a>

<p align="center">
 The fastest way to build apps with Next.js and Supabase
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
  <a href="#more-supabase-examples"><strong>More Examples</strong></a>
</p>
<br/>

## Features

- Works across the entire [Next.js](https://nextjs.org) stack
  - App Router
  - Pages Router
  - Middleware
  - Client
  - Server
  - It just works!
- supabase-ssr. A package to configure Supabase Auth to use cookies
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Components with [shadcn/ui](https://ui.shadcn.com/)
- Optional deployment with [Supabase Vercel Integration and Vercel deploy](#deploy-your-own)
  - Environment variables automatically assigned to Vercel project

## Demo

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Deploy to Vercel

Vercel deployment will guide you through creating a Supabase account and project.

After installation of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app --example with-supabase with-supabase-app
   ```

   ```bash
   yarn create next-app --example with-supabase with-supabase-app
   ```

   ```bash
   pnpm create next-app --example with-supabase with-supabase-app
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd with-supabase-app
   ```

4. Rename `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

6. This template comes with the default shadcn/ui style initialized. If you instead want other ui.shadcn styles, delete `components.json` and [re-install shadcn/ui](https://ui.shadcn.com/docs/installation/next)

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Environment Setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Update the required environment variables in `.env.local`:

   ```bash
   # Required variables
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

   # Optional variables with defaults
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME=DevFlow
   ```

3. Validate your environment setup:
   ```bash
   npm run validate-env
   ```

## Environment Variables

### Required Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database Configuration
DATABASE_URL=postgresql://postgres.duaqqfukklgojyvrciti:Hwbfla35uq!@aws-0-us-west-1.pooler.supabase.com:5432/postgres

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=DevFlow
```

### Variable Descriptions

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes | - |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key (public) | Yes | - |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key (private) | Yes | - |
| `DATABASE_URL` | Your Supabase database connection string | Yes | - |
| `OPENAI_API_KEY` | Your OpenAI API key for AI features | Yes | - |
| `NEXT_PUBLIC_APP_URL` | Application URL | No | http://localhost:3000 |
| `NEXT_PUBLIC_APP_NAME` | Application name | No | DevFlow |

### Setup Instructions

1. Create a `.env.local` file in your project root
2. Copy the required variables from above
3. Fill in your actual values from:
   - Supabase project settings for Supabase-related variables
   - OpenAI dashboard for the API key
   - Your database connection string from Supabase

### Security Notes

- Never commit `.env.local` to version control
- Keep your service role key and database URL private
- Use environment-specific variables for different environments (development, staging, production)

### Development Workflow

1. Start the development server:

   ```bash
   npm run dev
   ```

   This will automatically validate your environment variables before starting the server.

2. Build for production:

   ```bash
   npm run build
   ```

   Environment validation is included in the build process.

3. Start production server:
   ```bash
   npm run start
   ```

### Troubleshooting

If you encounter environment-related issues:

1. Run the validation script manually:

   ```bash
   npm run validate-env
   ```

2. Check the error messages for missing or invalid variables

3. Ensure all required variables are set in your `.env.local` file

4. Verify that your Supabase credentials are correct

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)

## Supabase Client/Server Usage Guide

### Overview
This project uses Supabase for database operations and authentication. We follow a strict pattern of using different Supabase clients based on the operation context (client-side vs server-side) to ensure security and optimal performance.

### Environment Variables
```env
# Client-side operations (public)
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Server-side operations (private)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### When to Use Each Client

#### Client-Side Operations (NEXT_PUBLIC_SUPABASE_ANON_KEY)
Use the client-side Supabase client when:
- Fetching public data that doesn't require authentication
- Performing user authentication (sign in, sign up, password reset)
- Reading data that the user has permission to access
- Real-time subscriptions for client-side updates
- Client-side form submissions that don't require elevated privileges

Example:
```typescript
// components/UserProfile.tsx
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Fetch user profile
const { data: profile } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()
```

#### Server-Side Operations (SUPABASE_SERVICE_ROLE_KEY)
Use the server-side Supabase client when:
- API routes that need elevated privileges
- Background jobs or scheduled tasks
- Server-side data mutations
- Operations that bypass Row Level Security (RLS)
- Database migrations or maintenance tasks
- Operations that require admin-level access

Example:
```typescript
// app/api/admin/users/route.ts
import { createServerClient } from '@supabase/ssr'

const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Admin operation
const { data: users } = await supabase
  .from('users')
  .select('*')
  .order('created_at', { ascending: false })
```

### Best Practices

1. **Security**
   - Never expose the service role key to the client
   - Always use the appropriate key for the operation context
   - Implement Row Level Security (RLS) policies for client-side operations
   - Use the service role key only in server-side code

2. **Performance**
   - Use server-side operations for heavy data processing
   - Implement caching strategies for frequently accessed data
   - Use real-time subscriptions only when necessary
   - Batch operations when possible

3. **Error Handling**
   - Implement proper error boundaries for client-side operations
   - Use try-catch blocks for all database operations
   - Log errors appropriately based on the environment
   - Handle edge cases and null values

4. **Type Safety**
   - Use TypeScript for better type safety
   - Define database types using Supabase CLI
   - Use type guards for runtime type checking
   - Implement proper error types

5. **Testing**
   - Mock Supabase clients in tests
   - Use test environment variables
   - Test both success and error scenarios
   - Implement integration tests for critical paths

### Common Patterns

1. **Authentication Flow**
```typescript
// Client-side authentication
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

// Server-side session validation
const { data: { session } } = await supabase.auth.getSession()
```

2. **Data Fetching**
```typescript
// Client-side (with RLS)
const { data: posts } = await supabase
  .from('posts')
  .select('*')
  .eq('user_id', userId)

// Server-side (without RLS)
const { data: allPosts } = await supabase
  .from('posts')
  .select('*')
```

3. **Real-time Subscriptions**
```typescript
// Client-side only
const subscription = supabase
  .channel('table_changes')
  .on('postgres_changes', { event: '*', schema: 'public' }, payload => {
    console.log('Change received!', payload)
  })
  .subscribe()
```

### Troubleshooting

1. **Common Issues**
   - Missing environment variables
   - Incorrect key usage
   - RLS policy conflicts
   - Type mismatches

2. **Debugging Tips**
   - Check environment variables are properly set
   - Verify RLS policies
   - Use Supabase dashboard for debugging
   - Implement proper logging

3. **Performance Optimization**
   - Use appropriate indexes
   - Implement caching
   - Optimize queries
   - Use connection pooling
