'use server';
import { LoginFormSchema, FormState } from '@/schemas/auth';

export async function loginUp(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const data = Object.fromEntries(formData.entries());

  const validatedFields = LoginFormSchema.safeParse({
    username: data.username,
    tenant: Number(data.tenant)
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  try {
    const response = await fetch(
      `https://mngapi.azurewebsites.net/api/Account/login-link?username=${encodeURIComponent(data.username)}&tenant=${data.tenant}`,
      {
        method: 'POST',
        headers: {
          Accept: 'text/plain'
        }
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      return { errors: { general: errorMessage } };
    }

    const result = await response.text();
    console.log('result:', result);
    return { message: 'Success', result };
  } catch (error) {
    return {
      errors: {
        general: error instanceof Error ? error.message : 'Unknown error'
      }
    };
  }
}
