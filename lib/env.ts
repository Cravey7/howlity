import { z } from 'zod';

// Helper functions for validation
const isValidPort = (port: number) => port >= 0 && port <= 65535;
const isValidTTL = (ttl: number) => ttl > 0 && ttl <= 86400 * 30; // Max 30 days
const isValidPercentage = (value: number) => value >= 0 && value <= 1;

const envSchema = z.object({
  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'Supabase service role key is required'),

  // Database Configuration
  SUPABASE_DB_PASSWORD: z.string().min(1),
  SUPABASE_DATABASE_URL: z.string().url(),
  SUPABASE_DB_PORT: z.string().transform(Number).refine(isValidPort, {
    message: 'Port must be between 0 and 65535',
  }),
  SUPABASE_DB_NAME: z.string().min(1),
  SUPABASE_DB_USER: z.string().min(1),

  // Transaction Pooler URL (for serverless functions)
  SUPABASE_TRANSACTION_POOLER_URL: z.string().url(),
  SUPABASE_POOLER_PORT: z.string().transform(Number).refine(isValidPort, {
    message: 'Port must be between 0 and 65535',
  }),

  // OpenAI Configuration
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_MODEL: z.string().min(1),
  OPENAI_MAX_TOKENS: z
    .string()
    .transform(Number)
    .refine((n) => n > 0 && n <= 4096, {
      message: 'Max tokens must be between 1 and 4096',
    }),
  OPENAI_TEMPERATURE: z.string().transform(Number).refine(isValidPercentage, {
    message: 'Temperature must be between 0 and 1',
  }),

  // Application Configuration
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('DevFlow'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .transform(Number)
    .refine(isValidPort, {
      message: 'Port must be between 0 and 65535',
    })
    .default('3000'),
  API_RATE_LIMIT: z
    .string()
    .transform(Number)
    .refine((n) => n > 0, {
      message: 'Rate limit must be positive',
    })
    .default('100'),
  API_RATE_LIMIT_WINDOW_MS: z
    .string()
    .transform(Number)
    .refine((n) => n > 0, {
      message: 'Rate limit window must be positive',
    })
    .default('900000'),

  // Security Configuration
  JWT_SECRET: z.string().min(32),
  COOKIE_SECRET: z.string().min(32),
  SESSION_LIFETIME: z
    .string()
    .transform(Number)
    .refine(isValidTTL, {
      message: 'Session lifetime must be between 1 and 2592000 seconds (30 days)',
    })
    .default('86400'),
  CORS_ORIGINS: z.string().transform((str) => str.split(',').map((s) => s.trim())),

  // Optional: Analytics and Monitoring
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_ENVIRONMENT: z.enum(['development', 'production', 'test']).optional(),
  SENTRY_TRACES_SAMPLE_RATE: z
    .string()
    .transform(Number)
    .refine(isValidPercentage, {
      message: 'Sample rate must be between 0 and 1',
    })
    .optional(),

  // Optional: Email Service
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z
    .string()
    .transform(Number)
    .refine(isValidPort, {
      message: 'Port must be between 0 and 65535',
    })
    .optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM_EMAIL: z.string().email().optional(),
  SMTP_FROM_NAME: z.string().optional(),

  // Optional: Redis Cache
  REDIS_URL: z.string().url().optional(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_TTL: z
    .string()
    .transform(Number)
    .refine(isValidTTL, {
      message: 'TTL must be between 1 and 2592000 seconds (30 days)',
    })
    .optional(),

  // Optional: File Storage
  STORAGE_BUCKET: z.string().optional(),
  STORAGE_REGION: z.string().optional(),
  STORAGE_ACCESS_KEY: z.string().optional(),
  STORAGE_SECRET_KEY: z.string().optional(),

  // Optional: Feature Flags
  ENABLE_ANALYTICS: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  ENABLE_EMAIL_NOTIFICATIONS: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  ENABLE_FILE_UPLOAD: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  ENABLE_RATE_LIMITING: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  ENABLE_CACHE: z
    .string()
    .transform((val) => val === 'true')
    .optional(),

  // Optional: Logging
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).optional(),
  LOG_FORMAT: z.enum(['json', 'text']).optional(),
  LOG_FILE_PATH: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv() {
  try {
    const parsed = envSchema.parse(process.env);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((err) => err.path.join('.')).join(', ');
      throw new Error(`❌ Invalid environment variables: ${missingVars}\n${error.message}`);
    }
    throw error;
  }
}

export const env = validateEnv();
