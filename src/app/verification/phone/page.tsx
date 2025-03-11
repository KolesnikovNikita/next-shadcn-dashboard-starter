'use client';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import PhoneInput, { getCountries } from 'react-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import OtpInput from '@/features/otp/OtpInput';

type FormValues = {
  tel: string;
};

export default function PhoneVerification() {
  const phoneNumber = parsePhoneNumberFromString('+1234567890');
  const [userCountry, setUserCountry] = useState<string | undefined>('US');
  const [isCodeSent, setIsCodeSent] = useState(true);

  // Fetch User country code

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const countryCode = data.country_code;

        if (getCountries().includes(countryCode)) {
          setUserCountry(countryCode);
        } else {
          setUserCountry('US');
        }
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };

    fetchUserCountry();
  }, []);

  // Checking the code
  const verifyCode = async (code: string) => {
    console.log('Code to verify:', code);
    alert('Code verified successfully!');
  };

  if (phoneNumber?.isValid()) {
    console.log('Valid phone number');
  }

  const form = useForm<FormValues>({
    defaultValues: { tel: '' }
  });

  const onSubmit = (data: FormValues) => {
    console.log('Submitted phone: ', data.tel);
  };
  return (
    <>
      <h2 className='mb-4'>Verify Phone</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-4'
        >
          <FormField
            control={form.control}
            name='tel'
            rules={{
              required: 'Phone number is required',
              validate: (value) => {
                const phoneNumber = parsePhoneNumberFromString(value);
                return phoneNumber?.isValid() || 'Invalid phone number';
              }
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PhoneInput
                    className='custom-phone-input'
                    international
                    defaultCountry={userCountry as any}
                    placeholder='Enter phone number'
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col space-y-2'>
            <Button className='uppercase' type='submit'>
              Send SMS
            </Button>
            <Button
              className='uppercase'
              type='button'
              onClick={() => console.log('Call me')}
            >
              Call me and dictate
            </Button>
            <Button
              className='uppercase'
              type='button'
              onClick={() => console.log('WhatsApp')}
            >
              use whatsapp
            </Button>
          </div>
        </form>
      </Form>

      {isCodeSent && <OtpInput onVerify={verifyCode} />}
    </>
  );
}
