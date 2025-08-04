import { ApiConfig } from '@/common/types/api'
import { ENDPOINT_API } from '@/common/constants/APIEndpoint-const'

export const USER_ENDPOINTS_CONFIG: ApiConfig = {
	queryKey: [ENDPOINT_API.USER],
	baseEndpoint: `/${ENDPOINT_API.USER}`,
	endpoints: {
		list: { path: '', method: 'GET' },
        getById: { path: '/:id', method: 'GET', params: ['id'] },
	},
}
