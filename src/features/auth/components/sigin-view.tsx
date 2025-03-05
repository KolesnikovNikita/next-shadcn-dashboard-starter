import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { StarIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from './user-auth-form';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <div className='relative h-screen flex-col items-center justify-center lg:max-w-none lg:bg-slate-200'>
      <div className='flex h-full items-center px-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center rounded-lg p-4 sm:w-[350px] lg:bg-white'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='mb-6 text-2xl font-semibold tracking-tight'>
              Register and connect to Mng
            </h1>
            {/* <p className='text-sm text-muted-foreground'>
              Enter your email below to create your account
            </p> */}
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
