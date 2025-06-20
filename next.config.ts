import { client } from './src/sanity/lib/client'
import { groq } from 'next-sanity'
import { BLOG_DIR } from './src/lib/env'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	experimental: {
		viewTransition: true,
	},

	async redirects() {
		return await client.fetch(groq`*[_type == 'redirect']{
			source,
			'destination': select(
				destination.type == 'internal' =>
					select(
						destination.internal->._type == 'blog.post' => '/${BLOG_DIR}/',
						'/'
					) + destination.internal->.metadata.slug.current,
				destination.external
			),
			'permanent': true
		}`)
	},
}

export default nextConfig
