import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import type { Megamenu, Page } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { mq } from '../../styles/breakpoints.stylex'
import Img from '@/ui/img'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'

export default function ({
	image,
	link,
	content,
}: Partial<NonNullable<Megamenu['items']>[number] & { _type: 'link.card' }>) {
	const label = link?.label || (link?.internal as unknown as Page)?.title

	const figureSx = stylex.props(styles.figure)
	const imgSx = stylex.props(styles.img)
	const captionSx = stylex.props(styles.caption)
	const linkSx = stylex.props(styles.link)
	const contentSx = stylex.props(shared.prose, styles.content)

	return (
		<figure {...figureSx}>
			<Img
				{...imgSx}
				image={image}
				width={500}
				alt={label ?? ''}
			/>

			<figcaption {...captionSx}>
				<SanityLink
					{...linkSx}
					link={link as unknown as SanityLinkType}
				/>

				{content && (
					<div
						{...contentSx}
						className={[contentSx.className, 'prose'].filter(Boolean).join(' ')}
					>
						<PortableText value={content} />
					</div>
				)}
			</figcaption>
		</figure>
	)
}

const styles = stylex.create({
	figure: {
		position: 'relative',
		breakInside: 'avoid',
		maxWidth: {
			default: null,
			[mq.md]: '28rem',
		},
	},
	img: {
		width: '100%',
		display: {
			default: null,
			[mq.maxMd]: 'none',
		},
	},
	caption: {
		display: 'grid',
		gap: '0.25rem',
	},
	link: {
		paddingBlock: '0.25rem',
		color: 'currentColor',
		fontWeight: {
			default: null,
			[mq.md]: 700,
		},
		textDecorationLine: {
			default: 'none',
			':hover': 'underline',
		},
		'::after': {
			content: '""',
			position: 'absolute',
			inset: 0,
		},
	},
	content: {
		fontSize: '0.875rem',
		display: {
			default: 'flex',
			[mq.maxMd]: 'none',
		},
	},
})
