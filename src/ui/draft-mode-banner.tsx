import * as stylex from '@stylexjs/stylex'
import { VscChevronDown } from 'react-icons/vsc'
import { ROUTES } from '@/lib/env'
import { shared } from '../styles/shared'
import { colors } from '../styles/tokens.stylex'
import HoverDetails from '@/ui/details/hover-details'

export default function DraftModeBanner() {
	const sx = stylex.props(styles.root)

	return (
		<HoverDetails
			{...sx}
			className={[sx.className, 'accordion'].filter(Boolean).join(' ')}
		>
			<summary {...stylex.props(styles.summary)}>
				🚧 Draft mode
				<VscChevronDown />
			</summary>

			<menu {...stylex.props(styles.menu)}>
				<li>
					<a href="/api/draft-mode/disable" {...stylex.props(shared.link)}>
						Exit draft mode
					</a>
				</li>
				<li>
					<a href={`/${ROUTES.studio}`} {...stylex.props(shared.link)}>
						Open the Studio
					</a>
				</li>
			</menu>
		</HoverDetails>
	)
}

const styles = stylex.create({
	root: {
		position: 'fixed',
		right: 0,
		bottom: 0,
		backgroundColor: `color-mix(in oklab, ${colors.amber400} 60%, transparent)`,
		backdropFilter: 'blur(2px)',
	},
	summary: {
		paddingInline: '1rem',
		paddingBlock: '0.5rem',
	},
	menu: {
		padding: '1rem',
		paddingTop: 0,
	},
})
