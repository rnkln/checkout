import { createTheme, globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@matter/theme/contract.css';

globalStyle('html, body', {
  margin: 0,
  padding: 0,
});

export const light = createTheme(vars, {
  font: {
    family: 'var(--font-family-sharp-grotesk)',
    weight: {
      normal: '400',
      medium: '500',
    },
    size: {
      1: '10px',
      2: '12px',
      3: '14px',
      4: '16px',
      5: '18px',
      6: '20px',
      7: '26px',
      8: '36px',
    },
  },
  radius: {
    1: '4px',
    2: '8px',
  },
  spacing: {
    0: '0',
    0.5: '4px',
    1: '8px',
    2: '16px',
    3: '24px',
    4: '32px',
    5: '40px',
    6: '48px',
    7: '56px',
  },
  transition: {
    easing: 'ease',
    duration: '400ms',
  },
  palette: {
    text: {
      primary: '#000000',
      secondary: '#6C6C70',
    },
    static: {
      white: '#FFFFFF',
      black: '#000000',
    },
    surface: {
      primary: { main: '#000000', contrast: '#FFFFFF' },
      secondary: { main: '#E8E8E8', contrast: '#000000' },
      tertiary: { main: '#D6D6D6', contrast: '#000000' },
      quaternary: { main: '#B2B2B2', contrast: '#000000' },
    },
    indicator: {
      accent: { main: '#9AAFF5', contrast: '#000000', alpha50: '#D9E0F7' },
      positive: { main: '#00CB39', contrast: '#000000', alpha50: '#00CB3980' },
      negative: { main: '#FF1A1A', contrast: '#000000', alpha50: '#F9C3C3' },
      attention: { main: '#FFD24C', contrast: '#000000', alpha50: '#FFD24C80' },
    },
    background: {
      primary: { main: '#F7F7F7', contrast: '#000000' },
      secondary: { main: '#FFFFFF', contrast: '#000000' },
    },
  },
});

export const theme = style([
  light,
  {
    fontSize: vars.font.size[3],
    fontFamily: vars.font.family,
    textSizeAdjust: 'none',
    '@media': {
      '(prefers-color-scheme: dark)': {
        vars: {
          [vars.palette.text.primary]: '#FFFFFF',
          [vars.palette.text.secondary]: '#CACACF',
          [vars.palette.surface.primary.main]: '#FFFFFF',
          [vars.palette.surface.primary.contrast]: '#000000',
          [vars.palette.surface.secondary.main]: '#272729',
          [vars.palette.surface.secondary.contrast]: '#FFFFFF',
          [vars.palette.surface.tertiary.main]: '#3A3A3C',
          [vars.palette.surface.tertiary.contrast]: '#FFFFFF',
          [vars.palette.surface.quaternary.main]: '#636366',
          [vars.palette.surface.quaternary.contrast]: '#FFFFFF',
          [vars.palette.background.primary.main]: '#191A1C',
          [vars.palette.background.primary.contrast]: '#FFFFFF',
          [vars.palette.background.secondary.main]: '#0D0D0F',
          [vars.palette.background.secondary.contrast]: '#FFFFFF',
        },
      },
    },
  },
]);
