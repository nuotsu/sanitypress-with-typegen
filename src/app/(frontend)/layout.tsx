import { Geist } from 'next/font/google'
import { unstable_ViewTransition as ViewTransition } from 'react'
import { SanityLive } from '@/sanity/lib/live'
import type { Metadata } from 'next'
import '@/app.css'

const fontSans = Geist({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	icons: 'https://fav.farm/♣️',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<ViewTransition>
				<body className="bg-background text-foreground antialiased">
					{children}

					<SanityLive />
				</body>
			</ViewTransition>
		</html>
	)
}
