import { I_Kardex } from '@/modules/kardex/types/kardex'

const movementTypeTranslations: Record<I_Kardex['movementType'], string> = {
	PURCHASE: '🛒 Compra',
	RETURN_IN: '🔄 Devolución de cliente',
	TRANSFER_IN: '🚚 Transferencia entrante',
	SALE: '💰 Venta',
	RETURN_OUT: '📦 Devolución a proveedor',
	TRANSFER_OUT: '🚚 Transferencia saliente',
	ADJUSTMENT_IN: '➕ Ajuste positivo',
	ADJUSTMENT_OUT: '➖ Ajuste negativo',
	DAMAGED: '🧃 Dañado',
	EXPIRED: '⏳ Vencido',
}

export const translateMovementType = (movementType: I_Kardex['movementType']): string => {
	return movementTypeTranslations[movementType] || movementType
}
