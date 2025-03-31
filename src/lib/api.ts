import { getToken } from './auth';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getToken();

  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
}
