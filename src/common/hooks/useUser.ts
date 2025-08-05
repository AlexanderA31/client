import { useGenericApi } from '@/common/hooks/useGenericApi'
import { USER_ENDPOINTS_CONFIG } from '@/common/configs/api/user-endpoints.config'
import { I_User, I_CreateUser, I_UpdateUser } from '@/modules/user/types/user'
import { I_PaginatedResponse } from '@/common/types/api'
import { I_PaginationParams } from '@/common/types/pagination'

export const useUser = (paginationParams?: I_PaginationParams) => {
	console.log('paginationParams', paginationParams)
	const api = useGenericApi<I_PaginatedResponse<I_User>, I_CreateUser, I_UpdateUser>(USER_ENDPOINTS_CONFIG)

	const {
		data: recordsData,
		isLoading: loading,
		error,
		refetch: refetchRecords,
	} = api.buildQuery(paginationParams)

	const createRecord = api.mutations.create.mutateAsync
	const updateRecord = api.mutations.update.mutateAsync
	const hardDeleteRecord = api.mutations.delete.mutateAsync

	const getUserById = async (id: string) => {
		const response = await api.apiService.getById(id)
		return response.data
	}

	return {
		recordsData,
		loading,
		error: error?.message,
		refetchRecords,
		createRecord,
		updateRecord,
		hardDeleteRecord,
		getUserById,
	}
}
