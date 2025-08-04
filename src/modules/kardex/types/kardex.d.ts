// Assuming Product and Warehouse types are defined elsewhere and can be imported.
// For now, defining simple reference types.
interface I_ProductReference {
    id: string;
    name: string;
}

interface I_WarehouseReference {
    id: string;
    name: string;
}

/**
 * Represents a single entry in the Kardex (inventory log).
 */
export interface I_Kardex {
    id: string;
    date: string; // ISO 8601 format
    concept: string;
    type: 'IN' | 'OUT' | 'ADJUSTMENT';
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    balance: number;
    product: I_ProductReference;
    warehouse: I_WarehouseReference;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
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
}

/**
 * Data Transfer Object for updating a Kardex entry.
 * Note: Updating historical inventory records is generally discouraged.
 */
export interface I_UpdateKardex {
    concept?: string;
    // Other updatable fields...
}
