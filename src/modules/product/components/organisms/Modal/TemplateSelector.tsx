'use client'

import React from 'react'
import { Control, UseFormSetValue } from 'react-hook-form'
import { SelectFieldZod } from '@/components/layout/atoms/SelectFieldZod'
import { I_Template } from '@/modules/template/types/template'
import { ProductFormData } from './ModalForm'

interface Props {
  control: Control<ProductFormData>
  setValue: UseFormSetValue<ProductFormData>
  templates: I_Template[]
  loadingTemplates: boolean
  templateSearch: string
  setTemplateSearch: (value: string) => void
  templateOpen: boolean
  setTemplateOpen: (value: boolean) => void
  loadMoreTemplates: () => void
}

export function TemplateSelector({
  control,
  templates,
}: Props) {
  return (
    <SelectFieldZod
      control={control}
      name='templateId'
      label='Plantilla'
      options={templates?.map((template) => ({
        value: template.id,
        label: template.name,
      }))}
      required
    />
  )
}
