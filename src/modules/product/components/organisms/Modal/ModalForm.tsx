'use client'

import { z } from 'zod'
import { useEffect } from 'react'
import { Icons } from '@/components/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { productSchema } from '@/modules/product/validators/product.schema'

import { AlertMessage } from '@/components/layout/atoms/Alert'
import { I_Product } from '@/modules/product/types/product'
import { ActionButton } from '@/components/layout/atoms/ActionButton'
import { UniversalFormField } from '@/components/layout/atoms/FormFieldZod'
import { FormFooter } from '@/modules/product/components/organisms/Modal/FormFooter'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet'
import { FileUpload } from '@/components/ui/file-upload'
import { useCategory } from '@/common/hooks/useCategory'
import { useBrand } from '@/common/hooks/useBrand'
import { useSupplier } from '@/common/hooks/useSupplier'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export type productFormData = z.infer<typeof productSchema>

interface Props {
	isOpen: boolean
	currentRecord: I_Product | null
	onClose: () => void
	onSubmit: (data: productFormData) => Promise<void>
}

export function RecordFormModal({ isOpen, currentRecord, onClose, onSubmit }: Props) {
	const methods = useForm<productFormData>({
		resolver: zodResolver(productSchema),
		mode: 'onChange',
	})

	const { handleSubmit, reset, control, formState } = methods
	const { errors, isSubmitting, isValid, isDirty } = formState

    const { recordsData: categories } = useCategory({ limit: 100 });
    const { recordsData: brands } = useBrand({ limit: 100 });
    const { recordsData: suppliers } = useSupplier({ limit: 100 });

	useEffect(() => {
		if (isOpen && currentRecord) {
			reset({
				name: currentRecord.name || '',
				description: currentRecord.description || '',
				status: currentRecord.status || 'draft',
				price: currentRecord.price || 0,
				sku: currentRecord.sku || '',
				barCode: currentRecord.barCode || '',
				stock: currentRecord.stock || 0,
				categoryId: currentRecord.category?.id || null,
				brandId: currentRecord.brand?.id || null,
				supplierId: currentRecord.suppplier?.id || null,
                photo: currentRecord.photo || null,
			})
		} else if (isOpen && !currentRecord) {
			reset({
				name: '',
				description: '',
				status: 'draft',
				price: 0,
				sku: '',
				barCode: '',
				stock: 0,
				categoryId: null,
				brandId: null,
				supplierId: null,
                photo: null,
			})
		}
	}, [isOpen, currentRecord, reset])

	const handleFormSubmit = async (data: productFormData) => {
		try {
			await onSubmit(data)
			reset()
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
								onClick={onClose}
								size='icon'
								disabled={isSubmitting}
								icon={<Icons.x className='h-4 w-4' />}
							/>
						</SheetClose>
					</div>
					<SheetDescription>
						{currentRecord
							? 'Modifica los campos del producto existente'
							: 'Completa los campos para crear un nuevo producto'}
					</SheetDescription>
				</SheetHeader>

				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(handleFormSubmit)} className='flex-1 space-y-6 overflow-auto p-4'>
						<AlertMessage
							message={
								currentRecord
									? 'Modifica los campos necesarios y guarda los cambios para actualizar este producto.'
									: 'Completa el formulario para crear un nuevo producto.'
							}
							variant='info'
						/>

						<Card className='border-none bg-transparent p-0 shadow-none'>
							<CardHeader className='p-0'>
								<CardTitle className='flex items-center gap-2 text-lg'>
									<Icons.infoCircle className='h-4 w-4' />
									Información básica
								</CardTitle>
								<CardDescription>Datos básicos del producto</CardDescription>
							</CardHeader>

							<CardContent className='space-y-4 p-0'>
								<UniversalFormField control={control} name='name' label='Nombre' placeholder='Ej. Camiseta de algodón' type='text' required={true} />
								<UniversalFormField control={control} name='description' label='Descripción' placeholder='Ej. Camiseta de algodón suave y cómoda' type='textarea' />
                                <FormField
                                    control={control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Estado</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona un estado" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="draft">Borrador</SelectItem>
                                                    <SelectItem value="active">Activo</SelectItem>
                                                    <SelectItem value="inactive">Inactivo</SelectItem>
                                                    <SelectItem value="discontinued">Discontinuado</SelectItem>
                                                    <SelectItem value="out_of_stock">Agotado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
								<UniversalFormField control={control} name='price' label='Precio' placeholder='Ej. 25.99' type='number' required={true} />
								<UniversalFormField control={control} name='sku' label='SKU' placeholder='Ej. CAM-ALG-001' type='text' />
								<UniversalFormField control={control} name='barCode' label='Código de barras' placeholder='Ej. 7861234567890' type='text' />
								<UniversalFormField control={control} name='stock' label='Stock' placeholder='Ej. 100' type='number' required={true} />
                                <FormField
                                    control={control}
                                    name="photo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Foto</FormLabel>
                                            <FormControl>
                                                <FileUpload
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Categoría</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona una categoría" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories?.data.items.map((category) => (
                                                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="brandId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Marca</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona una marca" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {brands?.data.items.map((brand) => (
                                                        <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="supplierId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Proveedor</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona un proveedor" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {suppliers?.data.items.map((supplier) => (
                                                        <SelectItem key={supplier.id} value={supplier.id}>{supplier.legalName}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
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
