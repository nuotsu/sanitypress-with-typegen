import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import { Module } from '@/modules'
import AccordionList from '@/modules/accordion-list'
import CustomHTML from '@/modules/custom-html'
import AnchoredHeading from '@/modules/prose/anchored-heading'
import Code from '@/modules/prose/code'
import Image from '@/modules/prose/image'
import Table from '@/modules/prose/table'
import type {
	BLOG_POST_QUERY_RESULT,
	BlogCategory,
	BlogPostContent,
	Cta,
	Person,
} from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors, spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import Byline from '@/ui/blog/byline'
import Categories from '@/ui/blog/categories'
import Date from '@/ui/blog/date'
import Schema from '@/ui/blog/schema'
import CTAList from '@/ui/cta-list'
import Img from '@/ui/img'
import Sidebar from '@/ui/sidebar'
import css from './blog-post-content.module.css'

export default function ({
	post,
	sidebar,
	...props
}: { post: BLOG_POST_QUERY_RESULT } & BlogPostContent) {
	if (!post) return null

	const proseSx = stylex.props(shared.prose, styles.body)
	const bgSx = stylex.props(styles.bgImage)
	const contentSx = stylex.props(shared.section, styles.content)

	return (
		<>
			<Module as="article" {...props}>
				<header {...stylex.props(shared.section, styles.header)}>
					<Img
						image={post.metadata?.image}
						imageOptions={{ blur: 30 }}
						width={1000}
						{...bgSx}
						style={bgSx.style}
						alt={post.metadata?.title ?? ''}
						draggable={false}
						loading="eager"
					/>

					<div {...stylex.props(styles.headerInner)}>
						<h1 {...stylex.props(shared.h1, styles.title)}>
							{post.title || post.metadata?.title}
						</h1>

						<div {...stylex.props(styles.meta)}>
							<Byline author={post.author as unknown as Person} />
							<Categories
								categories={post.categories as BlogCategory[]}
								linked
							/>
							<Date date={post.publishDate} />
							<span>{Math.ceil(post.readTime)} min read</span>
						</div>
					</div>
				</header>

				<section
					{...contentSx}
					className={[contentSx.className, 'post-content']
						.filter(Boolean)
						.join(' ')}
				>
					<Sidebar {...sidebar} headings={post.headings} xstyle={styles.sidebar} />

					<div
						{...proseSx}
						className={[proseSx.className, css.body, 'prose']
							.filter(Boolean)
							.join(' ')}
					>
						<PortableText
							value={post.content ?? []}
							components={{
								block: {
									h1: (node) => <AnchoredHeading as="h1" {...node} />,
									h2: (node) => <AnchoredHeading as="h2" {...node} />,
									h3: (node) => <AnchoredHeading as="h3" {...node} />,
									h4: (node) => <AnchoredHeading as="h4" {...node} />,
									h5: (node) => <AnchoredHeading as="h5" {...node} />,
									h6: (node) => <AnchoredHeading as="h6" {...node} />,
								},
								types: {
									image: Image,
									'accordion-list': ({ value }) => (
										<AccordionList
											{...value}
											{...stylex.props(styles.accordion)}
										/>
									),
									ctas: ({ value }) => (
										<CTAList ctas={value.ctas as Cta[] | undefined} />
									),
									code: Code,
									table: Table,
									'custom-html': ({ value }) => (
										<div {...stylex.props(styles.customHtml)}>
											<CustomHTML {...value} />
										</div>
									),
								},
							}}
						/>
					</div>
				</section>
			</Module>

			<Schema post={post} />
		</>
	)
}

const styles = stylex.create({
	header: {
		position: 'relative',
		textAlign: 'center',
	},
	bgImage: {
		position: 'absolute',
		inset: 0,
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		opacity: 0.1,
	},
	headerInner: {
		position: 'relative',
		marginInline: 'auto',
		maxWidth: '64rem',
		display: 'flex',
		flexDirection: 'column',
		rowGap: '1rem',
	},
	title: {
		textWrap: 'balance',
	},
	meta: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		columnGap: spacing.lh,
		rowGap: spacing.ch,
	},
	content: {
		display: 'flex',
		gap: spacing.lh,
		flexDirection: {
			default: 'column',
			[mq.md]: 'row',
		},
		alignItems: {
			default: null,
			[mq.md]: 'flex-start',
		},
	},
	sidebar: {
		padding: {
			default: spacing.ch,
			[mq.md]: null,
		},
		backgroundColor: {
			default: colors.current05,
			[mq.md]: null,
		},
	},
	body: {
		marginInline: 'auto',
		display: 'grid',
		width: '100%',
		maxWidth: '56rem',
	},
	accordion: {
		padding: 0,
		// header text-align left — AccordionList still Tailwind; see issues
		textAlign: 'left',
	},
	customHtml: {
		marginBlock: '1.5rem',
	},
})
