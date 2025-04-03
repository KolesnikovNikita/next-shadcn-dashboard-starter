import { UserDetails } from '@/features/auth/types';

export type VerificationStep =
  | 'email'
  | 'phone'
  | 'interview'
  | 'documents'
  | 'completed';

export const getNextVerificationStep = (
  userDetails: UserDetails | null
): VerificationStep => {
  if (!userDetails) {
    return 'email';
  }

  // Checking steps in priority order
  if (!userDetails.isEmailConfirmed) {
    return 'email';
  }

  if (!userDetails.isPhoneConfirmed) {
    return 'phone';
  }

  if (!userDetails.isInterviewConfirmed) {
    return 'interview';
  }

  if (!userDetails.isDocumentConfirmed) {
    return 'documents';
  }

  return 'completed';
};

export const getVerificationProgress = (userDetails: UserDetails | null) => {
  if (!userDetails) {
    return {
      total: 4,
      completed: 0,
      currentStep: 'email'
    };
  }

  const steps = [
    { key: 'isEmailConfirmed', value: userDetails.isEmailConfirmed },
    { key: 'isPhoneConfirmed', value: userDetails.isPhoneConfirmed },
    { key: 'isInterviewConfirmed', value: userDetails.isInterviewConfirmed },
    { key: 'isDocumentConfirmed', value: userDetails.isDocumentConfirmed }
  ];

  const completed = steps.filter((step) => step.value).length;
  const currentStep = getNextVerificationStep(userDetails);

  return {
    total: 4,
    completed,
    currentStep
  };
};
