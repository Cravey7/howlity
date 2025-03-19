import { toast } from '@/components/ui/use-toast';
import { ApiError } from "@/types/api"

// Error Types
export type ErrorType = 
  | 'VALIDATION_ERROR'
  | 'AUTH_ERROR'
  | 'API_ERROR'
  | 'NETWORK_ERROR'
  | 'NOT_FOUND'
  | 'UNKNOWN_ERROR';

export interface EnhancedError extends Error {
  type: ErrorType;
  statusCode?: number;
  details?: Record<string, any>;
}

// Create a typed error with additional context
export function createError(
  message: string,
  type: ErrorType,
  details?: Record<string, any>
): EnhancedError {
  const error = new Error(message) as EnhancedError;
  error.type = type;
  if (details) {
    error.details = details;
  }
  return error;
}

// Handle API errors with proper typing and logging
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  
  if (typeof error === "object" && error !== null) {
    const apiError = error as ApiError
    if (apiError.message) {
      return apiError.message
    }
  }

  return "An unexpected error occurred. Please try again."
}

// Display error toast with proper styling and actions
export function showErrorToast(error: EnhancedError) {
  const title = error.type.split('_').map(word => 
    word.charAt(0) + word.slice(1).toLowerCase()
  ).join(' ');

  toast({
    title,
    description: error.message,
    variant: "destructive",
    duration: 5000,
  });
}

// Utility to safely handle async operations with error handling
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  errorHandler?: (error: EnhancedError) => void
): Promise<T | null> {
  try {
    return await operation();
  } catch (error: any) {
    const enhancedError = await handleApiError(error);
    
    if (errorHandler) {
      errorHandler(enhancedError);
    } else {
      showErrorToast(enhancedError);
    }
    
    return null;
  }
} 