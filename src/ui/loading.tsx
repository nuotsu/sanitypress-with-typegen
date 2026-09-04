import * as stylex from '@stylexjs/stylex'
import { VscLoading } from 'react-icons/vsc'
import { spacing } from '../styles/tokens.stylex'

const spin = stylex.keyframes({
	to: {
		transform: 'rotate(360deg)',
	},
})

export default function ({
	xstyle,
	className,
	children,
	...props
}: Omit<React.ComponentProps<'aside'>, 'className'> & {
	xstyle?: stylex.StyleXStyles
	className?: string
}) {
	const sx = stylex.props(styles.root, xstyle)

	return (
		<aside
			{...props}
			{...sx}
			className={[sx.className, className].filter(Boolean).join(' ')}
			role="status"
		>
			<VscLoading {...stylex.props(styles.icon)} />
			{children || 'Loading...'}
		</aside>
	)
}

const styles = stylex.create({
	root: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: spacing.ch,
		color: 'color-mix(in oklab, currentColor 50%, transparent)',
	},
	icon: {
		animationName: spin,
		animationDuration: '1s',
		animationTimingFunction: 'linear',
		animationIterationCount: 'infinite',
	},
})
