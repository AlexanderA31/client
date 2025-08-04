'use client'

import { I_Kardex } from '@/modules/kardex/types/kardex'
import { formatDate } from '@/common/utils/dateFormater-util'

interface Props {
	kardexData: I_Kardex
}

export const TableInfoDate = ({ kardexData }: Props) => (
	<div className='text-primary/95 space-y-1 text-xs'>
		<div>Creado: {formatDate(kardexData.createdAt)}</div>
		<div>Editado: {formatDate(kardexData.updatedAt)}</div>
	</div>
)