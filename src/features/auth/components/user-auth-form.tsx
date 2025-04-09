'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useActionState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { loginUp } from '@/app/actions/auth';
import { LoginFormSchema } from '@/schemas/auth';
import { SuccessCard } from '@/features/auth/components/SuccessCard';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { UserRole } from '../types';
import { useRoleToggle } from '../hooks/useRoleToggle';
import { saveToken } from '@/lib/auth';

export default function UserAuthForm() {
  const [state, action, pending] = useActionState(loginUp, undefined);
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

  const { isRole, toggleRole } = useRoleToggle({ form });

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
    if (state?.result?.status === 200) {
      // Save token when login is successful
      if (state.result.token) {
        saveToken(state.result.token);
      }
      setCountdown(7);
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
      <LoginForm
        form={form}
        isRole={isRole}
        onToggle={toggleRole}
        onSubmit={action}
        pending={pending}
        state={state}
      />

      {state?.result?.status === 200 && (
        <SuccessCard countdown={countdown} onRedirect={handleRedirect} />
      )}
    </>
  );
}
