'use client';
import Stepper from './Stepper';
import { usePathname } from 'next/navigation';
import '@/styles/global.css';

export default function VerificationLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const steps = [
    '/verification/email',
    '/verification/phone',
    '/verification/documents',
    '/verification/interview'
  ];

  const currentStep = steps.indexOf(pathname);

  return (
    <div className='mx-auto flex flex-col justify-center px-4 pt-4 md:max-w-sm'>
      <h1 className='mb-7 text-2xl font-bold'>Verification</h1>
      <h2 className='mb-7 text-lg font-semibold'>Step {currentStep + 1} </h2>
      <p></p>
      <Stepper step={currentStep} />
      <div>{children}</div>
    </div>
  );
}
