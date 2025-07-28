'use client'

import { useCategory } from '@/common/hooks/useCategory'
import { useBrand } from '@/common/hooks/useBrand'
import { useSupplier } from '@/common/hooks/useSupplier'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/common/hooks/useDebounce'

export const useProductModal = () => {
  const [categoryPage, setCategoryPage] = useState(1)
  const [brandPage, setBrandPage] = useState(1)
  const [supplierPage, setSupplierPage] = useState(1)

  const [categorySearch, setCategorySearch] = useState('')
  const [brandSearch, setBrandSearch] = useState('')
  const [supplierSearch, setSupplierSearch] = useState('')

  const debouncedCategorySearch = useDebounce(categorySearch, 500)
  const debouncedBrandSearch = useDebounce(brandSearch, 500)
  const debouncedSupplierSearch = useDebounce(supplierSearch, 500)

  const [categoryOpen, setCategoryOpen] = useState(false)
  const [brandOpen, setBrandOpen] = useState(false)
  const [supplierOpen, setSupplierOpen] = useState(false)

  const {
    recordsData: categoriesData,
    isLoading: loadingCategories,
    fetchData: fetchCategories,
  } = useCategory()

  const {
    recordsData: brandsData,
    isLoading: loadingBrands,
    fetchData: fetchBrands,
  } = useBrand()

  const {
    recordsData: suppliersData,
    isLoading: loadingSuppliers,
    fetchData: fetchSuppliers,
  } = useSupplier()

  useEffect(() => {
    fetchCategories({ search: debouncedCategorySearch, page: 1, limit: 10 })
  }, [debouncedCategorySearch, fetchCategories])

  useEffect(() => {
    fetchBrands({ search: debouncedBrandSearch, page: 1, limit: 10 })
  }, [debouncedBrandSearch, fetchBrands])

  useEffect(() => {
    fetchSuppliers({ search: debouncedSupplierSearch, page: 1, limit: 10 })
  }, [debouncedSupplierSearch, fetchSuppliers])

  const loadMoreCategories = () => {
    if (categoriesData?.data?.hasNextPage) {
      fetchCategories({ page: categoryPage + 1, search: debouncedCategorySearch })
      setCategoryPage(prev => prev + 1)
    }
  }

  const loadMoreBrands = () => {
    if (brandsData?.data?.hasNextPage) {
      fetchBrands({ page: brandPage + 1, search: debouncedBrandSearch })
      setBrandPage(prev => prev + 1)
    }
  }

  const loadMoreSuppliers = () => {
    if (suppliersData?.data?.hasNextPage) {
      fetchSuppliers({ page: supplierPage + 1, search: debouncedSupplierSearch })
      setSupplierPage(prev => prev + 1)
    }
  }

  return {
    categoriesData,
    loadingCategories,
    categorySearch,
    setCategorySearch,
    categoryOpen,
    setCategoryOpen,
    loadMoreCategories,
    brandsData,
    loadingBrands,
    brandSearch,
    setBrandSearch,
    brandOpen,
    setBrandOpen,
    loadMoreBrands,
    suppliersData,
    loadingSuppliers,
    supplierSearch,
    setSupplierSearch,
    supplierOpen,
    setSupplierOpen,
    loadMoreSuppliers,
  }
}
