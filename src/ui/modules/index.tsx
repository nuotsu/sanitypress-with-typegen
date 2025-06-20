import AccordionList from './accordion-list'

import { createDataAttribute } from 'next-sanity'
import type { Page, PAGE_QUERYResult } from '@/sanity/types'

const MODULES_MAP = {
	'accordion-list': AccordionList,
} as const

export default function ModulesResolver({ page }: { page: PAGE_QUERYResult }) {
	return (
		<>
			{page?.modules?.map((module) => {
				if (!module) return null

				const Module = MODULES_MAP[module._type as keyof typeof MODULES_MAP]

				return (
					<Module
						{...module}
						data-sanity={createDataAttribute({
							id: page._id,
							type: page._type,
							path: `page[_key == "${module._key}"]`,
						})}
						key={module._key}
					/>
				)
			})}
		</>
	)
}
