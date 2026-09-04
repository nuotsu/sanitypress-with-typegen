import * as stylex from '@stylexjs/stylex'
import { spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import type { DynamicFetchOptions } from '@/sanity/lib/live'
import { getSite } from '@/sanity/lib/queries'
import type { LinkList as LinkListType } from '@/sanity/types'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import LinkList from './link.list'

export default async function ({ perspective, stega }: DynamicFetchOptions) {
	const site = await getSite({ perspective, stega })

	return (
		<nav>
			<ul {...stylex.props(styles.list)}>
				{site?.footer?.items?.map((item, i) => {
					switch (item._type) {
						case 'link':
							return (
								<li key={`${item._key}-${i}`}>
									<SanityLink
										link={item as SanityLinkType}
										{...stylex.props(styles.link)}
									/>
								</li>
							)

						case 'link.list':
							return (
								<LinkList
									key={`${item._key}-${i}`}
									{...(item as unknown as LinkListType)}
								/>
							)

						default:
							return null
					}
				})}
			</ul>
		</nav>
	)
}

const styles = stylex.create({
	list: {
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		columnGap: '2lh',
		rowGap: spacing.lh,
		flexDirection: {
			default: 'column',
			[mq.md]: 'row',
		},
	},
	link: {
		color: 'currentColor',
		textDecorationLine: {
			default: null,
			':hover': 'underline',
		},
	},
})
