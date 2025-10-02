import React from 'react';

import type { Metadata } from 'next';
import { getMessages, getLocale } from 'next-intl/server';

import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from '@mantine/core';

import generateMetadata from '@/libs/utils/metadata';

import { ReactQueryProvider } from '@/libs/shared/providers/query-client';
import { NextIntlProvider } from '@/libs/shared/providers/i18n';

import '@mantine/core/styles.css';

export const metadata: Metadata = generateMetadata({
  path: '/',
  title: 'Boilerplate NextJS | Home',
  description: 'Boilerplate NextJS',
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262b',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
});

export default async function RootLayout({ children }: RootLayoutProps) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body suppressHydrationWarning={true}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <ReactQueryProvider>
            <NextIntlProvider locale={locale} messages={messages}>
              {children}
            </NextIntlProvider>
          </ReactQueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
