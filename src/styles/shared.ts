import * as stylex from '@stylexjs/stylex'
import { colors, fonts, spacing } from './tokens.stylex'
import { mq } from './breakpoints.stylex'

const skeletonShimmer = stylex.keyframes({
	to: {
		backgroundPosition: '-200% 0',
	},
})

/**
 * Shared StyleX recipes — replacements for Tailwind `@utility` classes
 * formerly defined in app.css (section, h1–h6, action, link, etc.).
 */
export const shared = stylex.create({
	h0: {
		fontWeight: 700,
		fontSize: '3.75rem',
		lineHeight: 1.1,
	},
	h1: {
		fontWeight: 700,
		fontSize: '2.25rem',
		lineHeight: 1.25,
	},
	h2: {
		fontWeight: 700,
		fontSize: '1.875rem',
		lineHeight: 1.3,
	},
	h3: {
		fontWeight: 700,
		fontSize: '1.5rem',
		lineHeight: 1.35,
	},
	h4: {
		fontWeight: 700,
		fontSize: '1.25rem',
		lineHeight: 1.4,
	},
	h5: {
		fontWeight: 700,
		fontSize: '1.125rem',
		lineHeight: 1.45,
	},
	h6: {
		fontWeight: 700,
		fontSize: '1rem',
		lineHeight: 1.5,
	},
	technical: {
		fontFamily: fonts.mono,
		letterSpacing: '0.1em',
		textTransform: 'uppercase',
	},

	action: {
		cursor: 'pointer',
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		gap: '0.5em',
		paddingBlock: '0.25em',
		paddingInline: '0.75em',
		transitionProperty: 'all',
		transitionDuration: '150ms',
		transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
		backgroundColor: colors.primary,
		color: colors.background,
		transform: {
			default: null,
			':active': 'scale(0.98)',
		},
	},
	actionOutline: {
		cursor: 'pointer',
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		gap: '0.5em',
		paddingBlock: '0.25em',
		paddingInline: '0.75em',
		transitionProperty: 'all',
		transitionDuration: '150ms',
		transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
		backgroundColor: colors.background,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: {
			default: colors.stroke,
			':hover': 'currentColor',
		},
		color: colors.foreground,
		transform: {
			default: null,
			':active': 'scale(0.98)',
		},
	},
	ghost: {
		cursor: 'pointer',
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		gap: '0.5em',
		paddingBlock: '0.25em',
		paddingInline: '0.75em',
		transitionProperty: 'all',
		transitionDuration: '150ms',
		transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
		backgroundColor: {
			default: colors.current02,
			':hover': colors.current05,
		},
		color: 'inherit',
		transform: {
			default: null,
			':active': 'scale(0.98)',
		},
	},
	link: {
		color: colors.primary,
		cursor: 'pointer',
		textDecorationLine: 'underline',
		textDecorationThickness: {
			default: null,
			':hover': '2px',
		},
	},
	input: {
		paddingBlock: '0.25em',
		paddingInline: '0.5em',
		backgroundColor: colors.background,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: {
			default: colors.foreground10,
			':focus-within': colors.foreground30,
			':focus': colors.primary,
		},
		lineHeight: 'normal',
		outline: {
			default: null,
			':focus': 'none',
		},
		boxShadow: {
			default: null,
			':focus': `0 0 0 3px ${colors.primary20}`,
		},
	},
	skipLink: {
		cursor: 'pointer',
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		gap: '0.5em',
		backgroundColor: colors.background,
		color: colors.foreground,
		position: {
			default: 'absolute',
			':focus': 'fixed',
		},
		width: {
			default: '1px',
			':focus': 'auto',
		},
		height: {
			default: '1px',
			':focus': 'auto',
		},
		padding: {
			default: 0,
			':focus': '0.25em 0.75em',
		},
		margin: {
			default: '-1px',
			':focus': 0,
		},
		overflow: {
			default: 'hidden',
			':focus': 'visible',
		},
		clipPath: {
			default: 'inset(50%)',
			':focus': 'none',
		},
		whiteSpace: {
			default: 'nowrap',
			':focus': 'normal',
		},
		borderWidth: 0,
		top: {
			default: null,
			':focus': '1rem',
		},
		left: {
			default: null,
			':focus': '1rem',
		},
		zIndex: {
			default: null,
			':focus': 100,
		},
		outlineWidth: {
			default: null,
			':focus': 2,
		},
		outlineStyle: {
			default: null,
			':focus': 'dashed',
		},
		outlineOffset: {
			default: null,
			':focus': 2,
		},
		outlineColor: {
			default: null,
			':focus': colors.primary,
		},
	},

	section: {
		marginInline: 'auto',
		width: '100%',
		maxWidth: '80rem',
		paddingInline: {
			default: '1rem',
			[mq.md]: '2rem',
		},
		paddingBlock: '3rem',
	},
	prose: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
		lineHeight: 1.625,
	},

	fullBleed: {
		width: '100vw',
		marginInline: 'calc(50% - 50vw)',
	},
	noScrollbar: {
		scrollbarWidth: 'none',
	},
	stickyBelowHeader: {
		position: 'sticky',
		top: 'calc(var(--header-height) + var(--offset, 0px))',
	},
	srOnly: {
		position: 'absolute',
		width: '1px',
		height: '1px',
		padding: 0,
		margin: '-1px',
		overflow: 'hidden',
		clipPath: 'inset(50%)',
		whiteSpace: 'nowrap',
		borderWidth: 0,
	},
	skeleton: {
		display: 'block',
		height: spacing.lh,
		backgroundSize: '200% 100%',
		backgroundImage: `linear-gradient(to right, ${colors.foreground10}, ${colors.foreground05}, ${colors.foreground10})`,
		animationName: skeletonShimmer,
		animationDuration: '1.2s',
		animationTimingFunction: 'linear',
		animationIterationCount: 'infinite',
	},

	animFade: {
		transitionProperty: 'opacity, translate, scale',
		transitionDuration: '150ms',
		transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
	},
	animFadeToL: {
		transitionProperty: 'opacity, translate, scale',
		transitionDuration: '150ms',
		transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
	},
	animFadeToR: {
		transitionProperty: 'opacity, translate, scale',
		transitionDuration: '150ms',
		transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
	},
	animFadeToT: {
		transitionProperty: 'opacity, translate, scale',
		transitionDuration: '150ms',
		transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
	},
	animFadeToB: {
		transitionProperty: 'opacity, translate, scale',
		transitionDuration: '150ms',
		transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
	},

	body: {
		backgroundColor: colors.background,
		color: colors.foreground,
		fontFamily: fonts.sans,
		WebkitFontSmoothing: 'antialiased',
		MozOsxFontSmoothing: 'grayscale',
	},
})

/** CTA theme enum → StyleX style map */
export const ctaThemes = {
	action: shared.action,
	'action-outline': shared.actionOutline,
	ghost: shared.ghost,
	link: shared.link,
} as const

export type CtaTheme = keyof typeof ctaThemes
