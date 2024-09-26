import { http, delay } from 'msw'

export const createDelay = (input: string) => {
	const inputAsNumber = Number(input)
	const inputAsDelay = !Number.isNaN(inputAsNumber) ? inputAsNumber : input

	if (
		typeof inputAsDelay === 'string' &&
		inputAsDelay !== 'real' &&
		inputAsDelay !== 'infinite'
	) {
		throw new Error(
			`Mock: received invalid delay "${input}", valid options are "real" | "infinite" | number`
		)
	}

	return [
		http.all('*', async () => {
			await delay(inputAsDelay)
		})
	]
}
