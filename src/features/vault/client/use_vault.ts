import { useCallback } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { useEnvironment } from '@setup/use_environment';
import { PaymentError } from '../payment/payment_error';
import { usePaymentFetch } from '../payment/use_payment_fetch';

export type VaultInput = Array<{
  type: 'pcn' | 'pcsc';
  value: string;
}>;

export type VaultResponse = Array<{
  token: string;
}>;

export type UseVaultOptions = Omit<
  UseMutationOptions<VaultResponse, PaymentError, VaultInput>,
  'mutationKey' | 'mutationFn'
>;

export const useVault = (id: string, options?: UseVaultOptions) => {
  const VAULT_API_ENDPOINT = useEnvironment('VAULT_API_ENDPOINT');
  const fetch = usePaymentFetch(id);
  const mutation = useCallback(
    async (input: VaultInput) => {
      const creates = Array.isArray(input) ? input : [input];
      const createsPromises = creates.map((body) =>
        fetch(VAULT_API_ENDPOINT, {
          body: JSON.stringify(body),
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-Version': '1',
            'Content-Type': 'application/json',
          },
        })
      );

      const responses = await Promise.all(createsPromises);
      const responseThatFailed = responses.find((response) => !response.ok);

      if (responseThatFailed) {
        const error: PaymentError = await responseThatFailed.json();
        throw new PaymentError(error.code, { id, message: error.message });
      }

      const results: VaultResponse = await Promise.all(
        responses.map((response) => response.json())
      );

      return results;
    },
    [id, fetch, VAULT_API_ENDPOINT]
  );

  return useMutation(mutation, options);
};
