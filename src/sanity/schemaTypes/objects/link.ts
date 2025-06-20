import { defineField, defineType } from 'sanity'
import { VscLink } from 'react-icons/vsc'
import resolveSlug from '@/sanity/lib/resolve-slug'

export default defineType({
	name: 'link',
	title: 'Link',
	icon: VscLink,
	type: 'object',
	options: {
		columns: 2,
	},
	fields: [
		defineField({
			name: 'label',
			type: 'string',
		}),
		defineField({
			name: 'type',
			type: 'string',
			options: {
				layout: 'radio',
				list: [
					{ title: 'internal', value: 'internal' },
					{ title: 'external', value: 'external' },
				],
			},
		}),
		defineField({
			name: 'internal',
			type: 'reference',
			to: [{ type: 'page' } /* { type: 'blog.post' } */],
			hidden: ({ parent }) => parent?.type !== 'internal',
		}),
		defineField({
			name: 'external',
			placeholder: 'https://example.com',
			type: 'url',
			validation: (Rule) =>
				Rule.uri({
					scheme: ['http', 'https', 'mailto', 'tel'],
					allowRelative: true,
				}),
			hidden: ({ parent }) => parent?.type !== 'external',
		}),
		defineField({
			name: 'params',
			title: 'URL parameters',
			placeholder: 'e.g. #jump-link or ?foo=bar',
			type: 'string',
			hidden: ({ parent }) => parent?.type !== 'internal',
		}),
	],
	preview: {
		select: {
			label: 'label',
			_type: 'internal._type',
			title: 'internal.title',
			internal: 'internal.metadata.slug.current',
			params: 'params',
			external: 'external',
		},
		prepare: ({ label, title, _type, internal, params, external }) => ({
			title: label || title,
			subtitle: resolveSlug({ _type, internal, params, external }),
		}),
	},
})
