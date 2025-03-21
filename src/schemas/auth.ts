import * as z from 'zod';

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long.' })
    .trim(),
  tenant: z.number().refine((val) => val === 1 || val === 2, {
    message: 'Invalid tenant value.'
  })
});

export type FormState =
  | {
      errors?: {
        username?: string[];
      };
      message?: string;
    }
  | undefined;
