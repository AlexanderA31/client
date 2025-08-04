import { Pagination } from '@/modules/kardex/types/pagination'

export const SORT_OPTIONS = [
	{ label: 'Fecha reciente', field: 'date', order: 'desc', key: 'date:desc' },
	{ label: 'Fecha antigua', field: 'date', order: 'asc', key: 'date:asc' },
    { label: 'Producto (A-Z)', field: 'productName', order: 'asc', key: 'productName:asc' },
    { label: 'Producto (Z-A)', field: 'productName', order: 'desc', key: 'productName:desc' },
    { label: 'Almacén (A-Z)', field: 'warehouseName', order: 'asc', key: 'warehouseName:asc' },
    { label: 'Almacén (Z-A)', field: 'warehouseName', order: 'desc', key: 'warehouseName:desc' },
]

export const INITIAL_PAGINATION: Pagination = {
	page: 1,
	limit: 10,
	filters: {},
	sort: [],
	search: '',
}

export const KARDEX_TYPE_OPTIONS = [
	{ label: 'Todos', value: '' },
	{ label: 'Compra', value: 'PURCHASE' },
	{ label: 'Devolución de cliente', value: 'RETURN_IN' },
	{ label: 'Transferencia entrante', value: 'TRANSFER_IN' },
	{ label: 'Venta', value: 'SALE' },
	{ label: 'Devolución a proveedor', value: 'RETURN_OUT' },
	{ label: 'Transferencia saliente', value: 'TRANSFER_OUT' },
	{ label: 'Ajuste positivo', value: 'ADJUSTMENT_IN' },
	{ label: 'Ajuste negativo', value: 'ADJUSTMENT_OUT' },
	{ label: 'Dañado', value: 'DAMAGED' },
	{ label: 'Vencido', value: 'EXPIRED' },
]
