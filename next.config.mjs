import createNextIntlPlugin from 'next-intl/plugin';
import { createSecureHeaders } from 'next-secure-headers';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    // todo: Please note: it is still experimental, so
    // todo: NEXT_PUBLIC_CSP_XSS is "false" by default
    if (process.env.NEXT_PUBLIC_CSP_XSS === 'true') {
      const headers = [];

      // Prevent search engines from indexing the site if it is not live
      // This is useful for staging environments before they are ready to go live
      // To allow robots to crawl the site, use the NEXT_PUBLIC_IS_LIVE env variable
      // You may want to also use this variable to conditionally render any tracking scripts
      // @see https://github.com/payloadcms/payload/blob/main/templates/ecommerce/next.config.js
      if (process.env.NEXT_PUBLIC_IS_LIVE === 'false') {
        headers.push({
          headers: [
            {
              key: 'X-Robots-Tag',
              value: 'noindex',
            },
          ],
          source: '/:path*',
        });
      }

      // Set the Content-Security-Policy header as a security measure to prevent XSS attacks
      // It works by explicitly whitelisting trusted sources of content for your website
      // This will block all inline scripts and styles except for those that are allowed
      // todo: @see src/core/cors/csp.mjs for more details | work in progress | not fully tested
      // todo: make it more stable | currently too much things are allowed than needed
      headers.push({
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // todo: looks like we need to specify some policies
            // todo: here & some in images.contentSecurityPolicy
            value: ContentSecurityPolicy,
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      });

      // Note: to apply CSP changes while dev runtime,
      // CTRL+S this file, to reload Next.js' server.
      return headers;
    } else {
      // @see https://github.com/jagaapple/next-secure-headers
      // default option: using next-secure-headers csp library
      return [
        {
          source: '/(.*)',
          headers: createSecureHeaders(),
        },
      ];
    }
  },
  //
  // Dangerously allow builds to successfully complete
  // even if your project has the types/eslint errors.
  //
  // [Good to know if you want to toggle because `next build` errors]:
  // Next.js has built-in support for TypeScript, using its own plugin.
  // But while you use `pnpm build`, it stops on the first type errors.
  // So you can use `pnpm typecheck` to check all type warns/errors at once.
  //
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
};

const withNextIntl = createNextIntlPlugin(
  // Specify a custom next-intl path
  './src/i18n.ts',
);

export default withNextIntl(nextConfig);
