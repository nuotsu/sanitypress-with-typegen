import { slug } from '@/lib/utils'
import type { PortableTextBlock, PortableTextComponentProps } from 'next-sanity'

export default function ({
	as: Tag = 'h1',
	children,
	value,
}: { as: React.ElementType } & PortableTextComponentProps<PortableTextBlock>) {
	const id = slug(value.children.reduce((acc, { text }) => acc + text, ''))

	return (
		<Tag className="group" id={id}>
			{children}

			{Tag !== 'h1' && (
				<a
					href={`#${id}`}
					className="ml-[1ch] inline-block pointer-fine:not-group-hover:invisible"
				>
					¶
				</a>
			)}
		</Tag>
	)
}
