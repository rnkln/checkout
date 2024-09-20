import { style } from '@vanilla-extract/css';
import { vars } from '@matter/theme/contract.css';

export const root = style({
  color: vars.palette.static.white,
  backgroundColor: 'black',
  whiteSpace: 'preserve-spaces'
});