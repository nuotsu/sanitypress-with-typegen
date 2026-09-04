import * as stylex from '@stylexjs/stylex'
import { PortableText, stegaClean } from 'next-sanity'
import { Suspense } from 'react'
import { Module } from '@/modules'
import type { SearchModule } from '@/sanity/types'
import { shared } from '../../styles/shared'
import Eyebrow from '@/ui/eyebrow'
import Loading from '@/ui/loading'
import SearchForm from './search-form'

export default function ({
	eyebrow,
	intro = [],
	scope,
	...props
}: SearchModule) {
	const introSx = stylex.props(shared.prose, styles.intro)

	return (
		<Module {...stylex.props(shared.section)} {...props}>
			<div {...stylex.props(styles.inner)}>
				{(eyebrow || intro) && (
					<header
						{...introSx}
						className={[introSx.className, 'prose'].filter(Boolean).join(' ')}
					>
						<Eyebrow value={eyebrow} />
						<PortableText value={intro ?? []} />
					</header>
				)}

				<Suspense fallback={<Loading>Loading search...</Loading>}>
					<SearchForm scope={stegaClean(scope)} />
				</Suspense>
			</div>
		</Module>
	)
}

const styles = stylex.create({
	inner: {
		marginInline: 'auto',
		maxWidth: '42rem',
		display: 'grid',
		rowGap: '2rem',
	},
	intro: {
		textAlign: 'center',
	},
})
