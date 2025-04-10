'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user';

export default function InterviewVerification() {
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
    } else if (!userDetails?.isDocumentConfirmed) {
      // If documents are not confirmed, redirect to documents verification page
      router.replace('/verification/documents');
    }
  }, [userDetails, router]);

  return <h2>Interview Verification Step</h2>;
}
