import { Metadata } from 'next';
import UserAuthForm from './components/user-auth-form';
import Logo from '@/assets/img/logo-2.png';
import Image from 'next/image';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage() {
  return (
    <div
      id='login-page'
      className='relative h-screen flex-col items-center justify-center bg-white lg:max-w-none'
    >
      <div className='absolute left-1/2 top-10 -translate-x-1/2 lg:top-5'>
        <Image
          src={Logo}
          className='rounded'
          width={185}
          height={130}
          alt='logo'
        />
      </div>
      <div className='flex h-full items-center px-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center rounded-lg bg-white p-4 sm:w-[350px] lg:h-[450px] lg:w-[400px] lg:py-10 lg:shadow-lg'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='mb-6 font-roboto text-2xl font-semibold tracking-tight'>
              Register and connect to Mng
            </h1>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
