'use client';

import { useActionState } from 'react';
import { loginUp } from '@/app/actions/auth'; // Убедитесь, что путь правильный

export default function TestActionComponent() {
  const [state, action, pending] = useActionState(loginUp, undefined);

  console.log('TestActionComponent state:', state);
  console.log('TestActionComponent action:', action);
  console.log('TestActionComponent pending:', pending);

  return (
    <form action={action}>
      <button type='submit'>Test Action</button>
    </form>
  );
}
