'use client';
import React from 'react';
import CheckedIcon from '@/assets/img/checked.svg';
import EmailIcon from '@/assets/img/email-icon.svg';
import PhoneIcon from '@/assets/img/phone-icon.svg';
import DocumentIcon from '@/assets/img/documents-icon.svg';
import CameraIcon from '@/assets/img/camera-icon.svg';

interface StepperProps {
  step: number;
}

export default function Stepper({ step }: StepperProps) {
  const steps = [
    { id: 0, defaultIcon: EmailIcon, completedIcon: CheckedIcon },
    { id: 1, defaultIcon: PhoneIcon, completedIcon: CheckedIcon },
    { id: 2, defaultIcon: DocumentIcon, completedIcon: CheckedIcon },
    { id: 3, defaultIcon: CameraIcon, completedIcon: CheckedIcon }
  ];

  return (
    <div className='mb-7'>
      <ol className='flex w-full items-center justify-center'>
        {steps.map((item, index) => {
          const isCompleted = index < step;
          const Icon = isCompleted ? item.completedIcon : item.defaultIcon;
          const borderClass =
            index !== steps.length - 1
              ? `after:inline-block after:h-1 after:w-16 after:border-4 after:border-b after:content-[''] ${
                  isCompleted
                    ? 'after:border-custom-gold'
                    : 'after:border-gray-100'
                }`
              : '';
          return (
            <li
              key={item.id}
              className={`flex items-center text-blue-600 dark:text-blue-500 ${borderClass}`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  isCompleted ? 'bg-custom-gold' : 'bg-gray-100'
                } dark:bg-gray-700 lg:h-12 lg:w-12`}
              >
                <Icon className='h-4 w-4 text-gray-500 dark:text-gray-100 lg:h-5 lg:w-5' />
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
