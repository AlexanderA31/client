import { useSelectData } from '@/common/hooks/useSelectData'
import { useTemplate } from '@/common/hooks/useTemplate'
import { I_Template } from '@/modules/template/types/template'

export const useProductTemplate = () => {
	const {
		isOpen,
		setIsOpen,
		data,
		loading,
		search,
		handleSearch,
		loadMore,
	} = useSelectData<I_Template>({
		useDataHook: useTemplate,
		dataKey: 'templateData',
	})

	return {
		templateOpen: isOpen,
		setTemplateOpen: setIsOpen,
		templatesData: data,
		loadingTemplates: loading,
		templateSearch: search,
		setTemplateSearch: handleSearch,
		loadMoreTemplates: loadMore,
	}
}
