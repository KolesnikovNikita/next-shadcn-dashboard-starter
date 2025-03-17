import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import UserDefault from '@/assets/img/random-user-photo.jpeg';
import UserPassport from '@/assets/img/user-passport-photo.jpg';

import { ShieldCheck } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className='bg-custom-gradient'>
      <div className='mx-auto min-h-screen max-w-md space-y-4 p-4 xl:max-w-screen-lg'>
        <h2 className='text-xl font-semibold text-white'>Agent Details</h2>

        {/* User Card */}
        <Card>
          <CardContent className='space-y-4 p-4 lg:p-7'>
            {/* Profile Image */}
            <div className='mx-auto flex h-[100px] w-[100px] justify-center overflow-y-auto'>
              <Image
                src={UserDefault}
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
                    <Badge className='bg-custom-green text-white'>
                      <ShieldCheck className='h-4 w-4 pr-1' />
                      Verified
                    </Badge>
                  </div>
                  <span className='rounded-md border p-2 font-medium'>
                    pahanimg10@gmail.com
                  </span>
                </div>
                <div className='mb-2 flex flex-col justify-between lg:mb-0 lg:w-full'>
                  <div className='mb-3 flex'>
                    <span className='pr-2 text-gray-600'>Phone</span>{' '}
                    <Badge className='bg-custom-green text-white'>
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
                <div className='mb-2 flex flex-col justify-between lg:mb-0 lg:w-full'>
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
                  <span className='border p-2 font-medium'>
                    Wed, 12 Mar 2025
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='flex flex-col p-4 lg:p-7'>
            <div className='mb-2'>
              <span className='mr-2 text-gray-600'>Documents</span>
              <Badge className='bg-custom-green text-white'>
                <ShieldCheck className='h-4 w-4 pr-1' />
                Verified
              </Badge>
            </div>

            {/* Passport Gallery  */}

            <div className='grid grid-cols-1 gap-3 border-2 p-4 sm:grid-cols-3'>
              <Dialog>
                <DialogTrigger>
                  <AspectRatio
                    ratio={4 / 3}
                    className='cursor-pointer overflow-y-auto'
                  >
                    <Image
                      priority={false}
                      alt='user-documents'
                      src={UserPassport}
                      width={100}
                      height={150}
                      className='h-full w-full rounded-sm object-cover'
                    />
                  </AspectRatio>
                </DialogTrigger>
                <DialogContent>
                  <Image
                    src={UserPassport}
                    priority={true}
                    alt='Passport'
                    width={600}
                    height={400}
                    className='mx-auto rounded-md object-cover'
                  />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <AspectRatio
                    ratio={4 / 3}
                    className='cursor-pointer overflow-y-auto'
                  >
                    <Image
                      priority={false}
                      alt='user-documents'
                      src={UserPassport}
                      width={100}
                      height={150}
                      className='h-full w-full rounded-sm object-cover'
                    />
                  </AspectRatio>
                </DialogTrigger>
                <DialogContent>
                  <Image
                    src={UserPassport}
                    priority={true}
                    alt='Passport'
                    width={600}
                    height={400}
                    className='mx-auto rounded-md object-cover'
                  />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <AspectRatio
                    ratio={4 / 3}
                    className='cursor-pointer overflow-y-auto'
                  >
                    <Image
                      priority={false}
                      alt='user-documents'
                      src={UserPassport}
                      width={100}
                      height={150}
                      className='h-full w-full rounded-sm object-cover'
                    />
                  </AspectRatio>
                </DialogTrigger>
                <DialogContent>
                  <Image
                    src={UserPassport}
                    priority={true}
                    alt='Passport'
                    width={600}
                    height={400}
                    className='mx-auto rounded-md object-cover'
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
