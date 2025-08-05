import { useGenericApi } from '@/common/hooks/useGenericApi'
import { ROLE_ENDPOINTS_CONFIG } from '@/common/configs/api/role-endpoints.config'
import { I_PaginatedResponse } from '@/common/types/api'

export interface I_Role {
    id: string;
    name: string;
}

export const useRole = () => {
	const api = useGenericApi<I_PaginatedResponse<I_Role>, never, never>(ROLE_ENDPOINTS_CONFIG)

	const {
		data: recordsData,
		isLoading: loading,
		error,
		refetch: refetchRecords,
	} = api.buildQuery()

	return {
		recordsData,
		loading,
		error: error?.message,
		refetchRecords,
	}
}
