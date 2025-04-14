'use server';

import { z } from 'zod';
import { updateUserDetails } from '@/lib/auth/updateUserDetails';

const phoneSchema = z.object({
  tel: z.string().min(10).max(15)
});

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiEndpoints: Record<string, string | undefined> = {
  sms: process.env.NEXT_PUBLIC_API_SMS_VERIFICATION,
  whatsapp: process.env.NEXT_PUBLIC_API_WHATSAPP_VERIFICATION,
  telegram: process.env.NEXT_PUBLIC_API_TELEGRAM_VERIFICATION
};

const checkSmsVerification = process.env.NEXT_PUBLIC_API_CHECK_SMS_VERIFICATION;
const checkWhatsappVerification =
  process.env.NEXT_PUBLIC_API_CHECK_WHATSAPP_VERIFICATION;

export async function startTelVerification(formData: FormData, token: string) {
  const tel = formData.get('tel') as string;
  const method = formData.get('method') as string;
  try {
    const { tel: validatePhone } = phoneSchema.parse({ tel });
    const endpoint = apiEndpoints[method];

    const url = `${baseUrl}${endpoint}?mobile=${encodeURIComponent(validatePhone)}&channel=${method}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return { success: false, message: errorMessage };
    }

    const result = await response.json();

    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: 'An error occurred' };
  }
}

export async function checkTelVerification(
  code: string,
  tel: string,
  token: string
) {
  const url = `${baseUrl}${checkSmsVerification}?mobile=${encodeURIComponent(tel)}&code=${code}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        Authorization: `Bearer ${token}`
      }
    });
    console.log('response: ', response);

    if (response.status !== 200) {
      return {
        success: false
      };
    }

    const result = await response.json();

    // Обновляем данные пользователя после успешной верификации
    await updateUserDetails();

    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: 'An error occurred' };
  }
}
