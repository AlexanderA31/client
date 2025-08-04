'use client'

import { I_Kardex } from '@/modules/kardex/types/kardex'
import { formatDate } from '@/common/utils/dateFormater-util'

export function TableInfoDate({ kardexData }: { kardexData: I_Kardex }) {
	return (
		<div className='text-primary/95 space-y-1 text-xs'>
			<div>Creado: {formatDate(kardexData.createdAt, 'es-ES', { dateStyle: 'long', timeStyle: 'short' })}</div>
			<div>Editado: {formatDate(kardexData.updatedAt, 'es-ES', { dateStyle: 'long', timeStyle: 'short' })}</div>
            {kardexData.deletedAt && (
                <div className='text-destructive'>
                    Eliminado: {formatDate(kardexData.deletedAt, 'es-ES', { dateStyle: 'long', timeStyle: 'short' })}
                </div>
            )}
		</div>
	)
}
