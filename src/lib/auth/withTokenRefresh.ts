import { refreshAccessToken, saveToken } from '@/lib/auth';

type FetchOptions = {
  url: string;
  method?: 'GET' | 'POST';
  headers?: Record<string, string>;
};

export async function withTokenRefresh(
  options: FetchOptions,
  token: string
): Promise<Response> {
  const { url, method = 'POST', headers = {} } = options;

  const makeRequest = async (currentToken: string) => {
    return fetch(url, {
      method,
      headers: {
        ...headers,
        Authorization: `Bearer ${currentToken}`
      }
    });
  };

  // First request
  const response = await makeRequest(token);

  // If we get 401, try to refresh the token
  if (response.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      if (newToken) {
        // Save the new token
        saveToken(newToken);
        // Retry request with new token
        const retryResponse = await makeRequest(newToken);

        // If retry request also fails, throw error
        if (!retryResponse.ok) {
          throw new Error('Failed to retry request with new token');
        }

        return retryResponse;
      }
    } catch (error) {
      throw new Error('Session expired. Please log in again.');
    }
  }
  return response;
}
