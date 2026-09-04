import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import CustomHTML from '@/modules/custom-html'
import {
	getDynamicFetchOptions,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import { getSite } from '@/sanity/lib/queries'
import { shared } from '../../styles/shared'
import { mq } from '../../styles/breakpoints.stylex'
import Logo from '@/ui/logo'
import SocialNavigation from '@/ui/social-navigation'
import SanityLink, { type SanityLinkType } from '../sanity-link'
import Navigation from './navigation'

export async function DynamicFooter() {
	const { perspective, stega } = await getDynamicFetchOptions()
	return <CachedFooter perspective={perspective} stega={stega} />
}

export default async function Footer(props: DynamicFetchOptions) {
	return <CachedFooter {...props} />
}

async function CachedFooter({ perspective, stega }: DynamicFetchOptions) {
	'use cache'
	const site = await getSite({ perspective, stega })
	const blurb = site?.footer?.blurb

	const proseSx = stylex.props(shared.prose)
	const copyrightSx = stylex.props(shared.prose, styles.copyright)

	return (
		<footer>
			<div {...stylex.props(shared.section, styles.section)}>
				<div {...stylex.props(styles.top)}>
					<div {...stylex.props(styles.brand)}>
						<Logo
							xstyle={styles.logo}
							perspective={perspective}
							stega={stega}
						/>

						{blurb && (
							<div
								{...proseSx}
								className={[proseSx.className, 'prose']
									.filter(Boolean)
									.join(' ')}
							>
								<PortableText
									value={blurb}
									components={{
										types: {
											'custom-html': ({ value }) => <CustomHTML {...value} />,
										},
									}}
								/>
							</div>
						)}

						<SocialNavigation perspective={perspective} stega={stega} />
					</div>

					<Navigation perspective={perspective} stega={stega} />
				</div>

				{(site?.copyright || site?.bottom?.items) && (
					<div
						{...stylex.props(
							styles.bottom,
							!site?.bottom?.items && styles.bottomCentered,
						)}
					>
						{site?.bottom?.items && (
							<ul
								{...stylex.props(styles.bottomNav)}
								className="bottom-navigation"
							>
								{site?.bottom?.items?.map((item, i) => (
									<li key={`${item._key}-${i}`}>
										<SanityLink
											link={item as SanityLinkType}
											{...stylex.props(styles.bottomLink)}
										/>
									</li>
								))}
							</ul>
						)}

						{site?.copyright && (
							<div
								{...copyrightSx}
								className={[copyrightSx.className, 'prose', 'copyright']
									.filter(Boolean)
									.join(' ')}
							>
								<PortableText value={site.copyright} />
							</div>
						)}
					</div>
				)}
			</div>
		</footer>
	)
}

const styles = stylex.create({
	section: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
	},
	top: {
		display: 'flex',
		justifyContent: 'space-between',
		gap: '1rem',
		flexDirection: {
			default: 'column',
			[mq.md]: 'row',
		},
		alignItems: {
			default: null,
			[mq.md]: 'flex-start',
		},
	},
	brand: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
		alignItems: {
			default: 'center',
			[mq.md]: 'flex-start',
		},
		textAlign: {
			default: 'center',
			[mq.md]: null,
		},
	},
	logo: {
		height: '2lh',
	},
	bottom: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '1rem',
		textAlign: 'center',
		flexDirection: {
			default: 'column',
			[mq.md]: 'row',
		},
	},
	bottomCentered: {
		justifyContent: 'center',
	},
	bottomNav: {
		display: 'flex',
		flexWrap: 'wrap',
		columnGap: '1rem',
	},
	bottomLink: {
		color: 'currentColor',
		textDecorationLine: {
			default: null,
			':hover': 'underline',
		},
	},
	copyright: {
		order: {
			default: null,
			[mq.md]: -1,
		},
	},
})
