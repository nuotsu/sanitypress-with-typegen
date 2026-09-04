import * as stylex from '@stylexjs/stylex'
import { groq, PortableText } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { Module } from '@/modules'
import { sanityFetch, type DynamicFetchOptions } from '@/sanity/lib/live'
import { BLOG_POST_FRAGMENT_QUERY } from '@/sanity/lib/queries'
import type {
	BLOG_POST_LIST_QUERY_RESULT,
	BlogPost,
	BlogPostList,
} from '@/sanity/types'
import { shared } from '../../styles/shared'
import { spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import PostPreview from '@/ui/blog/post-preview'
import CTAList from '@/ui/cta-list'

export default async function ({
	intro = [],
	ctas,
	limit = 6,
	_key,
	perspective,
	stega,
	...props
}: BlogPostList & { _key: string } & DynamicFetchOptions) {
	const posts = await getPosts({ limit, perspective, stega })
	const introSx = stylex.props(shared.prose, styles.intro)
	const listSx = stylex.props(styles.list)

	return (
		<Module {...stylex.props(shared.section, styles.root)} _key={_key} {...props}>
			{intro && (
				<header
					{...introSx}
					className={[introSx.className, 'prose'].filter(Boolean).join(' ')}
				>
					<PortableText value={intro} />
				</header>
			)}

			<ul
				{...listSx}
				className={[
					listSx.className,
					'carousel',
					'carousel-scroll-buttons',
					'carousel-scroll-marker',
				]
					.filter(Boolean)
					.join(' ')}
				data-anchor-name={`--blog-post-list-${_key}`}
			>
				{posts?.map((post: any) => (
					<PostPreview
						className={stylex.props(styles.snapStart).className}
						post={post as unknown as BlogPost}
						key={post._id}
					/>
				))}
			</ul>

			<CTAList ctas={ctas} xstyle={styles.ctas} className={ctaFullWidthClass} />
		</Module>
	)
}

async function getPosts({
	limit,
	perspective,
	stega,
}: { limit: number } & DynamicFetchOptions) {
	'use cache'
	const { data } = await sanityFetch({
		query: BLOG_POST_LIST_QUERY,
		params: { limit, blogDir: `/${ROUTES.blog}/` },
		perspective,
		stega,
	})
	return data as BLOG_POST_LIST_QUERY_RESULT
}

const BLOG_POST_LIST_QUERY = groq`
	*[_type == 'blog.post']|order(publishDate desc)[0...$limit]{
		...,
		${BLOG_POST_FRAGMENT_QUERY},
		'slug': $blogDir + metadata.slug.current,
	}
`

/** StyleX cannot target arbitrary children (`*:w-full`); keep a thin CSS class. */
const ctaFullWidthClass = 'cta-list-full-sm'

const styles = stylex.create({
	root: {
		display: 'grid',
		rowGap: '2rem',
	},
	intro: {
		textAlign: 'center',
	},
	list: {
		alignItems: 'stretch',
		gap: spacing.lh,
		paddingBottom: '0.5rem',
		paddingLeft: {
			default: '1rem',
			[mq.md]: 0,
		},
		paddingRight: '1rem',
		width: {
			default: '100vw',
			[mq.md]: 'auto',
		},
		marginInline: {
			default: 'calc(50% - 50vw)',
			[mq.md]: 0,
		},
		listStyle: 'none',
		maskImage: {
			default: null,
			[mq.md]:
				'linear-gradient(to right, #000 calc(100% - 2rem), transparent)',
		},
	},
	snapStart: {
		scrollSnapAlign: {
			default: null,
			[mq.md]: 'start',
		},
	},
	ctas: {
		justifyContent: 'center',
	},
})
