import { defineArrayMember, defineField, defineType } from 'sanity'
import { getBlockText } from 'sanitypress-utils'
import { TfiLayoutAccordionMerged } from 'react-icons/tfi'

export default defineType({
	name: 'accordion-list',
	title: 'Accordion list',
	type: 'object',
	icon: TfiLayoutAccordionMerged,
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'accordions',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'accordion',
					type: 'object',
					fields: [
						defineField({
							name: 'summary',
							type: 'string',
						}),
						defineField({
							name: 'content',
							type: 'array',
							of: [{ type: 'block' }],
						}),
						defineField({
							name: 'open',
							title: 'Expanded by default',
							type: 'boolean',
							initialValue: false,
						}),
					],
					preview: {
						select: {
							title: 'summary',
							subtitle: 'content',
						},
					},
				}),
			],
			group: 'content',
		}),
		defineField({
			name: 'connect',
			title: 'Connect accordions',
			description: 'Allows only one accordion to be expanded at a time',
			type: 'boolean',
			initialValue: false,
			group: 'options',
		}),
		defineField({
			name: 'enableSchema',
			title: 'Enable schema.org markup',
			type: 'boolean',
			initialValue: false,
			group: 'options',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
		},
		prepare: ({ intro }) => ({
			title: getBlockText(intro),
			subtitle: 'Accordion list',
		}),
	},
})
