import type { AccordionList } from '@/sanity/types'
import { PortableText } from 'next-sanity'

export default function ({
	_key: _module_key,
	intro,
	accordions,
	connect,
	enableSchema,
}: AccordionList & { _key: string }) {
	return (
		<section className="section">
			{intro && (
				<header className="prose">
					<PortableText value={intro} />
				</header>
			)}

			{accordions?.map(({ _key, summary, content, open }) => (
				<details
					name={connect ? _module_key : undefined}
					open={open}
					{...(enableSchema && {
						itemScope: true,
						itemProp: 'mainEntity',
						itemType: 'https://schema.org/Question',
					})}
					key={_key}
				>
					<summary {...(enableSchema && { itemProp: 'name' })}>
						{summary}
					</summary>

					<div
						{...(enableSchema && {
							itemScope: true,
							itemProp: 'acceptedAnswer',
							itemType: 'https://schema.org/Answer',
						})}
					>
						<div className="prose" {...(enableSchema && { itemProp: 'text' })}>
							<PortableText value={content ?? []} />
						</div>
					</div>
				</details>
			))}
		</section>
	)
}
