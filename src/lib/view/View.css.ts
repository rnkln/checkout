import { style } from '@vanilla-extract/css'
import { helpers } from '@matter/theme/helpers.css'

export const width = 480

export const height = 700

export const root = style({
	width: '100%',
	height: '100%',
	position: 'relative',
	maxWidth: width,
	maxHeight: height,
	transition: helpers.transition('max-height', 'border-radius'),
	'@media': {
		[`(max-width: ${width}px)`]: {
			maxHeight: '100%',
			borderRadius: 0
		}
	}
})
