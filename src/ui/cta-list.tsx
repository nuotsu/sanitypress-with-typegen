import * as stylex from '@stylexjs/stylex'
import { stegaClean } from 'next-sanity'
import { ctaThemes, type CtaTheme } from '../styles/shared'
import type { Cta } from '@/sanity/types'
import SanityLink, { type SanityLinkType } from './sanity-link'

export default function ({
	ctas,
	xstyle,
	className,
}: {
	ctas?: (Cta & { _key?: string })[]
	xstyle?: stylex.StyleXStyles
	className?: string
}) {
	if (!ctas?.length) return null

	const sx = stylex.props(styles.root, xstyle)

	return (
		<div
			{...sx}
			className={[sx.className, className].filter(Boolean).join(' ')}
		>
			{ctas.map((cta, i) => {
				const theme = stegaClean(cta.theme) as CtaTheme | undefined
				const themeStyle =
					theme && theme in ctaThemes ? ctaThemes[theme] : undefined

				return (
					<SanityLink
						link={cta.link as SanityLinkType}
						{...stylex.props(themeStyle)}
						key={`${cta._key}-${i}`}
					/>
				)
			})}
		</div>
	)
}

const styles = stylex.create({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		columnGap: '0.5em',
		rowGap: '0.25em',
	},
})
