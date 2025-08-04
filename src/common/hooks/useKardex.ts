import { useGenericApi } from '@/common/hooks/useGenericApi'
import { KARDEX_ENDPOINTS_CONFIG } from '@/common/configs/api/kardex-endpoints.config'
import { I_Kardex } from '@/modules/kardex/types/kardex'
import { I_ApiResponse, I_PaginatedResponse } from '@/common/types/api'
import { useCallback } from 'react'

interface UseKardexParams {
	page?: number
	limit?: number
	search?: string
	filters?: Record<string, string>
	sort?: Array<{ orderBy: keyof I_Kardex; order: 'asc' | 'desc' }>
}

export const useKardex = (paginationParams: UseKardexParams = {}) => {
	const api = useGenericApi<I_ApiResponse<I_PaginatedResponse<I_Kardex>>, never, never>(KARDEX_ENDPOINTS_CONFIG)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const queryParams: Record<string, any> = {}

	if (paginationParams.page !== undefined) queryParams.page = paginationParams.page
	if (paginationParams.limit !== undefined) queryParams.limit = paginationParams.limit

	if (paginationParams.filters && Object.keys(paginationParams.filters).length > 0)
		queryParams.filters = JSON.stringify(paginationParams.filters)

	if (paginationParams.sort && paginationParams.sort.length > 0) {
		queryParams.sort = JSON.stringify(paginationParams.sort)
	}

	if (paginationParams.search && paginationParams.search.trim()) queryParams.search = paginationParams.search.trim()

	const query = api.buildQuery(queryParams)

    const getKardexById = useCallback(
        async (id: string) => {
            const response = await api.apiService.executeRequest<I_ApiResponse<I_Kardex>>(
                KARDEX_ENDPOINTS_CONFIG.endpoints.getById,
                { urlParams: { id } }
            )
            return response.data
        },
        [api.apiService]
    )

	return {
		kardex: query.data,
		loading: query.isLoading,
		error: query.error?.message,
		refetchKardex: query.refetch,
        getKardexById,
	}
}
