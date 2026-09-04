'use client'

import * as stylex from '@stylexjs/stylex'
import { useQueryState } from 'nuqs'
import { ROUTES } from '@/lib/env'
import type { SearchModule } from '@/sanity/types'
import { shared } from '../../styles/shared'

export default function ({ scope }: { scope: SearchModule['scope'] }) {
	const [query] = useQueryState('query')

	const href = [
		`https://www.google.com/search?q=${query} `,
		`site:${process.env.NEXT_PUBLIC_BASE_URL}`,
		scope === 'blog posts' ? `/${ROUTES.blog}` : '',
	].join('')

	return (
		<p {...stylex.props(styles.root)}>
			<a {...stylex.props(shared.link)} href={href} target="_blank">
				Search on Google
			</a>
		</p>
	)
}

const styles = stylex.create({
	root: {
		textAlign: 'center',
	},
})
