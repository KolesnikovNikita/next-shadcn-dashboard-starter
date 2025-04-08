'use server';

import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email()
});

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const emailVerification = process.env.NEXT_PUBLIC_API_EMAIL_VERIFICATION;

export async function verifyEmail(formData: FormData, token: string) {
  try {
    const email = formData.get('email') as string;

    const { email: validateEmail } = emailSchema.parse({ email });

    console.log('token', token);

    const response = await fetch(
      `${baseUrl}${emailVerification}?email=${validateEmail}`,
      {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
          Authorization: token ? `Bearer ${token}` : ''
        }
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();

      return { success: false, message: errorMessage };
    }

    const result = await response.json();

    console.log('result', result);

    return { success: true, message: 'Verification successfully', result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: 'Invalid email', success: false };
    }

    return { message: 'Internal server error', success: false };
  }
}
