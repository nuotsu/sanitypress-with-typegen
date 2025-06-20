import { Geist, Geist_Mono } from 'next/font/google'
import { SanityLive } from '@/sanity/lib/live'
import type { Metadata } from 'next'
import '@/app.css'

const fontSans = Geist({
	variable: '--font-sans',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'SanityPress with Typegen',
	description: 'SanityPress with Typegen',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className="bg-background text-foreground antialiased">
				{children}

				<SanityLive />
			</body>
		</html>
	)
}
