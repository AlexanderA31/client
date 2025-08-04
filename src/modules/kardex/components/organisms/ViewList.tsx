'use client'

import { Separator } from '@/components/ui/separator'
import { Typography } from '@/components/ui/typography'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/layout/atoms/Badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table as ReactTable } from '@tanstack/react-table'
import { I_Kardex } from '@/modules/kardex/types/kardex'
import { animations } from '@/modules/kardex/components/atoms/animations'
import { TableActions } from '@/modules/kardex/components/organisms/Table/TableActions'
import { TableInfoDate } from '@/modules/kardex/components/organisms/Table/TableInfoDate'
import { formatPrice } from '@/common/utils/formatPrice-util'

interface ListViewProps {
	table: ReactTable<I_Kardex>
	onViewDetails: (kardexData: I_Kardex) => void
}

export const ListView = ({ table, onViewDetails }: ListViewProps) => (
	<div className='space-y-4'>
		<motion.div
			initial='hidden'
			animate='visible'
			variants={animations.container}
			className='grid grid-cols-1 gap-4'
			layout>
			<AnimatePresence mode='sync'>
				{table.getRowModel().rows.map(row => {
					const kardexData = row.original
					return (
						<motion.div
							key={row.id}
							variants={animations.rowItem} // using rowItem for consistency
							initial='hidden'
							animate='visible'
							exit='exit'
							whileHover='hover'
							layout
							className='group'>
							<Card className='border-border/50 overflow-hidden border shadow-none transition-all duration-300'>
								<CardContent className='p-4'>
									<div className='flex items-start space-x-4'>
										<div className='min-w-0 flex-1'>
											<div className='flex items-start justify-between gap-2'>
												<div className='min-w-0 flex-1 space-y-2'>
													<div className='mb-1 flex items-start justify-between gap-2'>
														<div>
                                                            <Typography variant='h6' className='line-clamp-1 break-words'>
                                                                {kardexData.product.name}
                                                            </Typography>
                                                            <Typography variant='span' className='text-muted-foreground text-sm'>
                                                                {kardexData.concept}
                                                            </Typography>
                                                        </div>
														<div className='flex-shrink-0'>
															<TableActions kardexData={kardexData} onViewDetails={onViewDetails} />
														</div>
													</div>

                                                    <Separator />

													<div className='grid grid-cols-3 gap-x-4 gap-y-1 text-sm'>
                                                        <div className='flex items-center justify-between col-span-3'>
                                                            <span className='text-muted-foreground'>Tipo:</span>
                                                            <Badge
                                                                variant={kardexData.type === 'IN' ? 'success' : kardexData.type === 'OUT' ? 'destructive' : 'warning'}
                                                                text={kardexData.type === 'IN' ? 'Entrada' : kardexData.type === 'OUT' ? 'Salida' : 'Ajuste'}
                                                            />
                                                        </div>
                                                        <div className='flex items-center justify-between'>
                                                            <span className='text-muted-foreground'>Cantidad:</span>
                                                            <span>{kardexData.quantity}</span>
                                                        </div>
                                                        <div className='flex items-center justify-between'>
                                                            <span className='text-muted-foreground'>Precio U:</span>
                                                            <span>{formatPrice(kardexData.unitPrice)}</span>
                                                        </div>
                                                        <div className='flex items-center justify-between'>
                                                            <span className='text-muted-foreground'>Total:</span>
                                                            <span className='font-semibold'>{formatPrice(kardexData.totalPrice)}</span>
                                                        </div>
													</div>

													<Separator />

													<div className='flex items-center justify-between gap-2'>
														<Badge
															decord={false}
															variant={kardexData.status === 'active' ? 'success' : 'warning'}
															text={kardexData.status === 'active' ? 'Activo' : 'Inactivo'}
														/>

														<div className='text-muted-foreground text-right text-xs'>
															<TableInfoDate kardexData={kardexData} />
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)
				})}
			</AnimatePresence>
		</motion.div>
	</div>
)
