import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import { Module } from '@/modules'
import type { ImageGallery } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors, spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'
import Track from './track'

export default function ({
	eyebrow,
	intro,
	rows,
	autoScroll,
	duration = 20,
	alternateScrollDirection,
	...props
}: ImageGallery) {
	const headerSx = stylex.props(shared.prose, styles.header)

	return (
		<Module {...stylex.props(shared.section, styles.root)} {...props}>
			{(eyebrow || intro) && (
				<header
					{...headerSx}
					className={[headerSx.className, 'prose'].filter(Boolean).join(' ')}
				>
					<Eyebrow value={eyebrow} />
					<PortableText value={intro ?? []} />
				</header>
			)}

			<div {...stylex.props(styles.rows)}>
				{rows?.map((row, rowIndex) => {
					const images = row.images?.filter((image) => image?.asset) ?? []
					if (!images.length) return null

					const reverse =
						!!autoScroll && !!alternateScrollDirection && rowIndex % 2 === 1

					const copies = autoScroll ? 2 : 1

					const imageSet = Array.from({ length: copies }, (_, copy) =>
						images.map((image) => (
							<figure
								{...stylex.props(
									styles.figure,
									!autoScroll && styles.figureSnap,
								)}
								aria-hidden={copy > 0 || undefined}
								key={`${image._key}-${copy}`}
							>
								<Img
									{...stylex.props(styles.image)}
									image={image}
									height={300}
									sizes="(max-width: 640px) 70vw, 400px"
									decoding={copy > 0 ? 'async' : undefined}
									alt={image.alt ?? ''}
								/>
								{image.caption && (
									<figcaption {...stylex.props(styles.caption)}>
										{image.caption}
									</figcaption>
								)}
							</figure>
						)),
					)

					const rowSx = stylex.props(
						styles.row,
						autoScroll ? styles.rowScroll : styles.rowManual,
					)

					return (
						<div {...rowSx} key={row._key}>
							{autoScroll ? (
								<Track reverse={reverse} duration={duration} xstyle={styles.track}>
									{imageSet}
								</Track>
							) : (
								imageSet
							)}
						</div>
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
	header: {
		marginInline: 'auto',
		maxWidth: '48rem',
		textAlign: 'center',
	},
	rows: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1px',
	},
	row: {
		width: {
			default: null,
			[mq.maxMd]: '100vw',
		},
		marginInline: {
			default: 'auto',
			[mq.maxMd]: 'calc(50% - 50vw)',
		},
		alignItems: 'flex-end',
		gap: '1px',
	},
	rowScroll: {
		overflow: 'hidden',
	},
	rowManual: {
		display: 'flex',
		overflowX: 'auto',
		scrollSnapType: 'x mandatory',
		scrollbarWidth: 'none',
		paddingInline: {
			default: '1px',
			[mq.md]: null,
		},
		'::before': {
			content: '""',
			margin: 'auto',
		},
		'::after': {
			content: '""',
			margin: 'auto',
		},
	},
	track: {
		alignItems: 'flex-end',
		gap: '1px',
	},
	figure: {
		position: 'relative',
		flexShrink: 0,
	},
	figureSnap: {
		scrollSnapAlign: 'center',
	},
	image: {
		height: '18.75rem',
		width: 'auto',
		maxWidth: 'none',
		objectFit: 'cover',
	},
	caption: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		margin: spacing.ch,
		paddingBlock: '0.25em',
		paddingInline: '0.5em',
		fontSize: '0.75rem',
		color: colors.background,
		backgroundColor: colors.foreground60,
		backdropFilter: 'blur(8px)',
	},
})
