'use client'

import { I_Kardex } from '@/modules/kardex/types/kardex'
import { formatDate } from '@/common/utils/dateFormater-util'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

export function TableInfoDate({ kardexData }: { kardexData: I_Kardex }) {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<span className='cursor-pointer text-xs text-muted-foreground underline'>Ver fechas</span>
			</HoverCardTrigger>
			<HoverCardContent className='w-fit' align='end'>
				<div className='flex justify-between space-x-4'>
					<div className='space-y-1'>
						<h4 className='text-sm font-semibold'>Fechas</h4>
						<p className='text-sm'>
							Creación: {formatDate(kardexData.createdAt, 'es-ES', { dateStyle: 'long', timeStyle: 'short' })}
						</p>
						<p className='text-sm'>
							Última actualización:{' '}
							{formatDate(kardexData.updatedAt, 'es-ES', { dateStyle: 'long', timeStyle: 'short' })}
						</p>
						{kardexData.deletedAt && (
							<p className='text-sm text-destructive'>
								Eliminado: {formatDate(kardexData.deletedAt, 'es-ES', { dateStyle: 'long', timeStyle: 'short' })}
							</p>
						)}
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}
