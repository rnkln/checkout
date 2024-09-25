import { useMemo } from 'react'
import { useEnvironment } from '@setup/use_environment'

export const usePaymentEndpoint = (...paths: (string | undefined)[]) => {
	const API_ROOT = useEnvironment('API_ENDPOINT')

	return useMemo(
		() =>
			[API_ROOT, 'payments', ...paths]
				.filter((part): part is string => Boolean(part))
				.map((part) => part.replace(/^\//, ''))
				.join('/'),
		[API_ROOT, paths]
	)
}
