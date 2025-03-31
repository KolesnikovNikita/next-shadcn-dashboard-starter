'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { saveToken } from '@/lib/auth';

export default function VerificationHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Сохраняем токен
      saveToken(token);
      // Перенаправляем на страницу верификации email
      router.push('/verification/email');
    } else {
      // Если токена нет, перенаправляем на главную
      router.push('/');
    }
  }, [searchParams, router]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900'></div>
    </div>
  );
}
