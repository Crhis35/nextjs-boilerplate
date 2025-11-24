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
  primaryColor: 'primary',
  colors: {
    primary: [
      '#ebf2ff',
      '#dbe5ff',
      '#becfff',
      '#97afff',
      '#6f82ff',
      '#4d57ff',
      '#131246', // primary color at index 6
      '#0f0e38',
      '#0b0a2a',
      '#07061c',
    ],
    secondary: [
      '#e8e7fb',
      '#d1cff7',
      '#b9b6f3',
      '#a29eef',
      '#8a85eb',
      '#736de7',
      '#2320b5', // secondary color at index 6
      '#1c1991',
      '#15126d',
      '#0e0c49',
    ],
    tertiary: [
      '#f5f5f5',
      '#e0e0e0',
      '#cccccc',
      '#b3b3b3',
      '#999999',
      '#808080',
      '#191919', // tertiary color at index 6
      '#141414',
      '#0f0f0f',
      '#0a0a0a',
    ],
  },
  fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  headings: {
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  },
  defaultRadius: 'md',
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
