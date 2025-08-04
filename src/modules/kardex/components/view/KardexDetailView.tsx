'use client'

import { useKardex } from '@/common/hooks/useKardex'
import { Badge } from '@/components/layout/atoms/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { I_Kardex } from '@/modules/kardex/types/kardex'
import { SpinnerLoader } from '@/components/layout/SpinnerLoader'
import { Typography } from '@/components/ui/typography'
import { formatDate } from '@/common/utils/dateFormater-util'
import { FatalErrorState } from '@/components/layout/organims/ErrorStateCard'
import { NotFoundState } from '@/components/layout/organims/NotFoundState'
import { formatPrice } from '@/common/utils/formatPrice-util'

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
			<Card className='border-none bg-transparent p-0 shadow-none'>
				<CardContent className='p-0'>
					<div className='flex items-center gap-4'>
						<div className='flex-1'>
							<div className='mb-2 line-clamp-1 break-words'>
								<Typography variant='h3'>Detalle de Movimiento de Kardex</Typography>
							</div>
							<div className='text-muted-foreground flex items-center gap-2'>
								<Typography variant='overline'>ID: {kardexEntry.id}</Typography>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div className='grid gap-8 pt-4 lg:grid-cols-3'>
				<div className='space-y-8 lg:col-span-2'>
                    <Card className='text-muted-foreground border-none bg-transparent p-0 shadow-none'>
                        <CardHeader className='p-0 mb-4'>
                            <CardTitle>Detalles del Movimiento</CardTitle>
                        </CardHeader>
                        <CardContent className='p-0'>
                            <div className='space-y-4'>
                                <InfoRow label='Tipo de Movimiento' value={
                                    <Badge
                                        variant={kardexEntry.movementType === 'purchase' ? 'success' : kardexEntry.movementType === 'sale' ? 'destructive' : 'warning'}
                                        text={kardexEntry.movementType}
                                    />
                                } />
                                <InfoRow label='Producto' value={kardexEntry.product.name} />
                                <InfoRow label='Cód. Producto' value={kardexEntry.product.code} mono />
                                <InfoRow label='Responsable' value={kardexEntry.user.name} />
                            </div>
                        </CardContent>
                    </Card>

                    <Separator/>

                    <Card className='text-muted-foreground border-none bg-transparent p-0 shadow-none'>
                        <CardHeader className='p-0 mb-4'>
                            <CardTitle>Detalles de Stock</CardTitle>
                        </CardHeader>
						<CardContent className='p-0'>
							<div className='space-y-4'>
								<InfoRow label='Stock Anterior' value={`${kardexEntry.stockBefore} unidades`} />
								<InfoRow label='Cantidad' value={`${kardexEntry.quantity} unidades`} bold />
								<InfoRow label='Stock Posterior' value={`${kardexEntry.stockAfter} unidades`} />
							</div>
						</CardContent>
					</Card>

                    <Separator/>

                    <Card className='text-muted-foreground border-none bg-transparent p-0 shadow-none'>
                        <CardHeader className='p-0 mb-4'>
                            <CardTitle>Detalles Monetarios</CardTitle>
                        </CardHeader>
						<CardContent className='p-0'>
							<div className='space-y-4'>
								<InfoRow label='Costo Unitario' value={formatPrice(kardexEntry.unitCost)} />
								<InfoRow label='Subtotal' value={formatPrice(kardexEntry.subtotal)} />
								<InfoRow label='Tasa de Impuesto' value={`${kardexEntry.taxRate}%`} />
                                <InfoRow label='Monto de Impuesto' value={formatPrice(kardexEntry.taxAmount)} />
                                <InfoRow label='Total' value={formatPrice(kardexEntry.total)} bold />
							</div>
						</CardContent>
					</Card>
				</div>

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
