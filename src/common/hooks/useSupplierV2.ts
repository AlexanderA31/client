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

export const useSupplier = (paginationParams: Props = {}) => {
	const api = useGenericApi<I_SupplierResponse, I_CreateSupplier, I_UpdateSupplier>(SUPPLIER_ENDPOINTS_CONFIG)

	// ✅ Construir queryParams correctamente
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const queryParams: Record<string, any> = {}

	// Parámetros básicos
	if (paginationParams.page !== undefined) queryParams.page = paginationParams.page
	if (paginationParams.limit !== undefined) queryParams.limit = paginationParams.limit

	// ✅ Serializar filters como JSON si existe
	if (paginationParams.filters && Object.keys(paginationParams.filters).length > 0)
		queryParams.filters = JSON.stringify(paginationParams.filters)

	// ✅ Serializar sort como JSON si existe
	if (paginationParams.sort && paginationParams.sort.length > 0) {
		queryParams.sort = JSON.stringify(paginationParams.sort)
	}

	// ✅ Parámetro de búsqueda
	if (paginationParams.search && paginationParams.search.trim()) queryParams.search = paginationParams.search.trim()

	// ✅ Usa el query dinámico con los parámetros de paginación
	const query = api.buildQuery(queryParams)

	return {
		// Datos del query
		supplierData: query.data,
		loading: query.isLoading,
		error: query.error,

		// Funciones
		refetchRecords: query.refetch,

		// Funciones CRUD
		createRecord: api.create,
		updateRecord: api.update,
		restoreRecord: api.restore,
		softDeleteRecord: api.delete,
		hardDeleteRecord: api.hardDelete,

		// Estados granulares de loading
		isCreating: api.isCreating,
		isUpdating: api.isUpdating,
		isRestoring: api.isRestoring,
		isSoftDeleting: api.isDeleting,
		isHardDeleting: api.isHardDeleting,

		// Mutations para control avanzado
		mutations: api.mutations,

		// Funciones adicionales del API genérico
		executeCustomEndpoint: api.executeCustomEndpoint,
		apiService: api.apiService,
	}
}
