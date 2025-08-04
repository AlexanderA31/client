import { Pagination } from '@/modules/kardex/types/pagination'

export const SORT_OPTIONS = [
	{ label: 'Fecha reciente', field: 'date', order: 'desc', key: 'date:desc' },
	{ label: 'Fecha antigua', field: 'date', order: 'asc', key: 'date:asc' },
    { label: 'Producto (A-Z)', field: 'product.name', order: 'asc', key: 'product.name:asc' },
    { label: 'Producto (Z-A)', field: 'product.name', order: 'desc', key: 'product.name:desc' },
    { label: 'Almacén (A-Z)', field: 'warehouse.name', order: 'asc', key: 'warehouse.name:asc' },
    { label: 'Almacén (Z-A)', field: 'warehouse.name', order: 'desc', key: 'warehouse.name:desc' },
]

export const INITIAL_PAGINATION: Pagination = {
	page: 1,
	limit: 10,
	filters: {},
	sort: [],
	search: '',
}

export const KARDEX_TYPE_OPTIONS = [
    { label: 'Todos', value: ''},
    { label: 'Compra de mercancía desde proveedor', value: 'purchase' },
    { label: 'Devolución de cliente', value: 'return_in' },
    { label: 'Transferencia entrante desde otro almacén', value: 'transfer_in' },
    { label: 'Venta de mercancía a cliente', value: 'sale' },
    { label: 'Devolución a proveedor', value: 'return_out' },
    { label: 'Transferencia saliente hacia otro almacén', value: 'transfer_out' },
    { label: 'Ajuste manual positivo', value: 'adjustment_in' },
    { label: 'Ajuste manual negativo', value: 'adjustment_out' },
    { label: 'Mercancía dañada', value: 'damaged' },
    { label: 'Mercancía vencida', value: 'expired' },
]
