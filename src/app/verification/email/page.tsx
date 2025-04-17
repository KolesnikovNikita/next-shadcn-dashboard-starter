'use client';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import OtpInput from '@/features/otp/OtpInput';
import { verifyEmail, checkEmailVerification } from './actions';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';
import { useUserStore } from '@/store/user';
import { getNextVerificationStep } from '@/lib/verification';

type FormValues = {
  email: string;
};

export default function EmailVerification() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const userDetails = useUserStore((state) => state.userDetails);
  console.log('userDetails', userDetails);

  // Check if email is already verified
  useEffect(() => {
    if (userDetails?.isEmailConfirmed) {
      // If email is already verified, redirect to next step
      const nextStep = getNextVerificationStep(userDetails);
      router.replace(`/verification/${nextStep}`);
    }
  }, [userDetails, router]);

  const form = useForm<FormValues>({
    defaultValues: { email: '' }
  });

  const verifyCode = async (code: string) => {
    try {
      const token = await getToken();
      if (!token) {
        setError('Authentication required. Please log in');
        return;
      }
      const result = await checkEmailVerification(code, email, token);
      if (result.success) {
        router.push('/verification/phone');
      } else {
        setError(result.message || 'Verification failed. Please try again');
      }
    } catch (error) {
      setError('Verification failed. Please try again');
    }
  };

  const email = form.getValues('email');

  const onSubmit = async (data: { email: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('email', data.email);
      const token = getToken();

      if (!token) {
        setError('Authentication required. Please log in');
        setIsLoading(false);
        return;
      }

      const result = await verifyEmail(formData, token);

      if (result.success) {
        setIsCodeSent(true);
      } else {
        setError(result.message || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='mb-8'>
        <h2 className='mb-4'>Verify Email</h2>
        {error && <div className='mb-4 text-red-500'>{error}</div>}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-2'
          >
            <FormField
              control={form.control}
              name='email'
              rules={{
                required: 'Email required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Not valid email'
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...form.register('email')}
                      type='email'
                      placeholder='Verify email'
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='uppercase' disabled={isLoading} type='submit'>
              {isLoading ? 'Sending...' : 'Send verification code'}
            </Button>
          </form>
        </Form>
      </div>

      {isCodeSent && (
        <div className='mt-4 text-green-600'>
          Verification code has been sent to your email!
        </div>
      )}

      {isCodeSent && <OtpInput onVerify={verifyCode} />}
    </>
  );
}
