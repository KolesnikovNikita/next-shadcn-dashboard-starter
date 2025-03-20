import * as z from 'zod';

export const LoginFormSchema = z.object({
  userName: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long.' })
    .trim(),
  role: z.enum(['agent', 'player'])
});

export type FormState =
  | {
      errors?: {
        userName?: string[];
      };
      message?: string;
    }
  | undefined;
