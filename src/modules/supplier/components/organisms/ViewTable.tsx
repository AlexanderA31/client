'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { I_Product } from '@/modules/product/types/product'
import { Table as ReactTable, flexRender } from '@tanstack/react-table'
import { animations } from '@/modules/product/components/atoms/animations'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Props {
	recordsData: ReactTable<I_Product>
}

export const TableView = ({ recordsData }: Props) => (
	<div className='space-y-4'>
		<motion.div
			initial='hidden'
			animate='visible'
			variants={animations.container}
			className='border-border/50 rounded-xl border'>
			<Table className='bg-card w-full rounded-xl'>
				<TableHeader>
					{recordsData.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<TableHead key={header.id} className='text-muted-foreground whitespace-nowrap'>
									{flexRender(header.column.columnDef.header, header.getContext())}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>

				<TableBody className='divide-y'>
					<AnimatePresence mode='sync'>
						{recordsData.getRowModel().rows.map(row => (
							<motion.tr
								key={row.id}
								variants={animations.rowItem}
								initial='hidden'
								animate='visible'
								exit='exit'
								whileHover='hover'
								layout='position'
								className='group'>
								{row.getVisibleCells().map(cell => (
									<TableCell key={cell.id} className='text-primary p-2'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</motion.tr>
						))}
					</AnimatePresence>
				</TableBody>
			</Table>
		</motion.div>
	</div>
)
