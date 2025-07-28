import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().nullable(),
  status: z.enum(['draft', 'active', 'inactive', 'discontinued', 'out_of_stock']).default('draft'),
  price: z.preprocess((val) => Number(val), z.number().positive('El precio debe ser un número positivo').max(999999.999999, 'El precio es demasiado grande')),
  sku: z.string().max(20, 'SKU no puede tener más de 20 caracteres').nullable(),
  barCode: z.string().max(50, 'El código de barras no puede tener más de 50 caracteres').nullable(),
  stock: z.preprocess((val) => Number(val), z.number().int('El stock debe ser un número entero').positive('El stock debe ser un número positivo').default(0)),
  categoryId: z.string().nullable(),
  brandId: z.string().nullable(),
  supplierId: z.string().nullable(),
  photo: z.any().nullable(),
});
