import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'
import { dev } from '@/lib/env'
import ModulesResolver from '@/modules'
import {
	getDynamicFetchOptions,
	sanityFetch,
	sanityFetchMetadata,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import { MODULES_QUERY } from '@/sanity/lib/queries'
import type { NOT_FOUND_QUERY_RESULT } from '@/sanity/types'
import { shared } from '../../styles/shared'
import Loading from '@/ui/loading'

export default async function NotFound() {
	const { isEnabled: isDraftMode } = await draftMode()
	const showDrafts = isDraftMode || dev

	if (showDrafts) {
		return (
			<Suspense fallback={<Loading xstyle={shared.section} />}>
				<DynamicNotFound />
			</Suspense>
		)
	}

	return <CachedNotFound perspective="published" stega={false} />
}

async function DynamicNotFound() {
	const { perspective, stega } = await getDynamicFetchOptions()
	return <CachedNotFound perspective={perspective} stega={stega} />
}

async function CachedNotFound({ perspective, stega }: DynamicFetchOptions) {
	'use cache'
	const page = await getPage({ perspective, stega })
	return <ModulesResolver page={page} perspective={perspective} stega={stega} />
}

export async function generateMetadata(): Promise<Metadata> {
	const { perspective } = await getDynamicFetchOptions()
	const page = await getPageMetadata({ perspective })

	return {
		title: page?.metadata?.title,
		description: page?.metadata?.description,
		openGraph: {
			type: 'website',
			title: page?.metadata?.title,
			description: page?.metadata?.description,
		},
		robots: {
			index: page?.metadata?.noIndex ? false : undefined,
		},
	}
}

async function getPage({ perspective, stega }: DynamicFetchOptions) {
	'use cache'
	const { data } = await sanityFetch({
		query: NOT_FOUND_QUERY,
		perspective,
		stega,
	})
	return data as NOT_FOUND_QUERY_RESULT
}

async function getPageMetadata({
	perspective,
}: Pick<DynamicFetchOptions, 'perspective'>) {
	return (await sanityFetchMetadata({
		query: NOT_FOUND_QUERY,
		perspective,
	})) as NOT_FOUND_QUERY_RESULT
}

const NOT_FOUND_QUERY = groq`
	*[_type == 'page' && metadata.slug.current == '404'][0]{
		...,
		modules[]{ ${MODULES_QUERY} }
	}
`
