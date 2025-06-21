import { cn, slug } from '@/lib/utils'

export default function ({
	headings,
	...props
}: {
	headings: Array<{
		style: string
		text: string
	}>
} & React.ComponentProps<'details'>) {
	return (
		<details {...props}>
			<summary>Table of Contents</summary>

			<ol>
				{headings.map((heading, key) => (
					<li key={key}>
						<a
							href={`#${slug(heading.text)}`}
							className={cn('link block py-1 leading-tight', {
								'pl-[1ch]': heading.style === 'h3',
								'pl-[2ch]': heading.style === 'h4',
								'pl-[3ch]': heading.style === 'h5',
								'pl-[4ch]': heading.style === 'h6',
							})}
						>
							{heading.text}
						</a>
					</li>
				))}
			</ol>
		</details>
	)
}
