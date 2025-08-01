import { ApiConfig } from '@/common/types/api'
import { ENDPOINT_API } from '@/common/constants/APIEndpoint-const'

export const PRODUCT_ENDPOINTS_CONFIG: ApiConfig = {
	queryKey: [ENDPOINT_API.PRODUCT],
	baseEndpoint: `/${ENDPOINT_API.PRODUCT}`,
	extraInvalidateKeys: [[ENDPOINT_API.TEMPLATE]],
	successMessages: {
		create: 'Producto creado exitosamente',
		update: 'Producto actualizado exitosamente',
		restore: 'Producto restaurado exitosamente',
		softDelete: 'Producto removido exitosamente',
		hardDelete: 'Producto eliminado permanentemente',
	},
	endpoints: {
		list: { path: '', method: 'GET' },
		create: { path: '', method: 'POST' },
		update: { path: '/:id', method: 'PUT', params: ['id'] },
		softDelete: { path: '/:id', method: 'DELETE', params: ['id'] },
		restore: { path: '/:id/restore', method: 'PATCH', params: ['id'] },
		hardDelete: { path: '/:id/hard-delete', method: 'DELETE', params: ['id'] },
	},
}
