import chalk from 'chalk'
import express from 'express'
import { createMiddleware } from '@mswjs/http-middleware'
import { createCorsMiddleware } from './helpers/cors'
import { createDelayMiddleware } from './helpers/delay'
import { createVaultService } from './services/vault'
import { createPaymentService } from './services/payment'
import { createChallengeService } from './services/challenge'

const app = express()
const url = new URL(process.env.NEXT_PUBLIC_API_ENDPOINT ?? '')
const port = 3001
const pathname = url.pathname

app.use(createCorsMiddleware())
app.use(createDelayMiddleware(200))
app.use(
	createMiddleware(
		...[
			...createVaultService(pathname + '/vault'),
			...createPaymentService(pathname + '/payments'),
			...createChallengeService(pathname + '/challenge')
		]
	)
)

app.listen(url.port, () => {
	// eslint-disable-next-line no-console
	console.log(
		` ${chalk.green('✓')} Server mock is running at http://localhost:${port}`
	)
})
