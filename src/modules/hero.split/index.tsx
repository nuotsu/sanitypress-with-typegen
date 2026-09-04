import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import { Module } from '@/modules'
import CustomHTML from '@/modules/custom-html'
import type { HeroSplit } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { mq } from '../../styles/breakpoints.stylex'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'

export default function ({
	eyebrow,
	content = [],
	ctas,
	image,
	...props
}: HeroSplit) {
	const proseSx = stylex.props(shared.prose)

	return (
		<Module {...stylex.props(shared.section, styles.root)} {...props}>
			<figure
				{...stylex.props(
					image?.onRight && styles.onRight,
					image?.afterContent && styles.afterContent,
				)}
			>
				<Img
					{...stylex.props(styles.image)}
					image={image}
					width={600}
					alt={image?.alt ?? ''}
				/>
			</figure>

			<header
				{...proseSx}
				className={[proseSx.className, 'prose'].filter(Boolean).join(' ')}
			>
				<Eyebrow value={eyebrow} />
				<PortableText
					value={content}
					components={{
						types: {
							'custom-html': ({ value }) => <CustomHTML {...value} />,
						},
					}}
				/>
				<CTAList ctas={ctas} xstyle={styles.ctaList} />
			</header>
		</Module>
	)
}

const styles = stylex.create({
	root: {
		display: 'grid',
		alignItems: 'center',
		gap: '2rem',
		gridTemplateColumns: {
			default: null,
			[mq.md]: '1fr 1fr',
		},
	},
	onRight: {
		order: {
			default: null,
			[mq.md]: 999,
		},
	},
	afterContent: {
		order: {
			default: 999,
			[mq.md]: null,
		},
	},
	image: {
		width: '100%',
	},
	ctaList: {
		flexDirection: {
			default: null,
			[mq.maxSm]: 'column',
		},
		alignItems: {
			default: null,
			[mq.maxSm]: 'stretch',
		},
	},
})
