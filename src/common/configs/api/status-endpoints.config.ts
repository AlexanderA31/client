import { ApiConfig } from '@/common/types/api'
import { ENDPOINT_API } from '@/common/constants/APIEndpoint-const'

export const STATUS_ENDPOINTS_CONFIG: ApiConfig = {
	queryKey: [ENDPOINT_API.STATUSES],
	baseEndpoint: `/${ENDPOINT_API.STATUSES}`,
	endpoints: {
		list: { path: '', method: 'GET' },
	},
}
