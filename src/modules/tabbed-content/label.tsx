'use client'

import * as stylex from '@stylexjs/stylex'
import { useTabbedContent } from './store'

export default function ({
	index,
	xstyle,
	activeXstyle,
	...props
}: {
	index: number
	xstyle?: stylex.StyleXStyles
	activeXstyle?: stylex.StyleXStyles
} & Omit<React.ComponentProps<'label'>, 'style' | 'className'>) {
	const { activeTab } = useTabbedContent()
	const isActive = activeTab === index
	const sx = stylex.props(xstyle, isActive && activeXstyle)

	return (
		<label
			{...sx}
			{...props}
			data-active={isActive ? 'true' : undefined}
			onClick={(e) => {
				e.currentTarget.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
				})
			}}
		/>
	)
}
