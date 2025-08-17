'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginFormModel, validateSchema } from './login.model';

export default function AccountLogin() {
  const router = useRouter();

  const methods = useForm<LoginFormModel>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(validateSchema),
  });

  const {
    formState: { isValid },
    handleSubmit,
  } = methods;

  const handleSignIn = async (data: LoginFormModel) => {
    try {
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const onConfirmSignIn = async (data: { code: string }) => {
    try {
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form>
        <h2>Welcome back!</h2>
        <h3>
          Do not have an account yet? <a href="/signup">Create account</a>
        </h3>
        <div>
          <input name="email" type="text" required />
          <input name="password" type="password" required />

          <div>
            <input type="checkbox" />
            <a href="/recovery">Forgot password?</a>
          </div>
          <button disabled={!isValid} onClick={handleSubmit(handleSignIn)}>
            Sign in
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
