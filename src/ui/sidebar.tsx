import * as stylex from '@stylexjs/stylex'
import { stegaClean } from 'next-sanity'
import type { Sidebar } from '@/sanity/types'
import { spacing } from '../styles/tokens.stylex'
import { mq } from '../styles/breakpoints.stylex'
import Callout from '@/modules/callout'
import CustomHTML from '@/modules/custom-html'
import TableOfContents, { type ToCHeadings } from './table-of-contents'
import css from './sidebar.module.css'

export default function ({
	modules,
	position: p,
	headings,
	xstyle,
	className,
}: {
	headings: ToCHeadings
	xstyle?: stylex.StyleXStyles
	className?: string
} & Partial<Sidebar>) {
	const position = stegaClean(p)

	if (!position) return null

	const sx = stylex.props(
		styles.root,
		position === 'right' && styles.right,
		xstyle,
	)

	return (
		<aside
			{...sx}
			className={[sx.className, css.root, className].filter(Boolean).join(' ')}
			style={{ ...sx.style, ['--offset' as string]: '1rem' }}
		>
			{modules?.map((module, i) => {
				switch (module._type) {
					case 'callout':
						return <Callout key={`${module._key}-${i}`} {...module} />

					case 'custom-html':
						return <CustomHTML key={`${module._key}-${i}`} {...module} />

					case 'tableOfContents': {
						const maxHeadingDepth = stegaClean(module.maxHeadingDepth) ?? 6
						const filtered = headings?.filter((h) => {
							const level = Number(stegaClean(h.style)?.slice(1))
							return level >= 2 && level <= maxHeadingDepth
						})

						return (
							<TableOfContents
								summary={module.summary}
								headings={filtered ?? null}
								key={`${module._key}-${i}`}
							/>
						)
					}

					default:
						return null
				}
			})}
		</aside>
	)
}

const styles = stylex.create({
	root: {
		flexShrink: 0,
		display: 'flex',
		flexDirection: 'column',
		gap: spacing.lh,
		width: {
			default: null,
			[mq.md]: '24ch',
		},
		position: {
			default: null,
			[mq.md]: 'sticky',
		},
		top: {
			default: null,
			[mq.md]: 'calc(var(--header-height) + var(--offset, 0px))',
		},
	},
	right: {
		order: {
			default: null,
			[mq.md]: 999,
		},
	},
})
