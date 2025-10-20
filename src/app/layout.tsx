import React from 'react';

import type { Metadata } from 'next';
import { getMessages, getLocale } from 'next-intl/server';

import {
  ColorSchemeScript,
  MantineColorsTuple,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from '@mantine/core';

import generateMetadata from '@/libs/utils/metadata';

import { ReactQueryProvider } from '@/libs/shared/providers/query-client';
import { NextIntlProvider } from '@/libs/shared/providers/i18n';

import '@mantine/core/styles.css';
import './global.css';

export const metadata: Metadata = generateMetadata({
  path: '/',
  title: 'Boilerplate NextJS | Home',
  description: 'Boilerplate NextJS',
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

const darkBlue: MantineColorsTuple = [
  '#ebf2ff', // 50
  '#dbe5ff', // 100
  '#becfff', // 200
  '#97afff', // 300
  '#6f82ff', // 400
  '#4d57ff', // 500
  '#322dfe', // 600
  '#2921e1', // 700
  '#221eb4', // 800
  '#21218e', // 900
];

export const theme = createTheme({
  colors: {
    'dark-blue': darkBlue,
  },
  primaryColor: 'dark-blue',
  primaryShade: 6, // This corresponds to the 600 shade (#322dfe)
  other: {
    background: '#f8f9fa', // light mode bg
    backgroundDark: '#0a0e1a', // dark mode bg
    bgSecondary: '#111827',
    bgTertiary: '#1a2234',
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
