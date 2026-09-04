import * as stylex from '@stylexjs/stylex'
import { PortableText, type PortableTextTypeComponentProps } from 'next-sanity'
import { colors } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import Img from '@/ui/img'

export default function ({
	value: { figcaption, ...image },
}: PortableTextTypeComponentProps<any>) {
	return (
		<figure {...stylex.props(styles.figure)}>
			<Img
				{...stylex.props(styles.image)}
				image={image}
				width={1000}
				alt={image.alt ?? ''}
			/>

			{figcaption && (
				<figcaption {...stylex.props(styles.caption)}>
					<PortableText value={figcaption} />
				</figcaption>
			)}
		</figure>
	)
}

const styles = stylex.create({
	figure: {
		marginBlock: '1.5rem',
		display: 'flex',
		flexDirection: 'column',
		rowGap: '0.5rem',
		textAlign: 'center',
		':first-child': {
			marginTop: 0,
		},
		width: {
			default: '100vw',
			[mq.md]: '100%',
		},
		marginInline: {
			default: 'calc(50% - 50vw)',
			[mq.md]: null,
		},
		gridColumn: {
			default: null,
			[mq.md]: 'bleed',
		},
	},
	image: {
		marginInline: 'auto',
	},
	caption: {
		color: colors.foreground50,
		fontStyle: 'italic',
		paddingInline: {
			default: '1rem',
			[mq.md]: null,
		},
	},
})
