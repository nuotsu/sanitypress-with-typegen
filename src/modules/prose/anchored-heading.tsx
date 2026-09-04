import * as stylex from '@stylexjs/stylex'
import type { PortableTextComponentProps } from 'next-sanity'
import { slug } from '@/lib/utils'
import { colors, spacing } from '../../styles/tokens.stylex'

type PortableTextProps = PortableTextComponentProps<{
	_key?: string
	_type: string
	children?: Array<{ _type: string; text?: unknown }>
}>

export default function ({
	as: Tag = 'h1',
	children,
	value,
}: { as: React.ElementType } & PortableTextProps) {
	const id = slug(
		value.children?.reduce(
			(acc, { text }) => acc + ((text as string | null) ?? ''),
			'',
		) ?? '',
		{ removeLeadingNumberAndHyphen: true },
	)

	return (
		<Tag id={id}>
			{children}

			{Tag !== 'h1' && (
				<a
					href={`#${id}`}
					{...stylex.props(styles.anchor)}
					data-heading-anchor
				>
					#
				</a>
			)}
		</Tag>
	)
}

const styles = stylex.create({
	anchor: {
		display: 'inline-block',
		marginLeft: spacing.ch,
		color: colors.primary,
	},
})
