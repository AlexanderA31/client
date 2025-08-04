'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

const TableSkeleton = () => (
	<>
		{Array.from({ length: 5 }).map((_, i) => (
			<tr key={i} className='border-b'>
				<td className='py-4'>
					<Skeleton className='h-8 w-24' />
				</td>
				<td className='py-4'>
					<Skeleton className='h-8 w-32' />
				</td>
				<td className='py-4'>
					<Skeleton className='h-8 w-48' />
				</td>
				<td className='py-4'>
					<Skeleton className='h-8 w-24' />
				</td>
				<td className='py-4'>
					<Skeleton className='h-8 w-20' />
				</td>
				<td className='py-4'>
					<Skeleton className='h-8 w-20' />
				</td>
				<td className='py-4'>
					<Skeleton className='h-8 w-24' />
				</td>
				<td className='py-4'>
					<Skeleton className='h-8 w-24' />
				</td>
			</tr>
		))}
	</>
)

const CardSkeleton = () => (
	<>
		{Array.from({ length: 4 }).map((_, i) => (
			<Card key={i} className='w-full'>
				<CardHeader>
					<Skeleton className='h-32 w-full' />
				</CardHeader>
				<CardContent>
					<Skeleton className='h-6 w-3/4' />
					<Skeleton className='mt-2 h-4 w-1/2' />
				</CardContent>
				<CardFooter>
					<Skeleton className='h-8 w-20' />
				</CardFooter>
			</Card>
		))}
	</>
)

const ListSkeleton = () => (
	<>
		{Array.from({ length: 3 }).map((_, i) => (
			<Card key={i} className='w-full'>
				<CardContent className='flex items-center space-x-4 p-4'>
					<Skeleton className='h-24 w-24' />
					<div className='w-full space-y-2'>
						<Skeleton className='h-6 w-3/4' />
						<Skeleton className='h-4 w-1/2' />
						<Skeleton className='h-4 w-1/3' />
					</div>
				</CardContent>
			</Card>
		))}
	</>
)

export { TableSkeleton, CardSkeleton, ListSkeleton }
