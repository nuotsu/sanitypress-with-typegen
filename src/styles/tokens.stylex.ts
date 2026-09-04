import * as stylex from '@stylexjs/stylex'

export const colors = stylex.defineVars({
	background: '#fff',
	foreground: '#171717',
	stroke: '#e5e5e5',
	primary: 'LinkText',
	amber400: '#fbbf24',
	foreground05: 'color-mix(in oklab, #171717 5%, transparent)',
	foreground10: 'color-mix(in oklab, #171717 10%, transparent)',
	foreground25: 'color-mix(in oklab, #171717 25%, transparent)',
	foreground30: 'color-mix(in oklab, #171717 30%, transparent)',
	foreground50: 'color-mix(in oklab, #171717 50%, transparent)',
	foreground60: 'color-mix(in oklab, #171717 60%, transparent)',
	foreground80: 'color-mix(in oklab, #171717 80%, transparent)',
	current02: 'color-mix(in oklab, currentColor 2%, transparent)',
	current05: 'color-mix(in oklab, currentColor 5%, transparent)',
	primary20: 'color-mix(in oklab, LinkText 20%, transparent)',
})

export const fonts = stylex.defineVars({
	sans: "'Geist', sans-serif",
	mono: "'Geist Mono', monospace",
})

export const spacing = stylex.defineVars({
	lh: '1lh',
	ch: '1ch',
})
