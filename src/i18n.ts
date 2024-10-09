import deepmerge from 'deepmerge';
import type { AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { en, es } from '@/translations';

const localeMessages: Record<string, AbstractIntlMessages> = {
  en: en,
  es: es,
};

export default getRequestConfig(({ locale }) => {
  // Load messages for the current locale
  const primaryMessages: AbstractIntlMessages =
    localeMessages[locale] || localeMessages['en'];

  // Load messages for the fallback locale
  const fallbackMessages: AbstractIntlMessages = localeMessages['en'];

  // Merge primary locale messages with fallback locale messages
  const messages = deepmerge(fallbackMessages, primaryMessages);

  // When using Turbopack we enable HMR for locale
  // This approach also works fine without --turbo
  return { messages };
});
