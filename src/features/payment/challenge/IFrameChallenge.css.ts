import { style } from '@vanilla-extract/css'

export const root = style({
	border: 'none',
	position: 'absolute',
	inset: '0',
	width: '100%',
	height: '100%',
	zIndex: 1,
	boxSizing: 'border-box',
	background: 'inherit',
	borderRadius: 'inherit'
})
