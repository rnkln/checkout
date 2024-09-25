import { useMemo } from 'react'
import type { TFunction } from 'i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const useCardSchema = (t: TFunction) =>
	useMemo(
		() =>
			yup.object({
				'cc-number': yup
					.string()
					.default('')
					.required(t('cc-required'))
					.test('luhn', t('cc-invalid'), validateNumber),
				'cc-exp': yup
					.string()
					.default('')
					.required(t('cc-required'))
					.test('expiry', t('cc-invalid'), validateExpiry),
				'cc-csc': yup
					.string()
					.default('')
					.required(t('cc-required'))
					.test('csc', t('cc-invalid'), validateCsc)
			}),
		[t]
	)

export const useCardResolver = (t: TFunction) => {
	const schema = useCardSchema(t)

	return useMemo(() => yupResolver(schema), [schema])
}

const validateNumber = (number: string) => {
	const { length } = number
	const parity = length % 2
	let sum = 0

	// We don't support card numbers that are not 16 digits
	if (length < 16) {
		return false
	}

	// Uses the Luhn algorithm to verify credit card number
	// https://en.wikipedia.org/wiki/Luhn_algorithm
	for (let i = length - 1; i >= 0; i--) {
		let d = Number.parseInt(number.charAt(i), 10)
		if (i % 2 === parity) d *= 2
		if (d > 9) d -= 9
		sum += d
	}

	return sum % 10 === 0
}

const validateExpiry = (expiry: string) => {
	const year = Number.parseInt(expiry.slice(2), 10)
	const month = Number.parseInt(expiry.slice(0, 2), 10)

	if (month > 12 || month < 1) {
		return false
	}

	const today = new Date()
	const todayDecade = today.getFullYear() - (today.getFullYear() % 1000)
	const expires = new Date(todayDecade + year, month - 1)

	return expires > today
}

// The CSC (card security code) can potentially have 4 numbers,
// but this is only relevant when supporting American Express.
// https://www.cvvnumber.com/
const validateCsc = (csc: string) => /^[0-9]{3}$/.test(csc)
