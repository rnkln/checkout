import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Spinner } from '@matter/loading'
import { View } from '@lib/view/View'
import { ViewContent } from '@lib/view/ViewContent'
import { toUrlParams } from '@utils/toUrlParams'
import { ViewHeader } from '@lib/view/ViewHeader'
import { ViewFooter } from '@lib/view/ViewFooter'
import { useVault } from '@features/vault/client/use_vault'

import { usePaymentConfig, usePaymentPost } from '../client/use_payment'
import type { Amount } from '../client/payment_types'

import { usePayParams } from './use_pay_params'
import { PayViewAmount } from './PayViewAmount'
import { PayViewMethods, type PayViewMethodsResult } from './PayViewMethods'
import { wrapAsync } from '@matter/utils/wrapAsync'

export const PayView = () => {
	const router = useRouter()
	const { t } = useTranslation()
	const {
		decimal: decimalParam = '',
		currency: currencyParam,
		method,
		redirect,
		strategy
	} = usePayParams()

	const { data: config, isLoading, isError } = usePaymentConfig()
	const { mutateAsync: vault, isLoading: isVaulting } = useVault()
	const { mutateAsync: create, isLoading: isCreating } = usePaymentPost()

	const [decimal, setDecimal] = useState(decimalParam)
	const currency = config?.currency ?? currencyParam ?? 'DKK'
	const amount: Amount = { decimal, currency }

	const isBusy = isVaulting || isCreating
	const isValid = decimal !== ''

	const handleAmount = async (result: string) => {
		setDecimal(result)

		await router.push(
			`/?${toUrlParams({
				decimal: result,
				currency: currencyParam,
				method,
				redirect,
				strategy
			})}`,
			undefined,
			{ shallow: true }
		)
	}

	const handlePay = async (result: PayViewMethodsResult) => {
		if (result.method === 'card') {
			const [number, code] = await vault([
				{ type: 'pcn', value: result.values['cc-number'] },
				{ type: 'pcsc', value: result.values['cc-csc'] }
			])

			const { paymentId } = await create({
				amount: {
					decimal,
					currency
				},
				card: {
					code: code.token,
					number: number.token,
					expiry: {
						month: Number.parseInt(
							result.values['cc-exp'].slice(0, 2),
							10
						),
						year: Number.parseInt(
							`20${result.values['cc-exp'].slice(2)}`,
							10
						)
					}
				}
			})

			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			router.push(
				`/challenge?${toUrlParams({
					id: paymentId,
					redirect,
					strategy
				})}`
			)
		} else {
			const { paymentId } = await create({
				amount: {
					decimal,
					currency
				},
				[result.method as 'mobilePay']: true
			})

			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			router.push(
				`/challenge?${toUrlParams({
					id: paymentId,
					redirect,
					strategy
				})}`
			)
		}
	}

	if (isError) {
		return <div>{t('error-unknown')}</div>
	}

	if (isLoading) {
		return <Spinner data-test-id="pay-view-loading" />
	}

	return (
		<View data-test-id="pay-view">
			<ViewHeader
				busy={isBusy}
				amount={isValid ? amount : undefined}
				merchant={config.merchant}
			/>

			<ViewContent>
				{!isValid && (
					<PayViewAmount
						initial={decimal}
						onComplete={wrapAsync(handleAmount)}
					/>
				)}
				{isValid ? (
					<PayViewMethods
						busy={isBusy}
						amount={amount}
						methods={config.methods}
						preferred={method}
						onComplete={wrapAsync(handlePay)}
					/>
				) : null}

				<ViewFooter methods={config.methods} />
			</ViewContent>
		</View>
	)
}
