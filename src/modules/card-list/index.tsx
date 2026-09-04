import * as stylex from '@stylexjs/stylex'
import { PortableText, stegaClean } from 'next-sanity'
import { Module } from '@/modules'
import type { CardList } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { mq } from '../../styles/breakpoints.stylex'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'

export default function ({
	eyebrow,
	intro,
	cards,
	ctas,
	layout: l = 'grid',
	columns,
	...props
}: CardList) {
	const layout = stegaClean(l)
	const headerSx = stylex.props(shared.prose, styles.header)
	const gridSx = stylex.props(
		styles.grid,
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
					<PortableText value={intro ?? []} />
				</header>
			)}

			{!!cards?.length && (
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
				>
					{cards.map((item, i) => {
						const cardSx = stylex.props(shared.prose)

						return (
							<article
								key={`${item._key}-${i}`}
								{...cardSx}
								className={[cardSx.className, 'prose']
									.filter(Boolean)
									.join(' ')}
							>
								{(item.image || item.icon) && (
									<figure>
										<Img
											{...stylex.props(styles.cardImage)}
											image={item.image}
											width={1000}
											alt=""
										/>
										<Img
											{...stylex.props(styles.cardIcon)}
											image={item.icon}
											width={120}
											alt=""
										/>
									</figure>
								)}

								<Eyebrow value={item.eyebrow} />

								<PortableText
									value={item.content ?? []}
									components={{
										types: {
											image: ({ value }) => (
												<figure>
													<Img
														{...stylex.props(styles.inlineImage)}
														image={value}
														width={1000}
														alt={value.alt ?? ''}
													/>
												</figure>
											),
										},
									}}
								/>

								<CTAList
									ctas={item.ctas}
									xstyle={styles.ctas}
									className={ctaFullWidthClass}
								/>
							</article>
						)
					})}
				</div>
			)}

			<CTAList
				ctas={ctas}
				xstyle={styles.ctasCentered}
				className={ctaFullWidthClass}
			/>
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
		marginInline: 'auto',
		maxWidth: '48rem',
		textAlign: 'center',
	},
	grid: {
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
			'@media (min-width: 64rem)':
				'repeat(auto-fit, minmax(16rem, 1fr))',
		},
	},
	cardImage: {
		width: '100%',
		objectFit: 'cover',
	},
	cardIcon: {
		height: '3rem',
		width: 'auto',
		objectFit: 'cover',
	},
	inlineImage: {
		marginInline: 'auto',
		width: '100%',
	},
	ctas: {
		flexWrap: 'wrap',
	},
	ctasCentered: {
		justifyContent: 'center',
	},
})

/** StyleX cannot target arbitrary children; keep a thin CSS class. */
const ctaFullWidthClass = 'cta-list-full-sm'
