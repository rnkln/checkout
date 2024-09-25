import { useQuery, useMutation } from '@tanstack/react-query'

import type { Config, Hint, Payment } from './payment_types'
import {
	usePaymentQuery,
	type UsePaymentQueryOptions
} from './use_payment_query'
import {
	usePaymentMutation,
	type UsePaymentMutationOptions
} from './use_payment_mutation'
import type { PaymentErrorCode } from './payment_error'

export type PaymentErrorResponse = {
	code: PaymentErrorCode
	message: string
}

export type PaymentResponse = Payment

export type PaymentPostInput = Pick<Payment, 'amount' | 'text'> &
	(
		| {
				card: {
					number: string
					code: string
					expiry: {
						month: number
						year: number
					}
				}
		  }
		| {
				applePay: true
		  }
		| {
				mobilePay: true
		  }
	)

export type PaymentPostResponse = {
	paymentId: string
}

export type PaymentPatchInput = Hint[]

export type PaymentPatchResponse = object

export type PaymentConfigResponse = Config

export const usePayment = (
	id: string,
	options?: UsePaymentQueryOptions<PaymentResponse>
) => {
	const { key, query } = usePaymentQuery(id)
	const result = useQuery(key, query, options)

	return { key, ...result }
}

export const usePaymentConfig = (
	options?: UsePaymentQueryOptions<PaymentConfigResponse>
) => {
	const { key, query } = usePaymentQuery('config')
	const result = useQuery(key, query, options)

	return { key, ...result }
}

export const usePaymentPost = (
	options?: UsePaymentMutationOptions<PaymentPostResponse, PaymentPostInput>
) => {
	const { mutation } = usePaymentMutation<PaymentPostInput>('POST', '')

	return useMutation(mutation, options)
}

export const usePaymentPatch = (
	id: string,
	options?: UsePaymentMutationOptions<PaymentPatchResponse, PaymentPatchInput>
) => {
	const { mutation } = usePaymentMutation<PaymentPatchInput>('PATCH', id)

	return useMutation(mutation, options)
}
