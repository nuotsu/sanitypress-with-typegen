import { sanityFetchLive } from '@/sanity/lib/live'
import { groq } from 'next-sanity'
import ModulesResolver from '@/ui/modules'
import type { PAGE_QUERYResult } from '@/sanity/types'

export default async function Page({
	params,
}: {
	params: Promise<{ slug?: string[] }>
}) {
	const { slug } = await params

	const page = await sanityFetchLive<PAGE_QUERYResult>({
		query: PAGE_QUERY,
		params: {
			slug: slug ? slug.join('/') : 'index',
		},
	})

	return <ModulesResolver page={page} />
}

const PAGE_QUERY = groq`
	*[_type == 'page' && metadata.slug.current == $slug][0]
`
