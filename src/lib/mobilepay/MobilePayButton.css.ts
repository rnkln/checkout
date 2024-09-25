import { style } from '@vanilla-extract/css'
import { vars } from '@matter/theme/contract.css'

export const root = style({
	gap: vars.spacing[1],
	color: vars.palette.static.white,
	whiteSpace: 'nowrap',
	fontWeight: 'bold',
	backgroundColor: '#5A78FF'
})
