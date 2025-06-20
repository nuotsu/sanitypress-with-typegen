import { sanityFetchLive, sanityFetch } from '@/sanity/lib/live'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import ModulesResolver from '@/ui/modules'
import type { Metadata } from 'next'
import type { PAGE_QUERYResult } from '@/sanity/types'

export default async function Page({
	params,
}: {
	params: Promise<{ slug?: string[] }>
}) {
	const { slug } = await params
	const page = await getPage(slug)

	if (!page) notFound()
	return <ModulesResolver page={page} />
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
	const { slug } = await params
	const page = await getPage(slug)

	return {
		title: page?.metadata?.title,
		description: page?.metadata?.description,
		openGraph: {
			title: page?.metadata?.title,
			description: page?.metadata?.description,
		},
		robots: {
			index: page?.metadata?.noIndex ? false : undefined,
		},
	}
}

export async function generateStaticParams() {
	const { data } = (await sanityFetch({
		query: groq`
			*[
				_type == 'page'
				&& defined(metadata.slug.current)
				&& !(metadata.slug.current in ['not-found'])
			].metadata.slug.current
		`,
		perspective: 'published',
	})) as { data: string[] }

	return data.map((slug) => ({
		slug: slug === 'index' ? undefined : slug.split('/'),
	}))
}

async function getPage(slug?: string[]) {
	return await sanityFetchLive<PAGE_QUERYResult>({
		query: PAGE_QUERY,
		params: {
			slug: slug ? slug.join('/') : 'index',
		},
	})
}

const PAGE_QUERY = groq`
	*[_type == 'page' && metadata.slug.current == $slug][0]
`
