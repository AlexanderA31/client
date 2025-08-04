'use client'

import { useKardex } from '@/common/hooks/useKardex'
import { Badge } from '@/components/layout/atoms/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { translateMovementType } from '@/modules/kardex/utils/movement-type-translator'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { I_Kardex } from '@/modules/kardex/types/kardex'
import { SpinnerLoader } from '@/components/layout/SpinnerLoader'
import { Typography } from '@/components/ui/typography'
import { formatDate } from '@/common/utils/dateFormater-util'
import { FatalErrorState } from '@/components/layout/organims/ErrorStateCard'
import { NotFoundState } from '@/components/layout/organims/NotFoundState'
import { formatPrice } from '@/common/utils/formatPrice-util'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type Props = {
	id: string
}

export function KardexDetailView({ id }: Props) {
	const { getKardexById } = useKardex()
	const [kardexEntry, setKardexEntry] = useState<I_Kardex | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchKardexEntry = async () => {
			try {
				setLoading(true)
				setError(null)
				const kardexData = await getKardexById(id)
				setKardexEntry(kardexData)
			} catch (err) {
				setError(err.response?.data?.error?.message || 'Error fetching kardex entry')
				console.error('Error fetching kardex entry:', err)
			} finally {
				setLoading(false)
			}
		}

		if (id) fetchKardexEntry()
	}, [id, getKardexById])

	const InfoRow = ({
		label,
		value,
		mono = false,
		bold = false,
		className = '',
	}: {
		label: string
		value: string | JSX.Element
		mono?: boolean
		bold?: boolean
		className?: string
	}) => (
		<div className={`grid grid-cols-3 gap-4 ${className}`}>
			<Label>{label}</Label>
			<div className={`col-span-2 ${mono ? 'font-mono' : ''} ${bold ? 'font-semibold' : ''}`}>{value}</div>
		</div>
	)

	const Label = ({ children }: { children: string }) => (
		<label className='text-muted-foreground text-sm font-medium'>{children}</label>
	)

	if (loading) {
		return (
			<div className='flex h-screen flex-1 flex-col items-center justify-center'>
				<SpinnerLoader text='Cargando... Por favor espera' />
			</div>
		)
	}

	if (!kardexEntry) {
		return (
			<div className='flex h-screen flex-1 flex-col items-center justify-center'>
				<NotFoundState />
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex flex-1 flex-col items-center justify-center space-y-6'>
				<FatalErrorState />
			</div>
		)
	}

	return (
		<div className='flex flex-1 flex-col space-y-6'>
			{/* Header */}
			<Card className='border-none bg-transparent p-0 shadow-none'>
				<CardContent className='p-0'>
					<div className='flex items-center gap-4'>
						<div className='flex-1'>
							<div className='mb-2 line-clamp-1 break-words'>
								<Typography variant='h3'>Detalle de Movimiento de Kardex</Typography>
							</div>

							<div className='flex items-center justify-between'>
								<div className='text-muted-foreground flex items-center gap-2'>
									<Typography variant='overline'>ID: {kardexEntry.id}</Typography>

									<span className='mx-1'>•</span>

									<Badge
										variant={
											kardexEntry.movementType.includes('in') || kardexEntry.movementType.includes('purchase')
												? 'success'
												: kardexEntry.movementType.includes('out') || kardexEntry.movementType.includes('sale')
												? 'destructive'
												: 'warning'
										}
										text={translateMovementType(kardexEntry.movementType)}
									/>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className='grid gap-8 pt-4 lg:grid-cols-3'>
				{/* Columna Principal */}
				<div className='space-y-8 lg:col-span-2'>
					{/* Cards de métricas principales */}
					<Card className='text-muted-foreground border-none bg-transparent p-0 shadow-none'>
						<CardContent className='flex items-center justify-between gap-6 p-0'>
							<Card className='border-border/50 bg-accent/20 w-full rounded-2xl border-none p-4 shadow-none'>
								<Typography variant='h4'>{kardexEntry.stockBefore}</Typography>
								<Typography variant='overline'>Stock anterior</Typography>
							</Card>

							<Card className='border-border/50 bg-accent/20 w-full rounded-2xl border-none p-4 shadow-none'>
								<Typography variant='h4'>{kardexEntry.quantity}</Typography>
								<Typography variant='overline'>Cantidad movida</Typography>
							</Card>

							<Card className='border-border/50 bg-accent/20 w-full rounded-2xl border-none p-4 shadow-none'>
								<Typography variant='h4'>{kardexEntry.stockAfter}</Typography>
								<Typography variant='overline'>Stock posterior</Typography>
							</Card>
						</CardContent>
					</Card>

					{/* Cards de información monetaria */}
					<Card className='text-muted-foreground border-none bg-transparent p-0 shadow-none'>
						<CardContent className='flex items-center justify-between gap-6 p-0'>
							<Card className='border-border/50 bg-accent/20 w-full rounded-2xl border-none p-4 shadow-none'>
								<Typography variant='h4'>{formatPrice(kardexEntry.unitCost)} USD</Typography>
								<Typography variant='overline'>Costo unitario</Typography>
							</Card>

							<Card className='border-border/50 bg-accent/20 w-full rounded-2xl border-none p-4 shadow-none'>
								<Typography variant='h4'>{formatPrice(kardexEntry.subtotal)} USD</Typography>
								<Typography variant='overline'>Subtotal</Typography>
							</Card>

							<Card className='border-border/50 bg-accent/20 w-full rounded-2xl border-none p-4 shadow-none'>
								<Typography variant='h4'>{formatPrice(kardexEntry.total)} USD</Typography>
								<Typography variant='overline'>Total</Typography>
							</Card>
						</CardContent>
					</Card>

					{/* Card de fechas */}
					<Card className='text-muted-foreground border-none bg-transparent p-0 shadow-none'>
						<CardContent className='flex items-center justify-between gap-6 p-0'>
							<Card className='border-border/50 bg-accent/20 w-full rounded-2xl border-none p-4 shadow-none'>
								<Typography variant='h5'>{formatDate(kardexEntry.createdAt, true)}</Typography>
								<Typography variant='overline'>Creado</Typography>
							</Card>

							<Card className='border-border/50 bg-accent/20 w-full rounded-2xl border-none p-4 shadow-none'>
								<Typography variant='h5'>{formatDate(kardexEntry.updatedAt, true)}</Typography>
								<Typography variant='overline'>Actualizado</Typography>
							</Card>
						</CardContent>
					</Card>

					<Separator />

					{/* Detalles con acordeones */}
					<Card className='text-muted-foreground border-none bg-transparent p-0 shadow-none'>
						<CardContent className='p-0'>
							<div className='space-y-6'>
								{/* Acordeón de Información del Movimiento */}
								<Accordion type='single' collapsible defaultValue='movement-info'>
									<AccordionItem value='movement-info'>
										<AccordionTrigger>Información del movimiento</AccordionTrigger>
										<AccordionContent className='space-y-4 pt-4'>
											<InfoRow label='Producto' value={kardexEntry.product.name} />
											<InfoRow label='Código del producto' value={kardexEntry.product.code} mono />
											<InfoRow label='Responsable' value={kardexEntry.user.name} />
											<InfoRow 
												label='Tipo de movimiento' 
												value={
													<Badge
														variant={
															kardexEntry.movementType.includes('in') || kardexEntry.movementType.includes('purchase')
																? 'success'
																: kardexEntry.movementType.includes('out') || kardexEntry.movementType.includes('sale')
																? 'destructive'
																: 'warning'
														}
														text={translateMovementType(kardexEntry.movementType)}
													/>
												} 
											/>
										</AccordionContent>
									</AccordionItem>
								</Accordion>

								{/* Acordeón de Información de Stock */}
								<Accordion type='single' collapsible>
									<AccordionItem value='stock-info'>
										<AccordionTrigger>Información de inventario</AccordionTrigger>
										<AccordionContent className='space-y-4 pt-4'>
											<InfoRow label='Stock anterior' value={`${kardexEntry.stockBefore} unidades`} />
											<InfoRow label='Cantidad del movimiento' value={`${kardexEntry.quantity} unidades`} bold />
											<InfoRow label='Stock posterior' value={`${kardexEntry.stockAfter} unidades`} />
											<div className='grid grid-cols-3 items-center gap-4'>
												<Label>Diferencia</Label>
												<div className='col-span-2 flex items-center gap-2'>
													<p className={`font-semibold ${kardexEntry.stockAfter > kardexEntry.stockBefore ? 'text-green-600' : 'text-red-600'}`}>
														{kardexEntry.stockAfter > kardexEntry.stockBefore ? '+' : ''}{kardexEntry.stockAfter - kardexEntry.stockBefore} unidades
													</p>
												</div>
											</div>
										</AccordionContent>
									</AccordionItem>
								</Accordion>

								{/* Acordeón de Información Monetaria */}
								<Accordion type='single' collapsible>
									<AccordionItem value='monetary-info'>
										<AccordionTrigger>Información monetaria</AccordionTrigger>
										<AccordionContent className='space-y-4 pt-4'>
											<InfoRow label='Costo unitario' value={formatPrice(kardexEntry.unitCost)} bold />
											<InfoRow label='Subtotal' value={formatPrice(kardexEntry.subtotal)} />
											<InfoRow label='Tasa de impuesto' value={`${kardexEntry.taxRate}%`} />
											<InfoRow label='Monto de impuesto' value={formatPrice(kardexEntry.taxAmount)} />
											<InfoRow label='Total' value={formatPrice(kardexEntry.total)} bold />
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Columna lateral - Información de auditoría */}
				<div className='lg:col-span-1'>
					<Card className='border-border/50 bg-accent/20 rounded-2xl border-none p-4 shadow-none'>
						<CardHeader className='p-0 mb-4'>
							<CardTitle>Información de Auditoría</CardTitle>
						</CardHeader>
						<CardContent className='p-0 space-y-2 text-sm'>
							<p>Creado: {formatDate(kardexEntry.createdAt, 'es-ES', { dateStyle: 'full', timeStyle: 'long' })}</p>
							<p>Última actualización: {formatDate(kardexEntry.updatedAt, 'es-ES', { dateStyle: 'full', timeStyle: 'long' })}</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}