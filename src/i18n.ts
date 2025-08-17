import { getRequestConfig } from 'next-intl/server';

import deepmerge from 'deepmerge';
import type { AbstractIntlMessages } from 'next-intl';

import { en, es } from '@/translations';
import { routing } from '@/libs/navigation';

const localeMessages: Record<string, object> = {
  en: en,
  es: es,
};

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as 'es' | 'en')) {
    locale = routing.defaultLocale;
  }

  // Load messages for the current locale
  const primaryMessages = (localeMessages[locale] ||
    localeMessages['en']) as AbstractIntlMessages;

  // Load messages for the fallback locale
  const fallbackMessages = localeMessages['en'] as AbstractIntlMessages;

  // Merge primary locale messages with fallback locale messages
  const messages = deepmerge(fallbackMessages, primaryMessages);

  // When using Turbopack we enable HMR for locale
  // This approach also works fine without --turbo
  return {
    locale,
    messages,
  };
});
