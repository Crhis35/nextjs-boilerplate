import { createSharedPathnamesNavigation } from 'next-intl/navigation'

// export const defaultLocale = "en-us";
export const defaultLocale = 'en-us' as const

// Supported locales.
export const locales = ['en-us', 'es-es'] as const

// Labels for each supported locale, used for displaying human-readable names.
export const labels = {
	'en-us': 'English',
	'es-es': 'Spanish',
} as const

// Type representing valid locale strings.
export type Locale = (typeof locales)[number]

// Ensure every locale has a label.
if (process.env.NODE_ENV === 'development') {
	// biome-ignore lint/complexity/noForEach: <explanation>
	locales.forEach((locale) => {
		if (!labels[locale]) {
			console.warn(`No label found for locale: ${locale}`)
		}
	})
}

// Navigation utilities configured for the defined locales.
export const { Link, redirect, usePathname, useRouter } =
	createSharedPathnamesNavigation({ locales })

export * from './navigation'
export * from './navigation.model'
export * from './navigation.util'
