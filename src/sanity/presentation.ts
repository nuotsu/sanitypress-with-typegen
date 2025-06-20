import { presentationTool } from 'sanity/presentation'

export default presentationTool({
	previewUrl: {
		previewMode: {
			enable: '/api/draft-mode/enable',
		},
	},
})
