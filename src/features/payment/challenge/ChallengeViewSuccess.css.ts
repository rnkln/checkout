import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@matter/theme/contract.css';
import { helpers } from '@matter/theme/helpers.css';
import { width } from '@lib/view/View.css';

export const grow = keyframes({
  '0%': { clipPath: 'inset(0 0 100% 0)' },
  '100%': { clipPath: 'inset(0)' },
});

export const root = style({
  inset: 0,
  insetBlockStart: -1,
  zIndex: 1,
  overflow: 'hidden',
  background: 'inherit',
  position: 'absolute',
  borderRadius: 'inherit',
  animation: `${grow} 1s ease-in-out forwards`,
  transition: helpers.transition('clip-path'),
  '@media': {
    [`(max-width: ${width}px)`]: {
      background: vars.palette.background.secondary.main,
      borderBlockEnd: `1px solid ${vars.palette.surface.secondary.main}`,
    },
  },
});
