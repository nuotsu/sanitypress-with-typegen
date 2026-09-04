import * as stylex from '@stylexjs/stylex'
import type { StyleXStyles } from '@stylexjs/stylex'
import { VscChevronDown } from 'react-icons/vsc'
import type { LinkList, Page } from '@/sanity/types'
import { colors, spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import HoverDetails from '@/ui/details/hover-details'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import css from './header.module.css'

export default function ({
	link: summary,
	links,
	_key,
	summaryStyle,
}: LinkList & {
	_key: string
	summaryStyle?: StyleXStyles
}) {
	const summarySx = stylex.props(styles.summary, summaryStyle)
	const listSx = stylex.props(styles.list)
	const itemLinkSx = stylex.props(styles.itemLink)

	return (
		<HoverDetails
			name="header"
			className={['accordion', css.dropdown].filter(Boolean).join(' ')}
			style={
				{
					'--anchor-name': `--dropdown-${_key}`,
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
				{summary?.label || (summary?.internal as unknown as Page)?.title}
				<VscChevronDown />
			</summary>

			<ul
				{...listSx}
				className={[listSx.className, css.animToggle].filter(Boolean).join(' ')}
			>
				{links?.map((link, key) => (
					<li key={key}>
						<SanityLink
							link={link as SanityLinkType}
							{...itemLinkSx}
						/>
					</li>
				))}
			</ul>
		</HoverDetails>
	)
}

const styles = stylex.create({
	summary: {
		height: '100%',
	},
	list: {
		lineHeight: 1.25,
		marginBottom: spacing.ch,
		borderColor: colors.stroke,
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
		marginLeft: {
			default: null,
			[mq.md]: '-1.5ch',
		},
		borderWidth: {
			default: null,
			[mq.md]: 1,
		},
		borderStyle: {
			default: null,
			[mq.md]: 'solid',
		},
		padding: {
			default: null,
			[mq.md]: '1ch 1.5ch',
		},
	},
	itemLink: {
		display: 'inline-block',
		paddingBlock: '0.25rem',
		color: 'currentColor',
		textDecorationLine: {
			default: 'none',
			':hover': 'underline',
		},
	},
})
