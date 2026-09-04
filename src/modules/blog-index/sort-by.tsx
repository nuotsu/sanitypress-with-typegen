'use client'

import * as stylex from '@stylexjs/stylex'
import { shared } from '../../styles/shared'
import { spacing } from '../../styles/tokens.stylex'
import { SORT_BY_OPTIONS, useBlogIndexStore } from './store'

export default function () {
	const { setSortBy } = useBlogIndexStore()

	return (
		<label {...stylex.props(styles.label)}>
			<span>Sort by:</span>

			<select
				{...stylex.props(shared.ghost, styles.select)}
				onChange={(e) => setSortBy(e.target.value as any)}
			>
				{SORT_BY_OPTIONS.map((option) => (
					<option value={option.value} key={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	)
}

const styles = stylex.create({
	label: {
		display: 'flex',
		alignItems: 'center',
		gap: `calc(${spacing.ch} / 2)`,
	},
	select: {
		cursor: 'pointer',
		textAlign: 'left',
	},
})
