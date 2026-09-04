import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import { Module } from '@/modules'
import CustomHTML from '@/modules/custom-html'
import type { Prose } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors, spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import CTAList from '@/ui/cta-list'
import Sidebar from '@/ui/sidebar'
import TableOfContents from '@/ui/table-of-contents'
import AnchoredHeading from './anchored-heading'
import Code from './code'
import Image from './image'
import Table from './table'

export default function ({
	content,
	sidebar,
	headings,
	...props
}: Prose & React.ComponentProps<typeof TableOfContents>) {
	const proseSx = stylex.props(shared.prose, styles.article)

	return (
		<Module
			{...stylex.props(shared.section, sidebar && styles.withSidebar)}
			{...props}
		>
			<Sidebar {...sidebar} headings={headings} xstyle={styles.sidebar} />

			<article
				{...proseSx}
				className={[proseSx.className, 'prose'].filter(Boolean).join(' ')}
			>
				<PortableText
					value={content ?? []}
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
							ctas: ({ value }) => <CTAList ctas={value.ctas} />,
							code: Code,
							table: Table,
							'custom-html': ({ value }) => <CustomHTML {...value} />,
						},
					}}
				/>
			</article>
		</Module>
	)
}

const styles = stylex.create({
	withSidebar: {
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
	article: {
		marginInline: 'auto',
		width: '100%',
		maxWidth: '48rem',
	},
})
