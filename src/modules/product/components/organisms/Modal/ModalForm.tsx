'use client'

import { z } from 'zod'
import { useEffect } from 'react'
import { Icons } from '@/components/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { I_Product } from '@/modules/product/types/product'
import { ActionButton } from '@/components/layout/atoms/ActionButton'
import { UniversalFormField } from '@/components/layout/atoms/FormFieldZod'
import { FormFooter } from '@/modules/product/components/organisms/Modal/FormFooter'
import { useProductForm } from '@/modules/product/hooks/useProductForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet'
import { SelectFieldZod } from '@/components/layout/atoms/SelectFieldZod'
import { TextareaFieldZod } from '@/components/layout/atoms/TextareaFieldZod'
import { FileUpload } from '@/components/layout/atoms/FileUpload'

const productSchema = z.object({
  name: z.string().nonempty('El nombre es requerido'),
  description: z.string().optional(),
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: 'Debe ser un número' }).positive('Debe ser un número positivo').max(999999, 'Máximo 6 dígitos').optional()
  ),
  sku: z.string().max(20, 'Máximo 20 caracteres').optional(),
  barCode: z.string().max(50, 'Máximo 50 caracteres').optional(),
  stock: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)),
    z.number({ invalid_type_error: 'Debe ser un número' }).int('Debe ser un entero').min(0, 'Debe ser un número positivo').optional()
  ),
  status: z.enum(['draft', 'active', 'inactive', 'discontinued', 'out_of_stock']),
  categoryId: z.string().optional(),
  brandId: z.string().optional(),
  supplierId: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>

interface Props {
  isOpen: boolean
  currentRecord: I_Product | null
  onClose: () => void
  onSubmit: (data: ProductFormData) => Promise<void>
}

export function RecordFormModal({ isOpen, currentRecord, onClose, onSubmit }: Props) {
  const { categoryOptions, brandOptions, supplierOptions } = useProductForm()
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      sku: '',
      barCode: '',
      stock: 0,
      status: 'draft',
      categoryId: '',
      brandId: '',
      supplierId: '',
    },
  })

  const { handleSubmit, reset, control, formState } = methods
  const { errors, isSubmitting, isValid, isDirty } = formState

  useEffect(() => {
    if (isOpen) {
      if (currentRecord) {
        reset({
          name: currentRecord.name,
          description: currentRecord.description || '',
          price: currentRecord.price,
          sku: currentRecord.sku || '',
          barCode: currentRecord.barCode || '',
          stock: currentRecord.stock,
          status: currentRecord.status,
          categoryId: currentRecord.category?.id || '',
          brandId: currentRecord.brand?.id || '',
          supplierId: currentRecord.suppplier?.id || '',
        });
      } else {
        reset({
          name: '',
          description: '',
          price: 0,
          sku: '',
          barCode: '',
          stock: 0,
          status: 'draft',
          categoryId: '',
          brandId: '',
          supplierId: '',
        });
      }
    }
  }, [isOpen, currentRecord, reset]);

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      await onSubmit(data)
      handleClose()
    } catch (error) {
      console.error('Error al enviar formulario:', error)
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className='flex max-h-screen min-w-xl flex-col'>
        <SheetHeader className='bg-background supports-[backdrop-filter]:bg-background/80 sticky top-0 z-10 border-b supports-[backdrop-filter]:backdrop-blur-sm'>
          <div className='flex items-center justify-between'>
            <SheetTitle>{currentRecord ? 'Editar producto' : 'Crear producto'}</SheetTitle>
            <SheetClose>
              <ActionButton
                type='button'
                variant='ghost'
                onClick={handleClose}
                size='icon'
                disabled={isSubmitting}
                icon={<Icons.x className='h-4 w-4' />}
              />
            </SheetClose>
          </div>
          <SheetDescription>
            {currentRecord ? 'Modifica los campos del producto existente' : 'Completa los campos para crear un nuevo producto'}
          </SheetDescription>
        </SheetHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='flex-1 space-y-6 overflow-auto p-4'>
            <Card className='border-none bg-transparent p-0 shadow-none'>
              <CardHeader className='p-0'>
                <CardTitle className='flex items-center gap-2 text-lg'>
                  <Icons.infoCircle className='h-4 w-4' />
                  Información básica
                </CardTitle>
                <CardDescription>Datos básicos del producto</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4 p-0'>
                <UniversalFormField control={control} name='name' label='Nombre' placeholder='Ej. Camiseta de algodón' type='text' required />
                <TextareaFieldZod control={control} name='description' label='Descripción' placeholder='Ej. Camiseta de algodón peinado, suave al tacto...' />
                <UniversalFormField control={control} name='price' label='Precio' placeholder='Ej. 25.99' type='number' required />
                <UniversalFormField control={control} name='sku' label='SKU' placeholder='Ej. CAM-ALG-001' type='text' />
                <UniversalFormField control={control} name='barCode' label='Código de barras' placeholder='Ej. 7861234567890' type='text' />
                <UniversalFormField control={control} name='stock' label='Stock' placeholder='Ej. 100' type='number' required />
                <SelectFieldZod
                  control={control}
                  name='status'
                  label='Estado'
                  options={[
                    { value: 'draft', label: 'Borrador' },
                    { value: 'active', label: 'Activo' },
                    { value: 'inactive', label: 'Inactivo' },
                    { value: 'discontinued', label: 'Descontinuado' },
                    { value: 'out_of_stock', label: 'Agotado' },
                  ]}
                  required
                />
                <SelectFieldZod control={control} name='categoryId' label='Categoría' options={categoryOptions || []} placeholder='Seleccionar categoría' />
                <SelectFieldZod control={control} name='brandId' label='Marca' options={brandOptions || []} placeholder='Seleccionar marca' />
                <SelectFieldZod control={control} name='supplierId' label='Proveedor' options={supplierOptions || []} placeholder='Seleccionar proveedor' />
                <FileUpload
                  label='Foto del producto'
                  onFileSelect={(file) => console.log(file)}
                  accept='image/*'
                />
              </CardContent>
            </Card>
          </form>
        </FormProvider>
        <FormFooter
          formState={formState}
          errors={errors}
          isValid={isValid}
          isDirty={isDirty}
          currentRecord={currentRecord}
          onClose={handleClose}
          onSubmit={handleSubmit(handleFormSubmit)}
        />
      </SheetContent>
    </Sheet>
  )
}
