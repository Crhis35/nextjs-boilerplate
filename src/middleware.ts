import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

import { fetchAuthSession } from 'aws-amplify/auth/server';

import { runWithAmplifyServerContext } from '@/common/hoc/amplify';
import { locales, defaultLocale } from '@/common/navigation';
import { getServerGraphQLClient } from '@/libs/common/api/client/gql/server-interceptor';
import { useGetUserByCognitoIdQuery } from '@/libs/common/api/requests';

const authPages = [
  '/login',
  '/signup',
  '/recovery',
  '/confirm',
  '/reset-password',
  '/verification',
  '/onboarding',
];
const publicPages = ['/', ...authPages];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default async function middleware(request: NextRequest) {
  try {
    const locale = request.cookies.get('NEXT_LOCALE')?.value ?? defaultLocale;

    const publicPathnameRegex = new RegExp(
      `^(/(${locales.join('|')}))?(${publicPages.join('|')})$`,
      'i',
    );
    const authPathnameRegex = new RegExp(
      `^(/(${locales.join('|')}))?(${authPages.join('|')})$`,
      'i',
    );
    const pathname =
      request.nextUrl.pathname === '' ? '/' : request.nextUrl.pathname;

    const isPublicPage = publicPathnameRegex.test(pathname);
    const isAuthPage = authPathnameRegex.test(pathname);

    const response = NextResponse.next();

    const session = await runWithAmplifyServerContext({
      nextServerContext: { request, response },
      operation: async contextSpec => {
        try {
          return fetchAuthSession(contextSpec);
        } catch (error) {
          console.error('Error fetching auth session:', error);
          return null;
        }
      },
    });

    console.log({
      isPublicPage,
      path: request.nextUrl.pathname,
      locale,
      token: session?.tokens?.idToken?.toString(),
    });

    const isAuthenticated = session?.tokens !== undefined;

    if (!isAuthenticated && !isPublicPage && pathname !== `/${locale}`) {
      const loginUrl = new URL(`/${locale}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    } else if (isAuthenticated) {
      const serverGqlClient = await getServerGraphQLClient();

      const fetchUser = useGetUserByCognitoIdQuery.fetcher(serverGqlClient, {
        cognitoId: session.tokens?.idToken?.payload.sub,
      });

      const { users } = await fetchUser().catch();

      if (users?.edges?.length === 0 && !isAuthPage) {
        const onboardingUrl = new URL(`/${locale}/onboarding`, request.url);

        return NextResponse.redirect(onboardingUrl);
      }
    }

    return intlMiddleware(request);
  } catch (error) {
    console.error(error);
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
