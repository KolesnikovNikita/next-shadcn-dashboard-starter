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
    <div id='login-page' className='bg-white lg:max-w-none'>
      <div className='flex h-full flex-col items-center justify-center space-y-5 shadow-md'>
        <div>
          <Image
            className='ml-auto mr-auto rounded'
            src={Logo}
            width={185}
            height={130}
            alt='logo'
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
        <div className='flex items-center'>
          <div className='mx-auto flex w-[350px] flex-col justify-center rounded-lg bg-white px-6 py-5 md:w-[400px] lg:shadow-lg'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='mb-6 font-roboto text-2xl font-semibold tracking-tight'>
                Register and connect to Mng
              </h1>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </div>
  );
}
