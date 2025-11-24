import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

import { auth } from '@auth';

import { locales, defaultLocale, routing } from '@/libs/navigation';

const publicPages = ['/login'];

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
  const pathname = request.nextUrl.pathname || '/';

  const session = await auth();

  // Regular expressions to verify if the route is public or authentication.
  const publicPathnameRegex = new RegExp(
    `^/((${locales.join('|')})/)?(${publicPages
      .join('|')
      .replace(/\//g, '')})/?$`,
    'i',
  );

  const isPublicPage = publicPathnameRegex.test(pathname);

  // const response = NextResponse.next();

  const isAuthenticated = session?.user;

  if (!isAuthenticated && !isPublicPage) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',

    '/([\\w-]+)?/cities/(.+)',
    '/([\\w-]+)?/users/(.+)',
    '/([\\w-]+)?/campaigns/(.+)',
    '/([\\w-]+)?/definitions/(.+)',
    '/([\\w-]+)?/support-ticket/(.+)',
    '/([\\w-]+)?/organizations/(.+)',
    '/([\\w-]+)?/archetypes/(.+)',
  ],
};
