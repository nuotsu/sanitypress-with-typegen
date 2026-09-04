'use client'

import * as stylex from '@stylexjs/stylex'
import { useState, type ComponentProps } from 'react'
import { VscCheck, VscCopy } from 'react-icons/vsc'

export default function ({
	value,
	xstyle,
	className,
	children = <VscCopy />,
	childrenWhenCopied = <VscCheck />,
	...props
}: {
	value?: string
	childrenWhenCopied?: React.ReactNode
	xstyle?: stylex.StyleXStyles
	className?: string
} & Omit<ComponentProps<'button'>, 'className'>) {
	const [copied, setCopied] = useState(false)
	const sx = stylex.props(styles.root, copied && styles.copied, xstyle)

	return (
		<button
			{...props}
			{...sx}
			className={[sx.className, copied && 'copied', className]
				.filter(Boolean)
				.join(' ')}
			onClick={async () => {
				if (typeof window === 'undefined' || !value) return

				await navigator.clipboard.writeText(value)

				setCopied(true)
				setTimeout(() => setCopied(false), 1000)
			}}
			title="Click to copy"
		>
			{copied ? childrenWhenCopied : children}
		</button>
	)
}

const styles = stylex.create({
	root: {
		cursor: 'copy',
	},
	copied: {
		pointerEvents: 'none',
	},
})
