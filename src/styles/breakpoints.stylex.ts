import * as stylex from '@stylexjs/stylex'

/** Media query constants — must use defineConsts in a `.stylex.ts` file */
export const mq = stylex.defineConsts({
	sm: '@media (min-width: 40rem)',
	md: '@media (min-width: 48rem)',
	lg: '@media (min-width: 64rem)',
	maxSm: '@media (max-width: 39.999rem)',
	maxMd: '@media (max-width: 47.999rem)',
	pointerFine: '@media (pointer: fine)',
	reducedMotion: '@media (prefers-reduced-motion: reduce)',
})
