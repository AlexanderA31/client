import { useGenericApi } from '@/common/hooks/useGenericApi'
import { USER_ENDPOINTS_CONFIG } from '@/common/configs/api/user-endpoints.config'
import { I_User } from '@/modules/user/types/user'
import { I_ApiResponse, I_PaginatedResponse } from '@/common/types/api'

export const useUser = () => {
	const api = useGenericApi<I_ApiResponse<I_PaginatedResponse<I_User>>, never, never>(USER_ENDPOINTS_CONFIG)

	const query = api.buildQuery()

	return {
		users: query.data,
		loading: query.isLoading,
		error: query.error?.message,
		refetchUsers: query.refetch,
	}
}
