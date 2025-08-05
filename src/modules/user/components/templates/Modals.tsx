'use client'

import { ModalState } from '@/modules/user/types/modalState'
import { HardDeleteModal } from '@/modules/user/components/organisms/Modal/ModalHardDelete'
import { UserFormModal } from '@/modules/user/components/organisms/Modal/ModalUserForm'

interface UserModalsProps {
	modalState: ModalState
	userHandlers: any
}

export function UserModals({ modalState, userHandlers }: UserModalsProps) {
	return (
		<>
			<UserFormModal
				isOpen={modalState.isDialogOpen}
				currentRecord={modalState.currentRecord}
				onClose={userHandlers.handleDialogClose}
				onSubmit={userHandlers.handleFormSubmit}
			/>

			<HardDeleteModal
				isOpen={modalState.isHardDeleteModalOpen}
				currentRecord={modalState.recordToHardDelete}
				isAction={modalState.isHardDeleting}
				onClose={modalState.closeHardDeleteModal}
				onConfirm={userHandlers.handleConfirmHardDelete}
			/>
		</>
	)
}
