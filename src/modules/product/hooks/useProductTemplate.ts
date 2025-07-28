import { useTemplate } from '@/common/hooks/useTemplate';
import { I_Template } from '@/modules/template/types/template';
import { useState, useEffect } from 'react';

export const useProductTemplate = () => {
  const [templateOpen, setTemplateOpen] = useState(false);
  const [templatesData, setTemplatesData] = useState<I_Template[]>([]);
  const [templateSearch, setTemplateSearch] = useState('');
  const { useGetTemplates } = useTemplate();
  const {
    data: templates,
    isLoading: loadingTemplates,
    refetch: refetchTemplates,
    isFetching: fetchingTemplates,
  } = useGetTemplates({
    page: 1,
    pageSize: 5,
    filter: templateSearch,
  });

  useEffect(() => {
    if (templates?.data.items) {
      const newTemplates = templates.data.items.filter(
        (template) => !templatesData.some((existing) => existing.id === template.id)
      );
      setTemplatesData((prev) => [...prev, ...newTemplates]);
    }
  }, [templates, templatesData]);

  const loadMoreTemplates = () => {
    if (
      templates &&
      templates.data.pagination.page < templates.data.pagination.pageCount
    ) {
      refetchTemplates();
    }
  };

  return {
    templateOpen,
    setTemplateOpen,
    templatesData,
    loadingTemplates,
    templateSearch,
    setTemplateSearch,
    loadMoreTemplates,
    fetchingTemplates,
  };
};
