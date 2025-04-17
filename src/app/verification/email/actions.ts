'use server';

import { z } from 'zod';
import { updateUserDetails } from '@/lib/auth/updateUserDetails';
import { withTokenRefresh } from '@/lib/auth/withTokenRefresh';

const emailSchema = z.object({
  email: z.string().email()
});

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const emailVerification = process.env.NEXT_PUBLIC_API_EMAIL_VERIFICATION;
const checkEmailVerificationCode =
  process.env.NEXT_PUBLIC_API_CHECK_EMAIL_VERIFICATION;

export async function verifyEmail(formData: FormData, token: string) {
  try {
    const email = formData.get('email') as string;

    const { email: validateEmail } = emailSchema.parse({ email });

    const url = `${baseUrl}${emailVerification}?email=${validateEmail}`;
    const response = await withTokenRefresh({ url }, token);

    if (!response.ok) {
      const errorMessage = await response.text();
      return { success: false, message: errorMessage };
    }

    const result = await response.json();
    return { success: true, message: 'Verification successfully', result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { message: 'Invalid email', success: false };
    }
    return {
      message: error instanceof Error ? error.message : 'Internal server error',
      success: false
    };
  }
}

export async function checkEmailVerification(
  code: string,
  email: string,
  token: string
) {
  const url = `${baseUrl}${checkEmailVerificationCode}?email=${email}&code=${code}`;

  try {
    const response = await withTokenRefresh(
      {
        url,
        method: 'POST',
        headers: {
          accept: 'text/plain'
        }
      },
      token
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      return { success: false, message: errorMessage };
    }
    await updateUserDetails(token);
    const result = await response.json();
    return {
      success: true,
      message: 'Check Email Verification successfully',
      result
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred'
    };
  }
}
