'use client'

import * as stylex from '@stylexjs/stylex'
import { useEffect, useRef, useState, type ComponentProps } from 'react'
import css from './image-gallery.module.css'

export default function Track({
	reverse,
	duration,
	xstyle,
	children,
	...props
}: {
	reverse?: boolean
	duration: number
	xstyle?: stylex.StyleXStyles
} & Omit<ComponentProps<'div'>, 'className'>) {
	const ref = useRef<HTMLDivElement>(null)
	const [inView, setInView] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const observer = new IntersectionObserver(
			([entry]) => setInView(!!entry?.isIntersecting),
			{ rootMargin: '100px' },
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	const sx = stylex.props(xstyle)

	return (
		<div
			ref={ref}
			{...sx}
			{...props}
			className={[
				css.track,
				reverse && css.reverse,
				!inView && css.paused,
				sx.className,
			]
				.filter(Boolean)
				.join(' ')}
			style={{
				...sx.style,
				...props.style,
				['--duration' as string]: `${duration}s`,
			}}
		>
			{children}
		</div>
	)
}
