'use server';
import { LoginFormSchema, FormState } from '@/schemas/auth';

export async function loginUp(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    userName: formData.get('userName'),
    role: formData.get('role')
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  // Call the provider or db to create a user...
}
