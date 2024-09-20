import { style } from '@vanilla-extract/css';
import { vars } from '@matter/theme/contract.css';
import { helpers } from '@matter/theme/helpers.css';

import { width } from '@lib/view/View.css';

export const root = style({
  top: 0,
  height: 70,
  flexShrink: 0,
  transition: helpers.transition(
    'color',
    'background',
    'padding',
    'border-color'
  ),
  padding: helpers.spacing(0, 2, 2, 2),
  position: 'sticky',
  color: vars.palette.background.secondary.contrast,
  background: vars.palette.background.secondary.main,
  boxSizing: 'border-box',
  borderBlockEnd: `1px solid ${vars.palette.background.secondary.main}`,
  zIndex: 1,
  '@media': {
    [`(max-width: ${width}px)`]: {
      borderBlockEnd: `1px solid ${vars.palette.surface.secondary.main}`,
      paddingBlockEnd: helpers.spacing(0),
    },
  },
});

export const merchant = style({
  position: 'relative',
});

export const spinner = style({
  position: 'absolute',
  insetInlineStart: -4,
});
