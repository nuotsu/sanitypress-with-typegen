import * as stylex from '@stylexjs/stylex'
import { shared } from '../../styles/shared'
import { colors, spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'

export default function ({ postsPerPage }: { postsPerPage: number }) {
	return (
		<>
			{/* post-preview-large */}
			<div {...stylex.props(styles.large)}>
				<div
					{...stylex.props(
						shared.skeleton,
						styles.media,
						styles.mediaBleed,
					)}
				/>

				<div {...stylex.props(styles.largeBody)}>
					<div {...stylex.props(shared.skeleton, shared.h1, styles.titleLarge)} />

					<div {...stylex.props(styles.spacer)} />

					<div {...stylex.props(styles.meta)}>
						<span {...stylex.props(shared.skeleton, styles.chip)} />
						<span {...stylex.props(shared.skeleton, styles.chip)} />
					</div>

					<div {...stylex.props(styles.byline)}>
						<div {...stylex.props(shared.skeleton, styles.avatar)} />
						<span {...stylex.props(shared.skeleton, styles.chip)} />
					</div>
				</div>
			</div>

			<hr {...stylex.props(styles.hr)} />

			<div {...stylex.props(styles.grid)}>
				{Array.from({ length: postsPerPage }).map((_, index) => (
					<li
						{...stylex.props(styles.card)}
						style={{ animationDelay: `${index * 0.2}s` }}
						key={index}
					>
						<div {...stylex.props(shared.skeleton, styles.media)} />

						<div {...stylex.props(shared.skeleton)} />

						<div {...stylex.props(styles.meta)}>
							<span {...stylex.props(shared.skeleton, styles.chip)} />
							<span {...stylex.props(shared.skeleton, styles.chip)} />
						</div>

						<div {...stylex.props(styles.byline)}>
							<div {...stylex.props(shared.skeleton, styles.avatar)} />
							<span {...stylex.props(shared.skeleton, styles.chip)} />
						</div>
					</li>
				))}
			</div>
		</>
	)
}

const pulse = stylex.keyframes({
	'0%, 100%': { opacity: 1 },
	'50%': { opacity: 0.5 },
})

const styles = stylex.create({
	large: {
		display: 'grid',
		alignItems: 'center',
		gap: '1rem',
		order: {
			default: null,
			[mq.md]: -1,
		},
		gridTemplateColumns: {
			default: '1fr',
			[mq.md]: '1fr 1fr',
		},
		animationName: pulse,
		animationDuration: '2s',
		animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
		animationIterationCount: 'infinite',
	},
	media: {
		aspectRatio: '16 / 9',
		height: 'auto',
		width: '100%',
	},
	mediaBleed: {
		width: {
			default: '100vw',
			[mq.md]: '100%',
		},
		marginInline: {
			default: 'calc(50% - 50vw)',
			[mq.md]: 0,
		},
	},
	largeBody: {
		display: 'grid',
		gap: '0.5rem',
		alignSelf: 'center',
	},
	titleLarge: {
		height: '2lh',
	},
	spacer: {
		height: '2lh',
	},
	meta: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		columnGap: '1rem',
	},
	byline: {
		display: 'inline-flex',
		alignItems: 'center',
		gap: '0.5rem',
	},
	chip: {
		width: '8ch',
	},
	avatar: {
		width: spacing.lh,
		height: spacing.lh,
		flexShrink: 0,
		borderRadius: '9999px',
	},
	hr: {
		borderWidth: 0,
		borderTopWidth: 1,
		borderTopStyle: 'solid',
		borderTopColor: colors.stroke,
		order: {
			default: null,
			[mq.md]: -1,
		},
		width: {
			default: '100vw',
			[mq.md]: 'auto',
		},
		marginInline: {
			default: 'calc(50% - 50vw)',
			[mq.md]: 0,
		},
	},
	grid: {
		display: 'grid',
		alignItems: 'start',
		columnGap: '1rem',
		rowGap: '2rem',
		gridTemplateColumns: {
			default: '1fr',
			[mq.sm]: 'repeat(auto-fill, minmax(24rem, 1fr))',
		},
		listStyle: 'none',
		padding: 0,
		margin: 0,
	},
	card: {
		display: 'grid',
		gap: '0.5rem',
		listStyle: 'none',
		animationName: pulse,
		animationDuration: '2s',
		animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
		animationIterationCount: 'infinite',
	},
})
