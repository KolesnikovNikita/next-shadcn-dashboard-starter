'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useActionState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LogIn, CircleCheckBig } from 'lucide-react';
import { loginUp } from '@/app/actions/auth';
import { LoginFormSchema } from '@/schemas/auth';
import { RoleToggle } from '@/features/auth/components/RoleToggle';
import { SuccessCard } from '@/features/auth/components/SuccessCard';
import { UserRole } from '../types';

export default function UserAuthForm() {
  const [state, action, pending] = useActionState(loginUp, undefined);
  const [isRole, setRole] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [hasRedirected, setHasRedirected] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const redirectRef = useRef(false);

  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: '',
      tenant: UserRole.PLAYER
    }
  });

  const toggleRole = () => {
    const newRole = isRole ? UserRole.AGENT : UserRole.PLAYER;
    form.setValue('tenant', newRole);
    setRole(!isRole);
  };

  const handleRedirect = () => {
    if (redirectRef.current) return;
    redirectRef.current = true;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setHasRedirected((prev) => !prev);
    window.open('https://747ph.live', '_blank');
  };

  useEffect(() => {
    if (state?.result?.status === 0) {
      setCountdown(3);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            if (!redirectRef.current) {
              handleRedirect();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state?.result?.status]);

  return (
    <>
      <Form {...form}>
        <form action={action} className='relative w-full'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    required
                    className='mb-6 text-black'
                    type='text'
                    placeholder='Enter Username'
                    {...field}
                  />
                </FormControl>
                {state?.errors?.username?.map((err, index) => (
                  <p
                    key={index}
                    className='absolute left-3 top-10 font-medium text-red-500'
                  >
                    {err}
                  </p>
                ))}
                {state?.errors?.general?.[0] && (
                  <p className='absolute left-3 top-10 font-medium text-red-500'>
                    {JSON.parse(state.errors.general[0]).detail}
                  </p>
                )}
                <RoleToggle isRole={isRole} onToggle={toggleRole} form={form} />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className='mb-6 ml-auto mt-6 h-12 w-full cursor-pointer bg-green-500 text-base font-semibold uppercase text-white'
            type='submit'
            disabled={pending}
          >
            <span className='pr-2'>
              <LogIn />
            </span>
            Login
          </Button>
        </form>

        {state?.result?.status === 0 && (
          <SuccessCard countdown={countdown} onRedirect={handleRedirect} />
        )}
      </Form>
    </>
  );
}
