import type { Request, Response, NextFunction } from 'express'

export const MIN_DELAY = 50
export const MAX_DELAY = 400

export type Delay = 'realistic' | number

export const createDelayMiddleware =
	(delay: Delay) => (req: Request, res: Response, next: NextFunction) => {
		setTimeout(next, delay === 'realistic' ? getRealisticDelay() : delay)
	}

export const parseDelayFromString = (value: string): Delay => {
	if (value === 'realistic') {
		return value
	}

	const valueAsNumber = Number(value)
	if (!Number.isNaN(valueAsNumber)) {
		return valueAsNumber
	}

	throw new Error(
		`Mock: received invalid delay "${value}", valid options are "realistic" | number`
	)
}

const getRealisticDelay = () => {
	return Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY)
}
