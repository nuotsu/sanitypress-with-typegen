import Link from 'next/link'
import * as stylex from '@stylexjs/stylex'
import { ROUTES } from '@/lib/env'
import type { BlogCategory } from '@/sanity/types'
import { shared } from '../../styles/shared'

export default function ({
	categories,
	className,
	linked,
}: {
	categories: BlogCategory[]
	linked?: boolean
} & React.ComponentProps<'ul'>) {
	if (!categories) return null

	const root = stylex.props(styles.root)

	return (
		<ul
			{...root}
			className={[root.className, className].filter(Boolean).join(' ')}
		>
			{categories.map((category, key) => (
				<li {...stylex.props(styles.item)} key={key}>
					{linked ? (
						<Link
							href={{
								pathname: `/${ROUTES.blog}`,
								query: { category: category.slug?.current },
							}}
							{...stylex.props(shared.link)}
						>
							{category.title}
						</Link>
					) : (
						category.title
					)}

					{key < categories.length - 1 && <>, </>}
				</li>
			))}
		</ul>
	)
}

const styles = stylex.create({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		columnGap: '0.5ch',
		padding: 0,
	},
	item: {
		flexShrink: 0,
	},
})
