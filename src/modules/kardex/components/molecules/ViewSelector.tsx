'use client'

import { Icons } from '@/components/icons'
import { ActionButton } from '@/components/layout/atoms/ActionButton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export type ViewType = 'table' | 'card' | 'list'

interface ViewSelectorProps {
	currentView: ViewType
	onViewChange: (view: ViewType) => void
}

export const ViewSelector = ({ currentView, onViewChange }: ViewSelectorProps) => {
	const views: { type: ViewType; icon: JSX.Element; label: string }[] = [
		{ type: 'table', icon: <Icons.viewTable />, label: 'Vista de Tabla' },
		{ type: 'card', icon: <Icons.viewCard />, label: 'Vista de Tarjeta' },
		{ type: 'list', icon: <Icons.viewList />, label: 'Vista de Lista' },
	]

	return (
		<div className='bg-accent/30 border-border/50 flex items-center gap-1 rounded-xl border p-1'>
			<TooltipProvider>
				{views.map(({ type, icon, label }) => (
					<Tooltip key={type}>
						<TooltipTrigger asChild>
							<ActionButton
								variant={currentView === type ? 'default' : 'ghost'}
								size='icon'
								onClick={() => onViewChange(type)}
								className={`rounded-lg ${currentView === type ? 'shadow-md' : ''}`}>
								{icon}
							</ActionButton>
						</TooltipTrigger>
						<TooltipContent className='bg-primary/90 text-primary-foreground border-border/20 rounded-xl border backdrop-blur-xl'>
							<p>{label}</p>
						</TooltipContent>
					</Tooltip>
				))}
			</TooltipProvider>
		</div>
	)
}
