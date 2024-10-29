import type { Request, Response, NextFunction } from 'express'

export const createDelayMiddleware =
	(timeout: number = 200) =>
	(req: Request, res: Response, next: NextFunction) => {
		setTimeout(next, timeout)
	}
