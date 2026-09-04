import * as stylex from '@stylexjs/stylex'
import { VscChromeClose, VscMenu } from 'react-icons/vsc'
import { shared } from '../../styles/shared'
import { colors } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'
import css from './mobile-toggle.module.css'

export default function () {
	const labelSx = stylex.props(styles.label)
	const inputSx = stylex.props(shared.srOnly)
	const openLabelSx = stylex.props(shared.srOnly)
	const closeLabelSx = stylex.props(shared.srOnly)

	return (
		<label {...labelSx}>
			<input
				id="header-open"
				type="checkbox"
				{...inputSx}
				aria-controls="mobile-menu"
			/>

			<span
				{...openLabelSx}
				className={[openLabelSx.className, css.whenClosed]
					.filter(Boolean)
					.join(' ')}
			>
				Open menu
			</span>
			<span
				{...closeLabelSx}
				className={[closeLabelSx.className, css.whenOpen]
					.filter(Boolean)
					.join(' ')}
			>
				Close menu
			</span>

			<VscMenu className={css.whenClosed} aria-hidden />
			<VscChromeClose className={css.whenOpen} aria-hidden />
		</label>
	)
}

const styles = stylex.create({
	label: {
		fontSize: '1.25rem',
		outlineWidth: {
			default: null,
			':has(:focus-visible)': 2,
		},
		outlineStyle: {
			default: null,
			':has(:focus-visible)': 'dashed',
		},
		outlineOffset: {
			default: null,
			':has(:focus-visible)': 2,
		},
		outlineColor: {
			default: null,
			':has(:focus-visible)': colors.primary,
		},
		display: {
			default: null,
			[mq.md]: 'none',
		},
	},
})