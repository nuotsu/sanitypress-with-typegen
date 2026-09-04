import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'
import { groq } from 'next-sanity'
import { sanity } from 'next-sanity/live/cache-life'
import withStylexTurbopack from '@stylexswc/nextjs-plugin/turbopack'
import { ROUTES } from './src/lib/env'
import { client } from './src/sanity/lib/client'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
	reactCompiler: true,

	cacheComponents: true,
	cacheLife: { default: sanity },

	images: {
		localPatterns: [{ pathname: '/api/og' }],
		remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
	},

	async rewrites() {
		return [
			{ source: '/:slug.md', destination: '/api/md/:slug' },
			{ source: '/:path*/:slug.md', destination: '/api/md/:path*/:slug' },
		]
	},

	async redirects() {
		const sanityRedirects = await client.fetch(
			groq`*[_type == 'redirect']{
				source,
				'destination': select(
					destination.type == 'internal' =>
						select(
							destination.internal->._type == 'blog.post' => $blogDir,
							''
						) + select(
							destination.internal->.metadata.slug.current == 'index' => '/',
							'/' + destination.internal->.metadata.slug.current
						),
					destination.external
				),
				'permanent': true
			}`,
			{ blogDir: `/${ROUTES.blog}/` },
		)

		return [
			{ source: '/index', destination: '/', permanent: true },
			...sanityRedirects,
		]
	},
}

export default withStylexTurbopack({
	rsOptions: {
		dev: process.env.NODE_ENV !== 'production',
		runtimeInjection: false,
		treeshakeCompensation: true,
		aliases: {
			'@/*': [path.join(rootDir, 'src/*')],
		},
		unstable_moduleResolution: {
			type: 'commonJS',
			rootDir,
		},
	},
	stylexImports: ['@stylexjs/stylex'],
})(nextConfig)
