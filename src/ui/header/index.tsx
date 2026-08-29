import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'
import CustomHTML from '@/modules/custom-html'
import {
	getDynamicFetchOptions,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import { getSite } from '@/sanity/lib/queries'
import type { Cta } from '@/sanity/types'
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

	return (
		<Wrapper className="layout-header bg-background/80 max-md:header-open:bg-background max-md:header-open:shadow-xl md:has-[nav>details:open]:bg-background sticky top-0 z-10 backdrop-blur-[2px] transition-colors">
			<div
				className={cn(
					css.root,
					'section grid items-center gap-x-4 py-0 max-md:max-h-svh max-md:overflow-y-auto',
				)}
			>
				<div className="max-md:header-open:bg-background sticky top-0 z-1 flex items-center justify-between gap-4 py-4 [grid-area:top]">
					<Logo
						className="max-w-max grow has-[img]:-my-2 has-[img]:h-[2lh]"
						perspective={perspective}
						stega={stega}
					/>
					<MobileToggle />
				</div>

				<div
					id="mobile-menu"
					className={cn(
						css.menu,
						'max-md:header-open:pb-4 [grid-area:menu] md:contents',
					)}
				>
					<div className="md:contents">
						<Navigation perspective={perspective} stega={stega} />

						<div className="flex items-center gap-[.5em_1em] [grid-area:ctas] max-md:flex-col">
							{blurb && (
								<div className="prose">
									<PortableText
										value={blurb}
										components={{
											types: {
												'custom-html': ({ value }) => <CustomHTML {...value} />,
											},
										}}
									/>
								</div>
							)}

							<CTAList
								ctas={site?.ctas as Cta[]}
								className="max-sm:w-full max-sm:*:w-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}
