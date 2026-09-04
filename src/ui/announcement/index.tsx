import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import { Module } from '@/modules'
import {
	getDynamicFetchOptions,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import { getSite } from '@/sanity/lib/queries'
import type { Cta } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors } from '../../styles/tokens.stylex'
import CTAList from '@/ui/cta-list'
import ElementHeight from '@/ui/element-height'

export async function DynamicAnnouncement() {
	const { perspective, stega } = await getDynamicFetchOptions()
	return <CachedAnnouncement perspective={perspective} stega={stega} />
}

export default async function Announcement(props: DynamicFetchOptions) {
	return <CachedAnnouncement {...props} />
}

async function CachedAnnouncement({ perspective, stega }: DynamicFetchOptions) {
	'use cache'
	const site = await getSite({ perspective, stega })
	const announcement = site?.announcement

	if (!announcement) return null

	const proseSx = stylex.props(shared.prose)

	return (
		<Module
			as={ElementHeightAside}
			_type={announcement._type}
			_key={announcement._id}
			attributes={announcement.attributes}
			{...stylex.props(styles.root)}
		>
			<div {...stylex.props(shared.section, styles.inner)}>
				{announcement.content && (
					<div
						{...proseSx}
						className={[proseSx.className, 'prose'].filter(Boolean).join(' ')}
					>
						<PortableText value={announcement.content} />
					</div>
				)}

				<CTAList ctas={announcement.ctas as Cta[]} />
			</div>
		</Module>
	)
}

function ElementHeightAside(props: React.ComponentProps<typeof ElementHeight>) {
	return <ElementHeight as="aside" cssVar="--announcement-height" {...props} />
}

const styles = stylex.create({
	root: {
		backgroundColor: colors.foreground,
		color: colors.background,
	},
	inner: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		columnGap: '1rem',
		rowGap: '0.5rem',
		paddingBlock: '0.5rem',
		textAlign: 'center',
		fontSize: '0.875rem',
	},
})
