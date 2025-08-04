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
    // ENTRADAS PRINCIPALES
    { label: '🛒 Compra a proveedor', value: 'purchase' },
    { label: '🔄 Devolución de cliente', value: 'return_in' },
    { label: '🚚 Transferencia entrante', value: 'transfer_in' },

    // SALIDAS PRINCIPALES
    { label: '💰 Venta a cliente', value: 'sale' },
    { label: '📦 Devolución a proveedor', value: 'return_out' },
    { label: '🚚 Transferencia saliente', value: 'transfer_out' },

    // AJUSTES DE INVENTARIO
    { label: '➕ Ajuste positivo', value: 'adjustment_in' },
    { label: '➖ Ajuste negativo', value: 'adjustment_out' },

    // PÉRDIDAS NO OPERACIONALES
    { label: '🧃 Mercancía dañada', value: 'damaged' },
    { label: '⏳ Mercancía vencida', value: 'expired' },
]
