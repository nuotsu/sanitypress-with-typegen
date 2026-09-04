import * as stylex from '@stylexjs/stylex'
import { PortableText, stegaClean } from 'next-sanity'
import { VscChevronDown } from 'react-icons/vsc'
import { portableTextToSchemaHtml } from '@/lib/portable-text-to-schema-html'
import { Module } from '@/modules'
import type { AccordionList } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors, spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'

export default function ({
	_key: _module_key,
	eyebrow,
	intro,
	ctas,
	accordions,
	exclusive,
	enableSchema = true,
	layout: l = 'vertical',
	...props
}: AccordionList & { _key: string } & React.ComponentProps<'section'>) {
	const layout = stegaClean(l)
	const headerSx = stylex.props(
		shared.prose,
		layout === 'horizontal' ? styles.headerHorizontal : styles.headerVertical,
	)

	return (
		<Module
			_key={_module_key}
			{...stylex.props(
				shared.section,
				styles.root,
				layout === 'horizontal' && styles.rootHorizontal,
			)}
			{...props}
		>
			{enableSchema && accordions?.length && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'FAQPage',
							mainEntity: accordions.map((accordion) => ({
								'@type': 'Question',
								name: accordion.summary || 'Details',
								acceptedAnswer: {
									'@type': 'Answer',
									text: portableTextToSchemaHtml(accordion.content) || '',
								},
							})),
						}),
					}}
				/>
			)}

			{(eyebrow || intro || ctas) && (
				<header
					{...headerSx}
					className={[headerSx.className, 'prose'].filter(Boolean).join(' ')}
					style={{
						...headerSx.style,
						...(layout === 'horizontal'
							? { ['--offset' as string]: '1rem' }
							: undefined),
					}}
				>
					<Eyebrow value={eyebrow} />
					<PortableText value={intro} />
					<CTAList
						ctas={ctas}
						xstyle={
							layout === 'vertical'
								? [styles.ctas, styles.ctasCentered]
								: styles.ctas
						}
						className={ctaFullWidthClass}
					/>
				</header>
			)}

			<div {...stylex.props(styles.list)}>
				{accordions?.map((accordion, i) => {
					const itemSx = stylex.props(styles.item)
					const contentWrapSx = stylex.props(styles.content)
					const contentSx = stylex.props(shared.prose)

					return (
						<details
							key={`${accordion._key}-${i}`}
							{...itemSx}
							className={[itemSx.className, 'accordion']
								.filter(Boolean)
								.join(' ')}
							name={exclusive ? _module_key : undefined}
							open={accordion.open}
						>
							<summary {...stylex.props(styles.summary)}>
								{accordion.summary || 'Details'}
								<VscChevronDown />
							</summary>

							<div
								{...contentWrapSx}
								className={[contentWrapSx.className, 'anim-toggle']
									.filter(Boolean)
									.join(' ')}
							>
								<div
									{...contentSx}
									className={[contentSx.className, 'prose']
										.filter(Boolean)
										.join(' ')}
								>
									<PortableText value={accordion.content ?? []} />
								</div>
							</div>
						</details>
					)
				})}
			</div>
		</Module>
	)
}

const styles = stylex.create({
	root: {
		display: 'grid',
		gap: '2rem',
	},
	rootHorizontal: {
		alignItems: 'flex-start',
		gridTemplateColumns: {
			default: null,
			[mq.md]: 'repeat(2, minmax(0, 1fr))',
		},
	},
	headerHorizontal: {
		position: {
			default: null,
			[mq.md]: 'sticky',
		},
		top: {
			default: null,
			[mq.md]: 'calc(var(--header-height) + var(--offset, 0px))',
		},
	},
	headerVertical: {
		marginInline: 'auto',
		maxWidth: '48rem',
		textAlign: 'center',
	},
	ctas: {
		flexWrap: 'wrap',
	},
	ctasCentered: {
		justifyContent: 'center',
	},
	list: {
		marginInline: 'auto',
		width: '100%',
		maxWidth: '48rem',
	},
	item: {
		borderBottomWidth: {
			default: 1,
			':last-child': 0,
		},
		borderBottomStyle: 'solid',
		borderBottomColor: colors.stroke,
	},
	summary: {
		paddingBlock: '0.5lh',
		fontWeight: 700,
	},
	content: {
		paddingBottom: spacing.lh,
	},
})

/** StyleX cannot target arbitrary children; keep a thin CSS class. */
const ctaFullWidthClass = 'cta-list-full-sm'
