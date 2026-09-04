'use client'

import * as stylex from '@stylexjs/stylex'
import type { BlogCategory } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { useBlogIndexStore } from '@/modules/blog-index/store'

export default function ({
	category,
	children,
}: {
	category?: BlogCategory
} & React.ComponentProps<'button'>) {
	const { categoryParam, setCategoryParam } = useBlogIndexStore()
	const slug = category?.slug?.current
	const isActive = categoryParam === slug || (!categoryParam && !category)

	return (
		<button
			{...stylex.props(isActive ? shared.action : shared.ghost)}
			onClick={() => {
				if (categoryParam === slug) {
					setCategoryParam(null)
				} else {
					setCategoryParam(slug ?? null)
				}
			}}
		>
			{children || category?.title}
		</button>
	)
}
