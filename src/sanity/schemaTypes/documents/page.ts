import { defineField, defineType } from 'sanity'
import {
	VscHome,
	VscQuestion,
	VscSearch,
	VscEdit,
	VscEyeClosed,
} from 'react-icons/vsc'

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	groups: [{ name: 'content', default: true }, { name: 'metadata' }],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'content',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'modules',
			type: 'array',
			group: 'content',
			of: [
				{ type: 'accordion-list' },
				{ type: 'custom-html' },
				{ type: 'prose' },
			],
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
			group: 'metadata',
		}),
	],
	preview: {
		select: {
			title: 'title',
			slug: 'metadata.slug.current',
			noIndex: 'metadata.noIndex',
		},
		prepare: ({ title, slug, noIndex }) => ({
			title,
			subtitle: `/${slug === 'index' ? '' : slug}`,
			media:
				(slug === 'index' && VscHome) ||
				(slug === '404' && VscQuestion) ||
				(slug === 'search' && VscSearch) ||
				(slug === 'blog' && VscEdit) ||
				(noIndex && VscEyeClosed),
		}),
	},
})
