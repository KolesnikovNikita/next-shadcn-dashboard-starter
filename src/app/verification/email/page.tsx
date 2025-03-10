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

type FormValues = {
  email: string;
};

export default function EmailVerification() {
  const [isCodeSent, setIsCodeSent] = useState(true);
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill('')
  );

  const form = useForm<FormValues>({
    defaultValues: { email: '' }
  });

  // Cose send on email function
  const sendCodeToEmail = async (email: string) => {
    // logic send code
    console.log('Code sent to:', email);
    setIsCodeSent(true); // show field for enter the code
  };

  // Code checking function
  const verifyCode = async (code: string) => {
    // Logic for code checking
    console.log('Code to verify:', code);
    alert('Code verified successfully!');
  };

  // Handler email
  const onSubmitEmail = async (data: FormValues) => {
    await sendCodeToEmail(data.email);
  };

  // Code handler
  const onSubmitCode = async () => {
    const code = verificationCode.join(''); // Объединяем символы в строку
    await verifyCode(code);
  };

  //  Handler value changing
  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Automatically move to the next field
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Clear field code
  const handleClearCode = () => {
    setVerificationCode(Array(6).fill(''));
    const firstInput = document.getElementById('code-input-0');
    if (firstInput) firstInput.focus();
  };

  const onSubmit = (data: FormValues) => {
    console.log('Submitted email: ', data.email);
  };
  return (
    <div>
      <h2 className='mb-4'>Verify Email</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-4'
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

      {/* Code enter field*/}

      {isCodeSent && (
        <div className='mt-6'>
          <h3 className='mb-4'>OTP Code</h3>
          <div className='mb-4 flex justify-between space-x-1'>
            {Array.from({ length: 6 }).map((_, index) => (
              <Input
                key={index}
                id={`code-input-${index}`}
                type='text'
                maxLength={1}
                value={verificationCode[index]}
                onChange={(e) => handleCodeChange(e.target.value, index)}
                className='w-12 rounded-none text-center'
              />
            ))}
          </div>
          <div className='flex items-center justify-between'>
            <Button
              onClick={onSubmitCode}
              className='relative px-8 text-right uppercase'
            >
              Verify code
            </Button>
            <Button
              onClick={handleClearCode}
              className='relative px-8 uppercase'
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
