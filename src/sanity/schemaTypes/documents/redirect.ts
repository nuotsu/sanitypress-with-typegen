import { defineField, defineType } from 'sanity'
import { PiFlowArrow } from 'react-icons/pi'
import resolveSlug from '@/sanity/lib/resolve-slug'

const regex = /^(\/|https?:\/\/)/

export default defineType({
	name: 'redirect',
	title: 'Redirect',
	icon: PiFlowArrow,
	type: 'document',
	fields: [
		defineField({
			name: 'source',
			description: 'Redirect from',
			placeholder: 'e.g. /old-path, /old-blog/:slug',
			type: 'string',
			validation: (Rule) => Rule.required().regex(regex),
		}),
		defineField({
			name: 'destination',
			description: 'Redirect to',
			type: 'link',
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'source',
			_type: 'destination.internal._type',
			internal: 'destination.internal.metadata.slug.current',
			params: 'destination.params',
			external: 'destination.external',
		},
		prepare: ({ title, _type, internal, params, external }) => ({
			title,
			subtitle:
				(external || internal) &&
				`to ${external || resolveSlug({ _type, internal, params })}`,
		}),
	},
})
