import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import { Module } from '@/modules'
import CustomHTML from '@/modules/custom-html'
import type { Callout } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { mq } from '../../styles/breakpoints.stylex'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'

export default function ({
	eyebrow,
	intro = [],
	ctas,
	className,
	...props
}: Callout & React.ComponentProps<'section'>) {
	const rootSx = stylex.props(shared.section, styles.root)
	const proseSx = stylex.props(shared.prose, styles.header)

	return (
		<Module
			{...rootSx}
			{...props}
			className={[rootSx.className, className].filter(Boolean).join(' ')}
		>
			<header
				{...proseSx}
				className={[proseSx.className, 'prose'].filter(Boolean).join(' ')}
			>
				<Eyebrow value={eyebrow} />
				<PortableText
					value={intro}
					components={{
						types: {
							image: ({ value }) => (
								<figure>
									<Img
										{...stylex.props(styles.image)}
										image={value}
										width={1000}
										alt={value.alt ?? ''}
									/>
								</figure>
							),
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
		textAlign: 'center',
	},
	header: {
		marginInline: 'auto',
		maxWidth: '48rem',
		textWrap: 'balance',
	},
	image: {
		marginInline: 'auto',
		width: '100%',
	},
	ctaList: {
		justifyContent: 'center',
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
