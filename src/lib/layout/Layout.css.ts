import { style } from '@vanilla-extract/css';
import { vars } from '@matter/theme/contract.css';
import { helpers } from '@matter/theme/helpers.css';

export const root = style({
  width: '100vw',
  height: '100vh',
  color: vars.palette.background.secondary.contrast,
  background: vars.palette.background.secondary.main,
  transition: helpers.transition('color', 'background'),
});
