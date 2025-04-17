import { UserDetails } from '@/features/auth/types';
import NextAuth from 'next-auth';
import Cookies from 'js-cookie';
import { authConfig } from '@/lib/auth.config';

export const { auth, handlers, signOut, signIn } = NextAuth(authConfig);

const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_KEY = 'auth_token';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const userDetails = process.env.NEXT_PUBLIC_API_USER_DETAILS;
const refreshEndpoint = process.env.NEXT_PUBLIC_API_REFRESH_TOKEN;

// Сохраняем refresh token на 30 дней
export const saveRefreshToken = (token: string) => {
  Cookies.set(REFRESH_TOKEN_KEY, token, {
    expires: 30,
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  });
};

// Сохраняем access token на 1 час
export const saveToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 1 / 24, // 1 час
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  try {
    const response = await fetch(`${baseUrl}${refreshEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain'
      },
      body: JSON.stringify({
        refreshToken
      })
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    const { token: newToken, refreshToken: newRefreshToken } = data;

    // Сохраняем новые токены
    if (newToken) {
      saveToken(newToken);
    }
    if (newRefreshToken) {
      saveRefreshToken(newRefreshToken);
    }

    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export const getUserDetails = async (token: string): Promise<UserDetails> => {
  const url = `${baseUrl}${userDetails}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'text/plain',
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }

  return response.json();
};
