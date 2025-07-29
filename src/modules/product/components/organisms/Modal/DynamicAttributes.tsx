'use client'

import React from 'react'
import { I_Attribute } from '@/modules/atribute/types/attribute'
import { Control } from 'react-hook-form'
import { UniversalFormField } from '@/components/layout/atoms/FormFieldZod'
import { SelectFieldZod } from '@/components/layout/atoms/SelectFieldZod'
import { TextareaFieldZod } from '@/components/layout/atoms/TextareaFieldZod'

interface Props {
  attributes: I_Attribute[]
  control: Control<any>
}

export function DynamicAttributes({ attributes, control }: Props) {
  return (
    <div className='space-y-4'>
      {attributes.map((attribute) => {
        switch (attribute.type) {
          case 'text':
            return (
              <UniversalFormField
                key={attribute.id}
                control={control}
                name={`attributes.${attribute.id}`}
                label={attribute.name}
                placeholder={attribute.description}
                type='text'
              />
            )
          case 'number':
            return (
              <UniversalFormField
                key={attribute.id}
                control={control}
                name={`attributes.${attribute.id}`}
                label={attribute.name}
                placeholder={attribute.description}
                type='number'
              />
            )
          case 'select':
            return (
              <SelectFieldZod
                key={attribute.id}
                control={control}
                name={`attributes.${attribute.id}`}
                label={attribute.name}
                options={attribute.options.map((option) => ({
                  value: option,
                  label: option,
                }))}
              />
            )
          case 'textarea':
            return (
              <TextareaFieldZod
                key={attribute.id}
                control={control}
                name={`attributes.${attribute.id}`}
                label={attribute.name}
                placeholder={attribute.description}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
