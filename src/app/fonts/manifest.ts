import type { MetadataRoute } from 'next';

/**
 * This function returns an object that represents the manifest.json file which
 * next.js uses to create the manifest.json file.
 * @returns The manifest.json file configuration.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Boilerplate NextJS Investors',
    short_name: 'Boilerplate NextJS Investors',
    description: 'Investors app',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
  };
}
