'use client';
import React from 'react';

import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Box,
  Center,
} from '@mantine/core';
import { Shield } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import { LoginFormModel, loginValidateSchema } from './login.model';
import { useRouter } from 'next/navigation';

export default function AccountLogin() {
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginValidateSchema),
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: LoginFormModel) => {
    try {
      await signIn('credentials', {
        redirect: false,
        username: values.email,
        password: values.password,
      });
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #131246 0%, #191919 100%)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container size={420} my={40}>
        <Center mb="xl">
          <Box
            style={{
              background: '#2320b5',
              padding: '1rem',
              borderRadius: '12px',
              boxShadow: '0 0 30px rgba(35, 32, 181, 0.4)',
            }}
          >
            <Shield size={40} color="white" />
          </Box>
        </Center>

        <Title
          ta="center"
          style={{
            color: 'white',
            fontWeight: 700,
            marginBottom: '0.5rem',
          }}
        >
          Centro de comando de drones
        </Title>
        <Text c="dimmed" size="sm" ta="center" mb={30}>
          Inicie sesión para acceder al panel de monitoreo
        </Text>

        <Paper
          withBorder
          shadow="xl"
          p={30}
          radius="md"
          style={{ background: 'rgba(25, 25, 25, 0.8)' }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
              <TextInput
                label="correo"
                placeholder="john@email.com"
                required
                {...register('email')}
                styles={{
                  input: {
                    backgroundColor: 'rgba(19, 18, 70, 0.3)',
                    border: '1px solid rgba(35, 32, 181, 0.3)',
                    color: 'white',
                  },
                  label: { color: 'white' },
                }}
              />
              <PasswordInput
                label="Contraseña"
                placeholder="Contraseña"
                required
                {...register('password')}
                styles={{
                  input: {
                    backgroundColor: 'rgba(19, 18, 70, 0.3)',
                    border: '1px solid rgba(35, 32, 181, 0.3)',
                    color: 'white',
                  },
                  label: { color: 'white' },
                }}
              />
              <Button
                type="submit"
                fullWidth
                loading={isSubmitting}
                color="secondary"
                size="md"
                style={{
                  marginTop: '0.5rem',
                }}
              >
                Iniciar
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
