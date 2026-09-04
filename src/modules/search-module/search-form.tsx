'use client'

import * as stylex from '@stylexjs/stylex'
import { useQueryState } from 'nuqs'
import { VscSearch } from 'react-icons/vsc'
import { count, debounce } from '@/lib/utils'
import type { SearchModule } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors } from '../../styles/tokens.stylex'
import Loading from '@/ui/loading'
import GoogleResults from './google-results'
import SearchResults from './search-results'
import css from './search-form.module.css'
import { handleSearch, useSearchStore } from './store'

export default function ({ scope }: Partial<SearchModule>) {
	const [query, setQuery] = useQueryState('query', { defaultValue: '' })
	const { loading, setLoading, results, setResults } = useSearchStore()

	const rootSx = stylex.props(styles.root)
	const labelSx = stylex.props(shared.input, styles.label)
	const outputSx = stylex.props(styles.output, shared.animFade)

	return (
		<search
			{...rootSx}
			className={[rootSx.className, css.root].filter(Boolean).join(' ')}
		>
			<label {...labelSx}>
				<VscSearch {...stylex.props(styles.icon)} />

				<input
					id="query"
					{...stylex.props(styles.input)}
					type="search"
					placeholder={scope === 'all' ? 'Search' : `Search ${scope}`}
					defaultValue={query}
					onChange={debounce((e) => {
						setQuery(e.target.value)
						handleSearch({
							scope,
							query: e.target.value,
							setLoading,
							setResults,
						})
					})}
				/>
			</label>

			{query && (
				<output
					htmlFor="query"
					{...outputSx}
					className={[outputSx.className, css.output]
						.filter(Boolean)
						.join(' ')}
				>
					<div {...stylex.props(styles.panel)}>
						{loading ? (
							<Loading>Searching...</Loading>
						) : (
							<>
								<p {...stylex.props(styles.summary)}>
									{count(results, 'result')} found for "
									<span {...stylex.props(styles.queryText)}>{query}</span>"
								</p>

								<SearchResults query={query} />
								<GoogleResults scope={scope} />
							</>
						)}
					</div>
				</output>
			)}
		</search>
	)
}

const styles = stylex.create({
	root: {
		position: 'relative',
	},
	label: {
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
		paddingBlock: 0,
		borderColor: {
			default: colors.foreground10,
			':focus-within': colors.primary,
		},
		boxShadow: {
			default: null,
			':focus-within': `0 0 0 3px ${colors.primary20}`,
		},
	},
	icon: {
		flexShrink: 0,
	},
	input: {
		flexGrow: 1,
		paddingBlock: '0.25em',
		outline: 'none',
		borderWidth: 0,
		backgroundColor: 'transparent',
		minWidth: 0,
	},
	output: {
		position: 'absolute',
		insetInline: 0,
		top: '100%',
		zIndex: 1,
		transformOrigin: 'top',
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: colors.stroke,
	},
	panel: {
		display: 'grid',
		gap: '1rem',
		maxHeight: '16lh',
		overflowY: 'auto',
		padding: '1rem',
		backgroundColor: colors.background,
		boxShadow:
			'0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
	},
	summary: {
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'center',
		whiteSpace: 'nowrap',
	},
	queryText: {
		overflow: 'hidden',
		wordBreak: 'break-all',
		textOverflow: 'ellipsis',
	},
})
