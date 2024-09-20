import { useMemo } from 'react';

export type Amount = {
  value: string;
};

export type AmountFormatterOptions = {
  locale: string;
  currency: string;
};

export const useAmountFormatter = ({
  locale,
  currency,
}: AmountFormatterOptions) => {
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      }),
    [locale, currency]
  );

  return (value: string) => formatter.format(Number(value));
};
