import { useSelectData } from '@/common/hooks/useSelectData'
import { useSupplier } from '@/common/hooks/useSupplier'
import { I_Supplier } from '@/modules/supplier/types/supplier'

export const useProductSupplier = () => {
	const {
		isOpen,
		setIsOpen,
		data,
		loading,
		search,
		handleSearch,
		loadMore,
	} = useSelectData<I_Supplier>({
		useDataHook: useSupplier,
		dataKey: 'supplierData',
	})

	return {
		supplierOpen: isOpen,
		setSupplierOpen: setIsOpen,
		suppliersData: data,
		loadingSuppliers: loading,
		supplierSearch: search,
		setSupplierSearch: handleSearch,
		loadMoreSuppliers: loadMore,
	}
}
