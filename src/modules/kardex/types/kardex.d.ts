import { I_ProductReference, I_WarehouseReference, I_UserReference } from '@/modules/kardex/types/kardex-references.d'
import { KardexMovementType } from '@/modules/kardex/types/kardex-movement-type.d'

/**
 * Represents a single entry in the Kardex (inventory log).
 */
export interface I_Kardex {
    id: string;
    product: I_ProductReference;
    type: KardexMovementType;
    quantity: number;
    unitCost: number;
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    total: number;
    stockBefore: number;
    stockAfter: number;
    user: I_UserReference;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    status?: string;
    warehouse?: I_WarehouseReference;
    concept?: string;
    unitPrice?: number;
    totalPrice?: number;
    balance?: number;
    date?: string;
}

/**
 * Data Transfer Object for creating a new Kardex entry.
 */
export interface I_CreateKardex {
    productId: string;
    warehouseId: string;
    date: string;
    type: KardexMovementType;
    concept: string;
    quantity: number;
    unitPrice: number;
    userId: string;
}

/**
 * Data Transfer Object for updating a Kardex entry.
 * Note: Updating historical inventory records is generally discouraged.
 */
export interface I_UpdateKardex {
    concept?: string;
    // Other updatable fields...
}
