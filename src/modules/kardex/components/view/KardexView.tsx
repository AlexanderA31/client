'use client'

import { useCallback, useMemo, useState } from 'react'
import { useKardex } from '@/common/hooks/useKardex'
import { usePagination } from '@/modules/kardex/hooks/usePagination'
import { useGenericRefresh } from '@/common/hooks/shared/useGenericRefresh'
import { I_Kardex } from '@/modules/kardex/types/kardex'

import { Icons } from '@/components/icons'
import { Card } from '@/components/ui/card'
import { UtilBanner } from '@/components/UtilBanner'
import { ViewType } from '@/modules/kardex/components/molecules/ViewSelector'
import { KardexHeader } from '@/modules/kardex/components/templates/Header'
import { KardexFilters } from '@/modules/kardex/components/templates/Filters'
import { PaginationControls } from '@/modules/kardex/components/templates/Pagination'
import { KardexTable } from '@/modules/kardex/components/organisms/Table/KardexTable'
import { FatalErrorState, RetryErrorState } from '@/components/layout/organims/ErrorStateCard'

export function KardexView() {
	const [retryCount, setRetryCount] = useState(0)
	const [viewType, setViewType] = useState<ViewType>('table')

	const {
		pagination,
		searchTerm,
		currentSort,
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
			sort: currentSort ? [currentSort] : undefined,
			filters: currentType ? { type: currentType } : undefined,
		}),
		[pagination.page, pagination.limit, searchTerm, currentType, currentSort]
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
        // For now, just log the data.
        // In a real application, this would open a details modal or navigate to a details page.
        console.log('View details for:', kardexData)
    }, [])

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
			{kardexData?.items.length === 0 && !loading ? (
				<Card className='flex h-screen items-center justify-center border-none bg-transparent shadow-none'>
					<UtilBanner
						icon={<Icons.dataBase />}
						title='Sin registros'
						description='No hay datos de kardex disponibles para los filtros seleccionados.'
					/>
				</Card>
			) : (
				<>
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
				</>
			)}
		</div>
	)
}
