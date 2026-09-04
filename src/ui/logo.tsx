import * as stylex from '@stylexjs/stylex'
import Link from 'next/link'
import { colors } from '../styles/tokens.stylex'
import type { DynamicFetchOptions } from '@/sanity/lib/live'
import { getSite } from '@/sanity/lib/queries'
import Img from './img'

export default async function ({
	variant: style = 'default',
	xstyle,
	className,
	perspective,
	stega,
}: {
	variant?: 'default' | 'light' | 'dark'
	xstyle?: stylex.StyleXStyles
	className?: string
} & DynamicFetchOptions) {
	const site = await getSite({ perspective, stega })
	const logo = site?.logo?.image?.[style]
	const sx = stylex.props(styles.logo, xstyle)

	return (
		<Link
			href="/"
			{...sx}
			className={[sx.className, className].filter(Boolean).join(' ')}
		>
			{logo ? (
				<Img
					image={logo}
					width={100}
					{...stylex.props(styles.img)}
					alt={site?.title ?? ''}
				/>
			) : (
				site?.title
			)}
		</Link>
	)
}

const styles = stylex.create({
	logo: {
		display: 'inline-block',
		fontWeight: 700,
		color: colors.foreground,
	},
	img: {
		display: 'inline-block',
		height: '100%',
		width: 'auto',
		objectFit: 'contain',
	},
})
