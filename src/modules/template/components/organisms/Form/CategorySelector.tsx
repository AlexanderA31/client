'use client'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { I_Category } from '@/modules/category/types/category'
import { AlertMessage } from '@/components/layout/atoms/Alert'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { TemplateFormData } from '@/modules/template/types/template-form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SelectedCategoryDisplay } from '@/modules/template/components/organisms/Form/SelectedCategoryDisplay'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

interface CategorySelectorProps {
	control: Control<TemplateFormData>
	setValue: UseFormSetValue<TemplateFormData>
	watch: UseFormWatch<TemplateFormData>
	categories: I_Category[]
	loadingCategories: boolean
	categorySearch: string
	setCategorySearch: (search: string) => void
	categoryOpen: boolean
	setCategoryOpen: (open: boolean) => void
	loadMoreCategories: () => void
}

export function CategorySelector({
	control,
	setValue,
	watch,
	categories,
	loadingCategories,
	categorySearch,
	setCategorySearch,
	categoryOpen,
	setCategoryOpen,
	loadMoreCategories,
}: CategorySelectorProps) {
	const watchedCategoryId = watch('categoryId')

	const categoryOptions =
		categories?.data?.items?.map(category => ({
			value: category.id,
			label: category.name,
		})) || []

	// Encontrar la categoría seleccionada
	const selectedCategory = categories?.data?.items?.find(c => c.id === watchedCategoryId)

	return (
		<Card className='border-none bg-transparent p-0 shadow-none'>
			<CardHeader className='p-0'>
				<CardTitle className='flex items-center gap-2 text-lg'>
					<Icons.infoCircle className='h-4 w-4' />
					Categoría
				</CardTitle>
				<CardDescription>Organiza tu plantilla en una categoría específica</CardDescription>
			</CardHeader>

			<CardContent className='space-y-4 p-0'>
				{categories?.data?.pagination?.totalRecords === 0 ? (
					<AlertMessage
						variant='warning'
						title='No hay categorías disponibles'
						message='Por favor, crea una categoría primero antes de continuar.'
					/>
				) : (
					<>
						<FormField
							control={control}
							name='categoryId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Selecciona una categoría</FormLabel>
									<Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant='outline'
													role='combobox'
													className={`w-full justify-between ${!field.value && 'text-muted-foreground'}`}>
													{field.value
														? categoryOptions.find(cat => cat.value === field.value)?.label
														: 'Buscar categoría...'}
													<Icons.chevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>

										<PopoverContent className='min-w-full p-0' align='start'>
											<Command shouldFilter={false}>
												<CommandInput
													placeholder='Buscar categoría...'
													value={categorySearch}
													onValueChange={setCategorySearch}
												/>
												<CommandList>
													<CommandEmpty>
														{loadingCategories ? 'Buscando...' : 'No se encontraron categorías'}
													</CommandEmpty>

													<CommandGroup>
														{categoryOptions.map(category => (
															<CommandItem
																key={category.value}
																value={category.value}
																onSelect={() => {
																	setValue('categoryId', category.value, { shouldValidate: true })
																	setCategoryOpen(false)
																}}>
																<Icons.check
																	className={`mr-2 h-4 w-4 ${category.value === field.value ? 'opacity-100' : 'opacity-0'}`}
																/>
																{category.label}
															</CommandItem>
														))}
														{categories?.data?.hasNextPage && (
															<CommandItem onSelect={loadMoreCategories}>
																<Icons.plus className='mr-2 h-4 w-4' />
																Cargar más categorías...
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

						{watchedCategoryId && selectedCategory && (
							<SelectedCategoryDisplay
								category={{
									id: selectedCategory.id,
									name: selectedCategory.name,
								}}
								categoryOptions={categoryOptions}
								onRemove={() => setValue('categoryId', '', { shouldValidate: true })}
							/>
						)}
					</>
				)}
			</CardContent>
		</Card>
	)
}
