import { z } from 'zod'
import { I_User } from '@/modules/user/types/user'

const BaseUserSchema = z.object({
	firstName: z.string().nonempty('Campo requerido').min(2, 'Mínimo 2 caracteres').max(255, 'Máximo 255 caracteres'),
	lastName: z.string().nonempty('Campo requerido').min(2, 'Mínimo 2 caracteres').max(255, 'Máximo 255 caracteres'),
	email: z.string().nonempty('Campo requerido').email('Email inválido'),
	photo: z.string().optional(),
	roleId: z.string().nonempty('Selecciona un rol válido'),
	statusId: z.string().nonempty('Selecciona un estado válido'),
})

export const createUserSchema = (isEditing: boolean) => {
	return BaseUserSchema.extend({
		password: isEditing
			? z.string().optional()
			: z.string().nonempty('La contraseña es requerida para nuevos usuarios'),
	})
}

export type UserFormData = z.infer<ReturnType<typeof createUserSchema>>

export interface UserFormProps {
	isOpen: boolean
	currentRecord?: I_User
	onClose: () => void
	onSubmit: (data: UserFormData) => Promise<void>
}
