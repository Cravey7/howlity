import { EnhancedError, handleApiError, showErrorToast } from './error-handlers';

interface AsyncHandlerOptions<T> {
  onSuccess?: (data: T) => void | Promise<void>;
  onError?: (error: EnhancedError) => void | Promise<void>;
  showToast?: boolean;
  rethrowError?: boolean;
}

export async function asyncHandler<T>(
  operation: () => Promise<T>,
  options: AsyncHandlerOptions<T> = {}
): Promise<T | null> {
  const {
    onSuccess,
    onError,
    showToast = true,
    rethrowError = false
  } = options;

  try {
    const result = await operation();
    
    if (onSuccess) {
      await onSuccess(result);
    }
    
    return result;
  } catch (error: any) {
    const enhancedError = await handleApiError(error);

    if (onError) {
      await onError(enhancedError);
    }

    if (showToast) {
      showErrorToast(enhancedError);
    }

    if (rethrowError) {
      throw enhancedError;
    }

    return null;
  }
}

// Utility to retry failed operations
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
    }
  }

  throw lastError || new Error('Operation failed after multiple retries');
}

// Utility to handle concurrent operations with error handling
export async function handleConcurrentOperations<T>(
  operations: Array<() => Promise<T>>,
  options: AsyncHandlerOptions<T[]> = {}
): Promise<T[]> {
  try {
    const results = await Promise.all(
      operations.map(op => asyncHandler(op, { showToast: false, rethrowError: true }))
    );
    
    const successfulResults = results.filter((r): r is T => r !== null);
    
    if (options.onSuccess) {
      await options.onSuccess(successfulResults);
    }
    
    return successfulResults;
  } catch (error: any) {
    const enhancedError = await handleApiError(error);
    
    if (options.onError) {
      await options.onError(enhancedError);
    }
    
    if (options.showToast !== false) {
      showErrorToast(enhancedError);
    }
    
    throw enhancedError;
  }
} 