'use client'

import { motion } from 'framer-motion'
import { Icons } from '@/components/icons'
import { Typography } from '@/components/ui/typography'
import { ActionButton } from '@/components/layout/atoms/ActionButton'
import { useRouter } from 'next/navigation'
import { I_Product } from '@/modules/product/types/product'
import { ImageControl } from '@/components/layout/organims/ImageControl'

interface KardexHeaderProps {
	title: string
	subtitle: string
	product?: I_Product
}

export function KardexHeader({ title, subtitle, product }: KardexHeaderProps) {
	const router = useRouter()

	const isDetailView = title !== 'Kardex'

	return (
		<motion.section
			initial={{ opacity: 0, y: -12, filter: 'blur(0px)' }}
			animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
			transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
			className='flex items-center justify-between'>
			<div className='flex items-center gap-4'>
				{isDetailView && (
					<ActionButton
						variant='ghost'
						size='icon'
						icon={<Icons.iconArrowLeft className='h-5 w-5' />}
						onClick={() => router.back()}
					/>
				)}
				{product && (
					<ImageControl
						recordData={product}
						imageHeight={40}
						imageWidth={40}
						showDetails={true}
						enableHover={true}
						enableClick={true}
					/>
				)}
				<div className='flex flex-col gap-2'>
					<div className='flex items-baseline gap-4'>
						<Typography variant='h3' className='font-bold'>
							{title}
						</Typography>
					</div>
					<Typography variant='span'>{subtitle}</Typography>
				</div>
			</div>
		</motion.section>
	)
}
