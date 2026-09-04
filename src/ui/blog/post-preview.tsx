import Image from 'next/image'
import * as stylex from '@stylexjs/stylex'
import { ROUTES } from '@/lib/env'
import type { BlogCategory, BlogPost, Person } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors, spacing } from '../../styles/tokens.stylex'
import Img from '@/ui/img'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import Byline from './byline'
import Categories from './categories'
import Date from './date'

export default function ({
	post,
	className,
}: {
	post: BlogPost & { isFeatured?: boolean }
} & React.ComponentProps<'li'>) {
	const root = stylex.props(styles.root)

	return (
		<li
			{...root}
			className={[root.className, className].filter(Boolean).join(' ')}
		>
			<figure {...stylex.props(styles.figure)}>
				{post.metadata?.image ? (
					<Img
						{...stylex.props(styles.image)}
						image={post.metadata?.image}
						width={400}
						alt={post.title ?? ''}
					/>
				) : (
					<Image
						src={`/api/og?slug=${ROUTES.blog}/${post.metadata?.slug?.current}&invert=1`}
						{...stylex.props(styles.image)}
						alt={post.title ?? ''}
						width={400}
						height={(400 * 9) / 16}
					/>
				)}

				{post.isFeatured && (
					<p {...stylex.props(shared.technical, styles.featured)}>Featured</p>
				)}
			</figure>

			<SanityLink
				{...stylex.props(styles.link)}
				link={{ type: 'internal', internal: post } as unknown as SanityLinkType}
			>
				<strong>{post.title}</strong>
			</SanityLink>

			<div {...stylex.props(styles.meta)}>
				<Categories categories={post.categories as unknown as BlogCategory[]} />
				<Date date={post.publishDate} {...stylex.props(styles.date)} />
			</div>

			<Byline author={post.author as unknown as Person} />
		</li>
	)
}

const styles = stylex.create({
	root: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		gap: '0.5rem',
	},
	figure: {
		position: 'relative',
		aspectRatio: '16 / 9',
		backgroundColor: colors.foreground05,
	},
	image: {
		aspectRatio: '16 / 9',
		width: '100%',
		objectFit: 'cover',
	},
	featured: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		margin: spacing.ch,
		paddingBlock: '0.25em',
		paddingInline: '0.5em',
		fontSize: '0.75rem',
		color: colors.background,
		backgroundColor: colors.foreground60,
		backdropFilter: 'blur(8px)',
	},
	link: {
		display: 'block',
		lineHeight: 1.375,
		color: 'inherit',
		textDecorationLine: {
			default: 'none',
			':hover': 'underline',
		},
		'::after': {
			content: '""',
			position: 'absolute',
			inset: 0,
		},
	},
	meta: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		columnGap: '1rem',
	},
	date: {
		color: colors.foreground50,
	},
})
