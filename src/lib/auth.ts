import { UserDetails } from '@/features/auth/types';
import NextAuth from 'next-auth';
import Cookies from 'js-cookie';
import { authConfig } from '@/lib/auth.config';
export const { auth, handlers, signOut, signIn } = NextAuth(authConfig);

const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_KEY = 'auth_token';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const userDetails = process.env.NEXT_PUBLIC_API_USER_DETAILS;

export const saveRefreshToken = (token: string) => {
  Cookies.set(REFRESH_TOKEN_KEY, token, {
    expires: 30,
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  });
};

export const saveToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 30,
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  });
};

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  return token;
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getUserDetails = async (): Promise<UserDetails> => {
  const accessToken = await getToken();
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const url = `${baseUrl}${userDetails}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: 'text/plain',
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }

  return response.json();

  console.log('userDetails', userDetails);
};
