import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { VscChevronDown } from 'react-icons/vsc'
import type { Megamenu, Page } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors, spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import HoverDetails from '@/ui/details/hover-details'
import MobileOnlyDetails from '@/ui/details/mobile-only-details'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import css from './header.module.css'
import LinkCard from './link.card'

export default function ({
	link,
	items,
	summaryStyle,
}: Megamenu & {
	summaryStyle?: StyleXStyles
}) {
	const summarySx = stylex.props(styles.summary, summaryStyle)
	const panelSx = stylex.props(styles.panel)
	const itemsSx = stylex.props(shared.section, styles.items)
	const linkListSx = stylex.props(styles.linkList)
	const linkListSummarySx = stylex.props(styles.linkListSummary)
	const linkListTitleSx = stylex.props(shared.technical, styles.linkListTitle)
	const chevronSx = stylex.props(styles.chevronMobile)
	const nestedListSx = stylex.props(styles.nestedList)
	const nestedLinkSx = stylex.props(styles.nestedLink)
	const plainLinkSx = stylex.props(styles.plainLink)

	return (
		<HoverDetails
			name="header"
			className="accordion"
			style={
				{
					'--safearea-x': '20vw',
				} as React.CSSProperties
			}
			safeAreaOnHover
			closeAfterNavigate
		>
			<summary
				{...summarySx}
				className={[summarySx.className, css.summaryOpen]
					.filter(Boolean)
					.join(' ')}
			>
				{link?.label || (link?.internal as unknown as Page)?.title}
				<VscChevronDown />
			</summary>

			<div
				{...panelSx}
				className={[panelSx.className, 'anim-toggle'].filter(Boolean).join(' ')}
			>
				<div
					{...itemsSx}
					className={[itemsSx.className, css.megaItems]
						.filter(Boolean)
						.join(' ')}
				>
					{items?.map((item, i) => {
						switch (item._type) {
							case 'link.list':
								return (
									<MobileOnlyDetails
										{...linkListSx}
										className={[linkListSx.className, 'accordion']
											.filter(Boolean)
											.join(' ')}
										name="megamenu-linklist"
										key={`${item._key}-${i}`}
									>
										<summary {...linkListSummarySx}>
											<SanityLink
												{...linkListTitleSx}
												link={item.link as unknown as SanityLinkType}
											/>
											<VscChevronDown {...chevronSx} />
										</summary>

										<ul
											{...nestedListSx}
											className={[nestedListSx.className, css.animToggle]
												.filter(Boolean)
												.join(' ')}
										>
											{item.links?.map((link, j) => {
												return (
													<li key={`${link._key}-${j}`}>
														<SanityLink
															link={link as unknown as SanityLinkType}
															{...nestedLinkSx}
														/>
													</li>
												)
											})}
										</ul>
									</MobileOnlyDetails>
								)

							case 'link.card':
								return <LinkCard key={`${item._key}-${i}`} {...item} />

							case 'link':
								return (
									<SanityLink
										link={item as unknown as SanityLinkType}
										{...plainLinkSx}
										key={`${item._key}-${i}`}
									/>
								)

							default:
								return null
						}
					})}
				</div>
			</div>
		</HoverDetails>
	)
}

const styles = stylex.create({
	summary: {
		height: '100%',
	},
	panel: {
		insetInline: 0,
		top: '100%',
		borderColor: colors.stroke,
		backgroundColor: {
			default: null,
			[mq.md]: colors.background,
		},
		position: {
			default: null,
			[mq.md]: 'absolute',
		},
		maxHeight: {
			default: null,
			[mq.md]:
				'calc(100vh - var(--announcement-height) - var(--header-height))',
		},
		overflowY: {
			default: null,
			[mq.md]: 'auto',
		},
		borderBottomWidth: {
			default: null,
			[mq.md]: 1,
		},
		borderBottomStyle: {
			default: null,
			[mq.md]: 'solid',
		},
		boxShadow: {
			default: null,
			[mq.md]:
				'0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
		},
	},
	items: {
		columnGap: spacing.lh,
		paddingBlock: {
			default: 0,
			[mq.md]: spacing.lh,
		},
		borderColor: colors.stroke,
		paddingLeft: {
			default: null,
			[mq.maxMd]: spacing.ch,
		},
		display: {
			default: null,
			[mq.maxMd]: 'grid',
		},
		borderLeftWidth: {
			default: null,
			[mq.maxMd]: 1,
		},
		borderLeftStyle: {
			default: null,
			[mq.maxMd]: 'solid',
		},
		columns: {
			default: null,
			[mq.sm]: '16rem',
		},
	},
	linkList: {
		breakInside: 'avoid',
		display: {
			default: null,
			[mq.md]: 'grid',
		},
		gridTemplateRows: {
			default: null,
			[mq.md]: 'auto 1fr',
		},
	},
	linkListSummary: {
		color: colors.foreground60,
		position: 'relative',
		paddingBlock: '0.25rem',
		cursor: {
			default: null,
			[mq.md]: 'default',
		},
	},
	linkListTitle: {
		fontSize: '0.75rem',
		'::after': {
			content: '""',
			position: 'absolute',
			inset: 0,
		},
	},
	chevronMobile: {
		display: {
			default: null,
			[mq.md]: 'none',
		},
	},
	nestedList: {
		borderColor: colors.stroke,
		lineHeight: 1.25,
		marginBottom: spacing.ch,
		paddingLeft: {
			default: null,
			[mq.maxMd]: spacing.ch,
		},
		borderLeftWidth: {
			default: null,
			[mq.maxMd]: 1,
		},
		borderLeftStyle: {
			default: null,
			[mq.maxMd]: 'solid',
		},
	},
	nestedLink: {
		display: 'inline-block',
		paddingBlock: '0.25rem',
		color: 'currentColor',
		textDecorationLine: {
			default: 'none',
			':hover': 'underline',
		},
	},
	plainLink: {
		paddingBlock: '0.25rem',
		color: 'currentColor',
		textDecorationLine: {
			default: 'none',
			':hover': 'underline',
		},
	},
})
