/**
 * API utility functions
 */

/**
 * Returns the base URL for API requests, handling different environments
 */
export const getBaseUrl = (): string => {
  // Use environment variable in production
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Default to localhost:5000 in development
  return 'http://localhost:5000';
};

/**
 * Makes an API request with proper error handling
 * @param endpoint - The API endpoint to request
 * @param options - Request options (method, headers, body, etc.)
 * @returns Response data from the API
 */
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    // Set default headers if not provided
    if (!options.headers) {
      options.headers = {
        'Content-Type': 'application/json',
      };
    }
    
    const response = await fetch(url, options);
    
    // Try to parse response as JSON
    let data;
    const text = await response.text();
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { message: text };
    }
    
    // Handle API errors
    if (!response.ok) {
      throw new Error(data.error || data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}; 