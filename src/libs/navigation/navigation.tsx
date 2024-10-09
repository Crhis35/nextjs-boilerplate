import { match } from 'path-to-regexp'
import { Home, User } from 'lucide-react'

import { type Nav, PageRoutes, ViewQueries } from './navigation.model'

export const defaultQuery = {
	view: ViewQueries.Table,
	page: 1,
	limit: 10,
	sort: 'id',
	order: 'desc',
	search: '',
}

export const navLinks: Nav[] = [
	{
		label: 'dashboard',
		pathname: PageRoutes.Home,
		query: defaultQuery,
		icon: <Home />,
		matcher: match(PageRoutes.Home),
	},
	{
		label: 'users',
		pathname: PageRoutes.Users,
		query: defaultQuery,
		icon: <User />,
		matcher: match(PageRoutes.Users),
		children: [
			{
				label: 'User Detail',
				pathname: PageRoutes.UserDetail,
				matcher: match(PageRoutes.UserDetail),
			},
		],
	},
]
