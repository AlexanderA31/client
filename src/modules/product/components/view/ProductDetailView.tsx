'use client'

import { useProductV2 } from '@/common/hooks/useProduct'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/layout/atoms/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { I_Product } from '../../types/product'
import { SpinnerLoader } from '@/components/layout/SpinnerLoader'
import { ProductImage } from '../molecules/ProductImage'
import { Typography } from '@/components/ui/typography'
import { ProductAnalytics } from '../organisms/Chart/ProductAnalytics'
import { formatDate } from '@/common/utils/dateFormater-util'
import { ProductStatusBadge } from '../atoms/ProductStatusBadge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { FatalErrorState } from '@/components/layout/organims/ErrorStateCard'
import { NotFoundState } from '@/components/layout/organims/NotFoundState'

type Props = {
	productId: string
}

export function ProductDetailView({ productId }: Props) {
	const { getProductById } = useProductV2()
	const [product, setProduct] = useState<I_Product | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true)
				setError(null)
				const productData = await getProductById(productId)
		
				setProduct(productData)
			} catch (err) {
				setError(err.response.data.error.message)
				console.error('Error fetching product:', err)
			} finally {
				setLoading(false)
			}
		}

		if (productId) fetchProduct()
	}, [productId, getProductById])

	const InfoRow = ({
		label,
		value,
		mono = false,
		bold = false,
		className = '',
	}: {
		label: string
		value: string
		mono?: boolean
		bold?: boolean
		className?: string
	}) => (
		<div className={`grid grid-cols-3 gap-4 ${className}`}>
			<Label>{label}</Label>
			<p className={`col-span-2 ${mono ? 'font-mono' : ''} ${bold ? 'font-semibold' : ''}`}>{value}</p>
		</div>
	)

	// Componente auxiliar para etiquetas
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

	if (!product) {
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
						<div className='line-clamp-2 w-auto max-w-fit overflow-hidden text-ellipsis whitespace-normal'>
							<ProductImage
								recordData={product}
								enableHover={false}
								enableClick={false}
								quality={10}
								imageHeight={80}
								imageWidth={80}
							/>
						</div>

						<div className='flex-1'>
							<div className='mb-2 line-clamp-1 flex items-center justify-between gap-6 break-words'>
								<Typography variant='h3'>{product.name}</Typography>

								<div className='flex gap-2'>
									<Button variant='outline' size='sm'>
										<Icons.dots className='h-4 w-4' />
										Más
									</Button>
								</div>
							</div>

							<div className='flex items-center justify-between'>
								<div className='text-muted-foreground flex items-center gap-2'>
									<Typography variant='overline'>{product.code}</Typography>

									<span className='mx-1'>•</span>

									{product.isVariant ? (
										<Badge variant='default' text='Producto variante' />
									) : (
										<Badge variant='info' text='Producto principal' />
									)}

									<ProductStatusBadge status={product.status} />
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className='grid gap-8 pt-4 lg:grid-cols-3'>
				{/* Columna Principal */}
				<div className='space-y-8 lg:col-span-2'>
					<Card className='text-muted-foreground border-none bg-transparent p-0 shadow-none'>
						<CardContent className='flex items-center justify-between gap-6 p-0'>
							<Card className='border-border/50 bg-accent/20 w-full rounded-2xl border-none p-4 shadow-none'>
								<Typography variant='h4'>{product.stock}</Typography>
								<Typography variant='overline'>Unidades totales</Typography>
							</Card>

							<Card className='border-border/50 bg-accent/20 w-full rounded-2xl border-none p-4 shadow-none'>
								<Typography variant='h4'>{product.price?.toFixed(2)} USD</Typography>
								<Typography variant='overline'>Precio base</Typography>
							</Card>

							<Card className='border-border/50 bg-accent/20 w-full rounded-2xl border-none p-4 shadow-none'>
								<Typography variant='h4'>{(product.price * product.stock)?.toFixed(2)} USD</Typography>
								<Typography variant='overline'>Caja total</Typography>
							</Card>
						</CardContent>
					</Card>

					<Card className='text-muted-foreground border-none bg-transparent p-0 shadow-none'>
						<CardContent className='flex items-center justify-between gap-6 p-0'>
							{product.deletedAt ? (
								<Card className='border-border/50 bg-destructive/10 w-full rounded-2xl border-none p-4 shadow-none'>
									<Typography variant='h5'>{formatDate(product?.deletedAt, true)}</Typography>
									<Typography variant='error'>Removido</Typography>
								</Card>
							) : (
								<>
									<Card className='border-border/50 bg-accent/20 w-full rounded-2xl border-none p-4 shadow-none'>
										<Typography variant='h5'>{formatDate(product.createdAt, true)}</Typography>
										<Typography variant='overline'>Creado</Typography>
									</Card>

									<Card className='border-border/50 bg-accent/20 w-full rounded-2xl border-none p-4 shadow-none'>
										<Typography variant='h5'>{formatDate(product.updatedAt, true)}</Typography>
										<Typography variant='overline'>Editado</Typography>
									</Card>
								</>
							)}
						</CardContent>
					</Card>

					<Separator />

					{/* Detalles Básicos */}
					<Card className='text-muted-foreground border-none bg-transparent p-0 shadow-none'>
						<CardContent className='p-0'>
							<div className='space-y-6'>
								{/* Acordeón de Información Básica */}
								<Accordion type='single' collapsible defaultValue='basic-info'>
									<AccordionItem value='basic-info'>
										<AccordionTrigger>Información básica</AccordionTrigger>
										<AccordionContent className='space-y-4 pt-4'>
											<InfoRow label='Nombre' value={product.name} />
											<InfoRow
												label='Descripción'
												value={product.description || 'Sin descripción'}
												className='items-start'
											/>
											<InfoRow label='Código' value={product.code} mono />
										</AccordionContent>
									</AccordionItem>
								</Accordion>

								{/* Acordeón de Información Comercial */}
								<Accordion type='single' collapsible>
									<AccordionItem value='commercial-info'>
										<AccordionTrigger>Información comercial</AccordionTrigger>
										<AccordionContent className='space-y-4 pt-4'>
											<InfoRow label='Código de barras' value={product.barCode || 'Ninguno'} />
											<div className='grid grid-cols-3 items-center gap-4'>
												<Label>Stock</Label>
												<div className='col-span-2 flex items-center gap-2'>
													<p className='font-semibold'>{product.stock} unidades</p>
													{product.stock < 10 && <Badge variant='destructive'>Stock Bajo</Badge>}
												</div>
											</div>
											<InfoRow label='Precio' value={`$${product.price?.toFixed(2) || '0.00'} USD`} bold />
										</AccordionContent>
									</AccordionItem>
								</Accordion>

								{/* Acordeón de Clasificación */}
								<Accordion type='single' collapsible>
									<AccordionItem value='classification'>
										<AccordionTrigger>Clasificación</AccordionTrigger>
										<AccordionContent className='space-y-4 pt-4'>
											<InfoRow label='Categoría' value={product.category?.name || 'Ninguna'} />
											<InfoRow label='Marca' value={product.brand?.name || 'Ninguna'} />
											{product.supplier && <InfoRow label='Proveedor' value={product.supplier.legalName} bold />}
											{product.template && <InfoRow label='Plantilla' value={product.template.name} />}
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						</CardContent>
					</Card>

					{/* Atributos del Template */}
					{product.template?.atributes && product.template.atributes.length > 0 && (
						<>
							<Card className='text-muted-foreground border-none bg-transparent p-0 shadow-none'>
								<CardHeader className='p-0'>
									<CardTitle>Atributos del Producto</CardTitle>
									<p className='text-muted-foreground text-sm'>
										Características específicas del template "{product.template.name}"
									</p>
								</CardHeader>

								<CardContent className='p-0'>
									<div className='grid gap-4 sm:grid-cols-2'>
										{product.template.atributes.map((attribute: any, index: number) => (
											<div key={index} className='rounded-lg border p-4'>
												<div className='space-y-2'>
													<div className='flex items-center justify-between'>
														<h4 className='text-foreground font-medium'>{attribute.name}</h4>
														<Badge variant='outline' className='text-xs'>
															{attribute.type}
														</Badge>
													</div>
													{attribute.description && (
														<p className='text-muted-foreground text-sm'>{attribute.description}</p>
													)}
													{attribute.options && attribute.options.length > 0 && (
														<div className='flex flex-wrap gap-1'>
															{attribute.options.map((option: string, optIndex: number) => (
																<Badge key={optIndex} variant='secondary' className='text-xs'>
																	{option}
																</Badge>
															))}
														</div>
													)}
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							<Separator />
						</>
					)}
				</div>

				<ProductAnalytics />
			</div>
		</div>
	)
}