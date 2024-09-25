import { useMemo } from 'react'

export type Amount = {
	decimal: string
	currency: string
}

export type AmountFormatterOptions = {
	locale: string
	amount: Amount
}

export const useAmountFormatted = ({
	locale,
	amount
}: AmountFormatterOptions) => {
	const formatter = useMemo(
		() =>
			new Intl.NumberFormat(locale, {
				style: 'currency',
				currency: amount.currency
			}),
		[locale, amount]
	)

	return formatter.format(Number(amount.decimal))
}
