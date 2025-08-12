'use client'

import { z } from 'zod'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { Icons } from '@/components/icons'
import { I_Customer } from '@/common/types/modules/customer'
import { UniversalFormField } from '@/components/layout/atoms/FormFieldZod'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet'
import { ActionButton } from '@/components/layout/atoms/ActionButton'
import { FormFooter } from '@/modules/customer/components/organisms/Modal/FormFooter'

// Schema de validación
const customerSchema = z.object({
	firstName: z.string().min(1, 'El nombre es requerido'),
	lastName: z.string().min(1, 'El apellido es requerido'),
	email: z.string().email('Email inválido').optional().or(z.literal('')),
	phone: z.string().optional(),
	address: z.string().optional(),
    identificationType: z.enum(['04', '05', '06', '07']),
    identificationNumber: z.string().min(1, 'El número de identificación es requerido'),
    customerType: z.enum(['regular', 'final_consumer']),
})

export type CustomerFormData = z.infer<typeof customerSchema>

interface Props {
	isOpen: boolean
	currentCustomer: I_Customer | null
	onClose: () => void
	onSubmit: (data: CustomerFormData) => Promise<void>
}

export function CustomerFormModal({ isOpen, currentCustomer, onClose, onSubmit }: Props) {
	const methods = useForm<CustomerFormData>({
		resolver: zodResolver(customerSchema),
		mode: 'onChange',
	})

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors, isValid, isDirty },
		formState,
	} = methods

	React.useEffect(() => {
		if (isOpen && currentCustomer) {
			reset({
				firstName: currentCustomer.firstName || '',
				// ... other fields
			})
		} else if (isOpen && !currentCustomer) {
			reset({
                firstName: '',
                // ... other fields
            })
		}
	}, [isOpen, currentCustomer, reset])

	const handleFormSubmit = async (data: CustomerFormData) => {
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
			<SheetContent className='flex w-full flex-col sm:max-w-xl'>
				<SheetHeader className='bg-background supports-[backdrop-filter]:bg-background/80 sticky top-0 z-10 border-b supports-[backdrop-filter]:backdrop-blur-sm'>
					<div className='flex items-center justify-between'>
						<SheetTitle>{currentCustomer ? 'Editar Cliente' : 'Crear Cliente'}</SheetTitle>
						<SheetClose>
							<ActionButton
								type='button'
								variant='ghost'
								size='icon'
								icon={<Icons.x className='h-4 w-4' />}
							/>
						</SheetClose>
					</div>
					<SheetDescription>
						{currentCustomer
							? 'Modifica los detalles del cliente existente'
							: 'Completa los campos para crear una nueva cliente'}
					</SheetDescription>
				</SheetHeader>

				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(handleFormSubmit)} className='flex-1 space-y-4 overflow-auto p-4'>
						<Card className='border-none bg-transparent p-0 shadow-none'>
							<CardHeader className='p-0'>
								<CardTitle className='flex items-center gap-2 text-lg'>
									<Icons.infoCircle className='h-4 w-4' />
									Información Personal
								</CardTitle>
							</CardHeader>

							<UniversalFormField control={control} name='firstName' label='Nombres' placeholder='Ingresa los nombres' type='text' required />
							
						</Card>
					</form>
				</FormProvider>

				<FormFooter
					formState={formState}
					errors={errors}
					isValid={isValid}
					isDirty={isDirty}
					currentTemplate={currentCustomer}
					onClose={handleClose}
					onSubmit={handleSubmit(handleFormSubmit)}
				/>
			</SheetContent>
		</Sheet>
	)
}