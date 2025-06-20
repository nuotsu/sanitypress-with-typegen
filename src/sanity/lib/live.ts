// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from 'next-sanity'
import { client } from './client'
import { token } from './token'
import { dev } from '@/lib/env'
import { draftMode } from 'next/headers'

export const { sanityFetch, SanityLive } = defineLive({
	client: client.withConfig({
		// Live content is currently only available on the experimental API
		// https://www.sanity.io/docs/api-versioning
		apiVersion: 'vX',
	}),
	serverToken: token,
	browserToken: token,
})

export async function sanityFetchLive<T>(
	args: Parameters<typeof sanityFetch>[0],
) {
	const preview = dev || (await draftMode()).isEnabled

	const { data } = await sanityFetch({
		...args,
		perspective: preview ? 'drafts' : 'published',
	})

	return data as T
}
