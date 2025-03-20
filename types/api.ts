import { ApiResponse, ErrorResponse, SuccessResponse } from './common';
import { AuthCredentials, RegisterData, Session } from './auth';

/**
 * API endpoint definitions
 */
export enum ApiEndpoint {
  // Auth endpoints
  Auth = '/api/auth',

  // User endpoints
  Users = '/api/users',

  // System endpoints
  Systems = '/api/systems',
  SystemFeatures = '/api/systems/:systemId/features',
  SystemStacks = '/api/systems/:systemId/stacks',
  SystemTools = '/api/systems/:systemId/tools',

  // Application endpoints
  Applications = '/api/applications',
  ApplicationFeatures = '/api/applications/:applicationId/features',
  ApplicationPages = '/api/applications/:applicationId/pages',
  ApplicationComponents = '/api/applications/:applicationId/components',
  ApplicationNavigation = '/api/applications/:applicationId/navigation',

  // Feature endpoints
  Features = '/api/features',
  FeatureTests = '/api/features/:featureId/tests',

  // Stack endpoints
  Stacks = '/api/stacks',
  StackTools = '/api/stacks/:stackId/tools',

  // Tool endpoints
  Tools = '/api/tools',

  // Environment variable endpoints
  EnvironmentVariables = '/api/environment-variables',

  // AI endpoints
  AIPrompts = '/api/ai/prompts',
  AIInstructions = '/api/ai/instructions',
  AIUsageCosts = '/api/ai/usage-costs',
  AIModels = '/api/ai/models',
  AIAgents = '/api/ai/agents',

  // Database endpoints
  DatabaseTables = '/api/database/tables',
  DatabaseFields = '/api/database/fields',
  DatabaseRelationships = '/api/database/relationships',
  DatabaseRoles = '/api/database/roles',
  DatabasePermissions = '/api/database/permissions',

  // Test endpoints
  UnitTests = '/api/tests/unit',
  APITests = '/api/tests/api',
  E2ETests = '/api/tests/e2e',
}

/**
 * API method type
 */
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * API request options
 */
export interface ApiRequestOptions {
  method?: ApiMethod;
  headers?: Record<string, string>;
  body?: unknown;
  query?: Record<string, string>;
  timeout?: number;
}

/**
 * API request configuration
 */
export interface ApiRequestConfig {
  baseUrl?: string;
  endpoint: ApiEndpoint;
  options?: ApiRequestOptions;
}

/**
 * Auth endpoints
 */
export interface AuthEndpoints {
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ user: User; token: string }>;
  register: (data: {
    email: string;
    password: string;
    name: string;
  }) => Promise<{ user: User; token: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<{ token: string }>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

/**
 * API error type
 */
export enum ApiErrorType {
  Validation = 'VALIDATION_ERROR',
  Authentication = 'AUTHENTICATION_ERROR',
  Authorization = 'AUTHORIZATION_ERROR',
  NotFound = 'NOT_FOUND_ERROR',
  Conflict = 'CONFLICT_ERROR',
  RateLimit = 'RATE_LIMIT_ERROR',
  Server = 'SERVER_ERROR',
  Network = 'NETWORK_ERROR',
}

/**
 * API error
 */
export interface ApiError extends Error {
  type: ApiErrorType;
  details?: unknown;
}

/**
 * API client
 */
export interface ApiClient {
  request: <T>(config: ApiRequestConfig) => Promise<T>;
  auth: AuthEndpoints;
}

/**
 * API middleware
 */
export type ApiMiddleware = (config: ApiRequestConfig) => ApiRequestConfig;

/**
 * API interceptor
 */
export interface ApiInterceptor {
  request?: (config: ApiRequestConfig) => ApiRequestConfig;
  response?: <T>(response: T) => T;
  error?: (error: ApiError) => Promise<never>;
}

/**
 * API cache options
 */
export interface ApiCacheOptions {
  enabled: boolean;
  ttl: number;
  key?: string;
}

/**
 * API retry options
 */
export interface ApiRetryOptions {
  enabled: boolean;
  maxRetries: number;
  backoff: number;
}
