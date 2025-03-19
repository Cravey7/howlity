import { createError, EnhancedError, handleApiError } from './error-handlers';

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

export async function fetchWithErrorHandling<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  try {
    const { requiresAuth = true, ...fetchOptions } = options;

    // Add auth headers if required
    if (requiresAuth) {
      const token = localStorage.getItem('token');
      if (!token) {
        throw createError(
          'Authentication required. Please log in.',
          'AUTH_ERROR'
        );
      }
      
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: 'An error occurred while processing your request.' };
      }

      throw {
        response: {
          status: response.status,
          data: errorData,
        },
      };
    }

    return await response.json();
  } catch (error: any) {
    const enhancedError = await handleApiError(error);
    throw enhancedError;
  }
}

// Utility function to handle form submissions with file uploads
export async function handleFormSubmission<T>(
  url: string,
  formData: FormData,
  options: Omit<FetchOptions, 'body'> = {}
): Promise<T> {
  return fetchWithErrorHandling<T>(url, {
    method: 'POST',
    body: formData,
    ...options,
  });
}

// Utility function to handle JSON submissions
export async function handleJsonSubmission<T>(
  url: string,
  data: Record<string, any>,
  options: Omit<FetchOptions, 'body'> = {}
): Promise<T> {
  return fetchWithErrorHandling<T>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(data),
    ...options,
  });
} 