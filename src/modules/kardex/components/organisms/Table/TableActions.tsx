'use client'

import { Icons } from '@/components/icons'
import { I_Kardex } from '@/modules/kardex/types/kardex'
import { ActionButton } from '@/components/layout/atoms/ActionButton'

interface Props {
	kardexData: I_Kardex
	onViewDetails: (kardexData: I_Kardex) => void
}

export const TableActions = ({ kardexData, onViewDetails }: Props) => (
	<ActionButton
		icon={<Icons.eye />}
		variant='ghost'
		tooltip='Ver Detalles'
		size='icon'
		className='rounded-full'
        onClick={() => onViewDetails(kardexData)}
	/>
)
