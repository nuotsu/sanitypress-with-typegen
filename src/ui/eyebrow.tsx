import * as stylex from '@stylexjs/stylex'
import { stegaClean } from 'next-sanity'
import { shared } from '../styles/shared'

export default function ({
	value,
	xstyle,
	className,
	...props
}: { value?: string; xstyle?: stylex.StyleXStyles; className?: string } & Omit<
	React.ComponentProps<'p'>,
	'className'
>) {
	if (!value) return null

	const sx = stylex.props(shared.technical, styles.root, xstyle)

	return (
		<p
			{...props}
			{...sx}
			className={[sx.className, className].filter(Boolean).join(' ')}
		>
			{stegaClean(value)}
		</p>
	)
}

const styles = stylex.create({
	root: {
		fontSize: '0.875rem',
		color: 'color-mix(in oklab, currentColor 60%, transparent)',
	},
})
