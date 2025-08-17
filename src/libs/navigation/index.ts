import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const defaultLocale = 'es' as const;
export const locales = ['en', 'es'] as const;

export const labels = {
  en: 'English',
  es: 'Spanish',
} as const;

export type Locale = (typeof locales)[number];

if (process.env.NODE_ENV === 'development') {
  locales.forEach(locale => {
    if (!labels[locale]) {
      console.warn(`No label found for locale: ${locale}`);
    }
  });
}

const pathnames = {
  '/home': '/',
} as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames,
  localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);

type DynamicRouteParams<T extends string> =
  T extends `${string}[${infer Param}]${string}`
    ? { [K in Param]: string }
    : never;

type StaticPathname = keyof typeof pathnames;

export type PathNames =
  | Exclude<StaticPathname, `${string}[${string}]${string}`>
  | {
      pathname: Extract<StaticPathname, `${string}[${string}]${string}`>;
      params: DynamicRouteParams<
        Extract<StaticPathname, `${string}[${string}]${string}`>
      >;
    };

export * from './navigation';
export * from './navigation.model';
export * from './navigation.util';
