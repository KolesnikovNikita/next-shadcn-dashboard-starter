'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
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
import { useVerificationStore } from '@/features/verification/store/verificationStore';
import { useRouter } from 'next/navigation';

type FormValues = {
  email: string;
};

export default function EmailVerification() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const router = useRouter();
  const { email, setEmail, setCurrentStep } = useVerificationStore();

  const form = useForm<FormValues>({
    defaultValues: { email }
  });

  // Code send on email function
  const sendCodeToEmail = async (email: string) => {
    // logic send code
    console.log('Code sent to:', email);
    setIsCodeSent(true); // show field for enter the code
  };

  // Code checking function
  const verifyCode = async (code: string) => {
    // Logic for code checking
    console.log('Code to verify:', code);
    setCurrentStep('phone');
    // router.push('/verification/phone');
  };

  // Handler email
  const onSubmitEmail = async (data: FormValues) => {
    setEmail(data.email);
    await sendCodeToEmail(data.email);
  };

  return (
    <>
      <div className='mb-8'>
        <h2 className='mb-4'>Verify Email</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitEmail)}
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
                    <Input {...field} type='email' placeholder='Verify email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='uppercase' type='submit'>
              Send verification code
            </Button>
          </form>
        </Form>
      </div>

      {isCodeSent && <OtpInput onVerify={verifyCode} />}
    </>
  );
}
