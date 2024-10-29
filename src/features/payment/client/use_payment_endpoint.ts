import { useMemo } from 'react'

export const usePaymentEndpoint = (...paths: (string | undefined)[]) => {
	const API_ROOT = '/api'

	return useMemo(
		() =>
			[API_ROOT, 'payments', ...paths]
				.filter((part): part is string => Boolean(part))
				.map((part) => part.replace(/^\//, ''))
				.join('/'),
		[API_ROOT, paths]
	)
}
