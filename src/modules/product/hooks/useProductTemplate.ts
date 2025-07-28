'use client'

import { useGenericApi } from '@/common/hooks/useGenericApi'
import { I_TemplateResponse, I_Template } from '@/modules/template/types/template'
import { TEMPLATE_ENDPOINTS_CONFIG } from '@/common/configs/api/template-endpoints.config'

export const useProductTemplate = () => {
  const {
    isLoading,
    isError,
    buildQuery,
  } = useGenericApi<I_TemplateResponse, I_Template>(TEMPLATE_ENDPOINTS_CONFIG)

  const { data: templatesData, refetch } = buildQuery({ limit: 100 })

  return {
    recordsData: templatesData?.data.items,
    isLoading,
    isError,
    fetchTemplates: refetch,
  }
}
