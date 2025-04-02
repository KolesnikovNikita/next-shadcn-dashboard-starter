'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveToken, getUserDetails } from '@/lib/auth';
import { useUserStore } from '@/store/user';
import { UserDetails } from '@/features/auth/types';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export default function LinkUpVerify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const setUserDetails = useUserStore((state) => state.setUserDetails);

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
            const userDetails: UserDetails = await getUserDetails();
            console.log('Fetched user details:', userDetails);

            setUserDetails(userDetails);
            console.log('Saved user details to store');

            // Проверяем, что данные сохранились
            const storedDetails = localStorage.getItem('user_details');
            console.log(
              'Verified stored details:',
              storedDetails ? JSON.parse(storedDetails) : null
            );

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
  }, [token, router, setUserDetails]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-4 text-2xl font-bold'>Redirecting...</h1>
        <p>Please wait while we redirect you to the verification process.</p>
      </div>
    </div>
  );
}
