import { z } from 'zod'
import { I_User } from '@/modules/user/types/user'

export const UserSchema = z.object({
	firstName: z.string().nonempty('Campo requerido').min(2, 'Mínimo 2 caracteres').max(255, 'Máximo 255 caracteres'),
	lastName: z.string().nonempty('Campo requerido').min(2, 'Mínimo 2 caracteres').max(255, 'Máximo 255 caracteres'),
	email: z.string().nonempty('Campo requerido').email('Email inválido'),
	password: z.string().optional(),
	photo: z.string().optional(),
	roleId: z.string().uuid('Selecciona un rol válido'),
	statusId: z.string().uuid('Selecciona un estado válido'),
})

export type UserFormData = z.infer<typeof UserSchema>

export interface UserFormProps {
	isOpen: boolean
	currentRecord?: I_User
	onClose: () => void
	onSubmit: (data: UserFormData) => Promise<void>
}
