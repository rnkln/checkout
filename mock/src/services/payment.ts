import crypto from 'crypto'

import { http, HttpResponse } from 'msw'
import type { Payment, Challenge } from '@features/payment/client/payment_types'
import type { PaymentErrorCode } from '@features/payment/client/payment_error'
import type {
	PaymentResponse,
	PaymentPostResponse,
	PaymentPatchResponse,
	PaymentConfigResponse,
	PaymentErrorResponse,
	PaymentPostInput,
	PaymentPatchInput
} from '@features/payment/client/use_payment'

import { Store } from '../helpers/store'

export const payments = new Store<Payment>()

export const createPaymentService = (endpoint: string) => [
	http.get<never, never, PaymentConfigResponse, `${typeof endpoint}/config`>(
		`${endpoint}/config`,
		async () =>
			HttpResponse.json({
				methods: ['card', 'mobilePay', 'applePay'],
				currency: 'DKK',
				merchant: {
					key: crypto.randomUUID(),
					logo: 'https://fakeimg.pl/200x200/231070/ffffff?text=Logo&font=bebas',
					name: 'Fake A/S'
				}
			})
	),

	http.get<
		{ id: string },
		never,
		PaymentResponse | PaymentErrorResponse,
		`${typeof endpoint}/:id`
	>(`${endpoint}/:id`, async ({ request, params }) => {
		const error = request.headers.get(
			'x-mock-error-code'
		) as null | PaymentErrorCode
		const payment = payments.find((p) => p.id === params.id)

		if (!payment) {
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw new HttpResponse(null, { status: 404 })
		}

		if (error !== null) {
			return HttpResponse.json(
				{
					code: error,
					message: 'Error debugging message'
				},
				{ status: 500 }
			)
		}

		return HttpResponse.json(payment)
	}),

	http.post<
		never,
		PaymentPostInput,
		PaymentPostResponse | PaymentErrorResponse,
		typeof endpoint
	>(endpoint, async ({ request }) => {
		const payment = await request.json()
		const paymentId = crypto.randomUUID() as string

		payments.insert({
			id: paymentId,
			status: 'pending',
			text: payment.text,
			amount: payment.amount,
			challenges: [
				createPoll(),
				createFetch(),
				createIFrame('iframe'),
				createIFrame('background-iframe'),
				createRedirect()
			]
		})

		return HttpResponse.json({
			paymentId
		})
	}),

	http.patch<
		{ id: string },
		PaymentPatchInput | undefined,
		PaymentPatchResponse | PaymentErrorResponse,
		`${typeof endpoint}/:id`
	>(`${endpoint}/:id`, async ({ request, params }) => {
		const error = request.headers.get(
			'x-mock-error-code'
		) as null | PaymentErrorCode
		const hints = await request.json()
		const payment = payments.find((p) => p.id === params.id)

		if (!payment) {
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw new HttpResponse(null, { status: 404 })
		}

		if (!hints) {
			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw new HttpResponse(null, { status: 500 })
		}

		if (error !== null) {
			payments.update(
				(p) => p.id === payment.id,
				(p) => ({
					...p,
					error,
					status: 'failed',
					challenges: []
				})
			)

			return HttpResponse.json(
				{
					code: error,
					message: 'Error debugging message'
				},
				{ status: 500 }
			)
		}

		payments.update(
			(p) => p.id === payment.id,
			(p) => ({
				...p,
				status: 'completed',
				challenges: []
			})
		)

		return HttpResponse.json({})
	})
]

const createPoll = (): Challenge => {
	const notBefore = new Date()
	notBefore.setSeconds(notBefore.getSeconds() + 5)

	return {
		type: 'poll',
		notBefore: notBefore.toISOString(),
		interval: 1000,
		url: `http://localhost:3001/api/challenge/poll`
	}
}

const createFetch = (): Challenge => ({
	type: 'fetch',
	url: `http://localhost:3001/api/challenge/fetch`
})

const createIFrame = (type: 'iframe' | 'background-iframe'): Challenge => {
	const path = `http://localhost:3001/api/challenge/${type}`
	const method = Math.random() < 0.5 ? 'GET' : 'POST'
	const generate = () =>
		Array.from(
			{ length: Math.floor(Math.random() * 3) },
			(v, i) => i
		).reduce(
			(acc, index) => ({ ...acc, [`field${index}`]: `value${index}` }),
			{}
		)

	return {
		type,
		method,
		url: method === 'GET' ? path : undefined,
		action: method === 'POST' ? path : undefined,
		fields: method === 'POST' ? generate() : undefined,
		width: type === 'iframe' ? 400 : undefined,
		height: type === 'iframe' ? 400 : undefined,
		timeout: 10000
	}
}

const createRedirect = (): Challenge => ({
	type: 'redirect',
	url: `http://localhost:3001/api/challenge/redirect`
})
