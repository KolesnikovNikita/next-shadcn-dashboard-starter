'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DevVerify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      // Сохраняем токен если нужно
      // localStorage.setItem('verificationToken', token);

      // Редиректим на нашу страницу верификации
      router.push('/verification/email');
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
