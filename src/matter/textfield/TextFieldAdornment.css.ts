import { style } from '@vanilla-extract/css'

export const textifeldAdornmentRoot = style({
	display: 'block',
	marginInlineEnd: 16,
	selectors: {
		'&.field': {
			marginBlockStart: 17
		}
	}
})
