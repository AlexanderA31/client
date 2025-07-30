import { useGenericApi } from '@/common/hooks/useGenericApi'
import { SUPPLIER_ENDPOINTS_CONFIG } from '@/common/configs/api/supplier-endpoints.config'
import { I_CreateSupplier, I_Supplier, I_UpdateSupplier, I_SupplierResponse } from '@/modules/supplier/types/supplier'

interface Props {
	page?: number
	limit?: number
	search?: string
	filters?: Record<string, string>
	sort?: Array<{ orderBy: keyof I_Supplier; order: 'asc' | 'desc' }>
}

export const useSupplierV2 = (paginationParams: Props = {}) => {
	const api = useGenericApi<I_SupplierResponse, I_CreateSupplier, I_UpdateSupplier>({
		...SUPPLIER_ENDPOINTS_CONFIG,
		baseEndpoint: '/supplier',
	})

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const queryParams: Record<string, any> = {}

	if (paginationParams.page !== undefined) queryParams.page = paginationParams.page
	if (paginationParams.limit !== undefined) queryParams.limit = paginationParams.limit

	if (paginationParams.filters && Object.keys(paginationParams.filters).length > 0)
		queryParams.filters = JSON.stringify(paginationParams.filters)

	if (paginationParams.sort && paginationParams.sort.length > 0) {
		const sortObjects = (paginationParams.sort as unknown as string[]).map(sortString => {
			const [field, order] = sortString.split(':')
			return {
				orderBy: field as keyof I_Supplier,
				order: (order || 'asc') as 'asc' | 'desc',
			}
		})
		queryParams.sort = JSON.stringify(sortObjects)
	}

	if (paginationParams.search && paginationParams.search.trim()) queryParams.search = paginationParams.search.trim()

	const query = api.buildQuery(queryParams)

	console.log('Supplier query params:', queryParams)
	console.log('Supplier query data:', query.data)

	return {
		suppliers: query.data,
		loading: query.isLoading,
		error: query.error?.message,

		refetchSuppliers: query.refetch,

		createSupplier: api.create,
		updateSupplier: api.update,
		restoreSupplier: api.restore,
		softDeleteSupplier: api.delete,
		hardDeleteSupplier: api.hardDelete,

		isCreating: api.isCreating,
		isUpdating: api.isUpdating,
		isRestoring: api.isRestoring,
		isSoftDeleting: api.isDeleting,
		isHardDeleting: api.isHardDeleting,

		mutations: api.mutations,
		executeCustomEndpoint: api.executeCustomEndpoint,
		apiService: api.apiService,
	}
}
