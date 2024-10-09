import { navLinks } from './navigation'
import type { Nav } from './navigation.model'

export const findNavInHierarchy = (
	pathname: string,
	items = navLinks,
	parents: Nav[] = []
): Nav[] => {
	for (const nav of items) {
		const matched = !!nav.matcher(pathname)
		if (matched) return [...parents, nav]
		if (nav.children) {
			const navLinks = findNavInHierarchy(pathname, nav.children, [
				...parents,
				nav,
			])
			if (navLinks.length) return navLinks
		} else {
			continue
		}
	}
	return []
}
