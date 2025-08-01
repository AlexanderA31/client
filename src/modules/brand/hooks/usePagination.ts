import { useState, useCallback, useRef, useEffect } from 'react'
import { Pagination } from '@/modules/atribute/types/pagination'
import { INITIAL_PAGINATION } from '@/modules/atribute/constants/filters.constants'

export function usePagination() {
	const [pagination, setPagination] = useState<Pagination>(INITIAL_PAGINATION)
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [currentSort, setCurrentSort] = useState<string>('')
	const [currentStatus, setCurrentStatus] = useState<'active' | 'inactive' | ''>('')
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

	// 🆕 Nueva función para cambio directo de página
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
			console.warn('⚠️ Non-string value received in search:', value)
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

	// 🔧 FUNCIÓN COMPLETAMENTE CORREGIDA: handleSort
	// Ahora maneja el sortKey completo (field + order) en lugar de solo el field
	const handleSort = useCallback((sortKey: string) => {
		// Si el sortKey está vacío, limpiar ordenamiento
		if (!sortKey) {
			setCurrentSort('')
			setPagination(prev => ({
				...prev,
				sort: [],
				page: 1,
			}))
			return
		}

		// Parsear el sortKey (formato: "field:order")
		const [field, order] = sortKey.split(':')
		setCurrentSort(sortKey)
		setPagination(prev => ({
			...prev,
			sort: [{ orderBy: field, order: order as 'asc' | 'desc' }],
			page: 1,
		}))
	}, [])

	const handleStatusChange = useCallback((status: 'active' | 'inactive' | '') => {
		setCurrentStatus(status)
		setPagination(prev => ({
			...prev,
			filters: status ? { status } : {},
			page: 1,
		}))
	}, [])

	const handleResetAll = useCallback(() => {
		setSearchTerm('')
		setCurrentSort('')
		setCurrentStatus('')
		setPagination(INITIAL_PAGINATION)
	}, [])

	// 🆕 Función auxiliar para obtener la información del sort actual
	const getCurrentSortInfo = useCallback(() => {
		if (!currentSort) return null
		const [field, order] = currentSort.split(':')
		return { field, order }
	}, [currentSort])

	return {
		pagination,
		searchTerm,
		currentSort,
		currentStatus,
		setPagination,
		handleNextPage,
		handlePrevPage,
		handlePageChange,
		handleLimitChange,
		handleSearchChange,
		handleSort,
		handleStatusChange,
		handleResetAll,
		getCurrentSortInfo,
	}
}
