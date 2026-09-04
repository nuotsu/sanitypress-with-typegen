'use client'

import { stegaClean } from 'next-sanity'
import { useEffect, useRef, useState, type ComponentProps } from 'react'
import * as stylex from '@stylexjs/stylex'
import { slug } from '@/lib/utils'
import { colors } from '../../styles/tokens.stylex'
import css from './toc.module.css'

export default function ({
	heading,
	...props
}: {
	heading: {
		style: string | null
		text: string | null
	}
} & ComponentProps<'li'>) {
	if (!heading.text) return null

	const ref = useRef<HTMLLIElement>(null)
	const [thresholdHeight, setThresholdHeight] = useState(0)

	// threshold height = 1/2 of viewport
	useEffect(() => {
		const updateThresholdHeight = () =>
			setThresholdHeight(window.innerHeight / 2)
		updateThresholdHeight()

		window.addEventListener('resize', updateThresholdHeight)
		return () => window.removeEventListener('resize', updateThresholdHeight)
	}, [])

	// add className when heading is in view
	useEffect(() => {
		if (typeof document === 'undefined' || !ref.current || !heading.text) return

		const target = ref.current
			.closest('[data-module]')
			?.querySelector(
				`#${slug(heading.text, { removeLeadingNumberAndHyphen: true })}`,
			)!

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						ref.current?.classList.add(css.inView)
					} else {
						ref.current?.classList.remove(css.inView)
					}
				})
			},
			{
				threshold: 1,
				rootMargin: `${document.documentElement.scrollHeight}px 0px -${thresholdHeight}px 0px`,
			},
		)

		if (target) observer.observe(target)
		return () => observer.disconnect()
	}, [heading, thresholdHeight])

	const level = stegaClean(heading.style)

	return (
		<li ref={ref} {...props}>
			<a
				href={`#${slug(heading.text, { removeLeadingNumberAndHyphen: true })}`}
				{...stylex.props(
					styles.link,
					level === 'h2' && styles.indentH2,
					level === 'h3' && styles.indentH3,
					level === 'h4' && styles.indentH4,
					level === 'h5' && styles.indentH5,
					level === 'h6' && styles.indentH6,
				)}
			>
				{heading.text}
			</a>
		</li>
	)
}

const styles = stylex.create({
	link: {
		color: colors.foreground,
		display: 'block',
		paddingBlock: '0.25rem',
		textDecorationLine: {
			default: 'none',
			':hover': 'underline',
		},
	},
	indentH2: { paddingLeft: '1ch' },
	indentH3: { paddingLeft: '2ch' },
	indentH4: { paddingLeft: '3ch' },
	indentH5: { paddingLeft: '4ch' },
	indentH6: { paddingLeft: '5ch' },
})
