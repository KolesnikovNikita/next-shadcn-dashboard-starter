'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveToken, getUserDetails, getToken } from '@/lib/auth';
import { useUserStore } from '@/store/user';
import { UserDetails } from '@/features/auth/types';
import { getNextVerificationStep } from '@/lib/verification';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const loginLink = process.env.NEXT_PUBLIC_API_LOGIN;

export default function LinkUpVerify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const setUserDetails = useUserStore((state) => state.setUserDetails);

  useEffect(() => {
    const sendTokenToApi = async (token: string) => {
      try {
        const response = await fetch(`${baseUrl}${loginLink}?token=${token}`, {
          method: 'POST',
          headers: {
            Accept: 'text/plain'
          },
          body: JSON.stringify({ token })
        });

        const data: TokenResponse = await response.json();
        const { accessToken } = data;

        console.log('Received accessToken:', accessToken);

        if (!response.ok) {
          throw new Error('Failed to send token');
        }

        saveToken(accessToken);

        const savedToken = getToken();
        console.log('savedToken', savedToken);
        console.log('tokens matched', savedToken === accessToken);

        if (savedToken === accessToken) {
          try {
            const userDetails: UserDetails = await getUserDetails();

            setUserDetails(userDetails);
            console.log('userDetails', userDetails);
            // Determine the next verification step
            const nextStep = getNextVerificationStep(userDetails);

            // Redirect to the corresponding step
            router.replace(`/verification/${nextStep}`);
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
