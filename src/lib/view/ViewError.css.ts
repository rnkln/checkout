import { style } from '@vanilla-extract/css'
import { vars } from '@matter/theme/contract.css'
import { helpers } from '@matter/theme/helpers.css'

export const root = style({
	overflow: 'hidden',
	transition: helpers.transition('height')
})

export const alert = style({
	margin: vars.spacing['0.5']
})
