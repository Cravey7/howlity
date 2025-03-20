import { z } from 'zod';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Custom validators
const urlSchema = z.string().url('Invalid URL format');
const portSchema = z.string().refine((val) => {
  const port = parseInt(val, 10);
  return !isNaN(port) && port >= 0 && port <= 65535;
}, 'Port must be a number between 0 and 65535');

const envSchema = z.object({
  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: urlSchema,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Supabase service role key is required'),
  DATABASE_URL: urlSchema,
  SUPABASE_TRANSACTION_POOLER_URL: urlSchema,

  // OpenAI Configuration
  OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required'),

  // Application Configuration
  NEXT_PUBLIC_APP_URL: urlSchema.default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().min(1, 'App name is required').default('DevFlow'),
  PORT: portSchema.default('3000'),

  // API Rate Limiting
  API_RATE_LIMIT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, 'Rate limit must be a positive number'),
  API_RATE_LIMIT_WINDOW_MS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, 'Rate window must be a positive number'),

  // Security Configuration
  JWT_SECRET: z.string().min(1, 'JWT secret is required'),
  COOKIE_SECRET: z.string().min(1, 'Cookie secret is required'),
  SESSION_LIFETIME: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, 'Session lifetime must be a positive number'),
  CORS_ORIGINS: z.string().transform((val) => val.split(',').map((origin) => origin.trim())),

  // Logging Configuration
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  LOG_FORMAT: z.enum(['json', 'text']).default('json'),
  LOG_FILE_PATH: z.string().min(1, 'Log file path is required'),
});

// Create a type for the validated environment
type ValidatedEnv = z.infer<typeof envSchema>;

// Initialize with default values
let validatedEnv: ValidatedEnv | null = null;
let config: ReturnType<typeof createConfig> | null = null;

// Create the config object
function createConfig(env: ValidatedEnv) {
  return {
    isDevelopment: env.NODE_ENV === 'development',
    isProduction: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test',
    appUrl: env.NEXT_PUBLIC_APP_URL,
    appName: env.NEXT_PUBLIC_APP_NAME,
    port: parseInt(env.PORT, 10),
    supabase: {
      url: env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY,
      databaseUrl: env.DATABASE_URL,
      transactionPoolerUrl: env.SUPABASE_TRANSACTION_POOLER_URL,
    },
    openai: {
      apiKey: env.OPENAI_API_KEY,
    },
    api: {
      rateLimit: env.API_RATE_LIMIT,
      rateWindowMs: env.API_RATE_LIMIT_WINDOW_MS,
    },
    security: {
      jwtSecret: env.JWT_SECRET,
      cookieSecret: env.COOKIE_SECRET,
      sessionLifetime: env.SESSION_LIFETIME,
      corsOrigins: env.CORS_ORIGINS,
    },
    logging: {
      level: env.LOG_LEVEL,
      format: env.LOG_FORMAT,
      filePath: env.LOG_FILE_PATH,
    },
  } as const;
}

// Validate environment variables at runtime
export function validateEnv(): ValidatedEnv {
  try {
    // Debug: Log all environment variables (without sensitive values)
    console.log(
      'Available environment variables:',
      Object.keys(process.env).filter(
        (key) => !key.toLowerCase().includes('key') && !key.toLowerCase().includes('secret')
      )
    );

    const env = envSchema.parse(process.env);
    validatedEnv = env;
    config = createConfig(env);
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors
        .map((err) => {
          const path = err.path.join('.');
          const message = err.message;
          const value = process.env[path];
          return `❌ ${path}: ${message} (Current value: ${value ? '[REDACTED]' : 'undefined'})`;
        })
        .join('\n');

      throw new Error(
        'Environment validation failed:\n' +
          errors +
          '\n\n' +
          'Please check your .env file and ensure all required variables are set correctly.'
      );
    }
    throw error;
  }
}

// Export validated environment variables
export const env = validatedEnv || validateEnv();

// Export config
export { config };
