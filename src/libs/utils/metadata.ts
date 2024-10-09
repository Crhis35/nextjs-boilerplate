import { type Metadata } from 'next';

import { appConfig } from '@/config/app-config';

export const BASE_URL = appConfig.siteHostName; // Don't include slash at the end

interface MetadataArgs {
  path: string;
  title: string;
  description: string;
  image?: string;
}

const generateMetadata = ({
  path,
  title,
  description,
  image,
}: MetadataArgs): Metadata => {
  const metaTitle = title;
  const metaDescription = description;
  const metaImage = image ?? `${BASE_URL}/cover.png`;

  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,

    applicationName: 'Boilerplate NextJS Investors',
    creator: 'Boilerplate NextJS',
    authors: [
      { name: 'Crhistian Caraballo', url: 'https://github.com/Crhis35' },
    ],
    robots:
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    keywords: ['Tickets', 'Events', 'Shows', 'Artists', 'Music'],

    // icons: {
    //   icon: '/favicon.ico',
    //   shortcut: '/icons/icon-512x512.png',
    //   apple: '/icons/icon-512x512.png',
    // },
    manifest: `${BASE_URL}/manifest.json`,

    alternates: {
      canonical: '/',
      languages: {
        en: '/en',
        es: '/es',
      },
    },

    openGraph: {
      type: 'website',
      url: `${BASE_URL}${path}`,
      siteName: 'Boilerplate NextJS',
      title: metaTitle,
      description: metaDescription,
      images: metaImage,
      // videos: "",  // INFO: og video option
    },

    twitter: {
      card: 'summary_large_image',
      site: '@site',
      creator: '@creator',
      title: metaTitle,
      description: metaDescription,
      images: metaImage,
    },

    appleWebApp: {
      capable: true,
      title: metaTitle,
      startupImage: metaImage,
      statusBarStyle: 'black-translucent',
    },

    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },

    appLinks: {},
  };
  return metadata;
};

export default generateMetadata;
