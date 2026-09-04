import * as stylex from '@stylexjs/stylex'
import { PortableText, stegaClean } from 'next-sanity'
import { Module } from '@/modules'
import type { StatList } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import Eyebrow from '@/ui/eyebrow'

export default function ({
	eyebrow,
	intro,
	stats,
	layout: l = 'grid',
	columns,
	...props
}: StatList) {
	const layout = stegaClean(l)
	const headerSx = stylex.props(shared.prose, styles.header)
	const listSx = stylex.props(
		styles.list,
		layout === 'carousel'
			? styles.carouselLayout
			: [styles.gridLayout, columns ? styles.gridColumns : styles.gridAuto],
	)

	return (
		<Module {...stylex.props(shared.section, styles.root)} {...props}>
			{(eyebrow || intro) && (
				<header
					{...headerSx}
					className={[headerSx.className, 'prose'].filter(Boolean).join(' ')}
				>
					<Eyebrow value={eyebrow} />
					<PortableText value={intro} />
				</header>
			)}

			<dl
				{...listSx}
				className={[
					listSx.className,
					layout === 'carousel' &&
						'carousel carousel-scroll-buttons carousel-scroll-marker',
				]
					.filter(Boolean)
					.join(' ')}
				style={{
					...listSx.style,
					['--columns' as string]: columns,
				}}
			>
				{stats?.map(({ value, suffix, content = [], _key }, i) => {
					const contentSx = stylex.props(shared.prose)

					return (
						<div key={`${_key}-${i}`}>
							<dt {...stylex.props(styles.value)}>
								<span {...stylex.props(shared.h0)}>{value}</span>
								{suffix && (
									<span {...stylex.props(shared.h3)}>{suffix}</span>
								)}
							</dt>
							{content && (
								<dd
									{...contentSx}
									className={[contentSx.className, 'prose']
										.filter(Boolean)
										.join(' ')}
								>
									<PortableText value={content} />
								</dd>
							)}
						</div>
					)
				})}
			</dl>
		</Module>
	)
}

const styles = stylex.create({
	root: {
		display: 'flex',
		flexDirection: 'column',
		gap: '2rem',
	},
	header: {
		textAlign: 'center',
	},
	list: {
		display: 'grid',
		gap: '2rem',
	},
	carouselLayout: {
		gridAutoRows: '1fr',
		paddingBottom: '0.5rem',
		paddingInline: {
			default: '1rem',
			[mq.md]: null,
		},
		paddingRight: {
			default: null,
			[mq.md]: '1rem',
		},
		maskImage: {
			default: null,
			[mq.md]:
				'linear-gradient(to right, black calc(100% - 2rem), transparent)',
		},
		width: {
			default: null,
			[mq.maxMd]: '100vw',
		},
		marginInline: {
			default: null,
			[mq.maxMd]: 'calc(50% - 50vw)',
		},
	},
	gridLayout: {
		gridAutoRows: {
			default: null,
			[mq.md]: '1fr',
		},
	},
	gridColumns: {
		gridTemplateColumns: {
			default: null,
			'@media (min-width: 64rem)':
				'repeat(var(--columns, 1), minmax(0px, 1fr))',
		},
	},
	gridAuto: {
		gridTemplateColumns: {
			default: null,
			[mq.sm]: 'repeat(2, minmax(0, 1fr))',
			'@media (min-width: 64rem)':
				'repeat(auto-fit, minmax(16rem, 1fr))',
		},
	},
	value: {
		display: 'flex',
		alignItems: 'baseline',
		columnGap: spacing.ch,
	},
})
