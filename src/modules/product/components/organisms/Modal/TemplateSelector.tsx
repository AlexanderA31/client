'use client'

import { I_Template } from '@/modules/template/types/template'
import { ProductFormData } from '@/modules/product/components/organisms/Modal/ModalForm'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Control, UseFormSetValue } from 'react-hook-form'

interface TemplateSelectorProps {
  control: Control<ProductFormData>
  setValue: UseFormSetValue<ProductFormData>
  templates: I_Template[]
  loadingTemplates: boolean
  templateSearch: string
  setTemplateSearch: (search: string) => void
  templateOpen: boolean
  setTemplateOpen: (open: boolean) => void
  loadMoreTemplates: () => void
}

export function TemplateSelector({
  control,
  setValue,
  templates,
  loadingTemplates,
  templateSearch,
  setTemplateSearch,
  templateOpen,
  setTemplateOpen,
  loadMoreTemplates,
}: TemplateSelectorProps) {
  const templateOptions =
    templates?.data?.items?.map(template => ({
      value: template.id,
      label: template.name,
    })) || []

  return (
    <FormField
      control={control}
      name='templateId'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Selecciona una plantilla</FormLabel>
          <Popover open={templateOpen} onOpenChange={setTemplateOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  className={`w-full justify-between ${!field.value && 'text-muted-foreground'}`}>
                  {field.value ? templateOptions.find(template => template.value === field.value)?.label : 'Buscar plantilla...'}
                  <Icons.chevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className='min-w-full p-0' align='start'>
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder='Buscar plantilla...'
                  value={templateSearch}
                  onValueChange={setTemplateSearch}
                />
                <CommandList>
                  <CommandEmpty>{loadingTemplates ? 'Buscando...' : 'No se encontraron plantillas'}</CommandEmpty>

                  <CommandGroup>
                    {templateOptions.map(template => (
                      <CommandItem
                        key={template.value}
                        value={template.value}
                        onSelect={() => {
                          setValue('templateId', template.value, { shouldValidate: true })
                          setTemplateOpen(false)
                        }}>
                        <Icons.check
                          className={`mr-2 h-4 w-4 ${template.value === field.value ? 'opacity-100' : 'opacity-0'}`}
                        />
                        {template.label}
                      </CommandItem>
                    ))}
                    {templates?.data?.hasNextPage && (
                      <CommandItem onSelect={loadMoreTemplates}>
                        <Icons.plus className='mr-2 h-4 w-4' />
                        Cargar más plantillas...
                      </CommandItem>
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
