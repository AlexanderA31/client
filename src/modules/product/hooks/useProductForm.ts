import { useCategory } from '@/common/hooks/useCategory'
import { useBrand } from '@/common/hooks/useBrand'
import { useSupplier } from '@/common/hooks/useSupplier'
import { useMemo } from 'react'

export const useProductForm = () => {
  const { recordsData: categoriesData } = useCategory({ limit: 100 })
  const { recordsData: brandsData } = useBrand({ limit: 100 })
  const { recordsData: suppliersData } = useSupplier({ limit: 100 })

  const categoryOptions = useMemo(() => {
    return categoriesData?.data.items.map((category) => ({
      value: category.id,
      label: category.name,
    }))
  }, [categoriesData])

  const brandOptions = useMemo(() => {
    return brandsData?.data.items.map((brand) => ({
      value: brand.id,
      label: brand.name,
    }))
  }, [brandsData])

  const supplierOptions = useMemo(() => {
    return suppliersData?.data.items.map((supplier) => ({
      value: supplier.id,
      label: supplier.legalName,
    }))
  }, [suppliersData])

  return {
    categoryOptions,
    brandOptions,
    supplierOptions,
  }
}
