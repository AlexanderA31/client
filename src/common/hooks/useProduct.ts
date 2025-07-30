import api from '@/lib/axios'
import { useGenericApi } from '@/common/hooks/useGenericApi'
import { ROUTE_PATH } from '@/common//constants/routes-const'
import { PRODUCT_ENDPOINTS_CONFIG } from '@/common/configs/api/product-endpoints.config'
import { I_CreateProduct, I_Product, I_UpdateProduct, I_ProductResponse } from '@/modules/product/types/product'
import { ENDPOINT_API } from '../constants/APIEndpoint-const'
import { useCallback } from 'react'

interface Props {
	page?: number
	limit?: number
	search?: string
	filters?: Record<string, string>
	sort?: Array<{ orderBy: keyof I_Product; order: 'asc' | 'desc' }>
	// ✅ Agregar parámetro para controlar si el query debe ejecutarse automáticamente
	enabled?: boolean
}

export const useProduct = (paginationParams: Props = {}) => {
	const { enabled = true, ...restParams } = paginationParams
	const api = useGenericApi<I_ProductResponse, I_CreateProduct, I_UpdateProduct>(PRODUCT_ENDPOINTS_CONFIG)

	// ✅ Construir queryParams correctamente
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const queryParams: Record<string, any> = {}

	// Parámetros básicos
	if (restParams.page !== undefined) queryParams.page = restParams.page
	if (restParams.limit !== undefined) queryParams.limit = restParams.limit

	// ✅ Serializar filters como JSON si existe
	if (restParams.filters && Object.keys(restParams.filters).length > 0)
		queryParams.filters = JSON.stringify(restParams.filters)

	// ✅ CORRECCIÓN: Convertir sort de string a formato objeto
	if (restParams.sort && restParams.sort.length > 0) {
		const sortObjects = (restParams.sort as unknown as string[]).map(sortString => {
			const [field, order] = sortString.split(':')
			return {
				orderBy: field as keyof I_Product,
				order: (order || 'asc') as 'asc' | 'desc',
			}
		})
		queryParams.sort = JSON.stringify(sortObjects)
	}

	// ✅ Parámetro de búsqueda
	if (restParams.search && restParams.search.trim()) queryParams.search = restParams.search.trim()

	// ✅ Usa el query dinámico con los parámetros de paginación
	const query = api.buildQuery(queryParams, { enabled })
	// ✅ Memoizar la función getProductById para evitar re-creaciones
	const getProductById = useCallback(
		async (id: string) => {
			if (!id) return
			try {
				const response = await api.apiService.getById(id)
				return response.data
			} catch (error) {
				console.error(`Error fetching attribute with ID ${id}:`, error)
				throw error
			}
		},
		[api.apiService],
	)
	return {
		// Datos del query - manteniendo los mismos nombres
		products: query.data?.data,
		loading: query.isLoading,
		error: query.error?.message,

		// Funciones - manteniendo los mismos nombres
		refetchProducts: query.refetch,

		// Funciones CRUD - manteniendo los mismos nombres
		getProductById,
		createProduct: api.create,
		updateProduct: api.update,
		restoreProduct: api.restore,
		softDeleteProduct: api.delete,
		hardDeleteProduct: api.hardDelete,

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
