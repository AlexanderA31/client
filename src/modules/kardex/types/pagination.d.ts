export interface Pagination {
	page: number
	limit: number
	filters: Record<string, unknown>
	sort: { orderBy: string; order: 'asc' | 'desc' }[]
	search: string
}

export type SortOrder = 'asc' | 'desc'

export interface SortOption {
	label: string
	field: string
	order: SortOrder
	key: string
}
