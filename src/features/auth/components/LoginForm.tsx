import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { RoleToggle } from './RoleToggle';
import { FormErrors } from './FormErrors';
import { UserRole } from '../types';

interface LoginFormProps {
  form: UseFormReturn<{
    username: string;
    tenant: UserRole;
  }>;
  isRole: boolean;
  onToggle: () => void;
  onSubmit: (formData: FormData) => void;
  pending: boolean;
  state:
    | {
        errors?: {
          username?: string[];
          general?: string[];
        };
      }
    | undefined;
}

export function LoginForm({
  form,
  isRole,
  onToggle,
  onSubmit,
  pending,
  state
}: LoginFormProps) {
  return (
    <Form {...form}>
      <form action={onSubmit} className='relative w-full'>
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
              <FormErrors
                usernameErrors={state?.errors?.username}
                generalError={state?.errors?.general?.[0]}
              />
              <RoleToggle isRole={isRole} onToggle={onToggle} form={form} />
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
    </Form>
  );
}
