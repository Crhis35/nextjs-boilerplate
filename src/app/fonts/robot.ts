import type { MetadataRoute } from 'next';
import { appConfig } from '@/config/app-config';

/**
 * This function returns an object that represents the robots.txt file which
 * next.js uses to create the robots.txt file.
 * @returns The robots.txt file configuration.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${appConfig.siteHostName}/sitemap.xml`,
  };
}
