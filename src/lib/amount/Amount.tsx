import { Text, TextProps } from '@matter/typography';

import {
  useAmountFormatter,
  Amount as AmountType,
  AmountFormatterOptions,
} from './use_amount_formatter';

export type AmountProps = TextProps & AmountType & AmountFormatterOptions;

export const Amount = ({
  value,
  locale,
  currency,
  ...otherProps
}: AmountProps) => {
  const format = useAmountFormatter({ locale, currency });

  return <Text {...otherProps}>{format(value)}</Text>;
};
