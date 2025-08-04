import { useState, useCallback, useRef, useEffect } from 'react'
import { Pagination } from '@/modules/kardex/types/pagination'
import { INITIAL_PAGINATION } from '@/modules/kardex/constants/filters.constants'
import { SortingState } from '@tanstack/react-table'

const CLIENT_SIDE_SORT_KEYS = ['product.name', 'user.id', 'warehouse.name']

export function usePagination() {
	const [pagination, setPagination] = useState<Pagination>(INITIAL_PAGINATION)
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [currentSort, setCurrentSort] = useState<string>('')
	const [clientSort, setClientSort] = useState<SortingState>([])
	const [currentType, setCurrentType] = useState<
		| 'purchase'
		| 'return_in'
		| 'transfer_in'
		| 'sale'
		| 'return_out'
		| 'transfer_out'
		| 'adjustment_in'
		| 'adjustment_out'
		| 'damaged'
		| 'expired'
		| ''
	>('')
	const debounceTimer = useRef<NodeJS.Timeout | null>(null)

	const handleNextPage = useCallback((hasNextPage: boolean) => {
		if (hasNextPage) setPagination(prev => ({ ...prev, page: prev.page + 1 }))
	}, [])

	const handlePrevPage = useCallback(() => {
		setPagination(prev => ({
			...prev,
			page: prev.page > 1 ? prev.page - 1 : prev.page,
		}))
	}, [])

	const handlePageChange = useCallback((page: number) => {
		setPagination(prev => ({
			...prev,
			page: page,
		}))
	}, [])

	const handleLimitChange = useCallback((value: string) => {
		setPagination(prev => ({ ...prev, limit: Number(value), page: 1 }))
	}, [])

	const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (typeof value === 'string') {
			setSearchTerm(value)
		} else {
			setSearchTerm('')
		}
	}, [])

	const updatePaginationSearch = useCallback((searchValue: string) => {
		const safeSearchValue = typeof searchValue === 'string' ? searchValue : ''
		setPagination(prev => ({
			...prev,
			search: safeSearchValue,
			page: 1,
		}))
	}, [])

	useEffect(() => {
		if (debounceTimer.current) clearTimeout(debounceTimer.current)
		debounceTimer.current = setTimeout(() => updatePaginationSearch(searchTerm), 500)
		return () => {
			if (debounceTimer.current) clearTimeout(debounceTimer.current)
		}
	}, [searchTerm, updatePaginationSearch])

	const handleSort = useCallback((sortKey: string) => {
		if (!sortKey) {
			setCurrentSort('')
			setClientSort([])
			setPagination(prev => ({ ...prev, sort: [], page: 1 }))
			return
		}

		const [field, order] = sortKey.split(':')
		setCurrentSort(sortKey)

		if (CLIENT_SIDE_SORT_KEYS.includes(field)) {
			setClientSort([{ id: field, desc: order === 'desc' }])
			setPagination(prev => ({ ...prev, sort: [] }))
		} else {
			setClientSort([])
			setPagination(prev => ({
				...prev,
				sort: [{ orderBy: field, order: order as 'asc' | 'desc' }],
				page: 1,
			}))
		}
	}, [])

	const handleTypeChange = useCallback(
		(
			type:
				| 'purchase'
				| 'return_in'
				| 'transfer_in'
				| 'sale'
				| 'return_out'
				| 'transfer_out'
				| 'adjustment_in'
				| 'adjustment_out'
				| 'damaged'
				| 'expired'
				| ''
		) => {
			setCurrentType(type)
			setPagination(prev => ({
				...prev,
				filters: type ? { movementType: type } : {},
				page: 1,
			}))
		},
		[]
	)

	const handleResetAll = useCallback(() => {
		setSearchTerm('')
		setCurrentSort('')
		setCurrentType('')
		setClientSort([])
		setPagination(INITIAL_PAGINATION)
	}, [])

	return {
		pagination,
		searchTerm,
		currentSort,
		clientSort,
		setClientSort,
		currentType,
		handleNextPage,
		handlePrevPage,
		handlePageChange,
		handleLimitChange,
		handleSearchChange,
		handleSort,
		handleTypeChange,
		handleResetAll,
	}
}
