import type { CSSProperties } from 'react'

import Icon from './ApplePay.svg'

export type ApplePayIconProps = {
	color?: 'default' | 'grey'
	style?: CSSProperties
	height?: number
	className?: string
}

export const ApplePayIcon = ({
	color = 'default',
	style,
	height = 24,
	className
}: ApplePayIconProps) => (
	<Icon
		role="presentation"
		fill={ApplePayIconColorMap[color]}
		height={height}
		style={{ display: 'block', ...style }}
		className={className}
		aria-hidden
		data-test-id="apple-pay-icon"
	/>
)

export const ApplePayIconColorMap = {
	default: '#FFFFFF',
	grey: '#B2B2B2'
}
