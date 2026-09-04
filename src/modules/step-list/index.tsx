import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import { portableTextToSchemaHtml } from '@/lib/portable-text-to-schema-html'
import { getBlockText } from '@/lib/utils'
import { Module } from '@/modules'
import type { StepList } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors, spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'

export default function ({
	eyebrow,
	intro = [],
	ctas,
	steps,
	enableSchema = true,
	...props
}: StepList) {
	const headerSx = stylex.props(shared.prose, styles.header)

	return (
		<Module {...stylex.props(shared.section, styles.root)} {...props}>
			{enableSchema && steps?.length && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'HowTo',
							...(!!intro.length && { name: getBlockText(intro, ' ') }),
							step: steps.map((step, index) => ({
								'@type': 'HowToStep',
								position: index + 1,
								text: portableTextToSchemaHtml(step.content) || '',
							})),
						}),
					}}
				/>
			)}

			<header
				{...headerSx}
				className={[headerSx.className, 'prose'].filter(Boolean).join(' ')}
				style={{
					...headerSx.style,
					['--offset' as string]: '1rem',
				}}
			>
				<Eyebrow value={eyebrow} />
				<PortableText value={intro} />
				<CTAList
					ctas={ctas}
					xstyle={styles.ctas}
					className={ctaFullWidthClass}
				/>
			</header>

			<ol {...stylex.props(styles.list)}>
				{steps?.map((step, index) => {
					const stepSx = stylex.props(shared.prose)

					return (
						<li key={`${step._key}-${index}`} {...stylex.props(styles.item)}>
							<span
								{...stylex.props(shared.h3, styles.marker)}
								aria-hidden
							/>

							<div
								{...stepSx}
								className={[stepSx.className, 'prose']
									.filter(Boolean)
									.join(' ')}
							>
								<PortableText value={step.content ?? []} />
								<CTAList
									ctas={step.ctas}
									xstyle={styles.ctas}
									className={ctaFullWidthClass}
								/>
							</div>
						</li>
					)
				})}
			</ol>
		</Module>
	)
}

const styles = stylex.create({
	root: {
		display: 'grid',
		alignItems: 'flex-start',
		gap: '2rem',
		gridTemplateColumns: {
			default: null,
			[mq.md]: 'repeat(2, minmax(0, 1fr))',
		},
	},
	header: {
		position: {
			default: null,
			[mq.md]: 'sticky',
		},
		top: {
			default: null,
			[mq.md]: 'calc(var(--header-height) + var(--offset, 0px))',
		},
	},
	ctas: {
		flexWrap: 'wrap',
	},
	list: {
		display: 'grid',
		gap: '2rem',
		listStyleType: 'none',
		padding: 0,
		margin: 0,
		counterReset: 'step',
	},
	item: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: spacing.ch,
		counterIncrement: 'step',
	},
	marker: {
		flexShrink: 0,
		display: 'grid',
		placeContent: 'center',
		width: spacing.lh,
		height: spacing.lh,
		textAlign: 'center',
		backgroundColor: colors.foreground,
		color: colors.background,
		'::before': {
			content: 'counter(step)',
		},
	},
})

/** StyleX cannot target arbitrary children; keep a thin CSS class. */
const ctaFullWidthClass = 'cta-list-full-sm'
