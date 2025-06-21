import TableOfContents from './table-of-contents'
import { PortableText, stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'
import type { Prose } from '@/sanity/types'
import AnchoredHeading from './anchored-heading'

export default function ({
	content,
	tableOfContents,
	headings,
}: Prose & React.ComponentProps<typeof TableOfContents>) {
	const toc = stegaClean(tableOfContents)

	return (
		<section className="section flex gap-4 max-md:flex-col md:items-start">
			{(toc === 'left' || toc === 'right') && (
				<TableOfContents
					headings={headings}
					className={cn(
						'top-0 shrink-0 md:sticky md:w-[20ch]',
						toc === 'right' && 'md:order-last',
					)}
					open
				/>
			)}

			<article className="prose">
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
					}}
				/>
			</article>
		</section>
	)
}
