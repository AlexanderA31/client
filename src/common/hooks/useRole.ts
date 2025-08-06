import { roles } from '@/common/constants/data/roles-data'
import { I_Role } from '@/common/types/roles'

export const useRole = () => {
	const refetchRecords = () => {
		console.log('Refetching records...')
	}
	return {
		recordsData: roles,
		loading: false,
		error: null,
		refetchRecords,
	}
}

export type { I_Role }
