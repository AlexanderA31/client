'use client'

import { useCallback, useMemo, useState } from 'react'
import { useKardex } from '@/common/hooks/useKardex'
import { usePagination } from '@/modules/kardex/hooks/usePagination'
import { useGenericRefresh } from '@/common/hooks/shared/useGenericRefresh'
import { I_Kardex } from '@/modules/kardex/types/kardex'
import { useRouter } from 'next/navigation'

import { Icons } from '@/components/icons'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/layout/organims/EmptyState'
import { ViewType } from '@/modules/kardex/components/molecules/ViewSelector'
import { KardexHeader } from '@/modules/kardex/components/templates/Header'
import { KardexFilters } from '@/modules/kardex/components/templates/Filters'
import { PaginationControls } from '@/modules/kardex/components/templates/Pagination'
import { KardexTable } from '@/modules/kardex/components/organisms/Table/KardexTable'
import { FatalErrorState, RetryErrorState } from '@/components/layout/organims/ErrorStateCard'
import { ROUTE_PATH } from '@/common/constants/routes-const'

export function KardexView() {
	const [retryCount, setRetryCount] = useState(0)
	const [viewType, setViewType] = useState<ViewType>('table')
    const router = useRouter()

	const {
		pagination,
		searchTerm,
		currentSort,
		clientSort,
		setClientSort,
		currentType,
		handleNextPage,
		handlePrevPage,
		handleLimitChange,
		handleSearchChange,
		handleSort,
		handleTypeChange,
		handleResetAll,
		handlePageChange,
	} = usePagination()

	const paginationParams = useMemo(
		() => ({
			search: searchTerm,
			page: pagination.page,
			limit: pagination.limit,
			sort: pagination.sort,
			filters: currentType ? { movementType: currentType } : undefined,
		}),
		[pagination.page, pagination.limit, searchTerm, currentType, pagination.sort]
	)

	const {
		kardex,
		loading,
		error: errorKardex,
		refetchKardex,
	} = useKardex(paginationParams)

	const handleRetry = useCallback(() => {
		setRetryCount(prev => prev + 1)
		refetchKardex()
	}, [refetchKardex])

	const { isRefreshing, handleRefresh } = useGenericRefresh(refetchKardex)

    const handleViewDetails = useCallback((kardexData: I_Kardex) => {
        router.push(`${ROUTE_PATH.ADMIN.KARDEX}/${kardexData.id}`)
    }, [router])

	const handleNext = useCallback(() => {
		handleNextPage(kardex?.data?.pagination?.hasNextPage)
	}, [handleNextPage, kardex?.data?.pagination?.hasNextPage])

	const kardexData = useMemo(
		() => ({
			items: kardex?.data?.items || [],
			pagination: kardex?.data?.pagination,
		}),
		[kardex?.data]
	)

	if (errorKardex && retryCount < 3) return <RetryErrorState onRetry={handleRetry} />
	if (errorKardex) return <FatalErrorState />

	return (
		<div className='flex flex-1 flex-col space-y-6'>
			<KardexHeader />

			<KardexFilters
				searchValue={searchTerm}
				currentSort={currentSort}
				currentType={currentType}
				isRefreshing={isRefreshing}
				onSearchChange={handleSearchChange}
				onSort={handleSort}
				onTypeChange={handleTypeChange}
				onRefresh={handleRefresh}
				onResetAll={handleResetAll}
				viewType={viewType}
				onViewChange={setViewType}
			/>

			<KardexTable
				kardexData={kardexData.items}
				loading={loading}
				onViewDetails={handleViewDetails}
				viewType={viewType}
				clientSort={clientSort}
				setClientSort={setClientSort}
			/>

			<PaginationControls
				loading={loading}
				pagination={pagination}
				onPrevPage={handlePrevPage}
				onPageChange={handlePageChange}
				onNextPage={handleNext}
				onLimitChange={handleLimitChange}
				metaDataPagination={kardex?.data?.pagination}
			/>
		</div>
	)
}
