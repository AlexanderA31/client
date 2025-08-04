'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/layout/atoms/Badge'
import { I_Kardex } from '@/modules/kardex/types/kardex'
import { translateMovementType } from '@/modules/kardex/utils/movement-type-translator'
import { TableActions } from '@/modules/kardex/components/organisms/Table/TableActions'
import { formatDate } from '@/common/utils/dateFormater-util'
import { formatPrice } from '@/common/utils/formatPrice-util'
import { useUser } from '@/common/hooks/useUser'
import { I_User } from '@/modules/user/types/user'

interface TableColumnsProps {
	onViewDetails: (kardexData: I_Kardex) => void
}

const UserNameCell = ({ userId }: { userId: string }) => {
    const { users, loading } = useUser()
    if (loading) return 'Cargando...'
    const user = users?.data.items.find((user: I_User) => user.id === userId)
    return user ? user.name : 'Desconocido'
}

export const createTableColumns = ({ onViewDetails }: TableColumnsProps): ColumnDef<I_Kardex>[] => [
	{
		accessorKey: 'product.code',
		header: 'Cód. Producto',
	},
	{
		accessorKey: 'product.name',
		header: 'Producto',
	},
	{
		accessorKey: 'movementType',
		header: 'Tipo Movimiento',
		cell: ({ row }) => (
			<Badge
				variant={
					row.original.movementType.includes('in') || row.original.movementType.includes('purchase')
						? 'success'
						: row.original.movementType.includes('out') || row.original.movementType.includes('sale')
						? 'destructive'
						: 'warning'
				}
				text={translateMovementType(row.original.movementType)}
			/>
		),
	},
	{
		accessorKey: 'quantity',
		header: 'Cantidad',
	},
	{
		accessorKey: 'unitCost',
		header: 'Costo Unit.',
        cell: ({ row }) => formatPrice(row.original.unitCost)
	},
    {
        accessorKey: 'subtotal',
        header: 'Subtotal',
        cell: ({ row }) => formatPrice(row.original.subtotal)
    },
    {
        accessorKey: 'taxRate',
        header: 'Tasa Imp.',
        cell: ({ row }) => `${row.original.taxRate}%`
    },
    {
        accessorKey: 'taxAmount',
        header: 'Monto Imp.',
        cell: ({ row }) => formatPrice(row.original.taxAmount)
    },
    {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => formatPrice(row.original.total)
    },
    {
        accessorKey: 'stockAfter',
        header: 'Stock Actual',
    },
	{
		accessorKey: 'user.id',
		header: 'Responsable',
        cell: ({ row }) => <UserNameCell userId={row.original.user.id} />
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
