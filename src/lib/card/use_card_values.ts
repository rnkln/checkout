import { useMemo } from 'react';

export type CardFormValues = {
  'cc-number': string;
  'cc-exp': string;
  'cc-csc': string;
};

export type CardFormValuesPartial = Partial<CardFormValues>;

export const useCardDefaultValues = (
  values: CardFormValuesPartial = {}
): CardFormValues =>
  useMemo(
    () => ({
      'cc-number': '',
      'cc-exp': '',
      'cc-csc': '',
      ...values,
    }),
    [values]
  );
