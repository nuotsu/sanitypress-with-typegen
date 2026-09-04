import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import { portableTextToSchemaHtml } from '@/lib/portable-text-to-schema-html'
import { Module } from '@/modules'
import { urlFor } from '@/sanity/lib/image'
import type { Person, PersonList } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { mq } from '../../styles/breakpoints.stylex'
import Img from '@/ui/img'

export default function ({
	intro = [],
	people: p,
	columns,
	...props
}: PersonList) {
	const people = (p as unknown as Person[]) ?? []
	const headerSx = stylex.props(shared.prose)
	const gridSx = stylex.props(
		styles.grid,
		columns ? styles.gridColumns : styles.gridAuto,
	)

	const schemaPersons = people
		.filter((person) => person.enableSchema && person.name)
		.map((person) => ({
			'@type': 'Person',
			name: person.name,
			...(person.title && { jobTitle: person.title }),
			...(person.content && {
				description: portableTextToSchemaHtml(person.content),
			}),
			...(person.image && {
				image: urlFor(person.image).width(400).url(),
			}),
		}))

	return (
		<Module {...stylex.props(shared.section, styles.root)} {...props}>
			{schemaPersons.length > 0 && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@graph': schemaPersons,
						}),
					}}
				/>
			)}

			<header
				{...headerSx}
				className={[headerSx.className, 'prose'].filter(Boolean).join(' ')}
			>
				<PortableText value={intro} />
			</header>

			<div
				{...gridSx}
				style={{
					...gridSx.style,
					['--columns' as string]: columns,
				}}
			>
				{people.map(({ name, title, content, image }, key) => {
					const contentSx = stylex.props(shared.prose)

					return (
						<article {...stylex.props(styles.card)} key={key}>
							<Img
								{...stylex.props(styles.image)}
								width={400}
								image={image}
								alt={name ?? ''}
							/>

							<dl>
								<dt {...stylex.props(shared.h3)}>{name}</dt>
								{title && <dd>{title}</dd>}
							</dl>

							{content && (
								<div
									{...contentSx}
									className={[contentSx.className, 'prose']
										.filter(Boolean)
										.join(' ')}
								>
									<PortableText value={content} />
								</div>
							)}
						</article>
					)
				})}
			</div>
		</Module>
	)
}

const styles = stylex.create({
	root: {
		display: 'flex',
		flexDirection: 'column',
		gap: '2rem',
	},
	grid: {
		display: 'grid',
		alignItems: 'flex-start',
		gap: '2rem',
		gridTemplateColumns: {
			default: null,
			[mq.md]: 'repeat(2, minmax(0, 1fr))',
		},
	},
	gridColumns: {
		gridTemplateColumns: {
			default: null,
			[mq.md]: 'repeat(2, minmax(0, 1fr))',
			'@media (min-width: 64rem)':
				'repeat(var(--columns, 1), minmax(0px, 1fr))',
		},
	},
	gridAuto: {
		gridTemplateColumns: {
			default: null,
			[mq.md]: 'repeat(2, minmax(0, 1fr))',
			'@media (min-width: 64rem)':
				'repeat(auto-fit, minmax(16rem, 1fr))',
		},
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
	},
	image: {
		aspectRatio: '1',
		width: '100%',
		objectFit: 'cover',
	},
})
