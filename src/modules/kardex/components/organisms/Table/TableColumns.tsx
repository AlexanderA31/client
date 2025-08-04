'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/layout/atoms/Badge'
import { I_Kardex } from '@/modules/kardex/types/kardex'
import { TableActions } from '@/modules/kardex/components/organisms/Table/TableActions'
import { KARDEX_TYPE_OPTIONS } from '@/modules/kardex/constants/filters.constants'
import { formatDate } from '@/common/utils/dateFormater-util'
import { formatPrice } from '@/common/utils/formatPrice-util'
import { useUser } from '@/common/hooks/useUser'
import { I_User } from '@/modules/user/types/user'
import { KardexMovementType } from '@/modules/kardex/types/kardex-movement-type'

const typeLabelMap = KARDEX_TYPE_OPTIONS.reduce((acc, option) => {
	acc[option.value] = option.label
	return acc
}, {} as Record<KardexMovementType, string>)

const getBadgeVariant = (type: KardexMovementType) => {
	switch (type) {
		case 'purchase':
		case 'return_in':
		case 'transfer_in':
		case 'adjustment_in':
			return 'success'
		case 'sale':
		case 'return_out':
		case 'transfer_out':
		case 'adjustment_out':
			return 'destructive'
		case 'damaged':
		case 'expired':
			return 'warning'
		default:
			return 'default'
	}
}

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
		accessorKey: 'type',
		header: 'Tipo Movimiento',
        cell: ({ row }) => (
            <Badge
                variant={getBadgeVariant(row.original.type)}
                text={typeLabelMap[row.original.type] || row.original.type}
            />
        )
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
        accessorKey: 'stockBefore',
        header: 'Stock Antes',
    },
    {
        accessorKey: 'stockAfter',
        header: 'Stock Después',
    },
	{
		accessorKey: 'user.id',
		header: 'Responsable',
        cell: ({ row }) => <UserNameCell userId={row.original.user.id} />
	},
    {
        accessorKey: 'updatedAt',
        header: 'Fecha Act.',
        cell: ({ row }) => formatDate(row.original.updatedAt, 'es-ES', { dateStyle: 'short', timeStyle: 'short' }),
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
