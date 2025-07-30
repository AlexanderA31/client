import { useSelectData } from '@/common/hooks/useSelectData'
import { useCategory } from '@/common/hooks/useCategory'
import { I_Category } from '@/modules/category/types/category'

export const useProductCategory = () => {
	const {
		isOpen,
		setIsOpen,
		data,
		loading,
		search,
		handleSearch,
		loadMore,
	} = useSelectData<I_Category>({
		useDataHook: useCategory,
		dataKey: 'categoryData',
	})

	return {
		categoryOpen: isOpen,
		setCategoryOpen: setIsOpen,
		categoriesData: data,
		loadingCategories: loading,
		categorySearch: search,
		setCategorySearch: handleSearch,
		loadMoreCategories: loadMore,
	}
}
