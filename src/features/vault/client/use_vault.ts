import { useCallback } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useEnvironment } from '@setup/use_environment';
import { usePaymentFetch } from '@features/payment/client/use_payment_fetch';

export type VaultInput = Array<{
  type: 'pcn' | 'pcsc';
  value: string;
}>;

export type VaultResponse = Array<{
  token: string;
}>;

export type UseVaultOptions = Omit<
  UseMutationOptions<VaultResponse, {}, VaultInput>,
  'mutationKey' | 'mutationFn'
>;

export const useVault = (options?: UseVaultOptions) => {
  const VAULT_API_ENDPOINT = useEnvironment('VAULT_API_ENDPOINT');
  const fetch = usePaymentFetch();
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
      const results: VaultResponse = await Promise.all(
        responses.map((response) => response.json())
      );

      return results;
    },
    [fetch, VAULT_API_ENDPOINT]
  );

  return useMutation(mutation, options);
};
