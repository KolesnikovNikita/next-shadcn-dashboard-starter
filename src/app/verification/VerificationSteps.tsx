'use client';
import { useState } from 'react';
import Link from 'next/link';
import Stepper from './Stepper';

export default function VerificationSteps() {
  const steps = [
    { id: 1, title: 'Email', path: '/verification/email' },
    { id: 2, title: 'Phone', path: '/verification/phone' },
    { id: 3, title: 'Documents', path: '/verification/documents' },
    { id: 4, title: 'Interview', path: '/verification/interview' }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className='flex flex-col items-center justify-center px-4 pt-4'>
      <h1 className='mb-4 text-2xl font-bold'>Verification</h1>
      <Stepper step={1} totalSteps={4} />
    </div>
  );
}
