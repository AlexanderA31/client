import { I_Role } from '@/common/types/roles'

export const roles = {
	data: {
		items: [
			{
				id: '1',
				name: 'admin',
			},
			{
				id: '2',
				name: 'manager',
			},
			{
				id: '3',
				name: 'cashier',
			},
			{
				id: '4',
				name: 'customer',
			},
		] as I_Role[],
		meta: {
			totalRecords: 4,
			totalPages: 1,
			currentPage: 1,
			pageSize: 10,
		},
	},
}
