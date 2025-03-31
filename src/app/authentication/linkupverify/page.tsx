'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveToken } from '@/lib/auth';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export default function LinkUpVerify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  console.log('router', router);
  console.log('searchParams', searchParams);

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
        const { accessToken, refreshToken } = data;

        // console.log('accessToken', accessToken);
        // console.log('refreshToken', refreshToken);
        if (!response.ok) {
          throw new Error('Failed to send token');
        }

        saveToken(token);
        router.replace('/verification/email');
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
