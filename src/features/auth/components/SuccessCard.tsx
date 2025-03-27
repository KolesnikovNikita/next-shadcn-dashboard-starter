import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheckBig } from 'lucide-react';

interface SuccessCardProps {
  countdown: number;
  onRedirect: () => void;
}

export function SuccessCard({ countdown, onRedirect }: SuccessCardProps) {
  return (
    <Card className='bg-green-300 py-3 transition-all duration-700 animate-in fade-in slide-in-from-bottom-4'>
      <CardContent className='flex flex-col justify-between space-y-3 pb-2'>
        <p className='flex items-start text-green-800'>
          <CircleCheckBig className='mr-2 min-h-[20px] min-w-[20px]' />
          Open the messages on your 747 Live and click on the link you received
        </p>
        <p className='block text-center font-bold text-green-700'>
          Redirecting in: {countdown} seconds
        </p>
        <Button
          onClick={onRedirect}
          className='w-full bg-green-700 text-base font-semibold uppercase text-white'
        >
          Continue to 747 LIVE
        </Button>
      </CardContent>
    </Card>
  );
}
