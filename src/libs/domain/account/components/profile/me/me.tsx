'use client';
import React, { useTransition } from 'react';

import { v4 } from 'uuid';

import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  FileButton,
  Flex,
  Modal,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { Edit } from 'lucide-react';

import { remove, uploadData } from 'aws-amplify/storage';
import { setUpTOTP } from 'aws-amplify/auth';

import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure } from '@mantine/hooks';
import { useDebounce } from 'use-debounce';

import { useAuth } from '@/libs/common/context/auth';

import { DropdownField, InputField } from '@/libs/common/components/form';
import {
  QueryCitiesArgs,
  useGetUserByCognitoIdQuery,
  useInfiniteListCitiesQuery,
  useUpdateUserMutation,
} from '@/libs/common/api/requests';
import { gqlClient } from '@/libs/common/api/client';
import { appConfig } from '@/config/app-config';

import { updateUser } from './me.action';
import { validateSchema, MeFormModel } from './me.model';
import { OtpModal } from '@/libs/common/components/ui/organisms';

export default function AccountMe() {
  const { data } = useAuth();
  const queryClient = useQueryClient();
  const t = useTranslations('me');
  const [setupUri, setSetupUri] = React.useState('');
  const [opened, { open, close }] = useDisclosure(false);

  const [filterCity, setFilterCity] = React.useState<QueryCitiesArgs>({
    paging: {
      first: 100,
    },
    sorting: [],
    filter: {},
  });

  const [filterCityDebounced] = useDebounce(filterCity, 200);

  const updateUserMutation = useUpdateUserMutation(gqlClient);

  const { data: citiesData } = useInfiniteListCitiesQuery(
    gqlClient,
    filterCityDebounced,
    {
      initialPageParam: () => {
        return undefined;
      },
      getNextPageParam: ({ cities }) => {
        if (!cities?.pageInfo?.hasNextPage) {
          return undefined;
        }
        return cities.pageInfo.endCursor;
      },
    },
  );

  const currentCities = React.useMemo(() => {
    const cities =
      citiesData?.pages
        ?.flatMap(page => page.cities.edges)
        .map(edge => edge.node) || [];
    const c = [...cities];

    if (data.user?.city) {
      c.unshift(data?.user.city);
    }
    return c;
  }, [citiesData?.pages, data?.user?.city]);

  const fullName = `${data?.user?.name} ${data?.user?.lastName}`;
  const methods = useForm<MeFormModel>({
    mode: 'all',
    resolver: zodResolver(validateSchema),
    defaultValues: {
      id: data.user?.id,
      name: data.user?.name,
      lastName: data.user?.lastName,
      cityId: data.user?.city.id,
    },
  });

  const {
    formState: { isValid },
    reset,
  } = methods;

  React.useEffect(() => {
    reset({
      id: data.user?.id,
      name: data.user?.name,
      lastName: data.user?.lastName,
      cityId: data.user?.city.id,
    });
  }, [data, reset]);

  const [pending, startTransaction] = useTransition();

  const resetRef = React.useRef<() => void>(null);

  const onUploadFile = async (file: File) => {
    try {
      if (data.user?.image?.key) {
        await remove({
          path: data.user.image.key,
        });
      }

      const key = `public/users/${data.user?.id}/image/${v4()}.${file.name.split('.').pop()}`;

      await uploadData({
        path: key,
        data: file,
      }).result;

      await updateUserMutation.mutateAsync({
        input: {
          id: data.user!.id,
          update: {
            image: {
              key,
              type: 'image',
            },
          },
        },
      });

      await queryClient.invalidateQueries({
        queryKey: useGetUserByCognitoIdQuery.getKey({
          cognitoId: data.user?.cognitoId,
        }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      resetRef.current?.();
    }
  };

  const enableMfa = async () => {
    const totpSetupDetails = await setUpTOTP();
    const appName = `Boilerplate NextJS${appConfig.env !== 'prod' ? ` ${appConfig.env}` : ''}`;
    const setupUri = totpSetupDetails.getSetupUri(appName);
    setSetupUri(setupUri.href);
    open();
  };

  return (
    <Center>
      <Paper
        shadow="xs"
        p="xl"
        w={{
          base: '100%',
          md: '60%',
        }}
      >
        <Stack>
          <Flex
            align="center"
            gap="sm"
            bd="1px solid gray.4"
            p="sm"
            justify="space-between"
          >
            <Flex align="center" gap="sm">
              <Avatar
                name={fullName}
                size="lg"
                radius="xl"
                color="initials"
                src={data.user?.image?.url}
              />
              <Stack gap="0">
                <Text size="md">{fullName}</Text>
                <Text tt="capitalize" size="sm">
                  {data.user?.role.toLowerCase()}
                </Text>
              </Stack>
            </Flex>

            <FileButton
              resetRef={resetRef}
              onChange={onUploadFile as any}
              accept="image/png,image/jpeg"
              disabled={updateUserMutation.isPending}
            >
              {props => (
                <ActionIcon {...props} variant="outline" aria-label="Edit">
                  <Edit style={{ width: '70%', height: '70%' }} />
                </ActionIcon>
              )}
            </FileButton>
          </Flex>

          <Flex justify="center" gap="sm">
            <Box
              p="md"
              w="70%"
              component="form"
              action={formData =>
                startTransaction(async () => {
                  await updateUser(formData);
                  await queryClient.invalidateQueries({
                    queryKey: useGetUserByCognitoIdQuery.getKey({
                      cognitoId: data.user?.cognitoId,
                    }),
                  });
                })
              }
            >
              <FormProvider {...methods}>
                <Stack>
                  <InputField name="id" type="text" display="none" />
                  <InputField name="cityId" type="text" display="none" />
                  <InputField
                    name="name"
                    type="text"
                    label={t('inputs.name.label')}
                    placeholder={t('inputs.name.placeholder')}
                  />
                  <InputField
                    name="lastName"
                    type="text"
                    label={t('inputs.lastName.label')}
                    placeholder={t('inputs.lastName.placeholder')}
                  />
                  <DropdownField
                    search
                    name="cityId"
                    label={t('inputs.city.label')}
                    placeholder={t('inputs.city.placeholder')}
                    searchPlaceholder={t('inputs.city.search.placeholder')}
                    notFoundPlaceholder={t('inputs.city.search.notFound')}
                    options={
                      currentCities?.map(city => ({
                        label: `${city?.name} / ${city.state?.country?.name}`,
                        value: city.id,
                      })) || []
                    }
                    onChangeText={val => {
                      if (val.length > 3) {
                        setFilterCity(prev => ({
                          ...prev,
                          filter: {
                            name: {
                              iLike: `%${val}%`,
                            },
                          },
                        }));
                      }
                    }}
                  />
                  <Button type="submit" disabled={!isValid} loading={pending}>
                    Submit
                  </Button>
                </Stack>
              </FormProvider>
            </Box>
          </Flex>

          <Flex>
            <OtpModal
              qrText={setupUri}
              open={enableMfa}
              close={close}
              opened={opened}
              btnText="Enable MFA"
              label="Authentication"
              otpFormProps={{
                email: data.user!.name,
              }}
            />
          </Flex>
        </Stack>
      </Paper>
    </Center>
  );
}
