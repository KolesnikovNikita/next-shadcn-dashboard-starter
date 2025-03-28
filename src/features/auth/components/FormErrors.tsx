interface FormErrorsProps {
  usernameErrors?: string[];
  generalError?: string;
}

export function FormErrors({ usernameErrors, generalError }: FormErrorsProps) {
  return (
    <>
      {usernameErrors?.map((err, index) => (
        <p
          key={index}
          className='absolute left-3 top-10 font-medium text-red-500'
        >
          {err}
        </p>
      ))}
      {generalError && (
        <p className='absolute left-3 top-10 font-medium text-red-500'>
          {JSON.parse(generalError).detail}
        </p>
      )}
    </>
  );
}
