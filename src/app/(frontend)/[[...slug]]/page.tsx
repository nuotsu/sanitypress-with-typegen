import pkg from '@@/package.json'
import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { dev, ROUTES } from '@/lib/env'
import { resolveOgImage } from '@/lib/og'
import ModulesResolver from '@/modules'
import {
	getDynamicFetchOptions,
	sanityFetch,
	sanityFetchMetadata,
	sanityFetchStaticParams,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import {
	getSite,
	GLOBAL_MODULE_EXCLUDE_QUERY,
	GLOBAL_MODULE_PATH_QUERY,
	MODULES_QUERY,
} from '@/sanity/lib/queries'
import type { PAGE_QUERY_RESULT } from '@/sanity/types'
import { shared } from '../../../styles/shared'
import Loading from '@/ui/loading'

type Props = PageProps<'/[[...slug]]'>

export default async function Page({ params }: Props) {
	const { isEnabled: isDraftMode } = await draftMode()
	const showDrafts = isDraftMode || dev

	if (showDrafts) {
		return (
			<Suspense fallback={<Loading xstyle={shared.section} />}>
				<DynamicPage params={params} />
			</Suspense>
		)
	}

	const { slug } = await params
	return <CachedPage slug={slug} perspective="published" stega={false} />
}

async function DynamicPage({ params }: Pick<Props, 'params'>) {
	const [{ slug }, { perspective, stega }] = await Promise.all([
		params,
		getDynamicFetchOptions(),
	])

	return <CachedPage slug={slug} perspective={perspective} stega={stega} />
}

async function CachedPage({
	slug,
	perspective,
	stega,
}: { slug?: string[] } & DynamicFetchOptions) {
	'use cache'
	const page = await getPage({ slug, perspective, stega })
	if (!page) notFound()

	return <ModulesResolver page={page} perspective={perspective} stega={stega} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const [{ slug }, { perspective }] = await Promise.all([
		params,
		getDynamicFetchOptions(),
	])
	const [page, site] = await Promise.all([
		getPageMetadata({ slug, perspective }),
		getSite({ perspective, stega: false }),
	])
	const { title, description, image, noIndex } = page?.metadata ?? {}

	return {
		title,
		description,
		openGraph: {
			type: 'website',
			title,
			description,
			url: [process.env.NEXT_PUBLIC_BASE_URL, slug?.join('/')]
				.filter(Boolean)
				.join('/'),
			images: [
				resolveOgImage({
					image,
					siteOgImage: site?.ogimage,
					slug: slug?.join('/') || 'index',
				}),
			],
		},
		robots: {
			index: noIndex ? false : undefined,
		},
		alternates: {
			types: {
				'application/rss+xml': `/${ROUTES.blog}/rss.xml`,
				// Only advertise the .md route when a curated markdown copy exists
				...(page?.markdown?.code && {
					'text/markdown': `/${slug?.length ? slug.join('/') : 'index'}.md`,
				}),
			},
		},
		generator: `SanityPress v${pkg.version}`,
	}
}

export async function generateStaticParams() {
	const slugs = (await sanityFetchStaticParams({
		query: groq`
			*[
				_type == 'page'
				&& defined(metadata.slug.current)
				&& !(metadata.slug.current in ['404'])
			].metadata.slug.current
		`,
	})) as string[]

	return slugs.map((slug) => ({
		slug: slug === 'index' ? undefined : slug.split('/'),
	}))
}

async function getPage({
	slug,
	perspective,
	stega,
}: { slug?: string[] } & DynamicFetchOptions) {
	'use cache'
	const { data } = await sanityFetch({
		query: PAGE_QUERY,
		params: { slug: slug ? slug.join('/') : 'index' },
		perspective,
		stega,
	})
	return data as PAGE_QUERY_RESULT
}

async function getPageMetadata({
	slug,
	perspective,
}: { slug?: string[] } & Pick<DynamicFetchOptions, 'perspective'>) {
	return (await sanityFetchMetadata({
		query: PAGE_QUERY,
		params: { slug: slug ? slug.join('/') : 'index' },
		perspective,
	})) as PAGE_QUERY_RESULT
}

const PAGE_QUERY = groq`
	*[_type == 'page' && metadata.slug.current == $slug][0]{
		...,
		'modules': (
			// global moddules (before)
			*[_type == 'global-module' && path == '*' && ${GLOBAL_MODULE_EXCLUDE_QUERY}].before[]{ ${MODULES_QUERY} }
			// path modules (before)
			+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].before[]{ ${MODULES_QUERY} }
			// page modules
			+ modules[]{ ${MODULES_QUERY} }
			// path modules (after)
			+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].after[]{ ${MODULES_QUERY} }
			// global moddules (after)
			+ *[_type == 'global-module' && path == '*' && ${GLOBAL_MODULE_EXCLUDE_QUERY}].after[]{ ${MODULES_QUERY} }
		)
	}
`
