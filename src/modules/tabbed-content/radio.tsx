'use client'

import * as stylex from '@stylexjs/stylex'
import { useEffect, useRef } from 'react'
import { shared } from '../../styles/shared'
import { useTabbedContent } from './store'

export default function ({
	index,
	...props
}: { index: number } & React.ComponentProps<'input'>) {
	const ref = useRef<HTMLInputElement>(null)

	const { activeTab, setActiveTab } = useTabbedContent()

	useEffect(() => {
		if (ref.current) {
			ref.current.checked = activeTab === index
		}
	}, [activeTab, index])

	return (
		<input
			ref={ref}
			type="radio"
			onChange={(e) => setActiveTab(Number(e.currentTarget.value))}
			{...stylex.props(shared.srOnly)}
			{...props}
		/>
	)
}

export function Panel({
	index,
	children,
	...props
}: { index: number } & React.ComponentProps<'article'>) {
	const { activeTab } = useTabbedContent()

	return (
		<article hidden={activeTab !== index ? true : undefined} {...props}>
			{children}
		</article>
	)
}
