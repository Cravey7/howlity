import { validateEnv } from '../config/env';
import path from 'path';
import { serverLogger } from '../lib/logger';

function validateEnvironment(): void {
  // Debug logging
  serverLogger.info('Debug environment:', {
    cwd: process.cwd(),
    envPath: path.resolve(process.cwd(), '.env.local'),
    hasSupabaseUrl: !!process.env['NEXT_PUBLIC_SUPABASE_URL'],
    hasSupabaseAnonKey: !!process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'],
    hasSupabaseServiceRoleKey: !!process.env['SUPABASE_SERVICE_ROLE_KEY'],
    configPath: path.resolve(process.cwd(), 'config/env.ts'),
  });

  serverLogger.info('Starting environment validation');

  try {
    // Validate environment variables
    validateEnv();
    serverLogger.info('\n✨ Environment validation completed successfully');
  } catch (error) {
    serverLogger.error('Environment validation failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    process.exit(1);
  }
}

// Self-executing function to handle top-level await
(async () => {
  try {
    await validateEnvironment();
  } catch (error) {
    serverLogger.error('Fatal error during environment validation', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    process.exit(1);
  }
})();
