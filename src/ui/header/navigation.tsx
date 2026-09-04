import * as stylex from '@stylexjs/stylex'
import type { DynamicFetchOptions } from '@/sanity/lib/live'
import { getSite } from '@/sanity/lib/queries'
import type { LinkList, Megamenu as MegamenuType } from '@/sanity/types'
import { spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import Dropdown from './dropdown'
import Megamenu from './megamenu'

export default async function ({ perspective, stega }: DynamicFetchOptions) {
	const site = await getSite({ perspective, stega })

	return (
		<nav {...stylex.props(styles.nav)}>
			{site?.header?.items?.map((item, i) => {
				switch (item._type) {
					case 'link':
						return (
							<SanityLink
								link={item as SanityLinkType}
								{...stylex.props(styles.topLevel, styles.link)}
								key={`${item._key}-${i}`}
							/>
						)

					case 'link.list':
						return (
							<Dropdown
								key={`${item._key}-${i}`}
								{...(item as LinkList & { _key: string })}
								summaryStyle={styles.topLevel}
							/>
						)

					case 'megamenu':
						return (
							<Megamenu
								key={`${item._key}-${i}`}
								{...(item as MegamenuType)}
								summaryStyle={styles.topLevel}
							/>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}

const styles = stylex.create({
	nav: {
		display: 'flex',
		alignItems: 'stretch',
		columnGap: spacing.lh,
		gridArea: 'navigation',
		marginBlock: {
			default: null,
			[mq.maxMd]: '1rem',
		},
		flexDirection: {
			default: null,
			[mq.maxMd]: 'column',
		},
	},
	topLevel: {
		display: 'grid',
		lineHeight: 1.25,
		paddingBlock: {
			default: '.5ch',
			[mq.md]: spacing.ch,
		},
		placeContent: {
			default: null,
			[mq.md]: 'center',
		},
		textAlign: {
			default: null,
			[mq.md]: 'center',
		},
		textWrap: {
			default: null,
			[mq.md]: 'balance',
		},
	},
	link: {
		color: 'currentColor',
		textDecorationLine: {
			default: 'none',
			':hover': 'underline',
		},
	},
})
