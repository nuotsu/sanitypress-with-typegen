import { VscFiles } from 'react-icons/vsc'
import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
	S.list()
		.title('Content')
		.items([
			S.divider().title('Pages'),
			S.documentTypeListItem('page').title('All pages').icon(VscFiles),
		])
