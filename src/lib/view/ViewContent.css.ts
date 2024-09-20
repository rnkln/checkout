import { style } from '@vanilla-extract/css';
import { vars } from '@matter/theme/contract.css';
import { shapes } from '@matter/theme/shapes.css';
import { helpers } from '@matter/theme/helpers.css';

import { width } from './View.css';

export const root = style({
  flex: 1,
  padding: helpers.spacing(4),
  position: 'relative',
  color: vars.palette.background.primary.contrast,
  background: vars.palette.background.primary.main,
  clipPath: shapes.squircle(25),
  transition: helpers.transition('color', 'background', 'padding', 'clip-path'),
  '@media': {
    [`(max-width: ${width}px)`]: {
      clipPath: shapes.squircle(0),
      padding: helpers.spacing(2),
      paddingBlockStart: helpers.spacing(4),
    },
  },
});
