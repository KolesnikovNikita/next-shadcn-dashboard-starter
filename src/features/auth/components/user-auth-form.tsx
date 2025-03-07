'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import AgentImage from '@/assets/img/agent-icon.svg';
import PlayerImage from '@/assets/img/player-icon.svg';
import EnterIcon from '@/assets/img/enter-icon.svg';
import Image from 'next/image';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema)
  });

  const { register, handleSubmit, setValue } = useForm();

  const [isRole, setRole] = useState(true);

  const toggleRole = () => {
    setRole((prev) => !prev);
    setValue('role', isRole ? 'player' : 'agent');
  };

  const onSubmit = async (data: UserFormValue) => {
    startTransition(() => {
      signIn('credentials', {
        email: data.email,
        callbackUrl: callbackUrl ?? '/dashboard'
      });
      toast.success('Signed In Successfully!');
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className='mb-6'
                    type='text'
                    placeholder='Player Username'
                    {...field}
                  />
                </FormControl>

                <div className='mb-6'>
                  <label className='relative flex h-12 w-full cursor-pointer items-center rounded-full border bg-white shadow-sm'>
                    <span
                      className={`flex-1 text-center font-bold transition ${
                        isRole ? 'text-green-900 underline' : 'text-gray-400'
                      }`}
                    >
                      AGENT
                    </span>

                    <Input
                      type='checkbox'
                      checked={!isRole}
                      onChange={toggleRole}
                      className='sr-only'
                    />

                    <input
                      type='hidden'
                      {...register('role')}
                      value={isRole ? 'agent' : 'player'}
                    />

                    <div
                      className={`relative flex h-12 w-16 items-center justify-center rounded-full bg-green-900 transition-all duration-300 ${
                        isRole ? 'bg-yellow-300' : 'bg-green-300'
                      }`}
                    >
                      {isRole ? (
                        <Image
                          className='absolute left-2'
                          width={30}
                          height={30}
                          alt='agent'
                          src={AgentImage}
                        />
                      ) : (
                        <Image
                          className='absolute left-10'
                          width={30}
                          height={30}
                          alt='agent'
                          src={PlayerImage}
                        />
                      )}
                    </div>
                    <span
                      className={`flex-1 text-center font-bold transition ${
                        !isRole ? 'text-yellow-500 underline' : 'text-gray-400'
                      }`}
                    >
                      PLAYER
                    </span>
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className='mb-6 ml-auto mt-6 h-12 w-full cursor-pointer bg-green-500 text-base font-semibold uppercase text-white'
            type='submit'
          >
            <Image
              className='pr-2'
              src={EnterIcon}
              width={24}
              height={24}
              alt='login'
            />{' '}
            Register
          </Button>
        </form>
      </Form>
      <div className='relative'>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Already have an account?{' '}
            <Link
              href='/#'
              className='underline underline-offset-4 hover:text-primary'
            >
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
