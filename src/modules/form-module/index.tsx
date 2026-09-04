import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import { Module } from '@/modules'
import type { Form, FormModule } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { mq } from '../../styles/breakpoints.stylex'
import Eyebrow from '@/ui/eyebrow'
import Resolver from './resolver'

export default function ({ eyebrow, intro, form, ...props }: FormModule) {
	const introSx = stylex.props(shared.prose, styles.intro)

	return (
		<Module {...props}>
			<div {...stylex.props(shared.section, styles.grid)}>
				{intro && (
					<header
						{...introSx}
						className={[introSx.className, 'prose'].filter(Boolean).join(' ')}
						style={{ ['--offset' as string]: '1rem' }}
					>
						<Eyebrow value={eyebrow} />
						<PortableText value={intro} />
					</header>
				)}

				<Resolver form={form as unknown as Form} />
			</div>
		</Module>
	)
}

const styles = stylex.create({
	grid: {
		display: 'grid',
		alignItems: 'start',
		gap: '2rem',
		gridTemplateColumns: {
			default: '1fr',
			[mq.md]: '1fr 1fr',
		},
	},
	intro: {
		position: {
			default: null,
			[mq.md]: 'sticky',
		},
		top: {
			default: null,
			[mq.md]: 'calc(var(--header-height) + var(--offset, 0px))',
		},
	},
})
