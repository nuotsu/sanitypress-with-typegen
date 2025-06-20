/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type Prose = {
	_type: 'prose'
	content?: Array<{
		children?: Array<{
			marks?: Array<string>
			text?: string
			_type: 'span'
			_key: string
		}>
		style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
		listItem?: 'bullet' | 'number'
		markDefs?: Array<{
			href?: string
			_type: 'link'
			_key: string
		}>
		level?: number
		_type: 'block'
		_key: string
	}>
	tableOfContents?: 'none' | 'left' | 'right'
}

export type CustomHtml = {
	_type: 'custom-html'
	className?: string
	html?: Code
	css?: Code
}

export type AccordionList = {
	_type: 'accordion-list'
	intro?: Array<{
		children?: Array<{
			marks?: Array<string>
			text?: string
			_type: 'span'
			_key: string
		}>
		style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
		listItem?: 'bullet' | 'number'
		markDefs?: Array<{
			href?: string
			_type: 'link'
			_key: string
		}>
		level?: number
		_type: 'block'
		_key: string
	}>
	accordions?: Array<{
		summary?: string
		content?: Array<{
			children?: Array<{
				marks?: Array<string>
				text?: string
				_type: 'span'
				_key: string
			}>
			style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
			listItem?: 'bullet' | 'number'
			markDefs?: Array<{
				href?: string
				_type: 'link'
				_key: string
			}>
			level?: number
			_type: 'block'
			_key: string
		}>
		open?: boolean
		_type: 'accordion'
		_key: string
	}>
	connect?: boolean
	enableSchema?: boolean
}

export type Redirect = {
	_id: string
	_type: 'redirect'
	_createdAt: string
	_updatedAt: string
	_rev: string
	source?: string
	destination?: Link
}

export type Link = {
	_type: 'link'
	label?: string
	type?: 'internal' | 'external'
	internal?: {
		_ref: string
		_type: 'reference'
		_weak?: boolean
		[internalGroqTypeReferenceTo]?: 'page'
	}
	external?: string
	params?: string
}

export type Page = {
	_id: string
	_type: 'page'
	_createdAt: string
	_updatedAt: string
	_rev: string
	title?: string
	modules?: Array<
		| ({
				_key: string
		  } & AccordionList)
		| ({
				_key: string
		  } & CustomHtml)
		| ({
				_key: string
		  } & Prose)
	>
	metadata?: Metadata
}

export type Metadata = {
	_type: 'metadata'
	title?: string
	description?: string
	slug?: Slug
	noIndex?: boolean
}

export type Code = {
	_type: 'code'
	language?: string
	filename?: string
	code?: string
	highlightedLines?: Array<number>
}

export type SanityImagePaletteSwatch = {
	_type: 'sanity.imagePaletteSwatch'
	background?: string
	foreground?: string
	population?: number
	title?: string
}

export type SanityImagePalette = {
	_type: 'sanity.imagePalette'
	darkMuted?: SanityImagePaletteSwatch
	lightVibrant?: SanityImagePaletteSwatch
	darkVibrant?: SanityImagePaletteSwatch
	vibrant?: SanityImagePaletteSwatch
	dominant?: SanityImagePaletteSwatch
	lightMuted?: SanityImagePaletteSwatch
	muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
	_type: 'sanity.imageDimensions'
	height?: number
	width?: number
	aspectRatio?: number
}

export type SanityImageHotspot = {
	_type: 'sanity.imageHotspot'
	x?: number
	y?: number
	height?: number
	width?: number
}

export type SanityImageCrop = {
	_type: 'sanity.imageCrop'
	top?: number
	bottom?: number
	left?: number
	right?: number
}

export type SanityFileAsset = {
	_id: string
	_type: 'sanity.fileAsset'
	_createdAt: string
	_updatedAt: string
	_rev: string
	originalFilename?: string
	label?: string
	title?: string
	description?: string
	altText?: string
	sha1hash?: string
	extension?: string
	mimeType?: string
	size?: number
	assetId?: string
	uploadId?: string
	path?: string
	url?: string
	source?: SanityAssetSourceData
}

export type SanityImageAsset = {
	_id: string
	_type: 'sanity.imageAsset'
	_createdAt: string
	_updatedAt: string
	_rev: string
	originalFilename?: string
	label?: string
	title?: string
	description?: string
	altText?: string
	sha1hash?: string
	extension?: string
	mimeType?: string
	size?: number
	assetId?: string
	uploadId?: string
	path?: string
	url?: string
	metadata?: SanityImageMetadata
	source?: SanityAssetSourceData
}

