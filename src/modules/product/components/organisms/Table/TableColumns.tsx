'use client'

import { Icons } from '@/components/icons'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/layout/atoms/Badge'
import { I_Product } from '@/modules/product/types/product'
import { ActionButton } from '@/components/layout/atoms/ActionButton'
import { TableActions } from '@/modules/product/components/organisms/Table/TableActions'
import { TableInfoDate } from '@/modules/product/components/organisms/Table/TableInfoDate'
import { ProductImage } from '@/modules/product/components/molecules/ProductImage'
import { ProductStatusBadge } from '../../atoms/ProductStatusBadge'

interface Props {
	onEdit: (recordData: I_Product) => void
	onHardDelete: (recordData: I_Product) => void
}

export const createTableColumns = ({ onEdit, onHardDelete }: Props): ColumnDef<I_Product>[] => [
	{
		accessorKey: 'photo',
		header: ({ column }) => (
			<ActionButton
				variant='link'
				size='xs'
				className='p-0'
				text={
					<div className='text-muted-foreground hover:text-primary/95 flex items-center'>
						Imagen
						{column.getIsSorted() === 'asc' ? (
							<Icons.sortAscendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : column.getIsSorted() === 'desc' ? (
							<Icons.sortDescendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : null}
					</div>
				}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			/>
		),
		cell: ({ row }) => (
			<div className='line-clamp-2 w-auto max-w-fit overflow-hidden text-ellipsis whitespace-normal'>
				<ProductImage recordData={row.original} enableHover={false} enableClick={false} />
			</div>
		),
	},
	{
		accessorKey: 'code',
		header: ({ column }) => (
			<ActionButton
				variant='link'
				size='xs'
				className='p-0'
				text={
					<div className='text-muted-foreground hover:text-primary/95 flex items-center'>
						Código
						{column.getIsSorted() === 'asc' ? (
							<Icons.sortAscendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : column.getIsSorted() === 'desc' ? (
							<Icons.sortDescendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : null}
					</div>
				}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			/>
		),
		cell: ({ row }) => <div className='max-w-96 truncate'>{row.original.code}</div>,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<ActionButton
				variant='link'
				size='xs'
				className='p-0'
				text={
					<div className='text-muted-foreground hover:text-primary/95 flex items-center'>
						Nombre
						{column.getIsSorted() === 'asc' ? (
							<Icons.sortAscendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : column.getIsSorted() === 'desc' ? (
							<Icons.sortDescendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : null}
					</div>
				}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			/>
		),
		cell: ({ row }) => <div className='max-w-96 truncate'>{row.original.name}</div>,
	},
	{
		accessorKey: 'price',
		header: ({ column }) => (
			<ActionButton
				variant='link'
				size='xs'
				className='p-0'
				text={
					<div className='text-muted-foreground hover:text-primary/95 flex items-center'>
						Precio base
						{column.getIsSorted() === 'asc' ? (
							<Icons.sortAscendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : column.getIsSorted() === 'desc' ? (
							<Icons.sortDescendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : null}
					</div>
				}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			/>
		),
		cell: ({ row }) => <div className='max-w-96 truncate'>$ {row.original.price}</div>,
	},
	{
		accessorKey: 'barCode',
		header: ({ column }) => (
			<ActionButton
				variant='link'
				size='xs'
				className='p-0'
				text={
					<div className='text-muted-foreground hover:text-primary/95 flex items-center'>
						Código barras
						{column.getIsSorted() === 'asc' ? (
							<Icons.sortAscendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : column.getIsSorted() === 'desc' ? (
							<Icons.sortDescendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : null}
					</div>
				}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			/>
		),
		cell: ({ row }) => <div className='max-w-96 truncate'>{row.original.barCode}</div>,
	},
	{
		accessorKey: 'stock',
		header: ({ column }) => (
			<ActionButton
				variant='link'
				size='xs'
				className='p-0'
				text={
					<div className='text-muted-foreground hover:text-primary/95 flex items-center'>
						Stock
						{column.getIsSorted() === 'asc' ? (
							<Icons.sortAscendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : column.getIsSorted() === 'desc' ? (
							<Icons.sortDescendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : null}
					</div>
				}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			/>
		),
		cell: ({ row }) => <div className='max-w-96 truncate font-semibold'>{row.original.stock}</div>,
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<ActionButton
				variant='link'
				size='xs'
				className='p-0'
				text={
					<div className='text-muted-foreground hover:text-primary/95 flex items-center'>
						Requerido
						{column.getIsSorted() === 'asc' ? (
							<Icons.sortAscendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : column.getIsSorted() === 'desc' ? (
							<Icons.sortDescendingLetters className='ml-1 h-4 w-4 transition-all duration-500' />
						) : null}
					</div>
				}
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			/>
		),
		cell: ({ row }) => (
			<div className='max-w-56 truncate'>
				<ProductStatusBadge status={row.original.status} />
			</div>
		),
	},
	{
		accessorKey: 'date',
		header: 'Información',
		cell: ({ row }) => <TableInfoDate recordData={row.original} />,
	},
	{
		id: 'actions',
		cell: ({ row }) => (
			<div className='flex justify-end'>
				<TableActions recordData={row.original} onEdit={onEdit} onHardDelete={onHardDelete} />
			</div>
		),
	},
]
