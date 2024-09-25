import { style } from '@vanilla-extract/css'
import { helpers } from '@matter/theme/helpers.css'

export const root = style({
	position: 'relative'
})

export const grid = style({
	display: 'grid',
	gridGap: helpers.spacing(2),
	gridTemplateColumns: '2fr minmax(100px, 1fr)',
	gridTemplateRows: 'auto auto'
})

export const number = style({
	gridColumn: 'span 2'
})
