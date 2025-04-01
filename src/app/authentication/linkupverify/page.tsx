'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveToken, getUserDetails } from '@/lib/auth';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export default function LinkUpVerify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const sendTokenToApi = async (token: string) => {
      try {
        const response = await fetch(
          `https://mngapi.azurewebsites.net/api/Account/login-access-token?token=${token}`,
          {
            method: 'POST',
            headers: {
              Accept: 'text/plain'
            },
            body: JSON.stringify({ token })
          }
        );

        const data: TokenResponse = await response.json();
        const { accessToken } = data;

        console.log('Received accessToken:', accessToken);

        if (!response.ok) {
          throw new Error('Failed to send token');
        }

        saveToken(accessToken);

        const savedToken = localStorage.getItem('auth_token');

        if (savedToken === accessToken) {
          try {
            const userDetails = await getUserDetails();
            console.log('User details:', userDetails);
            router.replace('/verification/email');
          } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
          }
        } else {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        console.error('Error sending token:', error);
        router.replace('/');
      }
    };

    if (token) {
      sendTokenToApi(token);
    } else {
      router.replace('/');
    }
  }, [token, router]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-4 text-2xl font-bold'>Redirecting...</h1>
        <p>Please wait while we redirect you to the verification process.</p>
      </div>
    </div>
  );
}
