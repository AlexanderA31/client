// Assuming Product and Warehouse types are defined elsewhere and can be imported.
// For now, defining simple reference types.
interface I_ProductReference {
    id: string;
    name: string;
    code?: string;
}

interface I_WarehouseReference {
    id: string;
    name: string;
}

interface I_UserReference {
    id: string;
    name: string;
}

/**
 * Represents a single entry in the Kardex (inventory log).
 */
export interface I_Kardex {
    id: string;
    product: I_ProductReference;
    movementType: 'PURCHASE' | 'RETURN_IN' | 'TRANSFER_IN' | 'SALE' | 'RETURN_OUT' | 'TRANSFER_OUT' | 'ADJUSTMENT_IN' | 'ADJUSTMENT_OUT' | 'DAMAGED' | 'EXPIRED';
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
    status?: string; // This was in the old definition, I'll keep it for now.
    warehouse?: I_WarehouseReference; // Making this optional to avoid crashes.
    concept?: string; // This was in the old definition, I'll keep it for now.
    type?: 'IN' | 'OUT' | 'ADJUSTMENT'; // This was in the old definition, I'll keep it for now.
    unitPrice?: number; // This was in the old definition, I'll keep it for now.
    totalPrice?: number; // This was in the old definition, I'll keep it for now.
    balance?: number; // This was in the old definition, I'll keep it for now.
    date?: string; // This was in the old definition, I'll keep it for now.
}

/**
 * Data Transfer Object for creating a new Kardex entry.
 */
export interface I_CreateKardex {
    productId: string;
    warehouseId: string;
    date: string;
    type: 'IN' | 'OUT' | 'ADJUSTMENT';
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
