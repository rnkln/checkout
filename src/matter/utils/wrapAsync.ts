export function wrapAsync<ARGS extends unknown[]>(
	fn: (...args: ARGS) => Promise<unknown>
): (...args: ARGS) => void {
	return (...args) => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fn(...args)
	}
}
