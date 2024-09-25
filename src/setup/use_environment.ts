const environment = {
	IS_TEST: process.env.NODE_ENV === 'test',
	IS_PRODUCTION: process.env.NODE_ENV === 'production',
	IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
	VAULT_API_ENDPOINT: process.env.NEXT_PUBLIC_VAULT_API_ENDPOINT ?? '',
	PAYMENTS_API_ENDPOINT: process.env.NEXT_PUBLIC_PAYMENTS_API_ENDPOINT ?? ''
} as const

export type Environment = typeof environment
export type EnvironmentKey = keyof Environment

export function useEnvironment(): Environment
export function useEnvironment<T extends EnvironmentKey>(key: T): Environment[T]
export function useEnvironment<T extends EnvironmentKey>(key?: T) {
	if (key === undefined) {
		return environment
	}

	return environment[key]
}
