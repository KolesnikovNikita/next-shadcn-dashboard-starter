'use client';
import Stepper from './Stepper';
import { usePathname } from 'next/navigation';
import '@/styles/global.css';
import { useVerificationStore } from '@/features/verification/store/verificationStore';
import { AppWrapper } from '@/components/layout/app-wrapper';

export default function VerificationLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStep = useVerificationStore((state) => state.currentStep);

  const steps = [
    '/verification/email',
    '/verification/phone',
    '/verification/documents',
    '/verification/interview'
  ];

  const stepIndex = steps.indexOf(pathname);

  return (
    <AppWrapper>
      <div className='mx-auto flex flex-col justify-center px-4 pt-4 md:max-w-sm lg:max-w-md'>
        <h1 className='mb-7 text-2xl font-bold'>Verification</h1>
        <h2 className='mb-7 text-lg font-semibold'>Step {stepIndex + 1}</h2>
        <Stepper step={stepIndex} />
        <div>{children}</div>
      </div>
    </AppWrapper>
  );
}
