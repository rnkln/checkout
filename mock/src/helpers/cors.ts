import type { Request, Response, NextFunction } from 'express'

export const createCorsMiddleware =
	() => (req: Request, res: Response, next: NextFunction) => {
		res.set('Access-Control-Allow-Origin', '*')
		res.set('Access-Control-Allow-Headers', '*')
		res.set('Access-Control-Allow-Methods', '*')

		if (req.method.toUpperCase() === 'OPTIONS') {
			res.statusCode = 204 // No Content
			res.end()
		} else {
			next()
		}
	}
