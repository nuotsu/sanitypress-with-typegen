'use client'

import { ComponentProps, useEffect, useRef, useState } from 'react'
import type { CustomHtml } from '@/sanity/types'

/**
 * @description If the code includes a <script> tag, ensure the script is re-run on each render
 */
export default function WithScript({
	code,
	className,
}: Partial<CustomHtml['html']> & ComponentProps<'section'>) {
	if (!code) return null

	const ref = useRef<HTMLElement>(null)
	const [firstRender, setFirstRender] = useState(true)

	useEffect(() => {
		if (firstRender) {
			setFirstRender(false)
		} else {
			const parsed = document.createRange().createContextualFragment(code)
			ref.current?.appendChild(parsed)
		}
	}, [ref.current, code])

	return <section ref={ref} className={className} />
}
