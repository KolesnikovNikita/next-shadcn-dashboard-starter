import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';

export default function OtpVerification() {
  const [isCodeSent, setIsCodeSent] = useState(true);
  const [otpCode, setOtpCode] = useState('');

  const { handleSubmit } = useForm();

  const handleChange = (value: string) => {
    if (value.length <= 6) {
      setOtpCode(value);
    }
  };

  // Send Code
  const sendCode = async () => {
    console.log('OTP sent');
    setIsCodeSent(true);
  };

  const verifyCode = async () => {
    console.log('Code to verify:', otpCode);
    alert('Code verified successfully!');
  };

  return (
    <div className='mx-auto max-w-md'>
      <h3 className='mb-4'>Enter OTP Code</h3>

      {isCodeSent && (
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
            <Button type='submit' className='px-6 uppercase'>
              Verify Code
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
      )}
      {!isCodeSent && (
        <Button onClick={sendCode} className='mt-4 uppercase'>
          Send OTP
        </Button>
      )}
    </div>
  );
}
