import * as stylex from '@stylexjs/stylex'
import type { ComponentProps } from 'react'
import { Module } from '@/modules'
import type { Breadcrumbs, Page } from '@/sanity/types'
import { shared } from '../../styles/shared'
import SanityLink, { type SanityLinkType } from '@/ui/sanity-link'

export default function ({
	structuredDataOnly,
	crumbs,
	currentPage,
	...props
}: Breadcrumbs & { currentPage?: Page }) {
	return (
		<Module
			as="nav"
			{...stylex.props(
				shared.section,
				styles.root,
				structuredDataOnly && shared.srOnly,
			)}
			{...props}
		>
			<ol
				{...stylex.props(styles.list)}
				itemScope
				itemType="https://schema.org/BreadcrumbList"
			>
				{crumbs?.map((crumb, index) => (
					<Crumb
						link={crumb as SanityLinkType}
						position={index + 1}
						key={`${crumb._key}-${index}`}
					/>
				))}

				<Crumb position={(crumbs?.length ?? 0) + 1}>{currentPage?.title}</Crumb>
			</ol>
		</Module>
	)
}

function Crumb({
	link,
	position,
	children,
}: {
	position: number
	link?: Partial<ComponentProps<typeof SanityLink>['link']>
} & ComponentProps<'li'>) {
	const Content = (
		<>
			<span itemProp="name">
				{children || link?.label || link?.internal?.title}
			</span>
			<meta itemProp="position" content={position.toString()} />
		</>
	)

	const linkSx = stylex.props(shared.link)

	return (
		<li
			{...stylex.props(styles.crumb)}
			itemProp="itemListElement"
			itemScope
			itemType="https://schema.org/ListItem"
		>
			{link ? (
				<SanityLink
					link={link as SanityLinkType}
					{...linkSx}
					itemProp="item"
				>
					{Content}
				</SanityLink>
			) : (
				Content
			)}
		</li>
	)
}

const styles = stylex.create({
	root: {
		paddingBlock: '1rem',
		fontSize: '0.875rem',
	},
	list: {
		display: 'flex',
		alignItems: 'center',
		columnGap: '0.5rem',
		rowGap: '0.25rem',
		overflowWrap: 'anywhere',
	},
	crumb: {
		display: '-webkit-box',
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: 1,
		overflow: 'hidden',
		':first-child': {
			flexShrink: 0,
		},
		':not(:first-child)::before': {
			content: '"/"',
			marginRight: '0.5rem',
		},
	},
})
