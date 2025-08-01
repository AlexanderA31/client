export const COLORS = {
	default: {
		background: 'bg-neutral-100 dark:bg-neutral-900',
		text: 'text-neutral-700 dark:text-neutral-300',
		primary: 'bg-neutral-200 dark:bg-neutral-800',
		secondary: 'bg-neutral-100 dark:bg-neutral-700',
		navbar: 'bg-neutral-50 dark:bg-neutral-900',
		footer: 'bg-neutral-200 dark:bg-neutral-900',
		card: 'bg-neutral-50 dark:bg-background',
		button: 'bg-neutral-800 dark:bg-neutral-50',
	},
	gruvbox: {
		background: 'bg-amber-50 dark:bg-[#282828]',
		text: 'text-amber-900 dark:text-amber-100',
		primary: 'bg-amber-200 dark:bg-[#232425]',
		secondary: 'bg-amber-100 dark:bg-[#504945]',
		navbar: 'bg-amber-50 dark:bg-[#1d2021]',
		footer: 'bg-amber-200 dark:bg-[#1d2021]',
		card: 'bg-amber-50 dark:bg-[#32302f]',
		button: 'bg-amber-600 dark:bg-amber-700 text-white',
	},
	nord: {
		background: 'bg-[#ECEFF4] dark:bg-[#2E3440]',
		text: 'text-[#3B4252] dark:text-[#D8DEE9]',
		primary: 'bg-[#E5E9F0] dark:bg-[#494e5c]',
		secondary: 'bg-[#D8DEE9] dark:bg-[#434C5E]',
		navbar: 'bg-[#E5E9F0] dark:bg-[#2E3440]',
		footer: 'bg-[#D8DEE9] dark:bg-[#2E3440]',
		card: 'bg-white dark:bg-[#3B4252]',
		button: 'bg-[#5E81AC] dark:bg-[#81A1C1] text-white',
	},
	dracula: {
		background: 'bg-[#f8f8f2] dark:bg-[#282a36]',
		text: 'text-[#44475a] dark:text-[#f8f8f2]',
		primary: 'bg-[#6272a4] dark:bg-[#56596b]',
		secondary: 'bg-[#bd93f9] dark:bg-[#6272a4]',
		navbar: 'bg-[#f8f8f2] dark:bg-[#282a36]',
		footer: 'bg-[#6272a4] dark:bg-[#282a36]',
		card: 'bg-white dark:bg-[#44475a]',
		button: 'bg-[#ff79c6] dark:bg-[#bd93f9] text-white',
	},
	solarized: {
		background: 'bg-[#fdf6e3] dark:bg-[#002b36]',
		text: 'text-[#657b83] dark:text-[#839496]',
		primary: 'bg-[#eee8d5] dark:bg-[#0c3d4a]',
		secondary: 'bg-[#93a1a1] dark:bg-[#586e75]',
		navbar: 'bg-[#eee8d5] dark:bg-[#002b36]',
		footer: 'bg-[#eee8d5] dark:bg-[#002b36]',
		card: 'bg-white dark:bg-[#073642]',
		button: 'bg-[#268bd2] dark:bg-[#2aa198] text-white',
	},
	green: {
		background: 'bg-green-50 dark:bg-green-900',
		text: 'text-green-700 dark:text-green-300',
		primary: 'bg-green-200 dark:bg-green-800',
		secondary: 'bg-green-100 dark:bg-green-700',
		navbar: 'bg-green-50 dark:bg-green-900',
		footer: 'bg-green-200 dark:bg-green-900',
		card: 'bg-green-50 dark:bg-green-800',
		button: 'bg-green-800 dark:bg-green-50 text-white',
	},
	blue: {
		background: 'bg-sky-100 dark:bg-sky-900',
		text: 'text-sky-700 dark:text-sky-300',
		primary: 'bg-sky-200 dark:bg-sky-800',
		secondary: 'bg-sky-100 dark:bg-sky-700',
		navbar: 'bg-sky-50 dark:bg-sky-900',
		footer: 'bg-sky-200 dark:bg-sky-900',
		card: 'bg-sky-50 dark:bg-slate-800',
		button: 'bg-sky-800 dark:bg-sky-50 text-white',
	},
	amber: {
		background: 'bg-amber-50 dark:bg-amber-900',
		text: 'text-amber-700 dark:text-amber-300',
		primary: 'bg-amber-200 dark:bg-amber-800',
		secondary: 'bg-amber-100 dark:bg-amber-700',
		navbar: 'bg-amber-50 dark:bg-amber-900',
		footer: 'bg-amber-200 dark:bg-amber-900',
		card: 'bg-amber-50 dark:bg-amber-800',
		button: 'bg-amber-800 dark:bg-amber-50 text-white',
	},
}

export const THEMES = {
	solid: [
		{
			name: 'Base',
			value: 'default',
			scaledValue: 'default-scaled',
			monoValue: 'default-mono',
			colors: COLORS.default,
		},
		{
			name: 'Celeste',
			value: 'blue',
			scaledValue: 'blue-scaled',
			monoValue: 'blue-mono',
			colors: COLORS.blue,
		},
		{
			name: 'Verde',
			value: 'green',
			scaledValue: 'green-scaled',
			monoValue: 'green-mono',
			colors: COLORS.green,
		},
		{
			name: 'Ámbar',
			value: 'amber',
			scaledValue: 'amber-scaled',
			monoValue: 'amber-mono',
			colors: COLORS.amber,
		},
	],
	creative: [
		{
			name: 'Gruvbox',
			value: 'gruvbox',
			scaledValue: 'gruvbox-scaled',
			monoValue: 'gruvbox-mono',
			colors: COLORS.gruvbox,
		},
		{
			name: 'Nord',
			value: 'nord',
			scaledValue: 'nord-scaled',
			monoValue: 'nord-mono',
			colors: COLORS.nord,
		},
		{
			name: 'Dracula',
			value: 'dracula',
			scaledValue: 'dracula-scaled',
			monoValue: 'dracula-mono',
			colors: COLORS.dracula,
		},
		{
			name: 'Solarized',
			value: 'solarized',
			scaledValue: 'solarized-scaled',
			monoValue: 'solarized-mono',
			colors: COLORS.solarized,
		},
	],
}
