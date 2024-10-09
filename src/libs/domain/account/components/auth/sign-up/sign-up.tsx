'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Anchor, Paper, Title, Text, Button, Center } from '@mantine/core';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AuthError, signUp } from 'aws-amplify/auth';

import { InputField } from '@/libs/common/components/form';
import { SignUpFormModel, validateSchema } from './sign-up.model';

export default function AccountSignUp() {
  const router = useRouter();
  const methods = useForm<SignUpFormModel>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(validateSchema),
  });

  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = methods;

  const handleSignUp = async (data: SignUpFormModel) => {
    try {
      const { nextStep, isSignUpComplete, userId } = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
          },
          autoSignIn: true,
        },
      });
      console.log({
        nextStep,
        isSignUpComplete,
        userId,
      });
      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        const params = new URLSearchParams();
        params.set('email', data.email);

        router.push(`/verification?${params.toString()}`);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AuthError) {
        if (error.name === 'UsernameExistsException') {
          const params = new URLSearchParams();
          params.set('email', data.email);
          console.log({ path: '/verification?' + params.toString() });
          router.push(`/verification?${params.toString()}`);
        }
      }
    }
  };

  return (
    <Center>
      <FormProvider {...methods}>
        <form>
          <Title ta="center">Create an account!</Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Already have an account?{' '}
            <Anchor size="sm" component={Link} href="/login">
              Log In
            </Anchor>
          </Text>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <InputField label="Email" name="email" type="text" required />
            <InputField
              label="Password"
              name="password"
              type="password"
              required
            />
            <InputField
              label="Confirm password"
              name="confirmPassword"
              type="password"
              required
            />

            <Button
              fullWidth
              mt="xl"
              disabled={!isValid}
              loading={isSubmitting}
              onClick={handleSubmit(handleSignUp)}
            >
              Sign Up
            </Button>
          </Paper>
        </form>
      </FormProvider>
    </Center>
  );
}
