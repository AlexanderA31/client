'use client'

import { useKardex } from '@/common/hooks/useKardex'
import { Card, CardContent } from '@/components/ui/card'
import { SpinnerLoader } from '@/components/layout/SpinnerLoader'
import { Typography } from '@/components/ui/typography'
import { FatalErrorState } from '@/components/layout/organims/ErrorStateCard'
import { NotFoundState } from '@/components/layout/organims/NotFoundState'
import { EmptyState } from '@/components/layout/organims/EmptyState'
import { formatDate } from '@/common/utils/dateFormater-util'
import { TableKardex } from '../organisms/Table/TableKardex'
import { LoadingStates } from '../organisms/Table/StateLoading'
import { KardexHeader } from '../templates/Header'
import { KardexFilters } from '../templates/Filters'
import { usePagination } from '../../hooks/usePagination'
import { useGenericRefresh } from '@/common/hooks/shared/useGenericRefresh'
import { ViewType } from '../molecules/ViewSelector'
import { useMemo, useState } from 'react'
import { useDebounce } from '@/common/hooks/useDebounce'

type Props = {
	id: string
}

export function KardexDetailView({ id }: Props) {
	const {
		pagination,
		searchTerm,
		currentSort,
		currentMovementType,
		handleMovementTypeChange,
		handleNextPage,
		handlePrevPage,
		handleLimitChange,
		handleSearchChange,
		handleSort,
		handleResetAll,
		handlePageChange,
	} = usePagination()

	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	const paginationParams = useMemo(
		() => ({
			page: pagination.page,
			limit: pagination.limit,
			search: debouncedSearchTerm,
			filters: {
				...(currentMovementType ? { movementType: currentMovementType } : {}),
				productId: id,
			},
			sort: currentSort ? [currentSort] : undefined,
		}),
		[pagination.page, pagination.limit, debouncedSearchTerm, currentMovementType, currentSort, id]
	)
	const {
		records: movementsKardex,
		loading: movementsLoading,
		error: movementsError,
		refetchRecords,
	} = useKardex(paginationParams)

	const { isRefreshing, handleRefresh } = useGenericRefresh(refetchRecords)

	if (movementsError) {
		return (
			<div className='flex flex-1 flex-col items-center justify-center space-y-6'>
				<FatalErrorState />
			</div>
		)
	}

	const product = movementsKardex?.data?.items?.[0]?.product

	return (
		<div className='flex flex-1 flex-col space-y-6'>
			<KardexHeader
				title={product ? `${product.name}` : 'Detalle de Kardex'}
				subtitle='Detalle de movimientos de Kardex'
				product={product}
			/>
			<KardexFilters
				searchValue={searchTerm}
				currentSort={currentSort}
				currentMovementType={currentMovementType}
				onMovementTypeChange={handleMovementTypeChange}
				isRefreshing={isRefreshing}
				onSearchChange={handleSearchChange}
				onSort={handleSort}
				onRefresh={handleRefresh}
				onResetAll={handleResetAll}
			/>
			{/* Table */}
			{movementsLoading ? (
				<LoadingStates viewType='table' />
			) : !movementsKardex?.data?.items || movementsKardex.data.items.length === 0 ? (
				searchTerm ? (
					<EmptyState />
				) : (
					<NotFoundState />
				)
			) : (
				<TableKardex
					recordData={movementsKardex.data.items}
					loading={movementsLoading}
					viewType={'table'}
					showActions={false}
				/>
			)}
		</div>
	)
}
