import { User } from '@supabase/supabase-js';

/**
 * Represents a user session
 */
export type Session = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
};

/**
 * Represents authentication credentials
 */
export type AuthCredentials = {
  email: string;
  password: string;
};

/**
 * Represents user registration data
 */
export type RegisterData = AuthCredentials & {
  name: string;
  confirmPassword: string;
};

/**
 * Represents password reset request data
 */
export type PasswordResetRequest = {
  email: string;
};

/**
 * Represents password reset data
 */
export type PasswordResetData = {
  password: string;
  confirmPassword: string;
  token: string;
};

/**
 * Represents authentication state
 */
export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
};

/**
 * Represents authentication context value
 */
export type AuthContextValue = AuthState & {
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (data: PasswordResetData) => Promise<void>;
  requestPasswordReset: (data: PasswordResetRequest) => Promise<void>;
};

/**
 * Represents authentication provider options
 */
export type AuthProvider = 'email' | 'google' | 'github' | 'facebook';

/**
 * Represents authentication provider configuration
 */
export type AuthProviderConfig = {
  provider: AuthProvider;
  enabled: boolean;
  clientId?: string;
  clientSecret?: string;
  scopes?: string[];
};

/**
 * Represents authentication error codes
 */
export enum AuthErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
  WEAK_PASSWORD = 'WEAK_PASSWORD',
  INVALID_EMAIL = 'INVALID_EMAIL',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  PROVIDER_ERROR = 'PROVIDER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Represents authentication error
 */
export type AuthError = {
  code: AuthErrorCode;
  message: string;
  details?: unknown;
};
