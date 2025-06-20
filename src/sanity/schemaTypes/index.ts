import { type SchemaTypeDefinition } from 'sanity'

// documents
import page from './documents/page'

// objects
import metadata from './objects/metadata'

// modules
import accordionList from './modules/accordion-list'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		// documents
		page,

		// objects
		metadata,

		// modules
		accordionList,
	],
}
