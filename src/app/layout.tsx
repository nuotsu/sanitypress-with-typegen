import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import '@/app.css'

const fontSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const fontMono = Geist_Mono({
	variable: '--font-geist-mono',
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
			</body>
		</html>
	)
}
