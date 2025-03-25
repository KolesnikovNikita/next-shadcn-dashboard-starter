'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LogIn, CircleCheckBig } from 'lucide-react';
import { loginUp } from '@/app/actions/auth';
import { LoginFormSchema } from '@/schemas/auth';

enum UserRole {
  PLAYER = 2,
  AGENT = 1
}

export default function UserAuthForm() {
  const [state, action, pending] = useActionState(loginUp, undefined);
  const [isRole, setRole] = useState(true);
  const [countdown, setCountdown] = useState(10);

  console.log(state);

  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: '',
      tenant: UserRole.PLAYER
    }
  });

  const toggleRole = () => {
    form.setValue('tenant', isRole ? UserRole.PLAYER : UserRole.AGENT);
    setRole((prev) => !prev);
  };

  useEffect(() => {
    if (state?.result?.status === 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.open('https://747ph.live', '_blank');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [state]);

  return (
    <>
      <Form {...form}>
        <form action={action} className='relative w-full'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className='mb-6'
                    type='text'
                    placeholder='Enter Username'
                    {...field}
                  />
                </FormControl>
                {state?.errors?.username?.map((err, index) => (
                  <p
                    key={index}
                    className='absolute left-3 top-10 font-medium text-red-500'
                  >
                    {err}
                  </p>
                ))}
                {state?.errors?.general?.[0] && (
                  <p className='absolute left-3 top-10 font-medium text-red-500'>
                    {JSON.parse(state.errors.general[0]).detail}
                  </p>
                )}
                <div className='mb-6'>
                  <label className='relative flex h-12 w-full cursor-pointer items-center rounded-full border bg-white shadow-sm'>
                    <span
                      className={`flex-1 text-center font-bold transition ${
                        isRole ? 'text-green-900 underline' : 'text-gray-400'
                      }`}
                    >
                      AGENT
                    </span>

                    <Input
                      type='checkbox'
                      checked={!isRole}
                      onChange={toggleRole}
                      className='sr-only'
                    />

                    <input
                      type='hidden'
                      {...form.register('tenant')}
                      value={isRole ? UserRole.AGENT : UserRole.PLAYER}
                    />

                    <div
                      className={`relative flex h-12 w-16 items-center justify-center rounded-full bg-green-900 transition-all duration-300 ${
                        isRole ? 'bg-yellow-300' : 'bg-green-300'
                      }`}
                    >
                      {isRole ? (
                        <span className='absolute left-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='#ffffff'
                            height='24px'
                            width='24px'
                            version='1.1'
                            id='Capa_1'
                            viewBox='0 0 478.417 478.417'
                          >
                            <g>
                              <path d='M224.074,278.881v16.931h30.286v-16.931c-5.005,0.955-10.056,1.494-15.147,1.494   C234.121,280.375,229.07,279.835,224.074,278.881z' />
                              <path d='M380.952,254.647l-24.311-7.256l-31.576-9.407v0.008l-6.185-1.845c-4.004,5.013-8.203,9.594-12.535,13.809l15.912,4.747   c-10.211,56.294-29.565,118.164-53.415,148.495l-14.388-96.175h-30.489l-14.381,96.137   c-23.843-30.348-43.188-92.188-53.393-148.465l15.882-4.739c-4.332-4.215-8.531-8.797-12.535-13.817l-62.081,18.508   c-13.872,4.145-23.396,16.907-23.396,31.397v27.22c0,91.192,74.291,165.152,165.152,165.152h0.008h0.008   c0.046,0,0.085-0.008,0.133-0.008c51.462-0.069,98.97-25.628,126.42-59.133c0-0.008,0-0.008,0-0.008   c24.054-28.691,38.575-65.63,38.575-106.004v-27.22C404.356,271.554,394.832,258.792,380.952,254.647z M124.388,365.679   c-1.698,11.433-3.917,22.294-6.35,32.851c-17.04-24.155-27.158-53.534-27.158-85.266v-27.22c0-6.99,4.692-13.27,11.393-15.264   l23.365-6.968C130.136,291.26,130.144,326.996,124.388,365.679z M387.536,313.264c0,31.661-10.056,60.97-27.025,85.086   c-2.369-10.307-4.527-20.949-6.185-32.124c-5.771-38.887-5.731-74.811-1.158-102.305l22.975,6.859   c6.702,1.994,11.392,8.273,11.392,15.264V313.264z' />
                              <path d='M345.614,101.967C339.883,44.298,294.239,0,239.212,0c-55.035,0-100.67,44.298-106.418,101.967   c-8.368,3.379-14.686,11.143-17.43,21.497c-2.588,9.806-1.908,21.231,1.915,32.163c5.998,17.273,18.8,29.965,32.734,32.805   c17.289,37.112,49.13,75.115,89.199,75.115c40.037,0,71.847-37.948,89.161-75.037c13.723-2.682,26.719-15.453,32.795-32.883   C369.387,131.995,362.537,108.732,345.614,101.967z M345.278,150.098c-5.005,14.357-15.186,22.107-22.411,22.107   c-0.008,0-0.008,0-0.008,0c-3.228,0.266-6.513,1.939-7.875,5.051c-14.637,33.587-42.226,69.47-75.772,69.47   c-33.554,0-61.143-35.884-75.78-69.47c-1.345-3.073-4.724-5.051-8.078-5.051c-7.031,0-17.189-7.749-22.185-22.107   c-2.689-7.702-3.253-15.842-1.533-22.332c0.821-3.136,2.94-8.634,7.828-10.33c0.516-0.189,1.571-0.29,2.073-0.336   c2.735-0.274,4.817-1.442,6.145-3.659l24.884-41.274c5.051-8.43,8.194-17.86,9.18-27.643l0.328-3.221   c12.621,6.592,33.328,10.962,57.139,10.962c23.851,0,44.58-4.387,57.162-11.002l0.328,3.261c0.986,9.783,4.13,19.213,9.181,27.643   c0,0,17.849,29.585,23.972,39.799c1.569,2.618,3.842,4.819,7.024,5.133c0.501,0.046,1.557,0.147,2.08,0.336   C346.412,120.024,350.846,134.091,345.278,150.098z' />
                            </g>
                          </svg>
                        </span>
                      ) : (
                        <span className='absolute right-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            version='1.0'
                            width='25'
                            height='53'
                            viewBox='0 0 644.000000 1280.000000'
                            preserveAspectRatio='xMidYMid meet'
                          >
                            <metadata>
                              Created by potrace 1.15, written by Peter Selinger
                              2001-2017
                            </metadata>
                            <g
                              transform='translate(0.000000,1280.000000) scale(0.100000,-0.100000)'
                              fill='#000000'
                              stroke='none'
                            >
                              <path d='M1515 12794 c-89 -21 -118 -31 -177 -60 -125 -63 -224 -162 -286 -290 -109 -221 -53 -513 133 -699 81 -81 199 -146 302 -166 61 -11 206 -8 268 7 l30 7 -42 -46 c-58 -63 -93 -135 -93 -194 0 -65 -25 -245 -44 -313 -8 -30 -33 -122 -56 -205 -23 -82 -73 -267 -112 -410 l-70 -260 -13 -295 c-8 -162 -16 -332 -19 -377 l-6 -82 -51 -47 c-70 -66 -117 -134 -135 -193 -11 -39 -25 -59 -61 -88 -119 -96 -123 -104 -81 -165 24 -35 23 -48 -6 -48 -13 0 -29 -7 -37 -16 -11 -13 -4 -31 39 -117 l52 -102 -25 -19 c-55 -40 -63 -90 -21 -126 11 -9 16 -30 16 -71 0 -50 3 -61 23 -74 27 -17 68 -31 120 -40 20 -3 37 -10 37 -15 0 -6 -5 -9 -12 -7 -14 3 -62 -64 -197 -278 -200 -316 -321 -527 -321 -561 0 -9 9 -31 19 -48 15 -24 20 -59 25 -166 4 -74 9 -148 12 -165 l5 -30 -31 35 c-17 19 -37 55 -44 80 l-13 45 -7 -48 c-13 -87 24 -198 81 -242 9 -7 17 -52 23 -130 25 -311 37 -354 151 -512 48 -67 59 -89 59 -121 0 -52 -31 -150 -81 -259 -66 -142 -86 -204 -93 -283 -12 -129 -56 -463 -67 -505 -18 -69 -179 -607 -201 -670 -27 -78 -52 -120 -92 -150 -39 -30 -37 -30 -66 -5 -24 21 -50 27 -50 11 0 -5 -7 -17 -16 -26 -15 -14 -15 -23 -5 -68 14 -66 1 -146 -34 -198 -13 -20 -67 -87 -120 -149 -53 -62 -94 -115 -91 -118 3 -2 13 1 23 9 15 12 16 12 10 -5 -5 -12 -1 -26 9 -37 16 -17 16 -21 2 -37 -21 -23 -78 -120 -78 -132 0 -6 8 -10 18 -10 10 0 25 -9 35 -20 27 -32 77 -26 114 12 30 33 135 171 183 241 33 48 43 47 35 -5 -16 -103 -40 -179 -84 -261 -50 -96 -49 -107 14 -107 46 0 74 26 111 103 l34 71 1 -64 c1 -59 3 -53 19 63 9 70 20 130 23 133 3 3 3 -52 0 -123 -6 -132 2 -173 31 -173 8 0 19 12 25 27 17 41 49 199 56 273 11 117 15 128 77 212 34 46 68 101 76 123 8 22 22 103 32 180 22 169 30 192 385 982 l69 152 25 -18 c14 -10 36 -21 48 -25 26 -8 53 -80 53 -145 0 -57 15 -113 73 -268 55 -149 109 -368 131 -529 9 -67 27 -163 41 -215 36 -136 135 -537 211 -858 25 -105 71 -222 92 -235 15 -9 677 114 705 131 4 2 7 -1 7 -6 0 -26 158 -217 219 -265 122 -98 144 -110 359 -207 24 -11 41 -23 38 -28 -3 -4 0 -15 7 -23 34 -41 292 -246 656 -521 211 -159 239 -177 266 -172 26 4 37 -1 71 -37 23 -24 62 -71 89 -106 42 -56 46 -67 37 -87 -10 -21 -6 -30 27 -72 43 -54 309 -336 323 -341 17 -7 7 -22 -16 -22 -68 0 -66 -17 14 -105 53 -58 87 -125 96 -189 4 -23 13 -52 21 -65 8 -13 24 -59 34 -102 21 -87 42 -133 131 -286 l60 -103 -7 -162 c-7 -158 -6 -164 15 -190 12 -15 19 -32 16 -37 -7 -11 97 -43 127 -39 17 2 36 30 78 113 30 61 65 133 77 160 21 49 21 49 16 13 -9 -58 2 -82 54 -126 68 -58 91 -61 136 -21 49 43 202 246 264 351 172 292 332 604 421 824 37 93 92 227 120 297 29 70 50 135 47 143 -3 8 -38 30 -78 48 -213 97 -213 97 -351 112 -72 7 -163 14 -200 14 -105 0 -186 43 -226 121 -41 77 -292 387 -354 436 -13 10 -64 65 -112 123 -49 58 -122 141 -162 185 -50 55 -73 88 -73 105 0 30 -132 192 -307 378 -130 139 -174 168 -486 327 l-177 90 -19 -25 -19 -24 -119 114 -120 115 74 80 c74 80 182 230 243 337 l32 58 -24 9 c-12 4 -47 18 -77 30 l-54 21 -32 -20 c-18 -11 -38 -27 -45 -35 -19 -23 -39 -6 -75 65 -22 44 -36 88 -40 131 -12 105 -33 197 -61 254 -32 69 -143 167 -255 225 -83 43 -82 42 -99 140 -6 36 -22 82 -35 102 -24 36 -24 38 -8 85 24 72 27 77 66 96 21 9 37 22 37 27 0 32 -38 86 -120 170 -51 52 -109 115 -128 140 -74 93 -106 120 -156 135 -27 8 -65 15 -83 15 -19 0 -74 14 -124 31 -83 30 -89 33 -74 49 18 20 15 23 -53 60 -48 27 -51 41 -18 81 18 21 26 46 31 96 4 38 13 78 21 90 9 14 14 50 14 96 l0 73 -44 43 c-25 24 -50 57 -57 73 -15 36 -56 58 -108 58 -22 0 -42 4 -45 8 -9 14 21 60 83 130 33 38 68 85 76 107 19 45 34 217 42 495 6 226 -7 328 -55 437 -33 73 -64 226 -82 408 -17 164 -57 256 -146 334 -36 33 -38 33 -125 29 -49 -1 -89 -2 -89 0 0 2 16 27 35 56 19 28 47 79 62 111 27 57 28 67 28 205 0 133 -2 149 -24 190 -56 109 -131 169 -263 212 -39 13 -68 28 -68 35 0 61 26 222 50 306 57 204 59 217 69 593 20 692 22 750 32 864 12 139 20 156 147 292 79 84 91 102 96 140 3 24 10 86 16 139 6 56 21 121 35 155 14 32 25 79 25 104 0 44 -28 119 -54 150 -8 8 -19 46 -25 84 -42 243 -188 416 -421 498 -54 19 -221 33 -265 22z m-531 -6708 c-3 -21 -9 -35 -11 -32 -3 3 -2 21 1 42 4 20 10 34 12 31 3 -3 2 -21 -2 -41z m330 -697 c-6 -10 -44 -18 -44 -10 0 5 5 23 11 41 l12 33 12 -29 c7 -16 11 -32 9 -35z m2889 -2703 c56 -51 150 -138 210 -194 59 -56 113 -99 120 -96 17 6 256 -226 254 -247 -4 -30 343 -429 416 -479 l36 -24 -47 -12 c-54 -14 -56 -12 -147 107 -119 158 -301 346 -353 367 -19 7 -184 194 -190 215 -2 7 -25 32 -52 57 -82 78 -417 446 -382 422 17 -13 78 -65 135 -116z' />
                            </g>
                          </svg>
                        </span>
                      )}
                    </div>
                    <span
                      className={`flex-1 text-center font-bold transition ${
                        !isRole ? 'text-yellow-500 underline' : 'text-gray-400'
                      }`}
                    >
                      PLAYER
                    </span>
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className='mb-6 ml-auto mt-6 h-12 w-full cursor-pointer bg-green-500 text-base font-semibold uppercase text-white'
            type='submit'
            disabled={pending}
          >
            <span className='pr-2'>
              <LogIn />
            </span>
            Login
          </Button>
        </form>

        {state?.result?.status === 0 && (
          <Card className='bg-green-300 py-3 transition-all duration-700 animate-in fade-in slide-in-from-bottom-4'>
            <CardContent className='flex flex-col justify-between space-y-3 pb-2'>
              <p className='flex items-start text-green-800'>
                <CircleCheckBig className='mr-2 min-h-[20px] min-w-[20px]' />
                Open the messages on your 747 Live and click on the link you
                received
              </p>
              <p className='block text-center font-bold text-green-700'>
                Redirecting in: {countdown} seconds
              </p>
              <Button
                onClick={() => window.open('https://747ph.live', '_blank')}
                className='w-full bg-green-700 text-base font-semibold uppercase text-white'
              >
                Continue to 747 LIVE
              </Button>
            </CardContent>
          </Card>
        )}
      </Form>
    </>
  );
}
