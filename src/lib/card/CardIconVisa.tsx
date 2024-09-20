import { CSSProperties } from 'react';

import Icon from './CardIconVisa.svg';

export type CardIconVisaProps = {
  color?: 'default' | 'grey';
  style?: CSSProperties;
  height?: number;
  className?: string;
};

export const CardIconVisa = ({
  color = 'default',
  style,
  height = 24,
  className,
}: CardIconVisaProps) => (
  <Icon
    role="presentation"
    fill={CardIconVisaColorMap[color]}
    height={height}
    style={{ display: 'block', ...style }}
    className={className}
    aria-hidden
    data-test-id="card-icon-visa"
  />
);

export const CardIconVisaColorMap = {
  default: '#5A78FF',
  grey: '#B2B2B2',
};
