import { redirect } from 'next/navigation';

export default function VerificationPage() {
  redirect('verification/email');
  return null;
}
