import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import { Fragment } from 'react'
import { Module, type ModuleProps } from '@/modules'
import CustomHTML from '@/modules/custom-html'
import type { TabbedContent } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors, spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'
import Label from './label'
import Radio, { Panel } from './radio'
import { Provider } from './store'

export default function ({
	eyebrow,
	intro,
	tabs,
	...props
}: TabbedContent & ModuleProps) {
	const headerSx = stylex.props(shared.prose, styles.header)

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

			<Provider>
				<fieldset
					{...stylex.props(
						shared.noScrollbar,
						styles.fieldset,
					)}
					style={{ ['--offset' as string]: '1rem' }}
				>
					{tabs?.map((tab, i) => (
						<Label
							index={i}
							htmlFor={`tabbed-content-${props._key}-${tab._key}`}
							xstyle={styles.label}
							activeXstyle={styles.labelActive}
							key={`${tab._key}-${i}`}
						>
							<Img
								{...stylex.props(styles.icon)}
								image={tab.icon}
								width={60}
								alt=""
							/>

							{tab.label}
						</Label>
					))}
				</fieldset>

				<div {...stylex.props(styles.panels)}>
					{tabs?.map((tab, i) => {
						const panelSx = stylex.props(
							shared.animFadeToR,
							shared.prose,
						)

						return (
							<Fragment key={`${tab._key}-${i}`}>
								<Radio
									name={`tabbed-content-${props._key}`}
									id={`tabbed-content-${props._key}-${tab._key}`}
									value={i}
									defaultChecked={i === 0}
									index={i}
								/>

								<Panel
									index={i}
									{...panelSx}
									className={[panelSx.className, 'prose']
										.filter(Boolean)
										.join(' ')}
								>
									<PortableText
										value={tab.content}
										components={{
											types: {
												image: ({ value }) => (
													<figure>
														<Img
															image={value}
															width={1000}
															alt={value.alt ?? ''}
														/>
													</figure>
												),
												'custom-html': ({ value }) => (
													<CustomHTML {...value} />
												),
											},
										}}
									/>
									<CTAList
										ctas={tab.ctas}
										xstyle={styles.ctas}
										className={ctaFullWidthClass}
									/>
								</Panel>
							</Fragment>
						)
					})}
				</div>
			</Provider>
		</Module>
	)
}

const styles = stylex.create({
	root: {
		display: 'grid',
		alignItems: 'flex-start',
		columnGap: spacing.lh,
		rowGap: '2rem',
		gridTemplateColumns: {
			default: null,
			[mq.md]: '24ch 1fr',
		},
	},
	header: {
		gridColumn: '1 / -1',
		textAlign: 'center',
	},
	fieldset: {
		display: 'flex',
		overflowX: 'auto',
		scrollSnapType: 'x mandatory',
		borderWidth: 0,
		padding: 0,
		margin: 0,
		minWidth: 0,
		paddingInline: {
			default: '1rem',
			[mq.md]: null,
		},
		fontSize: {
			default: '0.875rem',
			[mq.md]: null,
		},
		flexDirection: {
			default: null,
			[mq.md]: 'column',
		},
		position: {
			default: null,
			[mq.md]: 'sticky',
		},
		top: {
			default: null,
			[mq.md]: 'calc(var(--header-height) + var(--offset, 0px))',
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
	label: {
		display: 'inline-flex',
		flexShrink: 0,
		scrollSnapAlign: 'center',
		alignItems: 'center',
		gap: '0.5em',
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'transparent',
		padding: '0.5em',
		lineHeight: 1.25,
		opacity: {
			default: 0.5,
			':hover': 1,
		},
		cursor: 'pointer',
	},
	labelActive: {
		borderColor: colors.stroke,
		opacity: 1,
		fontWeight: 700,
	},
	icon: {
		width: '1.5lh',
		height: '1.5lh',
		flexShrink: 0,
		objectFit: 'contain',
	},
	panels: {
		marginInline: 'auto',
		width: '100%',
		maxWidth: '48rem',
	},
	ctas: {
		flexWrap: 'wrap',
	},
})

/** StyleX cannot target arbitrary children; keep a thin CSS class. */
const ctaFullWidthClass = 'cta-list-full-sm'
