import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { UserRole } from '../types';

interface UseRoleToggleProps {
  form: UseFormReturn<{
    username: string;
    tenant: UserRole;
  }>;
}

export function useRoleToggle({ form }: UseRoleToggleProps) {
  const [isRole, setRole] = useState(true);

  const toggleRole = () => {
    const newRole = isRole ? UserRole.AGENT : UserRole.PLAYER;
    form.setValue('tenant', newRole);
    setRole(!isRole);
  };

  return {
    isRole,
    toggleRole
  };
}
