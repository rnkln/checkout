import { useMemo } from 'react'
import { useEnvironment } from '@setup/use_environment'

export const useVaultEndpoint = (...paths: (string | undefined)[]) => {
	const API_ROOT = useEnvironment('API_ENDPOINT')

	return useMemo(
		() =>
			[API_ROOT, 'vault', ...paths]
				.filter((part): part is string => Boolean(part))
				.map((part) => part.replace(/^\//, ''))
				.join('/'),
		[API_ROOT, paths]
	)
}
