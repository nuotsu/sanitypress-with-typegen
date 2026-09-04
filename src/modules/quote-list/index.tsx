import * as stylex from '@stylexjs/stylex'
import { PortableText, stegaClean } from 'next-sanity'
import { Module } from '@/modules'
import type { Quote, QuoteList } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors, spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'

export default function ({
	eyebrow,
	intro = [],
	quotes,
	layout: l = 'grid',
	columns,
	_key,
	...props
}: QuoteList & { _key: string }) {
	const layout = stegaClean(l)
	const headerSx = stylex.props(shared.prose, styles.header)
	const gridSx = stylex.props(
		styles.grid,
		layout === 'carousel'
			? styles.carouselLayout
			: [styles.gridLayout, columns ? styles.gridColumns : styles.gridAuto],
	)

	return (
		<Module
			_key={_key}
			{...stylex.props(shared.section, styles.root)}
			{...props}
		>
			{(eyebrow || intro) && (
				<header
					{...headerSx}
					className={[headerSx.className, 'prose'].filter(Boolean).join(' ')}
				>
					<Eyebrow value={eyebrow} />
					<PortableText value={intro} />
				</header>
			)}

			<div
				{...gridSx}
				className={[
					gridSx.className,
					layout === 'carousel' &&
						'carousel carousel-scroll-buttons carousel-scroll-marker',
				]
					.filter(Boolean)
					.join(' ')}
				style={{
					...gridSx.style,
					['--columns' as string]: columns,
				}}
				data-anchor-name={`--quote-list-${_key}`}
			>
				{(quotes as unknown as Quote[])?.map((quote) => {
					const quoteSx = stylex.props(shared.prose, styles.quote)

					return (
						<article {...stylex.props(styles.card)} key={quote._id}>
							<blockquote
								{...quoteSx}
								className={[quoteSx.className, 'prose']
									.filter(Boolean)
									.join(' ')}
							>
								<PortableText value={quote.quote} />
							</blockquote>

							{quote.author?.name && (
								<cite {...stylex.props(styles.cite)}>
									<Img
										{...stylex.props(styles.avatar)}
										image={quote.author?.image}
										width={48}
										alt={quote.author?.name}
									/>

									<dl>
										<dt>{quote.author.name}</dt>
										{quote.author?.title && (
											<dd {...stylex.props(styles.title)}>
												{quote.author?.title}
											</dd>
										)}
									</dl>
								</cite>
							)}
						</article>
					)
				})}
			</div>
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
	grid: {
		gap: spacing.lh,
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
		display: 'grid',
		gridAutoRows: {
			default: null,
			[mq.md]: '1fr',
		},
	},
	gridColumns: {
		gridTemplateColumns: {
			default: null,
			[mq.md]: 'repeat(var(--columns, 1), minmax(0px, 1fr))',
		},
	},
	gridAuto: {
		gridTemplateColumns: {
			default: null,
			[mq.md]: 'repeat(auto-fit, minmax(18rem, 1fr))',
		},
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: colors.stroke,
		backgroundColor: colors.background,
		padding: '1rem',
		scrollSnapAlign: {
			default: null,
			[mq.md]: 'start',
		},
	},
	quote: {
		flexGrow: 1,
	},
	cite: {
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
		fontStyle: 'normal',
	},
	avatar: {
		aspectRatio: '1',
		width: '2lh',
		height: '2lh',
		flexShrink: 0,
		borderRadius: '9999px',
		objectFit: 'cover',
	},
	title: {
		fontSize: '0.875rem',
	},
})
