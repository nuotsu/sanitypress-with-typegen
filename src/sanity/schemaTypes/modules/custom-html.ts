import { defineField, defineType } from 'sanity'
import { VscCode } from 'react-icons/vsc'

export default defineType({
	name: 'custom-html',
	title: 'Custom HTML',
	icon: VscCode,
	type: 'object',
	groups: [
		{ name: 'html', title: 'HTML', default: true },
		{ name: 'css', title: 'CSS' },
		{ name: 'options' },
	],
	fields: [
		defineField({
			name: 'className',
			description: 'Optional class name to apply to the root HTML element',
			type: 'string',
			group: 'options',
		}),
		defineField({
			name: 'html',
			title: 'HTML',
			type: 'code',
			options: {
				language: 'html',
				languageAlternatives: [{ title: 'HTML', value: 'html' }],
			},
			group: 'html',
		}),
		defineField({
			name: 'css',
			title: 'CSS',
			type: 'code',
			options: {
				language: 'css',
				languageAlternatives: [{ title: 'CSS', value: 'css' }],
			},
			group: 'css',
		}),
	],
	preview: {
		select: {
			html: 'html.code',
			css: 'css.code',
		},
		prepare: ({ html, css }) => ({
			title: html || css,
			subtitle: html || !css ? 'Custom HTML' : 'Custom CSS',
		}),
	},
})
