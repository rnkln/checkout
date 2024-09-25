import type { CSSProperties } from 'react'

import Icon from './MobilePayIcon.svg'

export type MobilePayIconProps = {
	color?: 'default' | 'white' | 'grey'
	style?: CSSProperties
	height?: number
	className?: string
}

export const MobilePayIcon = ({
	color = 'default',
	style,
	height = 24,
	className
}: MobilePayIconProps) => (
	<Icon
		role="presentation"
		fill={MobilePayIconColorMap[color]}
		height={height}
		style={{ display: 'block', ...style }}
		className={className}
		aria-hidden
		data-test-id="mobile-pay-icon"
	/>
)

export const MobilePayIconColorMap = {
	default: '#5A78FF',
	grey: '#B2B2B2',
	white: '#FFFFFF'
}
