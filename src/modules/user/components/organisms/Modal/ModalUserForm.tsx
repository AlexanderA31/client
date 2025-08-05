'use client'

import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form'

import { useUser } from '@/common/hooks/useUser'
import { useUserForm } from '@/modules/user/hooks/useUserForm'

import { UserFormProps, UserFormData } from '@/modules/user/types/user-form'

import { Icons } from '@/components/icons'
import { FormFooter } from '@/modules/user/components/organisms/Form/FormFooter'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet'

import { AlertMessage } from '@/components/layout/atoms/Alert'
import { ActionButton } from '@/components/layout/atoms/ActionButton'
import { BasicInfoSection } from '@/modules/user/components/organisms/Form/BasicInfoSection'
import { MediaSection } from '@/modules/user/components/organisms/Form/MediaSection'
import { SpinnerLoader } from '@/components/layout/SpinnerLoader'

export function UserFormModal({ isOpen, currentRecord, onClose, onSubmit }: UserFormProps) {
	const { getUserById } = useUser()
	const [userData, setUserData] = useState(null)
	const [loadingUser, setLoadingUser] = useState(false)

	const {
		form,
		resetForm,
	} = useUserForm(userData || currentRecord)

	// Fetch complete user data when modal opens with an existing user
	useEffect(() => {
		const fetchUserData = async () => {
			if (isOpen && currentRecord?.id) {
				setLoadingUser(true)
				try {
					const completeUser = await getUserById(currentRecord.id)
					setUserData(completeUser)
				} catch (error) {
					console.error('Error al obtener datos completos del usuario:', error)
					// Fallback to currentRecord if fetch fails
					setUserData(currentRecord)
				} finally {
					setLoadingUser(false)
				}
			} else if (isOpen && !currentRecord?.id) {
				// New user - no need to fetch
				setUserData(null)
				setLoadingUser(false)
			}
		}

		fetchUserData()
	}, [isOpen, currentRecord, getUserById])

	// Reset form with complete user data
	useEffect(() => {
		if (isOpen && !loadingUser) {
			const dataToUse = userData || currentRecord

			form.reset({
				firstName: dataToUse?.firstName || '',
				lastName: dataToUse?.lastName || '',
				email: dataToUse?.email || '',
				statusId: dataToUse?.status?.id || '',
				roleId: dataToUse?.role?.id || '',
				photo: dataToUse?.photo || '',
				removePhoto: false,
			})
		}
	}, [isOpen, loadingUser, userData, currentRecord, form])

	const handleFormSubmit = async (data: UserFormData) => {
		try {
			await onSubmit(data)
			handleClose()
		} catch (error) {
			console.error('Error al enviar formulario:', error)
		}
	}

	const handleClose = () => {
		resetForm()
		setUserData(null)
		onClose()
	}

	const isFormValid = form.formState.isValid && !form.formState.isSubmitting

	return (
		<Sheet open={isOpen} onOpenChange={handleClose}>
			<SheetContent className='z-50 flex max-h-screen min-w-xl flex-col [&>button]:hidden'>
				<SheetHeader className='bg-background supports-[backdrop-filter]:bg-background/80 sticky top-0 z-10 border-b supports-[backdrop-filter]:backdrop-blur-sm'>
					<div className='flex items-center justify-between'>
						<SheetTitle>{currentRecord?.id ? 'Editar usuario' : 'Nuevo usuario'}</SheetTitle>
						<SheetClose>
							<ActionButton
								type='button'
								variant='ghost'
								onClick={onClose}
								size='icon'
								disabled={form.formState.isSubmitting}
								icon={<Icons.x className='h-4 w-4' />}
							/>
						</SheetClose>
					</div>

					<SheetDescription>
						{currentRecord?.id ? 'Modifica los detalles de tu usuario existente' : 'Crea un nuevo usuario'}
					</SheetDescription>
				</SheetHeader>

				{/* Content */}
				<div className='flex-1 space-y-4 overflow-auto p-4'>
					{loadingUser ? (
						<div className='flex h-screen flex-1 flex-col items-center justify-center'>
							<SpinnerLoader text='Cargando... Por favor espera' />
						</div>
					) : (
						<>
							<AlertMessage
								message={
									currentRecord
										? 'Modifica los campos necesarios y guarda los cambios para actualizar el usuario en el sistema.'
										: 'Completa la información requerida para crear un nuevo usuario.'
								}
								variant='info'
							/>

							<Form {...form}>
								<form onSubmit={form.handleSubmit(handleFormSubmit)}>
									<div className='space-y-12'>
										<BasicInfoSection control={form.control} />

										<MediaSection control={form.control} setValue={form.setValue} watch={form.watch} />
									</div>
								</form>
							</Form>
						</>
					)}
				</div>

				{/* Footer */}
				{!loadingUser && (
					<FormFooter
						formState={form.formState}
						isFormValid={isFormValid}
						currentRecord={userData || currentRecord}
						onClose={handleClose}
						onSubmit={form.handleSubmit(handleFormSubmit)}
					/>
				)}
			</SheetContent>
		</Sheet>
	)
}
