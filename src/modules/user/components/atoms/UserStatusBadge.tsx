'use client'

import { Badge } from '@/components/layout/atoms/Badge'
import { I_User } from '@/modules/user/types/user'

export const UserStatusBadge = ({ status }: { status: I_User['status']['name'] }) => {
	const statusMap = {
		active: { text: 'Activo', variant: 'success' },
		inactive: { text: 'Inactivo', variant: 'error' },
	} as const

	return (
		<Badge
			decord={false}
			variant={statusMap[status]?.variant || 'error'}
			text={statusMap[status]?.text || 'Desconocido'}
		/>
	)
}
