'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icons } from '@/components/icons'
import { I_Category } from '@/modules/category/types/category'
import { ActionButton } from '@/components/layout/atoms/ActionButton'

interface Props {
	categoryData: I_Category
	onEdit: (categoryData: I_Category) => void
	onHardDelete: (categoryData: I_Category) => void
	onViewDetails?: () => void
}

export const TableActions = ({ categoryData, onEdit, onHardDelete, onViewDetails }: Props) => (
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
				onClick={() => onEdit(categoryData)}
				className='flex cursor-pointer items-center gap-2 rounded-xl'>
				<Icons.pencilMinus />
				<span>Editar</span>
			</DropdownMenuItem>

			<DropdownMenuItem onClick={onViewDetails} className='flex cursor-pointer items-center gap-2 rounded-xl'>
				<Icons.eye />
				<span>Detalles</span>
			</DropdownMenuItem>

			<DropdownMenuItem
				variant='destructive'
				onClick={() => onHardDelete(categoryData)}
				className='flex cursor-pointer items-center rounded-xl'>
				<Icons.trash />
				<span>Eliminar</span>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
)
