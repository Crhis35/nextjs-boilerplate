'use client';
import React from 'react';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { OnboardingFormModel, validateSchema } from './onboarding.model';

export default function AccountOnboarding() {
  const queryClient = useQueryClient();
  const t = useTranslations('onboarding');
  const router = useRouter();

  const methods = useForm<OnboardingFormModel>({
    mode: 'all',
    resolver: zodResolver(validateSchema),
    defaultValues: {
      name: '',
      lastName: '',
      cityId: '',
    },
  });

  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = methods;

  const onSubmit = async (data: OnboardingFormModel) => {
    try {
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div>
        <input
          name="name"
          type="text"
          label={t('inputs.name.label')}
          placeholder={t('inputs.name.placeholder')}
        />
        <input
          name="lastName"
          type="text"
          label={t('inputs.lastName.label')}
          placeholder={t('inputs.lastName.placeholder')}
        />

        <button disabled={!isValid} onClick={handleSubmit(onSubmit)}>
          Submit
        </button>
      </div>
    </FormProvider>
  );
}
