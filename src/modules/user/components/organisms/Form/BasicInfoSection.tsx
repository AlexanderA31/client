'use client'

import { Control } from 'react-hook-form'
import { Icons } from '@/components/icons'
import { UserFormData } from '@/modules/user/types/user-form'
import { UniversalFormField } from '@/components/layout/atoms/FormFieldZod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface BasicInfoSectionProps {
	control: Control<UserFormData>
}

export function BasicInfoSection({ control }: BasicInfoSectionProps) {
	return (
		<Card className='border-none bg-transparent p-0 shadow-none'>
			<CardHeader className='p-0'>
				<CardTitle className='flex items-center gap-2 text-lg'>
					<Icons.infoCircle className='h-4 w-4' />
					Información Personal
				</CardTitle>
				<CardDescription>Completa los datos personales del usuario que serán visibles en el sistema</CardDescription>
			</CardHeader>

			<CardContent className='grid grid-cols-1 items-start gap-4 p-0 md:grid-cols-1'>
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
			</CardContent>
		</Card>
	)
}
