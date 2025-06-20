import type { AccordionList } from '@/sanity/types'
import { PortableText } from 'next-sanity'

export default function AccordionList({ intro, accordions }: AccordionList) {
	return (
		<section className="section">
			{intro && (
				<header className="prose">
					<PortableText value={intro} />
				</header>
			)}

			{accordions?.map((accordion) => (
				<details key={accordion._key}>
					<summary>{accordion.summary}</summary>

					<div className="prose">
						<PortableText value={accordion.content ?? []} />
					</div>
				</details>
			))}
		</section>
	)
}
