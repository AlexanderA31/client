import { ApiConfig } from '@/common/types/api'
import { ENDPOINT_API } from '@/common/constants/APIEndpoint-const'

export const KARDEX_ENDPOINTS_CONFIG: ApiConfig = {
	queryKey: [ENDPOINT_API.KARDEX],
	baseEndpoint: `/${ENDPOINT_API.KARDEX}`,
	endpoints: {
		list: { path: '', method: 'GET' },
        getById: { path: '/:id', method: 'GET', params: ['id'] },
		lasted: { path: '/lasted', method: 'GET' },
	},
}
