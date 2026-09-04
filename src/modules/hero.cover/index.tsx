import * as stylex from '@stylexjs/stylex'
import { PortableText, stegaClean } from 'next-sanity'
import { Module } from '@/modules'
import CustomHTML from '@/modules/custom-html'
import type { HeroCover } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import CTAList from '@/ui/cta-list'
import Eyebrow from '@/ui/eyebrow'
import Img, { Source } from '@/ui/img'

export default function ({
	eyebrow,
	content = [],
	ctas,
	image,
	textAlign: ta = 'center',
	verticalAlign: va = 'center',
	...props
}: HeroCover) {
	const textAlign = stegaClean(ta)
	const verticalAlign = stegaClean(va)
	const opacity = Number(stegaClean(image?.opacity)) ?? 1

	const imgSx = stylex.props(styles.bgImage)
	const proseSx = stylex.props(shared.prose, styles.header)

	return (
		<Module
			{...stylex.props(
				styles.root,
				verticalAlign === 'top' && styles.alignTop,
				verticalAlign === 'center' && styles.alignCenter,
				verticalAlign === 'bottom' && styles.alignBottom,
				textAlign === 'left' && styles.textLeft,
				textAlign === 'center' && styles.textCenter,
				textAlign === 'right' && styles.textRight,
			)}
			{...props}
		>
			{image?.asset && (
				<picture {...stylex.props(styles.picture)}>
					<Source image={image.mobile} width={1000} />
					<Img
						image={image}
						width={1920}
						{...imgSx}
						style={{ ...imgSx.style, opacity }}
						alt={image?.alt ?? ''}
						draggable={false}
					/>
				</picture>
			)}

			<div
				{...stylex.props(
					shared.section,
					styles.content,
					image?.asset && opacity > 0.5 && styles.onDarkImage,
				)}
			>
				<header
					{...proseSx}
					className={[proseSx.className, 'prose'].filter(Boolean).join(' ')}
				>
					<Eyebrow value={eyebrow} />
					<PortableText
						value={content}
						components={{
							types: {
								image: ({ value }) => (
									<figure>
										<Img
											{...stylex.props(
												styles.contentImage,
												textAlign === 'left' && styles.imgLeft,
												textAlign === 'center' && styles.imgCenter,
												textAlign === 'right' && styles.imgRight,
											)}
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
					<CTAList
						ctas={ctas}
						xstyle={
							textAlign === 'left'
								? styles.ctaLeft
								: textAlign === 'right'
									? styles.ctaRight
									: styles.ctaCenter
						}
					/>
				</header>
			</div>
		</Module>
	)
}

const styles = stylex.create({
	root: {
		position: 'relative',
		display: 'grid',
		minHeight: '60svh',
	},
	alignTop: {
		alignItems: 'start',
	},
	alignCenter: {
		alignItems: 'center',
	},
	alignBottom: {
		alignItems: 'end',
	},
	textLeft: {
		justifyContent: 'start',
		textAlign: 'left',
	},
	textCenter: {
		justifyContent: 'center',
		textAlign: 'center',
	},
	textRight: {
		justifyContent: 'end',
		textAlign: 'right',
	},
	picture: {
		display: 'contents',
	},
	bgImage: {
		pointerEvents: 'none',
		position: 'absolute',
		inset: 0,
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	content: {
		position: 'relative',
	},
	onDarkImage: {
		color: colors.background,
	},
	header: {
		maxWidth: '36rem',
	},
	contentImage: {
		width: '100%',
	},
	imgLeft: {
		marginRight: 'auto',
	},
	imgCenter: {
		marginInline: 'auto',
	},
	imgRight: {
		marginLeft: 'auto',
	},
	ctaLeft: {
		justifyContent: 'flex-start',
		flexDirection: {
			default: null,
			[mq.maxSm]: 'column',
		},
		alignItems: {
			default: null,
			[mq.maxSm]: 'stretch',
		},
	},
	ctaCenter: {
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
	ctaRight: {
		justifyContent: 'flex-end',
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
