'use client'

import { useGenericApi } from '@/common/hooks/useGenericApi'
import { I_TemplateResponse, I_Template } from '@/modules/template/types/template'
import { TEMPLATE_ENDPOINTS_CONFIG } from '@/common/configs/api/template-endpoints.config'

export const useProductTemplate = () => {
  const {
    data: recordsData,
    isLoading,
    isError,
    fetchData,
  } = useGenericApi<I_TemplateResponse, I_Template>({
    apiConfig: TEMPLATE_ENDPOINTS_CONFIG.FIND_ALL,
    initialData: { data: { items: [], pagination: { totalRecords: 0 } } },
  })

  return {
    recordsData,
    isLoading,
    isError,
    fetchData,
  }
}
