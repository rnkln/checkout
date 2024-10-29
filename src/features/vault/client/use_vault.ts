import { useCallback } from 'react'
import { useMutation, type UseMutationOptions } from '@tanstack/react-query'
import { usePaymentFetch } from '@features/payment/client/use_payment_fetch'
import { useVaultEndpoint } from './use_vault_endpoint'

export type VaultInput = {
	type: 'pcn' | 'pcsc'
	value: string
}

export type VaultResponse = {
	token: string
}

export type UseVaultOptions = Omit<
	UseMutationOptions<VaultResponse[], never, VaultInput[]>,
	'mutationKey' | 'mutationFn'
>

export const useVault = (options?: UseVaultOptions) => {
	const VAULT_API_ENDPOINT = useVaultEndpoint()
	const fetch = usePaymentFetch()
	const mutation = useCallback(
		async (input: VaultInput[]) => {
			const creates = Array.isArray(input) ? input : [input]
			const createsPromises = creates.map(async (body) =>
				fetch(VAULT_API_ENDPOINT, {
					body: JSON.stringify(body),
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Accept-Version': '1',
						'Content-Type': 'application/json'
					}
				})
			)

			const responses = await Promise.all(createsPromises)
			const results = await Promise.all<VaultResponse>(
				responses.map(
					async (response) => (await response.json()) as VaultResponse
				)
			)

			return results
		},
		[fetch, VAULT_API_ENDPOINT]
	)

	return useMutation(mutation, options)
}
