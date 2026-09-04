import * as stylex from '@stylexjs/stylex'
import { stegaClean } from 'next-sanity'
import type { ComponentProps } from 'react'
import { bundledThemes, codeToHtml, splitLines } from 'shiki'
import type { Code } from '@/sanity/types'
import { colors, spacing } from '../../styles/tokens.stylex'
import ClickToCopy from '@/ui/click-to-copy'
import css from './code.module.css'

export default async function ({
	value,
	theme = 'github-dark-high-contrast',
	className,
}: {
	theme?: keyof typeof bundledThemes
	value?: Code
} & ComponentProps<'article'>) {
	if (!value?.code) return null

	const html = await codeToHtml(stegaClean(value.code), {
		lang: value.language as any,
		theme,
		decorations: value.highlightedLines
			?.map((row) => ({
				row,
				characters: stegaClean(splitLines(value.code!)[row - 1]?.[0])?.length,
			}))
			?.filter(({ characters }) => characters > 0)
			?.map(({ row, characters }) => ({
				start: { line: row - 1, character: 0 },
				end: { line: row - 1, character: characters },
				properties: { class: 'highlight' },
			})),
	})

	const [path, filename] = value.filename?.includes('/')
		? value.filename.split(/(.*)\/(.*)$/).filter(Boolean)
		: [, value.filename]

	const rootSx = stylex.props(styles.root)

	return (
		<article
			{...rootSx}
			className={[rootSx.className, className].filter(Boolean).join(' ')}
			data-module="code"
		>
			<menu {...stylex.props(styles.menu)}>
				{value.filename && (
					<li {...stylex.props(styles.filename)}>
						{path && <span {...stylex.props(styles.path)}>{path}/</span>}
						<span>{filename}</span>
					</li>
				)}
				<li {...stylex.props(styles.copyItem)}>
					<ClickToCopy
						value={stegaClean(value.code)}
						className={css.copyBtn}
						xstyle={
							!theme.includes('light') ? styles.copyOnDark : styles.copy
						}
					/>
				</li>
			</menu>

			<div
				className={css.code}
				style={{ ['--highlight-color' as string]: '#4ade80' }}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</article>
	)
}

const styles = stylex.create({
	root: {
		overflow: 'hidden',
	},
	menu: {
		color: colors.background,
		columnGap: spacing.ch,
		backgroundColor: colors.foreground,
		display: 'flex',
		minHeight: spacing.lh,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomStyle: 'solid',
		borderBottomColor: 'color-mix(in oklab, currentColor 30%, transparent)',
		fontSize: '0.875rem',
	},
	filename: {
		display: '-webkit-box',
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: 1,
		overflow: 'hidden',
		paddingLeft: '1rem',
		overflowWrap: 'anywhere',
	},
	path: {
		color: `color-mix(in oklab, ${colors.background} 50%, transparent)`,
	},
	copyItem: {
		marginLeft: 'auto',
		flexShrink: 0,
	},
	copy: {
		padding: '0.5rem',
		fontSize: '1.125rem',
		transitionProperty: 'transform, opacity',
		transitionDuration: '150ms',
		transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
		opacity: {
			default: 0.5,
			':hover': 1,
		},
		transform: {
			default: null,
			':active': 'scale(0.9)',
		},
	},
	copyOnDark: {
		padding: '0.5rem',
		fontSize: '1.125rem',
		transitionProperty: 'transform, opacity',
		transitionDuration: '150ms',
		transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
		opacity: {
			default: 0.5,
			':hover': 1,
		},
		transform: {
			default: null,
			':active': 'scale(0.9)',
		},
		color: '#fff',
	},
})
