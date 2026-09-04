import * as stylex from '@stylexjs/stylex'
import type { Person } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { spacing } from '../../styles/tokens.stylex'
import Img from '@/ui/img'

export default function ({
	author,
	className,
}: { author?: Person } & React.ComponentProps<'div'>) {
	if (!author?.name) return null

	const root = stylex.props(styles.root)

	return (
		<div
			{...root}
			className={[root.className, className].filter(Boolean).join(' ')}
		>
			<figure {...stylex.props(styles.figure)}>
				<Img
					{...stylex.props(styles.image)}
					image={author.image}
					width={48}
					alt={author.name ?? ''}
				/>
			</figure>

			<div>
				<span {...stylex.props(shared.srOnly)}>By </span>
				{author.name}
			</div>
		</div>
	)
}

const styles = stylex.create({
	root: {
		display: 'inline-flex',
		alignItems: 'center',
		gap: '0.5rem',
	},
	figure: {
		width: spacing.lh,
		height: spacing.lh,
		aspectRatio: '1 / 1',
		flexShrink: 0,
		overflow: 'hidden',
		borderRadius: '9999px',
	},
	image: {
		aspectRatio: '1 / 1',
		objectFit: 'cover',
	},
})
