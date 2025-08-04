'use client'

import { ViewType } from '@/modules/category/components/molecules/ViewSelector'
import { CardSkeleton, ListSkeleton, TableSkeleton } from './TableSkeleton'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function LoadingStates({ viewType }: { viewType: ViewType }) {
	if (viewType === 'card') {
		return (
			<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				<CardSkeleton />
			</div>
		)
	}

	if (viewType === 'list') {
		return (
			<div className='grid grid-cols-1 gap-4'>
				<ListSkeleton />
			</div>
		)
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Fecha</TableHead>
					<TableHead>Producto</TableHead>
					<TableHead>Almacén</TableHead>
					<TableHead>Concepto</TableHead>
					<TableHead>Tipo</TableHead>
					<TableHead>Cantidad</TableHead>
					<TableHead>Precio Unit.</TableHead>
					<TableHead>Precio Total</TableHead>
                    <TableHead>Saldo</TableHead>
					<TableHead>Estado</TableHead>
					<TableHead>Información</TableHead>
					<TableHead />
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableSkeleton />
			</TableBody>
		</Table>
	)
}
