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

import { useMemo } from 'react'

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

	// ✅ CORRECCIÓN: Convertir sort de string a formato objeto
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

	// ✅ Parámetro de búsqueda
	if (paginationParams.search && paginationParams.search.trim()) queryParams.search = paginationParams.search.trim()

	// ✅ Usa el query dinámico con los parámetros de paginación
	const query = api.buildQuery(queryParams)

	const getPaginatedSuppliers = useMemo(() => {
		if (query.data) {
			return {
				data: {
					items: query.data.items,
					pagination: query.data.pagination,
				},
			}
		}
		return { data: { items: [], pagination: undefined } }
	}, [query.data])

	return {
		// Datos del query - manteniendo los mismos nombres
		suppliers: query.data,
		paginatedSuppliers: getPaginatedSuppliers,
		loading: query.isLoading,
		error: query.error?.message,

		// Funciones - manteniendo los mismos nombres
		refetchSuppliers: query.refetch,

		// Funciones CRUD - manteniendo los mismos nombres
		createSupplier: api.create,
		updateSupplier: api.update,
		restoreSupplier: api.restore,
		softDeleteSupplier: api.delete,
		hardDeleteSupplier: api.hardDelete,

		// Estados granulares de loading - manteniendo los mismos nombres
		isCreating: api.isCreating,
		isUpdating: api.isUpdating,
		isRestoring: api.isRestoring,
		isSoftDeleting: api.isDeleting,
		isHardDeleting: api.isHardDeleting,

		// Mutations para control avanzado - ahora completamente dinámicas
		mutations: api.mutations, // Contiene todas las mutations configuradas

		// Funciones adicionales del API genérico - manteniendo los mismos nombres
		executeCustomEndpoint: api.executeCustomEndpoint,
		apiService: api.apiService,
	}
}
