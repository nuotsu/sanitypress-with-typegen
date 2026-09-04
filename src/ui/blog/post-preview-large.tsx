import Image from 'next/image'
import * as stylex from '@stylexjs/stylex'
import { ROUTES } from '@/lib/env'
import type { BlogCategory, BlogPost, Person } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'
import Byline from './byline'
import Categories from './categories'
import Date from './date'

export default function ({
	post,
	isFeatured,
	className,
}: {
	post: BlogPost
	isFeatured?: boolean
} & React.ComponentProps<'article'>) {
	if (!post) return null

	const root = stylex.props(styles.root)

	return (
		<article
			{...root}
			className={[root.className, className].filter(Boolean).join(' ')}
		>
			<figure {...stylex.props(styles.figure)}>
				{post.metadata?.image ? (
					<Img
						{...stylex.props(styles.image)}
						image={post.metadata?.image}
						width={600}
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
			</figure>

			<div {...stylex.props(styles.body)}>
				{isFeatured && <Eyebrow value="Featured" />}

				<SanityLink
					{...stylex.props(shared.h1, styles.link)}
					link={
						{ type: 'internal', internal: post } as unknown as SanityLinkType
					}
				>
					{post.title}
				</SanityLink>

				{post.metadata?.description && (
					<p {...stylex.props(styles.description)}>
						{post.metadata?.description}
					</p>
				)}

				<div {...stylex.props(styles.meta)}>
					<Date date={post.publishDate} />
					<Categories
						categories={post.categories as unknown as BlogCategory[]}
					/>
				</div>

				<Byline author={post.author as unknown as Person} />
			</div>
		</article>
	)
}

const styles = stylex.create({
	root: {
		position: 'relative',
		display: 'grid',
		columnGap: '2rem',
		rowGap: '1rem',
		gridTemplateColumns: {
			default: null,
			[mq.md]: '1fr 1fr',
		},
	},
	figure: {
		aspectRatio: '16 / 9',
		alignSelf: 'start',
		backgroundColor: colors.foreground05,
		width: {
			default: '100vw',
			[mq.md]: '100%',
		},
		marginInline: {
			default: 'calc(50% - 50vw)',
			[mq.md]: 0,
		},
	},
	image: {
		aspectRatio: '16 / 9',
		width: '100%',
		objectFit: 'cover',
	},
	body: {
		display: 'grid',
		gap: '0.5rem',
		alignSelf: 'center',
	},
	link: {
		display: 'block',
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
	description: {
		display: '-webkit-box',
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: 3,
		overflow: 'hidden',
	},
	meta: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		columnGap: '1rem',
	},
})
