import type { MetadataRoute } from 'next'
import { dev, ROUTES } from '@/lib/env'

export default function robots(): MetadataRoute.Robots {
	if (dev) {
		return { rules: { userAgent: '*', disallow: '/' } }
	}

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [`/${ROUTES.studio}/`, '/api/'],
		},
		sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
	}
}
