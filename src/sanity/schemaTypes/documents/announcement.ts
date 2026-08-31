import { defineField, defineType } from 'sanity'
import { BellIcon } from '@sanity/icons/Bell'
import { getBlockText } from '@/lib/utils'

export default defineType({
	name: 'announcement',
	title: 'Announcement',
	type: 'document',
	icon: BellIcon,
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'attributes',
			type: 'module-attributes',
			group: 'options',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }] }],
			group: 'content',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		}),
	],
	preview: {
		select: {
			content: 'content',
			ctaLabel: 'ctas.0.link.label',
			ctaPageTitle: 'ctas.0.link.internal.title',
		},
		prepare: ({ content, ctaLabel, ctaPageTitle }) => ({
			title: getBlockText(content),
			subtitle: ctaLabel || ctaPageTitle,
		}),
	},
})
