import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import { Module } from '@/modules'
import type { Logo, LogoList } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { mq } from '../../styles/breakpoints.stylex'
import Eyebrow from '@/ui/eyebrow'
import Img from '@/ui/img'
import css from './logo-list.module.css'

export default function ({
	eyebrow,
	intro,
	logos,
	logoType = 'default',
	autoScroll,
	duration = 12,
	...props
}: LogoList) {
	const headerSx = stylex.props(shared.prose, styles.header)
	const figureSx = stylex.props(
		styles.figure,
		autoScroll ? styles.figureScroll : styles.figureWrap,
	)

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

			<figure
				{...figureSx}
				className={[figureSx.className, autoScroll && css.track]
					.filter(Boolean)
					.join(' ')}
				style={{
					...figureSx.style,
					['--count' as string]: logos?.length,
					['--duration' as string]: `${duration}s`,
				}}
				key={logos?.length}
			>
				{(logos as unknown as Logo[])?.map((logo, key) => {
					if (!logo.image) return null

					const logoSx = stylex.props(styles.logo)

					return (
						<Img
							{...logoSx}
							style={{
								...logoSx.style,
								['--index' as string]: key,
							}}
							image={logo.image[logoType] ?? logo.image.default}
							width={200}
							alt={logo.title ?? ''}
							key={key}
						/>
					)
				})}
			</figure>
		</Module>
	)
}

const styles = stylex.create({
	root: {
		display: 'flex',
		flexDirection: 'column',
		gap: '2rem',
		textAlign: 'center',
	},
	header: {
		marginInline: 'auto',
		maxWidth: '48rem',
	},
	figure: {
		marginInline: 'auto',
		display: 'flex',
		alignItems: 'center',
	},
	figureScroll: {
		maxWidth: 'max-content',
		overflow: 'hidden',
		maskImage:
			'linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent)',
	},
	figureWrap: {
		flexWrap: 'wrap',
		justifyContent: 'center',
		columnGap: '1rem',
		rowGap: '1rem',
	},
	logo: {
		height: '2lh',
		width: {
			default: '200px',
			[mq.maxSm]: '150px',
		},
		flexShrink: 0,
		objectFit: 'contain',
		paddingInline: '1rem',
	},
})
