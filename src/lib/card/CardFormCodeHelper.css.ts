import { style } from '@vanilla-extract/css'
import { helpers } from '@matter/theme/helpers.css'

export const illustration = style({
	pointerEvents: 'none',
	transitionProperty: 'transform, box-shadow',
	transitionDuration: '250ms',
	transitionTimingFunction: 'ease',
	transform: 'scaleY(0)',
	transformOrigin: 'top left',
	position: 'absolute',
	width: `calc(100% - ${helpers.spacing(6)})`,
	margin: helpers.spacing(3),
	zIndex: 1,
	borderRadius: helpers.radius(4),
	overflow: 'hidden',
	boxShadow: '0px 64px 56px -18px rgba(0, 0, 0, 0.25)',
	selectors: {
		'&.shown': {
			pointerEvents: 'all',
			transform: 'scaleY(1)'
		}
	},
	'@media': {
		'(prefers-color-scheme: dark)': {
			boxShadow: '0px 0px 4px 4px rgba(255, 255, 255, 0.25)'
		}
	}
})

export const illustrationSVG = style({
	display: 'block'
})
