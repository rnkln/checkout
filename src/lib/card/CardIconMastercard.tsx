import type { CSSProperties } from 'react'

import IconDefault from './CardIconMastercard.svg'
import IconGrey from './CardIconMastercardGrey.svg'

export type CardIconMastercardProps = {
	color?: 'default' | 'grey'
	style?: CSSProperties
	height?: number
	className?: string
}

export const CardIconMastercard = ({
	color = 'default',
	style,
	height = 24,
	className
}: CardIconMastercardProps) => {
	// eslint-disable-next-line no-useless-assignment
	const Icon = color === 'default' ? IconDefault : IconGrey

	return (
		<Icon
			role="presentation"
			height={height}
			style={{ display: 'block', ...style }}
			className={className}
			aria-hidden
			data-test-id="card-icon-mastercard"
		/>
	)
}
