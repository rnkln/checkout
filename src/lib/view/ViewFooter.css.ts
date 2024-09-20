import { style } from '@vanilla-extract/css';
import { vars } from '@matter/theme/contract.css';

export const root = style({
  height: 50,
  padding: `0 ${vars.spacing[1]}`,
  marginBlockStart: 'auto',
});

export const message = style({
  fontSize: 6,
});
