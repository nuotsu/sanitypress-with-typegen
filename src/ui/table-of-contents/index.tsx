import { VscChevronDown } from 'react-icons/vsc'
import * as stylex from '@stylexjs/stylex'
import { colors } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import MobileClosedDetails from '@/ui/details/mobile-closed-details'
import ToCItem from './toc-item'
import css from './toc.module.css'

export type ToCHeadings = Array<{
	style: string | null
	text: string | null
}> | null

export default function ({
	summary = 'Table of Contents',
	headings,
	className,
	...props
}: {
	summary?: string
	headings: ToCHeadings
} & React.ComponentProps<'details'>) {
	if (!headings?.length) return null

	const list = stylex.props(styles.list)

	return (
		<MobileClosedDetails
			{...props}
			className={['table-of-contents', 'accordion', className]
				.filter(Boolean)
				.join(' ')}
		>
			<summary {...stylex.props(styles.summary)}>
				{summary}
				<VscChevronDown {...stylex.props(styles.chevron)} />
			</summary>

			<ol
				{...list}
				className={[list.className, css.list].filter(Boolean).join(' ')}
			>
				{headings?.map((heading, key) => (
					<ToCItem heading={heading} key={key} />
				))}
			</ol>
		</MobileClosedDetails>
	)
}

const styles = stylex.create({
	summary: {
		top: 0,
		zIndex: 1,
		paddingBlock: '0.25rem',
		fontWeight: 700,
		backgroundColor: {
			default: null,
			[mq.md]: colors.background,
		},
		position: {
			default: null,
			[mq.md]: 'sticky',
		},
	},
	chevron: {
		display: {
			default: null,
			[mq.md]: 'none',
		},
	},
	list: {
		lineHeight: 1.25,
	},
})
