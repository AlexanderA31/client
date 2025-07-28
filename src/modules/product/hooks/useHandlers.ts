import { useCallback } from 'react';
import { I_Product, I_CreateProduct, I_UpdateProduct } from '@/modules/product/types/product';
import { ModalState } from '@/modules/product/types/modalState';

interface UseProductHandlersProps {
  modalState: ModalState;
  createRecord: (data: I_CreateProduct) => Promise<void>;
  updateRecord: (id: string, data: I_UpdateProduct) => Promise<void>;
  hardDeleteRecord: (id: string) => Promise<void>;
}

export const useProductHandlers = ({
  modalState,
  createRecord,
  updateRecord,
  hardDeleteRecord,
}: UseProductHandlersProps) => {
  const handleDialogClose = useCallback(() => {
    modalState.closeDialog();
  }, [modalState]);

  const handleFormSubmit = useCallback(
    async (data: I_CreateProduct | I_UpdateProduct) => {
      try {
        if (modalState.currentRecord) {
          await updateRecord(modalState.currentRecord.id, data);
        } else {
          await createRecord(data);
        }
        modalState.closeDialog();
      } catch (error) {
        console.error('Failed to submit form:', error);
      }
    },
    [modalState, createRecord, updateRecord]
  );

  const handleEdit = useCallback(
    (record: I_Product) => {
      modalState.openDialog(record);
    },
    [modalState]
  );

  const handleConfirmHardDelete = useCallback(async () => {
    if (modalState.recordToHardDelete) {
      await hardDeleteRecord(modalState.recordToHardDelete.id);
      modalState.closeHardDeleteModal();
    }
  }, [modalState, hardDeleteRecord]);

  return {
    handleDialogClose,
    handleFormSubmit,
    handleEdit,
    handleConfirmHardDelete,
  };
};
