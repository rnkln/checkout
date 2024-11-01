import { useCallback } from 'react'
import type {
	QueryFunctionContext,
	UseQueryOptions
} from '@tanstack/react-query'

import { usePaymentFetch } from './use_payment_fetch'
import { usePaymentEndpoint } from './use_payment_endpoint'

export type PaymentQueryKey = string[]

export type UsePaymentQueryOptions<T> = Omit<
	UseQueryOptions<T, object, T, PaymentQueryKey>,
	'queryKey' | 'queryFn'
>

export const usePaymentQuery = <T>(path: string) => {
	const fetch = usePaymentFetch()
	const endpoint = usePaymentEndpoint(path)
	const key: PaymentQueryKey = ['GET', path]

	const query = useCallback(
		async ({ signal }: QueryFunctionContext) => {
			const response = await fetch(endpoint, {
				signal,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			})

			return response.json() as T
		},
		[endpoint, fetch]
	)

	return { key, query }
}
