import { useCallback } from 'react';
import { UseMutationOptions } from '@tanstack/react-query';

import { usePaymentFetch } from './use_payment_fetch';
import { usePaymentEndpoint } from './use_payment_endpoint';

export type PaymentMutationAccept = 'application/json' | 'text/plain';

export type PaymentMutationMethod = 'PUT' | 'POST' | 'PATCH' | 'DELETE';

export type PaymentMutationOptions = {
  accept?: PaymentMutationAccept;
};

export type UsePaymentMutationOptions<T, V> = Omit<
  UseMutationOptions<T, {}, V>,
  'mutationKey' | 'mutationFn'
>;

export const usePaymentMutation = <V>(
  method: PaymentMutationMethod,
  path: string,
  { accept = 'application/json' }: PaymentMutationOptions = {}
) => {
  const fetch = usePaymentFetch();
  const endpoint = usePaymentEndpoint(path);
  const mutation = useCallback(
    async (variables: V) => {
      const response = await fetch(endpoint, {
        body: JSON.stringify(variables),
        method,
        headers: {
          Accept: accept,
          'Content-Type': 'application/json',
        },
      });

      if (accept === 'text/plain') {
        return response.text();
      }

      return response.json();
    },
    [endpoint, method, accept, fetch]
  );

  return { mutation };
};
