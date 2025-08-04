import { useState, useCallback, useRef, useEffect } from 'react'
import { Pagination } from '@/modules/kardex/types/pagination'
import { INITIAL_PAGINATION } from '@/modules/kardex/constants/filters.constants'
import { KardexMovementType } from '../types/kardex-movement-type'

export function usePagination() {
	const [pagination, setPagination] = useState<Pagination>(INITIAL_PAGINATION)
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [currentSort, setCurrentSort] = useState<string>('')
	const [currentType, setCurrentType] = useState<KardexMovementType>('')
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
			setPagination(prev => ({ ...prev, sort: [], page: 1 }))
			return
		}

		const [field, order] = sortKey.split(':')
		setCurrentSort(sortKey)
		setPagination(prev => ({
			...prev,
			sort: [{ orderBy: field, order: order as 'asc' | 'desc' }],
			page: 1,
		}))
	}, [])

	const handleTypeChange = useCallback((type: KardexMovementType) => {
		setCurrentType(type)
		setPagination(prev => ({
			...prev,
			filters: type ? { type } : {},
			page: 1,
		}))
	}, [])

	const handleResetAll = useCallback(() => {
		setSearchTerm('')
		setCurrentSort('')
		setCurrentType('')
		setPagination(INITIAL_PAGINATION)
	}, [])

	return {
		pagination,
		searchTerm,
		currentSort,
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
