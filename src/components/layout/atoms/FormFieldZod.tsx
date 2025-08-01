'use client'

import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'
import { Icons } from '@/components/icons'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

type IconOption = {
	value: string
	label: string
	icon?: React.ComponentType<{ className?: string; size?: number }>
	category?: string
}

type UniversalFormFieldProps<T extends FieldValues> = {
	control: Control<T>
	name: FieldPath<T>
	label: string
	placeholder?: string
	description?: string | ReactNode
	type?: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'switch' | 'checkbox' | 'select' | 'command'
	required?: boolean
	className?: string
	options?: IconOption[]
	min?: number
	max?: number
	step?: number
	disabled?: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onChange?: (value: any) => void
	switchContainerClass?: string
	showValidationIcons?: boolean
	showIconsInSelect?: boolean
	commandEmptyMessage?: string
	groupByCategory?: boolean
}

export function UniversalFormField<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	description,
	type = 'text',
	required = false,
	className = 'transition-all duration-200 focus:ring-2',
	options,
	min,
	max,
	step,
	disabled = false,
	onChange,
	switchContainerClass = '',
	showValidationIcons = true,
	showIconsInSelect = false,
	commandEmptyMessage = 'No se encontraron resultados.',
	groupByCategory = false,
}: UniversalFormFieldProps<T>) {
	const [commandOpen, setCommandOpen] = React.useState(false)
	// Agrupar opciones por categoría si groupByCategory es true
	const groupedOptions = React.useMemo(() => {
		if (!groupByCategory || !options) return null

		return options.reduce(
			(acc, option) => {
				const category = option.category || 'Otros'
				if (!acc[category]) {
					acc[category] = []
				}
				acc[category].push(option)
				return acc
			},
			{} as Record<string, IconOption[]>
		)
	}, [options, groupByCategory])

	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => {
				const hasError = !!fieldState.error
				const hasValue = field.value !== undefined && field.value !== null && field.value !== ''
				const isValid = !hasError && hasValue
				const isDirty = fieldState.isDirty

				// Función para renderizar el icono de validación
				const renderValidationIcon = () => {
					if (!showValidationIcons || type === 'switch' || type === 'checkbox') return null

					if (hasError) {
						return (
							<Icons.alertCircle className='absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-red-400' />
						)
					}

					if (isValid) {
						return (
							<Icons.checkCircle className='absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-emerald-400' />
						)
					}

					if (required && !hasValue && isDirty) {
						return (
							<Icons.infoCircle className='absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-amber-400' />
						)
					}

					return null
				}

				// Clases dinámicas basadas en el estado
				const inputClasses = cn(
					className,
					hasError && 'border-red-400 focus:ring-red-400 focus:border-red-400',
					isValid && 'border-emerald-400 focus:ring-emerald-400 focus:border-emerald-400',
					showValidationIcons && type !== 'textarea' && 'pr-10 w-full'
				)

				const textareaClasses = cn(
					className,
					hasError && 'border-red-400 focus:ring-red-400 focus:border-red-400',
					isValid && 'border-emerald-400 focus:ring-emerald-400 focus:border-emerald-400'
				)

				// Renderizar el valor seleccionado con icono si está disponible
				const renderSelectedValue = () => {
					if (type !== 'select' && type !== 'command') return null

					const selectedOption = options?.find(opt => opt.value === field.value)
					const IconComponent = selectedOption?.icon

					if (type === 'select') {
						return (
							<div className='flex items-center gap-2'>
								<SelectValue placeholder={placeholder} />
							</div>
						)
					}

					// Para command
					return (
						<div className='flex items-center gap-2'>
							{IconComponent && <IconComponent className='h-4 w-4' />}
							{selectedOption?.label || placeholder}
						</div>
					)
				}

				// Renderizar el badge del valor seleccionado para command
				const renderSelectedBadge = () => {
					if (type !== 'command') return null

					const selectedOption = options?.find(opt => opt.value === field.value)
					if (!selectedOption) return null

					const IconComponent = selectedOption.icon

					return (
						<Badge variant='outline' className='flex items-center gap-1'>
							{IconComponent && <IconComponent className='h-3 w-3' />}
							{selectedOption.label}
							<button
								type='button'
								onClick={e => {
									e.stopPropagation()
									field.onChange('')
								}}
								className='hover:bg-muted ml-1 rounded-full p-0.5'>
								<Icons.x className='h-3 w-3' />
							</button>
						</Badge>
					)
				}

				return type === 'switch' ? (
					<FormItem
						className={`bg-muted/20 flex flex-row items-center justify-between rounded-lg border p-4 ${switchContainerClass}`}>
						<div className='space-y-0.5'>
							<FormLabel>{label}</FormLabel>
							{description && <FormDescription>{description}</FormDescription>}
						</div>

						<FormControl>
							<div className='flex items-center gap-2'>
								<Label className='text-muted-foreground text-sm'>{field.value ? 'Activo' : 'Inactivo'}</Label>
								<Switch
									checked={field.value}
									onCheckedChange={value => {
										field.onChange(value)
										onChange?.(value)
									}}
									disabled={disabled}
								/>
							</div>
						</FormControl>
					</FormItem>
				) : type === 'command' ? (
					<FormItem>
						<FormControl>
							<div className='relative'>
								<Popover open={commandOpen} onOpenChange={setCommandOpen}>
									<PopoverTrigger asChild>
										<Button
											variant='outline'
											role='combobox'
											aria-expanded={commandOpen}
											className={cn('w-full justify-between', inputClasses, !field.value && 'text-muted-foreground')}
											disabled={disabled}>
											{field.value ? renderSelectedBadge() : renderSelectedValue()}
											<Icons.chevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
										</Button>
									</PopoverTrigger>

									<PopoverContent className='w-full p-0'>
										<Command>
											<CommandInput placeholder={placeholder} />
											<CommandEmpty>{commandEmptyMessage}</CommandEmpty>

											{groupByCategory && groupedOptions ? (
												Object.entries(groupedOptions).map(([category, categoryOptions]) => (
													<CommandGroup key={category} heading={category}>
														<CommandList>
															{categoryOptions.map(option => (
																<CommandItem
																	key={option.value}
																	value={option.value}
																	onSelect={() => {
																		field.onChange(option.value)
																		setCommandOpen(false)
																		onChange?.(option.value)
																	}}
																	className='flex cursor-pointer items-center gap-2'>
																	{option.icon && <option.icon className='h-4 w-4' />}
																	{option.label}
																	{field.value === option.value && (
																		<Icons.check className='text-primary ml-auto h-4 w-4' />
																	)}
																</CommandItem>
															))}
														</CommandList>
													</CommandGroup>
												))
											) : (
												<CommandGroup>
													<CommandList>
														{options?.map(option => (
															<CommandItem
																key={option.value}
																value={option.value}
																onSelect={() => {
																	field.onChange(option.value)
																	setCommandOpen(false)
																	onChange?.(option.value)
																}}
																className='flex cursor-pointer items-center gap-2'>
																{option.icon && <option.icon className='h-4 w-4' />}
																{option.label}
																{field.value === option.value && (
																	<Icons.check className='text-primary ml-auto h-4 w-4' />
																)}
															</CommandItem>
														))}
													</CommandList>
												</CommandGroup>
											)}
										</Command>
									</PopoverContent>
								</Popover>
								{renderValidationIcon()}
							</div>
						</FormControl>
					</FormItem>
				) : (
					<FormItem>
						<div className='flex items-center gap-1'>
							<FormLabel>{label}</FormLabel>
							{required && <span className='text-destructive'>*</span>}
						</div>

						<FormControl>
							<div className='relative'>
								{type === 'textarea' ? (
									<>
										<Textarea placeholder={placeholder} {...field} className={textareaClasses} disabled={disabled} />
										{showValidationIcons && (
											<div className='absolute top-3 right-3'>
												{hasError && <Icons.alertSquareRounded className='h-4 w-4 text-red-400' />}
												{isValid && <Icons.checkCircle className='h-4 w-4 text-emerald-400' />}
												{required && !hasValue && isDirty && <Icons.infoCircle className='h-4 w-4 text-amber-400' />}
											</div>
										)}
									</>
								) : type === 'checkbox' ? (
									<div className='flex items-center gap-2'>
										<Checkbox
											checked={field.value}
											onCheckedChange={value => {
												field.onChange(value)
												onChange?.(value)
											}}
											disabled={disabled}
											className={cn(
												hasError && 'border-red-400',
												isValid && 'border-emerald-400 data-[state=checked]:bg-emerald-400'
											)}
										/>
										{showValidationIcons && hasError && <Icons.alertSquareRounded className='h-4 w-4 text-red-400' />}
										{showValidationIcons && isValid && <Icons.checkCircle className='h-4 w-4 text-emerald-400' />}
									</div>
								) : type === 'select' ? (
									<>
										<Select
											onValueChange={value => {
												field.onChange(value)
												onChange?.(value)
											}}
											value={field.value}
											disabled={disabled}>
											<SelectTrigger className={inputClasses}>{renderSelectedValue()}</SelectTrigger>
											<SelectContent>
												{groupByCategory && groupedOptions ? (
													<ScrollArea className='h-96'>
														{Object.entries(groupedOptions).map(([category, categoryOptions]) => {
															return (
																<div key={category} className='mb-2'>
																	{/* Encabezado de categoría */}
																	<Label className='text-muted-foreground flex items-center gap-2 pl-5 text-sm font-medium uppercase'>
																		{category}
																	</Label>

																	{/* Items de la categoría */}
																	{categoryOptions.map(option => {
																		const IconComponent = option.icon
																		return (
																			<SelectItem key={option.value} value={option.value} className='ml-4 pl-2'>
																				<div className='flex items-center gap-2'>
																					{showIconsInSelect && IconComponent && <IconComponent className='h-4 w-4' />}
																					<span>{option.label}</span>
																				</div>
																			</SelectItem>
																		)
																	})}

																	{/* Separador entre categorías */}
																	{category !== Object.keys(groupedOptions).pop() && <Separator className='my-4' />}
																</div>
															)
														})}
													</ScrollArea>
												) : (
													options?.map(option => {
														const IconComponent = option.icon
														return (
															<SelectItem key={option.value} value={option.value} className='flex items-center gap-2'>
																{showIconsInSelect && IconComponent && <IconComponent className='h-4 w-4' />}
																{option.label}
																{option.category && (
																	<span className='text-muted-foreground ml-2 text-xs'>({option.category})</span>
																)}
															</SelectItem>
														)
													})
												)}
											</SelectContent>
										</Select>
										{renderValidationIcon()}
									</>
								) : (
									<>
										<Input
											placeholder={placeholder}
											{...field}
											type={type}
											className={inputClasses}
											min={min}
											max={max}
											step={step}
											disabled={disabled}
											onChange={e => {
												// eslint-disable-next-line @typescript-eslint/no-explicit-any
												let value: any = e.target.value
												if (type === 'number') value = value === '' ? null : Number(value)
												field.onChange(value)
												onChange?.(value)
											}}
											value={field.value ?? ''}
										/>
										{renderValidationIcon()}
									</>
								)}
							</div>
						</FormControl>

						<div className='flex items-center justify-between'>
							{description && (
								<FormDescription
									className={cn(hasError && 'text-muted-foreground', isValid && 'text-muted-foreground')}>
									{description}
								</FormDescription>
							)}
							<FormMessage />
						</div>
					</FormItem>
				)
			}}
		/>
	)
}
