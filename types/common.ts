/**
 * Common type definitions used across the application
 */

/**
 * Represents a generic API response
 */
export type ApiResponse<T = unknown> = {
  data: T;
  error?: string;
  message?: string;
  status: number;
};

/**
 * Represents a paginated API response
 */
export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}>;

/**
 * Represents a generic error response
 */
export type ErrorResponse = {
  error: string;
  message: string;
  status: number;
  code?: string;
};

/**
 * Represents a generic success response
 */
export type SuccessResponse<T = unknown> = {
  data: T;
  message: string;
  status: number;
};

/**
 * Represents a generic loading state
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Represents a generic form state
 */
export type FormState = {
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  errors: Record<string, string>;
};

/**
 * Represents a generic pagination parameters
 */
export type PaginationParams = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

/**
 * Represents a generic filter parameters
 */
export type FilterParams = {
  search?: string;
  filters?: Record<string, unknown>;
  dateRange?: {
    start: Date;
    end: Date;
  };
};

/**
 * Represents a generic query parameters
 */
export type QueryParams = PaginationParams & FilterParams;

/**
 * Represents a generic mutation parameters
 */
export type MutationParams<T = unknown> = {
  data: T;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

/**
 * Represents a generic API client configuration
 */
export type ApiClientConfig = {
  baseURL: string;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
};

/**
 * Represents a generic API client error
 */
export type ApiClientError = {
  message: string;
  code?: string;
  status?: number;
  data?: unknown;
};
