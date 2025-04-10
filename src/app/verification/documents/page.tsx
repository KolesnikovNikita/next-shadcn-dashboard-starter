'use client';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user';

export default function DocumentsVerification() {
  const router = useRouter();
  const userDetails = useUserStore((state) => state.userDetails);

  // Check if previous steps are verified
  useEffect(() => {
    if (!userDetails?.isEmailConfirmed) {
      // If email is not confirmed, redirect to email verification page
      router.replace('/verification/email');
    } else if (!userDetails?.isPhoneConfirmed) {
      // If phone is not confirmed, redirect to phone verification page
      router.replace('/verification/phone');
    }
  }, [userDetails, router]);

  return (
    <div className='mt-4 space-y-3 rounded-md border-2 px-4 pb-6 pt-4 text-center shadow-md'>
      <h2 className='mb-1 text-lg font-semibold'>Let's get you verified</h2>
      <p className=''>Follow the simple steps below</p>
      <div className='mb-4 flex flex-col items-start space-y-4'>
        <div className='flex'>
          <div className='mr-6'>
            <span className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height={18}
                width={18}
                viewBox='0 0 576 512'
              >
                <path d='M0 96l576 0c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96zm0 32L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-288L0 128zM64 405.3c0-29.5 23.9-53.3 53.3-53.3l117.3 0c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7L74.7 416c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z' />
              </svg>
            </span>
          </div>
          <div>
            <p className='text-gray-400'>Step 1</p>
            <span className='pb-2'>Provide identity document</span>
          </div>
        </div>
        <div className='flex'>
          <div className='mr-6'>
            <span className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                height={18}
                width={18}
                viewBox='0 0 640 512'
              >
                <path d='M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z' />
              </svg>
            </span>
          </div>
          <div>
            <p className='text-gray-400'>Step 2</p>
            <span className='pb-2'>Perform a liveness check</span>
          </div>
        </div>
      </div>
      <Button
        className='w-full uppercase'
        type='button'
        onClick={() => console.log('Call me')}
      >
        Continue
      </Button>
    </div>
  );
}
