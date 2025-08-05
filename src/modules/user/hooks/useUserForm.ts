import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { UserSchema, UserFormData } from '@/modules/user/types/user-form'

export function useUserForm() {
	const form = useForm<UserFormData>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			photo: '',
			roleId: '',
			statusId: '',
		},
		mode: 'onChange',
	})

	const resetForm = () => {
		form.reset()
	}

	return {
		form,
		resetForm,
	}
}
