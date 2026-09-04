import { VisualEditing } from 'next-sanity/visual-editing'
import { Geist, Geist_Mono } from 'next/font/google'
import { draftMode } from 'next/headers'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Suspense } from 'react'
import { preconnect } from 'react-dom'
import * as stylex from '@stylexjs/stylex'
import { dev, ROUTES } from '@/lib/env'
import { SanityLive } from '@/sanity/lib/live'
import { shared } from '../../styles/shared'
import Announcement, { DynamicAnnouncement } from '@/ui/announcement'
import DraftModeBanner from '@/ui/draft-mode-banner'
import Footer, { DynamicFooter } from '@/ui/footer'
import Header, { DynamicHeader } from '@/ui/header'
import '@/app.css'

const fontSans = Geist({ subsets: ['latin'] })
const fontMono = Geist_Mono({ subsets: ['latin'] })

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	preconnect('https://cdn.sanity.io')

	const { isEnabled: isDraftMode } = await draftMode()
	const showDrafts = isDraftMode || dev

	return (
		<html
			lang="en"
			data-scroll-behavior="smooth"
			className={`${fontSans.className} ${fontMono.className}`}
		>
			<NuqsAdapter>
				<body {...stylex.props(shared.body)}>
					<a href="#main-content" {...stylex.props(shared.skipLink)}>
						Skip to main content
					</a>
					<a href={`/${ROUTES.a11y}`} {...stylex.props(shared.skipLink)}>
						Accessibility statement
					</a>

					{showDrafts ? (
						<Suspense>
							<DynamicAnnouncement />
						</Suspense>
					) : (
						<Announcement perspective="published" stega={false} />
					)}

					{showDrafts ? (
						<Suspense fallback={<div {...stylex.props(styles.fallback)} />}>
							<DynamicHeader />
						</Suspense>
					) : (
						<Header perspective="published" stega={false} />
					)}

					<main id="main-content" tabIndex={-1}>
						{children}
					</main>

					{showDrafts ? (
						<Suspense fallback={<div {...stylex.props(styles.fallback)} />}>
							<DynamicFooter />
						</Suspense>
					) : (
						<Footer perspective="published" stega={false} />
					)}

					<SanityLive includeDrafts={showDrafts} />

					{isDraftMode && (
						<>
							<VisualEditing />
							<DraftModeBanner />
						</>
					)}
				</body>
			</NuqsAdapter>
		</html>
	)
}

const styles = stylex.create({
	fallback: {
		minHeight: 'var(--header-height, 4rem)',
	},
})
