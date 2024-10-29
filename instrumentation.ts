export async function register() {
	if (
		process.env.NEXT_RUNTIME === 'nodejs' &&
		process.env.NEXT_PUBLIC_API_MOCK === 'true'
	) {
		await import('./mock/src/server')
	}
}
