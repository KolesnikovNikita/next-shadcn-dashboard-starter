import NextAuth from 'next-auth';
import authConfig from './auth.config';

export const { auth, handlers, signOut, signIn } = NextAuth(authConfig);

const TOKEN_KEY = 'auth_token';

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};
