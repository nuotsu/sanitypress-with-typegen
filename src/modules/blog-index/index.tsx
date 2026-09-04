import type { Get } from '@sanity/codegen'
import * as stylex from '@stylexjs/stylex'
import { groq, PortableText } from 'next-sanity'
import { Suspense } from 'react'
import { ROUTES } from '@/lib/env'
import { Module, type ModuleProps } from '@/modules'
import { sanityFetch, type DynamicFetchOptions } from '@/sanity/lib/live'
import { BLOG_POST_FRAGMENT_QUERY } from '@/sanity/lib/queries'
import type {
	BLOG_FEATURED_QUERY_RESULT,
	BLOG_INDEX_QUERY_RESULT,
	PAGE_QUERY_RESULT,
} from '@/sanity/types'
import { shared } from '../../styles/shared'
import { spacing } from '../../styles/tokens.stylex'
import FilterList from '@/ui/blog/filter-list'
import Loading from '@/ui/loading'
import PaginatedPosts from './paginated-posts'
import Skeleton from './skeleton'
import SortBy from './sort-by'

type BlogIndexModule = Extract<
	Get<PAGE_QUERY_RESULT, 'modules', 0>,
	{ _type: 'blog-index' }
>

export default async function ({
	intro,
	featured,
	postsPerPage = 6,
	perspective,
	stega,
	...props
}: BlogIndexModule & ModuleProps & DynamicFetchOptions) {
	const blogDir = `/${ROUTES.blog}/`
	const featuredIds = featured?.map((ref) => ref._ref).filter(Boolean) ?? []

	const [posts, featuredPosts] = await Promise.all([
		getPosts({ blogDir, featuredIds, perspective, stega }),
		featuredIds.length
			? getFeaturedPosts({ blogDir, featuredIds, perspective, stega })
			: Promise.resolve([] as BLOG_FEATURED_QUERY_RESULT),
	])

	const featuredById = new Map(featuredPosts.map((post) => [post._id, post]))
	const resolvedFeatured = featuredIds
		.map((id) => featuredById.get(id))
		.filter(Boolean) as BLOG_FEATURED_QUERY_RESULT

	const introSx = stylex.props(shared.prose)

	return (
		<Module
			{...stylex.props(shared.section, styles.root, intro && styles.withIntro)}
			{...props}
		>
			{intro && (
				<header
					{...introSx}
					className={[introSx.className, 'prose'].filter(Boolean).join(' ')}
				>
					<PortableText value={intro} />
				</header>
			)}

			<div {...stylex.props(styles.grid)}>
				<fieldset {...stylex.props(styles.fieldset)}>
					<Suspense
						fallback={
							<Loading xstyle={styles.loadingCategories}>
								Loading categories...
							</Loading>
						}
					>
						<FilterList perspective={perspective} stega={stega} />
						<SortBy />
					</Suspense>
				</fieldset>

				<Suspense fallback={<Skeleton postsPerPage={postsPerPage} />}>
					<PaginatedPosts
						posts={posts}
						featured={resolvedFeatured}
						postsPerPage={postsPerPage}
					/>
				</Suspense>
			</div>
		</Module>
	)
}

async function getPosts({
	blogDir,
	featuredIds,
	perspective,
	stega,
}: {
	blogDir: string
	featuredIds: string[]
} & DynamicFetchOptions) {
	'use cache'
	const { data } = await sanityFetch({
		query: BLOG_INDEX_QUERY,
		params: { blogDir, featuredIds },
		perspective,
		stega,
	})
	return data as BLOG_INDEX_QUERY_RESULT
}

async function getFeaturedPosts({
	blogDir,
	featuredIds,
	perspective,
	stega,
}: {
	blogDir: string
	featuredIds: string[]
} & DynamicFetchOptions) {
	'use cache'
	const { data } = await sanityFetch({
		query: BLOG_FEATURED_QUERY,
		params: { blogDir, featuredIds },
		perspective,
		stega,
	})
	return data as BLOG_FEATURED_QUERY_RESULT
}

const BLOG_INDEX_QUERY = groq`
	*[_type == 'blog.post' && !(_id in $featuredIds)]|order(publishDate desc){
		...,
		${BLOG_POST_FRAGMENT_QUERY},
		'slug': $blogDir + metadata.slug.current,
	}
`

const BLOG_FEATURED_QUERY = groq`
	*[_type == 'blog.post' && _id in $featuredIds]{
		...,
		${BLOG_POST_FRAGMENT_QUERY},
		'slug': $blogDir + metadata.slug.current,
	}
`

const styles = stylex.create({
	root: {
		display: 'grid',
		rowGap: spacing.lh,
	},
	withIntro: {
		paddingTop: '1rem',
	},
	grid: {
		display: 'grid',
		gap: spacing.lh,
	},
	fieldset: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		gap: '1rem',
		borderWidth: 0,
		padding: 0,
		margin: 0,
		minWidth: 0,
	},
	loadingCategories: {
		padding: '0.25em 0.5em',
	},
})
