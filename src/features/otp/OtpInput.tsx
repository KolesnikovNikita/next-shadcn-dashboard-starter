import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';

interface OtpInputProps {
  onVerify: (code: string) => Promise<void>;
}

export default function OtpInput({ onVerify }: OtpInputProps) {
  const [otpCode, setOtpCode] = useState('');
  const { handleSubmit } = useForm();

  const handleChange = (value: string) => {
    if (value.length <= 6) {
      setOtpCode(value);
    }
  };

  // Send Code
  const sendCode = async () => {
    onVerify(otpCode);
  };

  const verifyCode = async () => {
    await onVerify(otpCode);
  };

  return (
    <div className='mx-auto max-w-md'>
      <h3 className='mb-4'>Send OTP</h3>

      <form onSubmit={handleSubmit(verifyCode)} className='space-y-4'>
        <InputOTP maxLength={6} value={otpCode} onChange={handleChange}>
          <InputOTPGroup className='flex gap-x-2'>
            {[0, 1, 2].map((index) => (
              <InputOTPSlot className='h-12 w-12' key={index} index={index} />
            ))}
          </InputOTPGroup>

          <InputOTPSeparator />

          <InputOTPGroup className='flex gap-x-2'>
            {[3, 4, 5].map((index) => (
              <InputOTPSlot className='h-12 w-12' key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <div className='flex items-center justify-between'>
          <Button onClick={sendCode} className='mt-4 uppercase'>
            Send OTP
          </Button>
          <Button
            type='button'
            variant='outline'
            onClick={() => setOtpCode('')}
            className='px-6 uppercase'
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}
