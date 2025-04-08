'use server';

import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email()
});

export async function verifyEmail(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    console.log('Received email:', email);
    const { email: validateEmail } = emailSchema.parse({ email });

    const response = await fetch(
      `https://mngapi.azurewebsites.net/api/Verification/start-email-verification?email=${validateEmail}`,
      {
        method: 'POST',
        headers: {
          Accept: 'text/plain'
        }
      }
    );

    console.log('Response status:', response.status);
    console.log(
      'Response headers:',
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      console.log('errorMessage', errorMessage);
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
