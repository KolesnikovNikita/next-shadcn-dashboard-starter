import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface OtpInputProps {
  onVerify: (code: string) => Promise<void>; // Code checking function
}

export default function OtpInput({ onVerify }: OtpInputProps) {
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill('')
  );

  // Changing symbol in code
  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    //  Automatic focus on next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Send Code
  const handleSubmit = async () => {
    const code = verificationCode.join('');
    await onVerify(code);
  };

  // Clear code
  const handleClearCode = () => {
    setVerificationCode(Array(6).fill(''));
    const firstInput = document.getElementById('otp-input-0');
    if (firstInput) firstInput.focus();
  };

  return (
    <div className='mt-6'>
      <h3 className='mb-4'>Enter OTP Code</h3>
      <div className='mb-4 flex justify-between space-x-1'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Input
            key={index}
            id={`otp-input-${index}`}
            type='text'
            maxLength={1}
            value={verificationCode[index]}
            onChange={(e) => handleCodeChange(e.target.value, index)}
            className='w-12 rounded-none text-center'
          />
        ))}
      </div>
      <div className='flex items-center justify-between'>
        <Button onClick={handleSubmit} className='relative px-8 uppercase'>
          Verify Code
        </Button>
        <Button onClick={handleClearCode} className='relative px-8 uppercase'>
          Clear
        </Button>
      </div>
    </div>
  );
}
