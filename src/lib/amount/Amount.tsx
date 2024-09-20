import { Text, TextProps } from '@matter/typography';

import {
  useAmountFormatted,
  Amount as AmountType,
  AmountFormatterOptions,
} from './use_amount_formatted';

export type AmountProps = TextProps &
  AmountFormatterOptions & {
    amount: AmountType;
  };

export const Amount = ({ amount, locale, ...otherProps }: AmountProps) => {
  const formatted = useAmountFormatted({ locale, amount });

  return <Text {...otherProps}>{formatted}</Text>;
};
