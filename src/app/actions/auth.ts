'use server';
import { LoginFormSchema, FormState } from '@/schemas/auth';

export async function loginUp(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  const username = formData.get('username') as string;
  const tenant = Number(formData.get('tenant'));

  if (!username || isNaN(tenant)) {
    return {
      errors: { general: ['Invalid username or tenant'] }
    };
  }

  const validatedFields = LoginFormSchema.safeParse({ username, tenant });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  try {
    const response = await fetch(
      `https://mngapi.azurewebsites.net/api/Account/login-link?username=${encodeURIComponent(username)}&tenant=${tenant}`,
      {
        method: 'POST',
        headers: {
          Accept: 'text/plain'
        }
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      return { errors: { general: [errorMessage] } };
    }

    const result = await response.json();

    return { message: result.message, result };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return { errors: { general: [errorMessage] } };
  }
}
