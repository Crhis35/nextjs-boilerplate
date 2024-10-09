'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Anchor, Paper, Title, Text, Center, Flex } from '@mantine/core';

import { confirmSignUp, autoSignIn } from 'aws-amplify/auth';
import { notifications } from '@mantine/notifications';

import { OtpForm } from '@/libs/common/components/ui/molecules';

import { AccountVerificationProps } from './verification.model';

export default function AccountVerification(props: AccountVerificationProps) {
  const { email } = props;

  const router = useRouter();

  const handleSignUp = async (data: { code: string }) => {
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: email,
        confirmationCode: data.code,
      });
      await autoSignIn().catch();
      if (isSignUpComplete) {
        router.push('/home');
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        notifications.show({
          withCloseButton: true,
          color: 'red',
          title: 'Something when wrong!',
          message: error?.message,
        });
      }
    }
  };

  return (
    <Center>
      <form>
        <Title ta="center">Create an account!</Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" component={Link} href="/login">
            Log In
          </Anchor>
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Flex align="center" direction="column" gap="sm">
            <OtpForm onSubmit={handleSignUp} email={email} />
          </Flex>
        </Paper>
      </form>
    </Center>
  );
}
