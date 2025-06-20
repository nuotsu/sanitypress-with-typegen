import { structureTool } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export default structureTool({
	structure: (S) =>
		S.list()
			.title('Content')
			.items([
				S.divider().title('Pages'),
				S.documentTypeListItem('page').title('All pages'),

				S.divider().title('Navigation'),
				S.documentTypeListItem('redirect').title('Redirects'),
			]),
})
