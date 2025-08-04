'use client'

import { Typography } from '@/components/ui/typography'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/layout/atoms/Badge'
import { Table as ReactTable } from '@tanstack/react-table'
import { translateMovementType } from '@/modules/kardex/utils/movement-type-translator'
import { I_Kardex } from '@/modules/kardex/types/kardex'
import { animations } from '@/modules/kardex/components/atoms/animations'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { TableActions } from '@/modules/kardex/components/organisms/Table/TableActions'
import { formatPrice } from '@/common/utils/formatPrice-util'
import { formatDate } from '@/common/utils/dateFormater-util'

interface CardViewProps {
	table: ReactTable<I_Kardex>
	onViewDetails: (kardexData: I_Kardex) => void
}

export const CardView = ({ table, onViewDetails }: CardViewProps) => (
	<div className='space-y-4'>
		<motion.div
			initial='hidden'
			animate='visible'
			variants={animations.container}
			className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
			layout>
			<AnimatePresence mode='sync'>
				{table.getRowModel().rows.map(row => {
					const kardexData = row.original
					return (
						<motion.div
							key={row.id}
							variants={animations.rowItem}
							initial='hidden'
							animate='visible'
							exit='exit'
							layout
							className='group relative'>
							<Card className='border-border/50 flex h-full flex-col overflow-hidden border p-0 transition-all duration-300'>
								<CardHeader className='flex-none p-4'>
                                    <div className='flex justify-between items-start'>
                                        <div>
                                            <Typography variant='h6' className='line-clamp-1'>
                                                {kardexData.product.name}
                                            </Typography>
                                            <Typography variant='span' className='text-muted-foreground text-sm'>
                                                {kardexData.product.code}
                                            </Typography>
                                        </div>
                                        <div className='bg-card/50 shadow- rounded-full backdrop-blur-sm'>
										    <TableActions kardexData={kardexData} onViewDetails={onViewDetails} />
									    </div>
                                    </div>
								</CardHeader>

								<CardContent className='flex-grow px-4 space-y-2'>
                                    <div className='flex justify-between'>
                                        <Typography variant='span' className='text-muted-foreground text-sm'>Tipo:</Typography>
                                        <Badge
                                            variant={
                                                kardexData.movementType.includes('in') || kardexData.movementType.includes('purchase')
                                                    ? 'success'
                                                    : kardexData.movementType.includes('out') || kardexData.movementType.includes('sale')
                                                    ? 'destructive'
                                                    : 'warning'
                                            }
                                            text={translateMovementType(kardexData.movementType)}
                                        />
                                    </div>
                                    <div className='flex justify-between'>
                                        <Typography variant='span' className='text-muted-foreground text-sm'>Cantidad:</Typography>
                                        <Typography variant='span' className='text-sm'>{kardexData.quantity}</Typography>
                                    </div>
                                    <div className='flex justify-between'>
                                        <Typography variant='span' className='text-muted-foreground text-sm'>Total:</Typography>
                                        <Typography variant='span' className='text-sm font-semibold'>{formatPrice(kardexData.total)}</Typography>
                                    </div>
								</CardContent>

								<CardFooter className='flex flex-none items-center justify-between p-4 pt-0'>
                                    <Typography variant='span' className='text-muted-foreground text-xs'>
                                        {formatDate(kardexData.createdAt, 'es-ES', { dateStyle: 'medium' })}
                                    </Typography>
								</CardFooter>
							</Card>
						</motion.div>
					)
				})}
			</AnimatePresence>
		</motion.div>
	</div>
)
