import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UserDefault from '@/assets/img/logo-2.png';
import { ShieldCheck } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className='mx-auto min-h-screen max-w-md space-y-4 p-4 xl:max-w-screen-lg'>
      <h2 className='text-xl font-semibold'>Agent Details</h2>

      {/* User Card */}
      <Card>
        <CardContent className='space-y-4 p-4 lg:p-7'>
          {/* Profile Image */}
          <div className='flex justify-center'>
            <Image
              src={UserDefault} //  path to user image
              alt='User Profile Image'
              width={100}
              height={100}
              className='rounded-full object-cover'
            />
          </div>

          {/* User Details */}
          <div className='space-y-3'>
            <div className='flex-row lg:gap-2 xl:flex'>
              <div className='mb-3 flex flex-col justify-between lg:mb-0 lg:w-full'>
                <div className='mb-3 flex'>
                  <span className='pr-2 text-gray-600'>Email</span>{' '}
                  <Badge variant='default'>
                    <ShieldCheck className='h-4 w-4 pr-1' />
                    Verified
                  </Badge>
                </div>
                <span className='rounded-md border p-2 font-medium'>
                  pahanimg10@gmail.com
                </span>
              </div>
              <div className='flex flex-col justify-between lg:w-full'>
                <div className='mb-3 flex'>
                  <span className='pr-2 text-gray-600'>Phone</span>{' '}
                  <Badge variant='default'>
                    <ShieldCheck className='h-4 w-4 pr-1' />
                    Verified
                  </Badge>
                </div>
                <span className='rounded-md border p-2 font-medium'>
                  +601126851455
                </span>
              </div>
              <div className='mb-3 flex flex-col justify-between lg:mb-0 lg:w-full'>
                <span className='mb-2 text-gray-600'>Username</span>
                <span className='border p-2 font-medium'>pahanagent1</span>
              </div>
            </div>
            <div className='flex-row lg:gap-2 xl:flex'>
              <div className='flex flex-col justify-between lg:w-full'>
                <span className='mb-2 text-gray-600'>Country</span>
                <span className='border p-2 font-medium'>Sri Lanka</span>
              </div>
              <div className='mb-3 flex flex-col justify-between lg:mb-0 lg:w-full'>
                <span className='mb-2 text-gray-600'>First Name</span>
                <span className='border p-2 font-medium'>
                  HADALAGE PAHAN SRI MADUSANKA
                </span>
              </div>
              <div className='flex flex-col justify-between lg:w-full'>
                <span className='mb-2 text-gray-600'>Created On</span>
                <span className='border p-2 font-medium'>Wed, 12 Mar 2025</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='flex p-4 lg:p-7'>
          <span className='mr-2 text-gray-600'>Documents</span>
          <Badge variant='default'>
            <ShieldCheck className='h-4 w-4 pr-1' />
            Verified
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}
