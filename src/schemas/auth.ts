import * as z from 'zod';

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long.' })
    .trim(),
  tenant: z.number()
});

export type FormState =
  | {
      errors?: {
        username?: string[];
        tenant?: string[];
        general?: string[];
      };
      result?: {
        status: number;
        message: string;
      };
      message?: string;
    }
  | undefined;
