import React from 'react';

import type { Metadata } from 'next';
import { getMessages, getLocale } from 'next-intl/server';

import generateMetadata from '@/libs/utils/metadata';

import { ReactQueryProvider } from '@/libs/shared/providers/query-client';
import { NextIntlProvider } from '@/libs/shared/providers/i18n';

export const metadata: Metadata = generateMetadata({
  path: '/',
  title: 'Boilerplate NextJS | Home',
  description: 'Boilerplate NextJS',
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <ReactQueryProvider>
          <NextIntlProvider locale={locale} messages={messages}>
            {children}
          </NextIntlProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
