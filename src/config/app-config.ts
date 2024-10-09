export const appConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
  apiGraphQLUrl: process.env.NEXT_PUBLIC_API_GRAPHQL ?? '',
  siteHostName: process.env.NEXT_PUBLIC_SITE_HOSTNAME ?? '',
  env: process.env.NEXT_PUBLIC_ENV ?? '',
};
