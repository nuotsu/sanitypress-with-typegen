import * as stylex from '@stylexjs/stylex'
import type { Form } from '@/sanity/types'
import { shared } from '../../styles/shared'
import { colors, spacing } from '../../styles/tokens.stylex'
import { mq } from '../../styles/breakpoints.stylex'

export default function ({ form }: { form: Form }) {
	return (
		<form {...stylex.props(styles.form)} action={form.endpoint} method="POST">
			<label>
				<span>Name</span>
				<input
					{...stylex.props(shared.input, styles.field)}
					name="name"
					type="text"
					autoComplete="name"
					placeholder="John Doe"
				/>
			</label>

			<label>
				<span>
					Email{' '}
					<small aria-hidden="true" {...stylex.props(styles.required)}>
						Required
					</small>
				</span>
				<input
					{...stylex.props(shared.input, styles.field)}
					name="email"
					type="email"
					autoComplete="email"
					placeholder="john@example.com"
					required
					aria-required="true"
				/>
			</label>

			<label>
				<span>Message</span>
				<textarea
					{...stylex.props(shared.input, styles.field)}
					name="message"
					placeholder="Your message..."
					rows={3}
				/>
			</label>

			<div>
				<button {...stylex.props(shared.action, styles.submit)} type="submit">
					Submit
				</button>
			</div>
		</form>
	)
}

const styles = stylex.create({
	form: {
		display: 'grid',
		gap: spacing.ch,
	},
	field: {
		width: '100%',
	},
	required: {
		marginLeft: `calc(${spacing.ch} / 2)`,
		color: colors.foreground50,
	},
	submit: {
		width: {
			default: '100%',
			[mq.sm]: 'auto',
		},
	},
})
