import { ApiConfig } from '@/common/types/api'
import { ENDPOINT_API } from '@/common/constants/APIEndpoint-const'

export const ROLE_ENDPOINTS_CONFIG: ApiConfig = {
	queryKey: [ENDPOINT_API.ROLES],
	baseEndpoint: `/${ENDPOINT_API.ROLES}`,
	endpoints: {
		list: { path: '', method: 'GET' },
	},
}
