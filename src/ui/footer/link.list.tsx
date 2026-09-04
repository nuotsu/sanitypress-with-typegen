import * as stylex from '@stylexjs/stylex'
import { shared } from '../../styles/shared'
import type { LinkList } from '@/sanity/types'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'

export default function ({
	link,
	links,
	xstyle,
	className,
	_type,
	_key,
	...props
}: LinkList &
	Omit<React.ComponentProps<'li'>, 'className'> &
	Partial<{ _key: string }> & {
		xstyle?: stylex.StyleXStyles
		className?: string
	}) {
	const sx = stylex.props(styles.root, xstyle)

	return (
		<li
			{...props}
			{...sx}
			className={[sx.className, className].filter(Boolean).join(' ')}
		>
			{link && (
				<div>
					<SanityLink
						{...stylex.props(shared.technical, styles.heading)}
						link={link as SanityLinkType}
					/>
				</div>
			)}

			<ul {...stylex.props(styles.list)}>
				{links?.map((item, i) => (
					<li key={`${item._key}-${i}`}>
						<SanityLink
							{...stylex.props(styles.item)}
							link={item as SanityLinkType}
						/>
					</li>
				))}
			</ul>
		</li>
	)
}

const styles = stylex.create({
	root: {
		display: 'grid',
		gap: '0.25rem',
		textAlign: 'left',
	},
	heading: {
		fontSize: '0.75rem',
		color: 'color-mix(in oklab, currentColor 60%, transparent)',
		textDecorationLine: {
			default: null,
			':hover': 'underline',
		},
	},
	list: {
		lineHeight: 1.25,
	},
	item: {
		display: 'inline-block',
		paddingBlock: '0.3ch',
		color: 'currentColor',
		textDecorationLine: {
			default: null,
			':hover': 'underline',
		},
	},
})
