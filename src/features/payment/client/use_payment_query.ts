import { useCallback } from 'react';
import { QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query';

import { usePaymentFetch } from './use_payment_fetch';
import { usePaymentEndpoint } from './use_payment_endpoint';

export type PaymentQueryKey = Array<string>;

export type UsePaymentQueryOptions<T> = Omit<
  UseQueryOptions<T, {}, T, PaymentQueryKey>,
  'queryKey' | 'queryFn'
>;

export const usePaymentQuery = (path: string) => {
  const fetch = usePaymentFetch();
  const endpoint = usePaymentEndpoint(path);
  const key: PaymentQueryKey = ['GET', path];

  const query = useCallback(
    async ({ signal }: QueryFunctionContext) => {
      const response = await fetch(endpoint, {
        signal,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      return response.json();
    },
    [endpoint, fetch]
  );

  return { key, query };
};
