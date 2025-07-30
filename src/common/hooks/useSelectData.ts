import { useState, useEffect, useCallback } from 'react'

interface Pagination {
	page: number
	limit: number
}

interface SelectDataParams {
	useDataHook: (params: { page: number; limit: number; search?: string }) => {
		[key: string]: unknown
	}
	dataKey: string
	initialLimit?: number
}

export function useSelectData<T extends { id: unknown }>({
	useDataHook,
	dataKey,
	initialLimit = 10,
}: SelectDataParams) {
	const [isOpen, setIsOpen] = useState(false)
	const [data, setData] = useState<T[]>([])
	const [search, setSearch] = useState('')
	const [pagination, setPagination] = useState<Pagination>({
		page: 1,
		limit: initialLimit,
	})

	const hookResult = useDataHook({
		page: pagination.page,
		limit: pagination.limit,
		search: search,
	})

	const fetchedData = hookResult[dataKey]
	const loading = hookResult.loading
	const refetchRecords = hookResult.refetchRecords

	useEffect(() => {
		if (fetchedData?.data?.items) {
			const newItems = fetchedData.data.items.filter(
				(item: T) => !data.some(existing => existing.id === item.id)
			)
			setData(prev => [...prev, ...newItems])
		}
	}, [fetchedData, data])

	const loadMore = useCallback(() => {
		if (
			fetchedData &&
			fetchedData.data.pagination.page < fetchedData.data.pagination.pageCount
		) {
			setPagination(prev => ({ ...prev, page: prev.page + 1 }))
		}
	}, [fetchedData])

	const handleSearch = (searchValue: string) => {
		setSearch(searchValue)
		setData([]) // Reset data on new search
		setPagination(prev => ({ ...prev, page: 1 }))
	}

	useEffect(() => {
		refetchRecords()
	}, [search, pagination.page, pagination.limit, refetchRecords])

	return {
		isOpen,
		setIsOpen,
		data,
		loading,
		search,
		handleSearch,
		loadMore,
	}
}
