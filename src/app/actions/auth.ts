'use server';
import { LoginFormSchema, FormState } from '@/schemas/auth';

interface AuthResult {
  status: number;
  message: string;
  token?: string;
}

export async function loginUp(
  _: FormState,
  formData: FormData
): Promise<{ result: AuthResult; errors?: any }> {
  const username = formData.get('username') as string;
  const tenant = Number(formData.get('tenant'));

  if (!username || isNaN(tenant)) {
    return {
      result: {
        status: 400,
        message: 'Invalid username or tenant'
      },
      errors: { general: ['Invalid username or tenant'] }
    };
  }

  const validatedFields = LoginFormSchema.safeParse({ username, tenant });

  if (!validatedFields.success) {
    return {
      result: {
        status: 400,
        message: 'Invalid form data'
      },
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
      return {
        result: {
          status: response.status,
          message: errorMessage
        },
        errors: { general: [errorMessage] }
      };
    }

    const result = await response.json();

    return {
      result: {
        status: response.status,
        message: result.message,
        token: result.token
      },
      errors: undefined
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return {
      result: {
        status: 500,
        message: errorMessage
      },
      errors: { general: [errorMessage] }
    };
  }
}
