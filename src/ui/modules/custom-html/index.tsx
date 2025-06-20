import { stegaClean } from 'next-sanity'
import CSS from './CSS'
import WithScript from './WithScript'
import type { CustomHtml } from '@/sanity/types'

export default function CustomHTML({ className, html, css }: CustomHtml) {
	if (!html?.code && !css?.code) return null

	return (
		<>
			<CSS code={stegaClean(css?.code)} />

			{html?.code &&
				(html.code.includes('<script') ? (
					<WithScript code={html.code} className={stegaClean(className)} />
				) : (
					<section
						className={stegaClean(className)}
						dangerouslySetInnerHTML={{ __html: stegaClean(html.code) }}
					/>
				))}
		</>
	)
}
