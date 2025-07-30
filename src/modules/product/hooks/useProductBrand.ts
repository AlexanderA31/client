import { useSelectData } from '@/common/hooks/useSelectData'
import { useBrand } from '@/common/hooks/useBrand'
import { I_Brand } from '@/modules/brand/types/brand'

export const useProductBrand = () => {
	const {
		isOpen,
		setIsOpen,
		data,
		loading,
		search,
		handleSearch,
		loadMore,
	} = useSelectData<I_Brand>({
		useDataHook: useBrand,
		dataKey: 'brandData',
	})

	return {
		brandOpen: isOpen,
		setBrandOpen: setIsOpen,
		brandsData: data,
		loadingBrands: loading,
		brandSearch: search,
		setBrandSearch: handleSearch,
		loadMoreBrands: loadMore,
	}
}
