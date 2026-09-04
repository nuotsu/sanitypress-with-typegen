import * as stylex from '@stylexjs/stylex'
import {
	FaFacebook,
	FaGithub,
	FaInstagram,
	FaLink,
	FaLinkedinIn,
	FaTiktok,
	FaXTwitter,
	FaYelp,
	FaYoutube,
} from 'react-icons/fa6'
import { colors, spacing } from '../styles/tokens.stylex'
import { mq } from '../styles/breakpoints.stylex'
import type { DynamicFetchOptions } from '@/sanity/lib/live'
import { getSite } from '@/sanity/lib/queries'
import SanityLink, { type SanityLinkType } from './sanity-link'

export default async function ({
	perspective,
	stega,
	xstyle,
	className,
	...props
}: Omit<React.ComponentProps<'nav'>, 'className'> & {
	xstyle?: stylex.StyleXStyles
	className?: string
} & DynamicFetchOptions) {
	const site = await getSite({ perspective, stega })
	const sx = stylex.props(styles.nav, xstyle)

	return (
		<nav
			{...props}
			{...sx}
			className={[sx.className, className].filter(Boolean).join(' ')}
		>
			{site?.social?.items?.map((link, i) => {
				switch (link._type) {
					case 'link':
						const url = link.external

						return (
							<SanityLink
								link={link as SanityLinkType}
								{...stylex.props(styles.item)}
								aria-label={link.label || url}
								key={`${link._key}-${i}`}
							>
								{url?.includes('facebook.com') ? (
									<FaFacebook {...stylex.props(styles.icon)} />
								) : url?.includes('github.com') ? (
									<FaGithub {...stylex.props(styles.icon)} />
								) : url?.includes('instagram.com') ? (
									<FaInstagram {...stylex.props(styles.icon)} />
								) : url?.includes('linkedin.com') ? (
									<FaLinkedinIn {...stylex.props(styles.icon)} />
								) : url?.includes('tiktok.com') ? (
									<FaTiktok {...stylex.props(styles.icon)} />
								) : url?.includes('twitter.com') || url?.includes('x.com') ? (
									<FaXTwitter {...stylex.props(styles.icon)} />
								) : url?.includes('yelp.com') ? (
									<FaYelp {...stylex.props(styles.icon)} />
								) : url?.includes('youtube.com') ? (
									<FaYoutube {...stylex.props(styles.icon)} />
								) : (
									<FaLink {...stylex.props(styles.icon)} />
								)}
							</SanityLink>
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
		alignItems: 'center',
		gap: '1rem',
		color: colors.primary,
		justifyContent: {
			default: 'center',
			[mq.md]: null,
		},
	},
	item: {
		color: 'currentColor',
	},
	icon: {
		width: spacing.lh,
		height: spacing.lh,
	},
})
