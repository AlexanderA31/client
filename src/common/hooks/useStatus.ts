import { useGenericApi } from '@/common/hooks/useGenericApi'
import { STATUS_ENDPOINTS_CONFIG } from '@/common/configs/api/status-endpoints.config'
import { I_PaginatedResponse } from '@/common/types/api'

export interface I_Status {
    id: string;
    name: string;
}

export const useStatus = () => {
	const api = useGenericApi<I_PaginatedResponse<I_Status>, never, never>(STATUS_ENDPOINTS_CONFIG)

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
