'use client'

import { Icons } from '@/components/icons'
import { Control } from 'react-hook-form'
import { UserFormData } from '@/modules/user/types/user-form'
import { UniversalFormField } from '@/components/layout/atoms/FormFieldZod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { I_Role } from '@/common/hooks/useRole'
import { I_Status } from '@/common/hooks/useStatus'

interface Props {
	control: Control<UserFormData>
	roles: I_Role[]
	statuses: I_Status[]
	isLoadingRoles: boolean
	isLoadingStatuses: boolean
}

export function BasicInfoSection({ control, roles, statuses, isLoadingRoles, isLoadingStatuses }: Props) {
	const roleOptions = roles.map(role => ({ value: role.id, label: role.name }))
	const statusOptions = statuses.map(status => ({ value: status.id, label: status.name }))

	return (
		<Card className='border-none bg-transparent p-0 shadow-none'>
			<CardHeader className='p-0'>
				<CardTitle className='flex items-center gap-2 text-lg'>
					<Icons.infoCircle className='h-4 w-4' />
					Información básica
				</CardTitle>
				<CardDescription>Datos básicos del usuario</CardDescription>
			</CardHeader>

			<CardContent className='grid grid-cols-1 items-start gap-4 p-0 md:grid-cols-2'>
				<UniversalFormField
					required
					control={control}
					name='firstName'
					type='text'
					label='Nombre'
					placeholder='Ej: John'
					max={255}
				/>

				<UniversalFormField
					required
					control={control}
					name='lastName'
					type='text'
					label='Apellido'
					placeholder='Ej: Doe'
					max={255}
				/>

				<UniversalFormField
					required
					control={control}
					name='email'
					type='email'
					label='Email'
					placeholder='jhon.doe@example.com'
					max={255}
				/>

				<UniversalFormField
					control={control}
					name='password'
					type='password'
					label='Contraseña'
					placeholder='********'
					max={255}
				/>
				<UniversalFormField
					required
					control={control}
					name='roleId'
					type='select'
					label='Rol'
					placeholder='Selecciona un rol'
					options={roleOptions}
					disabled={isLoadingRoles}
				/>
				<UniversalFormField
					required
					control={control}
					name='statusId'
					type='select'
					label='Estado'
					placeholder='Selecciona un estado'
					options={statusOptions}
					disabled={isLoadingStatuses}
				/>
			</CardContent>
		</Card>
	)
}
