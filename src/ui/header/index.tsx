import * as stylex from '@stylexjs/stylex'
import { PortableText } from 'next-sanity'
import CustomHTML from '@/modules/custom-html'
import {
	getDynamicFetchOptions,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import { getSite } from '@/sanity/lib/queries'
import type { Cta } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import CTAList from '@/ui/cta-list'
import Logo from '@/ui/logo'
import css from './header.module.css'
import MobileToggle from './mobile-toggle'
import Navigation from './navigation'
import Wrapper from './wrapper'

export async function DynamicHeader() {
	const { perspective, stega } = await getDynamicFetchOptions()
	return <CachedHeader perspective={perspective} stega={stega} />
}

export default async function Header(props: DynamicFetchOptions) {
	return <CachedHeader {...props} />
}

async function CachedHeader({ perspective, stega }: DynamicFetchOptions) {
	'use cache'
	const site = await getSite({ perspective, stega })
	const blurb = site?.header?.blurb

	const wrapperSx = stylex.props(styles.wrapper)
	const rootSx = stylex.props(shared.section, styles.root)
	const topSx = stylex.props(styles.top)
	const menuSx = stylex.props(styles.menu)
	const menuInnerSx = stylex.props(styles.menuInner)
	const ctasSx = stylex.props(styles.ctas)
	const blurbSx = stylex.props(shared.prose)
	return (
		<Wrapper
			{...wrapperSx}
			className={[
				wrapperSx.className,
				'layout-header',
				css.wrapperOpen,
				css.wrapperNavOpen,
			]
				.filter(Boolean)
				.join(' ')}
		>
			<div
				{...rootSx}
				className={[rootSx.className, css.root].filter(Boolean).join(' ')}
			>
				<div
					{...topSx}
					className={[topSx.className, css.topOpen].filter(Boolean).join(' ')}
				>
					<Logo
						xstyle={styles.logo}
						perspective={perspective}
						stega={stega}
					/>
					<MobileToggle />
				</div>

				<div
					id="mobile-menu"
					{...menuSx}
					className={[menuSx.className, css.menu, css.menuOpen]
						.filter(Boolean)
						.join(' ')}
				>
					<div {...menuInnerSx}>
						<Navigation perspective={perspective} stega={stega} />

						<div {...ctasSx}>
							{blurb && (
								<div
									{...blurbSx}
									className={[blurbSx.className, 'prose']
										.filter(Boolean)
										.join(' ')}
								>
									<PortableText
										value={blurb}
										components={{
											types: {
												'custom-html': ({ value }) => (
													<CustomHTML {...value} />
												),
											},
										}}
									/>
								</div>
							)}

							<CTAList
								ctas={site?.ctas as Cta[]}
								className={css.ctasFull}
							/>
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}

const styles = stylex.create({
	wrapper: {
		position: 'sticky',
		top: 0,
		zIndex: 10,
		backgroundColor: `color-mix(in oklab, ${colors.background} 80%, transparent)`,
		backdropFilter: 'blur(2px)',
		transitionProperty: 'color, background-color, border-color, box-shadow',
		transitionDuration: '150ms',
		transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
	},
	root: {
		display: 'grid',
		alignItems: 'center',
		columnGap: '1rem',
		paddingBlock: 0,
		maxHeight: {
			default: null,
			[mq.maxMd]: '100svh',
		},
		overflowY: {
			default: null,
			[mq.maxMd]: 'auto',
		},
	},
	top: {
		position: 'sticky',
		top: 0,
		zIndex: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '1rem',
		paddingBlock: '1rem',
		gridArea: 'top',
	},
	logo: {
		maxWidth: 'max-content',
		flexGrow: 1,
		marginBlock: {
			default: null,
			':has(img)': '-0.5rem',
		},
		height: {
			default: null,
			':has(img)': '2lh',
		},
	},
	menu: {
		gridArea: 'menu',
		display: {
			default: null,
			[mq.md]: 'contents',
		},
	},
	menuInner: {
		display: {
			default: null,
			[mq.md]: 'contents',
		},
	},
	ctas: {
		display: 'flex',
		alignItems: 'center',
		gap: '.5em 1em',
		gridArea: 'ctas',
		flexDirection: {
			default: null,
			[mq.maxMd]: 'column',
		},
	},
})
