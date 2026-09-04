'use client'

import * as stylex from '@stylexjs/stylex'
import { shared } from '../../styles/shared'
import { colors } from '../../styles/tokens.stylex'
import { useSearchStore } from './store'

export default function ({ query }: { query: string }) {
	const { results } = useSearchStore()

	if (!results.length) return null

	return (
		<ul {...stylex.props(styles.list)} aria-live="polite">
			{results.map(
				(result) =>
					!!result.slug && (
						<li key={result._id}>
							<a
								href={result.slug + `#:~:text=${query}`}
								{...stylex.props(styles.row)}
							>
								<span {...stylex.props(shared.link, styles.title)}>
									{result.title}
								</span>

								<span {...stylex.props(styles.type)}>
									{result._type == 'blog.post' ? 'Blog' : 'Page'}
								</span>
							</a>
						</li>
					),
			)}
		</ul>
	)
}

const styles = stylex.create({
	list: {
		display: 'grid',
		gap: '1px',
		listStyle: 'none',
		padding: 0,
		margin: 0,
	},
	row: {
		display: 'grid',
		gridTemplateColumns: '1fr auto',
		alignItems: 'center',
		gap: '1rem',
	},
	title: {
		flexGrow: 1,
		overflow: 'hidden',
		display: '-webkit-box',
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: 1,
		wordBreak: 'break-all',
		textDecorationThickness: {
			default: null,
			':hover': '2px',
		},
	},
	type: {
		color: colors.foreground50,
	},
})
