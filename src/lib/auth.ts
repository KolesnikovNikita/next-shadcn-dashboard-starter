import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { UserDetails } from '@/features/auth/types';

export const { auth, handlers, signOut, signIn } = NextAuth(authConfig);

const TOKEN_KEY = 'auth_token';

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  }
  return null;
};

console.log('getToken', getToken());

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getUserDetails = async (): Promise<UserDetails> => {
  const accessToken = getToken();
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const response = await fetch(
    'https://mngapi.azurewebsites.net/api/Account/user-details',
    {
      headers: {
        accept: 'text/plain',
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }

  return response.json();
};
