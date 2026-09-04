'use client'

import * as stylex from '@stylexjs/stylex'
import { useQueryState } from 'nuqs'
import { usePagination } from '@/hooks/usePagination'
import type {
	BLOG_FEATURED_QUERY_RESULT,
	BLOG_INDEX_QUERY_RESULT,
	BlogPost,
} from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors, spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import PostPreview from '@/ui/blog/post-preview'
import PostPreviewLarge from '@/ui/blog/post-preview-large'

export default function ({
	posts,
	featured,
	postsPerPage,
}: {
	posts: BLOG_INDEX_QUERY_RESULT
	featured?: BLOG_FEATURED_QUERY_RESULT
	postsPerPage?: number
}) {
	const [category] = useQueryState('category')
	const [sortBy] = useQueryState('sortBy')

	const showFeatured = !category && !!featured?.length
	const heroPost = showFeatured
		? featured[0]
		: !category
			? posts?.[0]
			: undefined
	const additionalFeatured = showFeatured ? featured.slice(1) : []
	const featuredIdSet = new Set(featured?.map((post) => post._id) ?? [])

	const processedPosts = posts
		?.filter((post, i) => {
			if (category)
				return post.categories?.some((c) => c.slug?.current === category)
			if (showFeatured) return !featuredIdSet.has(post._id)
			return i !== 0
		})
		?.sort((a, b) => {
			if (sortBy === 'publishDate_desc')
				return (b.publishDate ?? '').localeCompare(a.publishDate ?? '')
			if (sortBy === 'publishDate_asc')
				return (a.publishDate ?? '').localeCompare(b.publishDate ?? '')
			if (sortBy === 'title_asc')
				return (a.title ?? '').localeCompare(b.title ?? '')
			if (sortBy === 'title_desc')
				return (b.title ?? '').localeCompare(a.title ?? '')
			return 0
		})

	const gridItems = showFeatured
		? [
				...additionalFeatured.map((post) => ({ ...post, isFeatured: true })),
				...(processedPosts ?? []),
			]
		: (processedPosts ?? [])

	const { paginatedItems, Pagination, currentPage } = usePagination({
		items: gridItems,
		itemsPerPage: postsPerPage,
	})

	const orderFirstClass = stylex.props(styles.orderFirst).className
	const hrSx = stylex.props(styles.hr, styles.orderFirst)
	const fadeClass = stylex.props(shared.animFade).className
	const paginationSx = stylex.props(styles.pagination)
	const buttonClassName = stylex.props(styles.pageButton).className

	return (
		<>
			{currentPage === 1 && !category && heroPost && (
				<>
					<PostPreviewLarge
						post={heroPost as unknown as BlogPost}
						isFeatured={showFeatured}
						className={orderFirstClass}
					/>
					<hr {...hrSx} />
				</>
			)}

			<ul {...stylex.props(styles.grid)}>
				{paginatedItems?.map((post) => (
					<PostPreview
						post={post as unknown as BlogPost}
						className={fadeClass}
						key={post._id}
					/>
				))}
			</ul>

			<Pagination {...paginationSx} buttonClassName={buttonClassName} />
		</>
	)
}

const styles = stylex.create({
	orderFirst: {
		order: {
			default: null,
			[mq.md]: -1,
		},
	},
	hr: {
		borderWidth: 0,
		borderTopWidth: 1,
		borderTopStyle: 'solid',
		borderTopColor: colors.stroke,
		width: {
			default: '100vw',
			[mq.md]: 'auto',
		},
		marginInline: {
			default: 'calc(50% - 50vw)',
			[mq.md]: 0,
		},
	},
	grid: {
		display: 'grid',
		alignItems: 'stretch',
		columnGap: spacing.lh,
		rowGap: '2lh',
		gridTemplateColumns: {
			default: '1fr',
			[mq.sm]: 'repeat(auto-fill, minmax(20rem, 1fr))',
		},
		listStyle: 'none',
		padding: 0,
		margin: 0,
	},
	pagination: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: spacing.ch,
		fontVariantNumeric: 'tabular-nums',
	},
	pageButton: {
		cursor: {
			default: 'pointer',
			':disabled': 'default',
		},
		opacity: {
			default: 1,
			':disabled': 0.5,
		},
		textDecorationLine: {
			default: 'none',
			':not(:disabled):hover': 'underline',
		},
	},
})