export type SanityImageMetadata = {
	_type: 'sanity.imageMetadata'
	location?: Geopoint
	dimensions?: SanityImageDimensions
	palette?: SanityImagePalette
	lqip?: string
	blurHash?: string
	hasAlpha?: boolean
	isOpaque?: boolean
}

export type Geopoint = {
	_type: 'geopoint'
	lat?: number
	lng?: number
	alt?: number
}

export type Slug = {
	_type: 'slug'
	current?: string
	source?: string
}

export type SanityAssetSourceData = {
	_type: 'sanity.assetSourceData'
	name?: string
	id?: string
	url?: string
}

export type AllSanitySchemaTypes =
	| Prose
	| CustomHtml
	| AccordionList
	| Redirect
	| Link
	| Page
	| Metadata
	| Code
	| SanityImagePaletteSwatch
	| SanityImagePalette
	| SanityImageDimensions
	| SanityImageHotspot
	| SanityImageCrop
	| SanityFileAsset
	| SanityImageAsset
	| SanityImageMetadata
	| Geopoint
	| Slug
	| SanityAssetSourceData
export declare const internalGroqTypeReferenceTo: unique symbol
// Source: ./src/app/(frontend)/[[...slug]]/page.tsx
// Variable: PAGE_QUERY
// Query: *[_type == 'page' && metadata.slug.current == $slug][0]{		...,		modules[]{			...,			_type == 'prose' => {				'headings': select(					tableOfContents in ['left', 'right'] => content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{						style,						'text': pt::text(@)					}				),			}		}	}
export type PAGE_QUERYResult = {
	_id: string
	_type: 'page'
	_createdAt: string
	_updatedAt: string
	_rev: string
	title?: string
	modules: Array<
		| {
				_key: string
				_type: 'accordion-list'
				intro?: Array<{
					children?: Array<{
						marks?: Array<string>
						text?: string
						_type: 'span'
						_key: string
					}>
					style?:
						| 'blockquote'
						| 'h1'
						| 'h2'
						| 'h3'
						| 'h4'
						| 'h5'
						| 'h6'
						| 'normal'
					listItem?: 'bullet' | 'number'
					markDefs?: Array<{
						href?: string
						_type: 'link'
						_key: string
					}>
					level?: number
					_type: 'block'
					_key: string
				}>
				accordions?: Array<{
					summary?: string
					content?: Array<{
						children?: Array<{
							marks?: Array<string>
							text?: string
							_type: 'span'
							_key: string
						}>
						style?:
							| 'blockquote'
							| 'h1'
							| 'h2'
							| 'h3'
							| 'h4'
							| 'h5'
							| 'h6'
							| 'normal'
						listItem?: 'bullet' | 'number'
						markDefs?: Array<{
							href?: string
							_type: 'link'
							_key: string
						}>
						level?: number
						_type: 'block'
						_key: string
					}>
					open?: boolean
					_type: 'accordion'
					_key: string
				}>
				connect?: boolean
				enableSchema?: boolean
		  }
		| {
				_key: string
				_type: 'custom-html'
				className?: string
				html?: Code
				css?: Code
		  }
		| {
				_key: string
				_type: 'prose'
				content?: Array<{
					children?: Array<{
						marks?: Array<string>
						text?: string
						_type: 'span'
						_key: string
					}>
					style?:
						| 'blockquote'
						| 'h1'
						| 'h2'
						| 'h3'
						| 'h4'
						| 'h5'
						| 'h6'
						| 'normal'
					listItem?: 'bullet' | 'number'
					markDefs?: Array<{
						href?: string
						_type: 'link'
						_key: string
					}>
					level?: number
					_type: 'block'
					_key: string
				}>
				tableOfContents?: 'left' | 'none' | 'right'
				headings: Array<{
					style:
						| 'blockquote'
						| 'h1'
						| 'h2'
						| 'h3'
						| 'h4'
						| 'h5'
						| 'h6'
						| 'normal'
						| null
					text: string
				}> | null
		  }
	> | null
	metadata?: Metadata
} | null

// Query TypeMap
import '@sanity/client'
declare module '@sanity/client' {
	interface SanityQueries {
		"\n\t*[_type == 'page' && metadata.slug.current == $slug][0]{\n\t\t...,\n\t\tmodules[]{\n\t\t\t...,\n\t\t\t_type == 'prose' => {\n\t\t\t\t'headings': select(\n\t\t\t\t\ttableOfContents in ['left', 'right'] => content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{\n\t\t\t\t\t\tstyle,\n\t\t\t\t\t\t'text': pt::text(@)\n\t\t\t\t\t}\n\t\t\t\t),\n\t\t\t}\n\t\t}\n\t}\n": PAGE_QUERYResult
	}
}
