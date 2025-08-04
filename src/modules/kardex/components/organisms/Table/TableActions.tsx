'use client'

import { Icons } from '@/components/icons'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { I_Kardex } from '@/modules/kardex/types/kardex'
import { ActionButton } from '@/components/layout/atoms/ActionButton'

interface Props {
	kardexData: I_Kardex
	onViewDetails: (kardexData: I_Kardex) => void
}

export const TableActions = ({ kardexData, onViewDetails }: Props) => {
	const handleReportsClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		// Lógica para reportes
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<ActionButton
					icon={<Icons.dotsVertical />}
					variant='ghost'
					tooltip='Ver Acciones'
					size='icon'
					className='rounded-full'
				/>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end' className='border-border/50 rounded-2xl border'>
				<DropdownMenuItem
					onClick={() => onViewDetails(kardexData)}
					className='flex cursor-pointer items-center gap-2 rounded-xl'>
					<Icons.eye />
					<span>Detalles</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={handleReportsClick}
					className='flex cursor-pointer items-center gap-2 rounded-xl'>
					<Icons.report />
					<span>Reportes</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
