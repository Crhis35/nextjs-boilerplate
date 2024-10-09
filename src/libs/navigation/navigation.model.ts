import type { MatchFunction } from 'path-to-regexp'

export enum PageRoutes {
	Home = '/:locale',
	SignIn = '/:locale/login',
	Users = '/:locale/users',
	UserDetail = '/:locale/users/:id',
}

export enum ViewQueries {
	Table = 'table',
	List = 'list',
	Grid = 'grid',
}

export interface Nav {
	label: string
	pathname: PageRoutes
	query?: Record<string, number | string>
	icon?: React.ReactNode
	matcher: MatchFunction<Record<string, string>>
	children?: Nav[]
}

export const whiteList = [PageRoutes.SignIn]
