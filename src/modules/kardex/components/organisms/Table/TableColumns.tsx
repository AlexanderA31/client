'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/layout/atoms/Badge'
import { I_Kardex } from '@/modules/kardex/types/kardex'
import { TableActions } from '@/modules/kardex/components/organisms/Table/TableActions'
import { TableInfoDate } from '@/modules/kardex/components/organisms/Table/TableInfoDate'
import { formatDate } from '@/common/utils/dateFormater-util'
import { formatPrice } from '@/common/utils/formatPrice-util'

interface TableColumnsProps {
	onViewDetails: (kardexData: I_Kardex) => void
}

export const createTableColumns = ({ onViewDetails }: TableColumnsProps): ColumnDef<I_Kardex>[] => [
	{
		accessorKey: 'date',
		header: 'Fecha',
		cell: ({ row }) => formatDate(row.original.date, 'es-ES', { dateStyle: 'medium' }),
	},
	{
		accessorKey: 'product',
		header: 'Producto',
		cell: ({ row }) => row.original.product.name,
	},
	{
		accessorKey: 'warehouse',
		header: 'Almacén',
		cell: ({ row }) => row.original.warehouse.name,
	},
	{
		accessorKey: 'concept',
		header: 'Concepto',
	},
	{
		accessorKey: 'type',
		header: 'Tipo',
		cell: ({ row }) => (
			<Badge
				variant={row.original.type === 'IN' ? 'success' : row.original.type === 'OUT' ? 'destructive' : 'warning'}
				text={row.original.type === 'IN' ? 'Entrada' : row.original.type === 'OUT' ? 'Salida' : 'Ajuste'}
			/>
		),
	},
	{
		accessorKey: 'quantity',
		header: 'Cantidad',
		cell: ({ row }) => <div className='text-right'>{row.original.quantity}</div>,
	},
	{
		accessorKey: 'unitPrice',
		header: 'Precio Unit.',
		cell: ({ row }) => <div className='text-right'>{formatPrice(row.original.unitPrice)}</div>,
	},
	{
		accessorKey: 'totalPrice',
		header: 'Precio Total',
		cell: ({ row }) => <div className='text-right'>{formatPrice(row.original.totalPrice)}</div>,
	},
    {
        accessorKey: 'balance',
        header: 'Saldo',
        cell: ({ row }) => <div className='text-right'>{row.original.balance}</div>,
    },
	{
		accessorKey: 'status',
		header: 'Estado',
		cell: ({ row }) => (
			<Badge
				variant={row.original.status === 'active' ? 'success' : 'warning'}
				text={row.original.status === 'active' ? 'Activo' : 'Inactivo'}
			/>
		),
	},
	{
		accessorKey: 'info',
		header: 'Información',
		cell: ({ row }) => <TableInfoDate kardexData={row.original} />,
	},
	{
		id: 'actions',
		cell: ({ row }) => (
			<div className='flex justify-end'>
				<TableActions kardexData={row.original} onViewDetails={onViewDetails} />
			</div>
		),
	},
]
