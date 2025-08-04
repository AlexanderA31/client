'use client'

import { Icons } from '@/components/icons'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { I_Kardex } from '@/modules/kardex/types/kardex'

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
				<Button
					variant='ghost'
					className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
					onClick={(e) => e.stopPropagation()}
				>
					<Icons.ellipsis className='h-4 w-4' />
					<span className='sr-only'>Abrir menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[160px]' onClick={(e) => e.stopPropagation()}>
				<DropdownMenuItem onClick={() => onViewDetails(kardexData)}>
					<Icons.eye className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
					Detalles
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleReportsClick}>
					<Icons.report className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
					Reportes
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
