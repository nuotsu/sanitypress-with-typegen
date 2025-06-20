import { type SchemaTypeDefinition } from 'sanity'

// documents
import page from './documents/page'
import redirect from './documents/redirect'

// objects
import link from './objects/link'
import metadata from './objects/metadata'

// modules
import accordionList from './modules/accordion-list'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		// documents
		page,
		redirect,

		// objects
		link,
		metadata,

		// modules
		accordionList,
	],
}
