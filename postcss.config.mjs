import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

const config = {
	plugins: {
		'@stylexswc/postcss-plugin': {
			include: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
			rsOptions: {
				dev: process.env.NODE_ENV !== 'production',
				runtimeInjection: false,
				treeshakeCompensation: true,
				aliases: {
					'@/*': [path.join(rootDir, 'src/*')],
				},
				unstable_moduleResolution: {
					type: 'commonJS',
					rootDir,
				},
			},
			useCSSLayers: true,
		},
		autoprefixer: {},
	},
}

export default config
