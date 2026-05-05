export const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Utility to get the full API URL for a given endpoint
 * @param {string} endpoint - The API endpoint (e.g., '/products' or 'users/login')
 * @returns {string} - The full URL
 */
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

/**
 * Helper for fetching with JSON content-type and Auth headers
 */
export const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(getApiUrl(endpoint), {
    ...options,
    headers,
  });

  return response;
};
