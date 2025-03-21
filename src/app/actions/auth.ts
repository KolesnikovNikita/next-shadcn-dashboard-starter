'use server';
import { LoginFormSchema, FormState } from '@/schemas/auth';

export async function loginUp(state: FormState, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    tenant: Number(data.tenant)
  });

  console.log('validatedFields:', validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  // Call the provider or db to create a user...
}
