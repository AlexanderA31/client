import * as React from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

function NavigationMenu({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot='navigation-menu'
			className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
			{...props}>
			{children}
			<NavigationMenuViewport />
		</NavigationMenuPrimitive.Root>
	)
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot='navigation-menu-list'
			className={cn('group flex flex-1 list-none items-center justify-center space-x-1', className)}
			{...props}
		/>
	)
}

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
	'group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50'
)

function NavigationMenuTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot='navigation-menu-trigger'
			className={cn(navigationMenuTriggerStyle(), 'group', className)}
			{...props}>
			{children}{' '}
			<ChevronDownIcon
				className='relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180'
				aria-hidden='true'
			/>
		</NavigationMenuPrimitive.Trigger>
	)
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot='navigation-menu-content'
			className={cn(
				'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full md:absolute md:w-auto',
				className
			)}
			{...props}
		/>
	)
}

const NavigationMenuLink = NavigationMenuPrimitive.Link

function NavigationMenuViewport({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
	return (
		<div className={cn('absolute top-full left-0 flex justify-center')}>
			<NavigationMenuPrimitive.Viewport
				data-slot='navigation-menu-viewport'
				className={cn(
					'origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 border-border dark:border-border/15 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow-sm md:w-[var(--radix-navigation-menu-viewport-width)]',
					className
				)}
				{...props}
			/>
		</div>
	)
}

function NavigationMenuIndicator({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
	return (
		<NavigationMenuPrimitive.Indicator
			data-slot='navigation-menu-indicator'
			className={cn(
				'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-1 flex h-1.5 items-end justify-center overflow-hidden',
				className
			)}
			{...props}>
			<div className='bg-border relative top-[60%] size-2 rotate-45 rounded-tl-sm shadow-md' />
		</NavigationMenuPrimitive.Indicator>
	)
}

export {
	navigationMenuTriggerStyle,
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	NavigationMenuViewport,
}
