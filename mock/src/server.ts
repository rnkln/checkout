import { createServer } from '@mswjs/http-middleware'
import chalk from 'chalk'

import { createDelay } from './helpers/delay'
import { createVaultService } from './services/vault'
import { createPaymentService } from './services/payment'
import { createChallengeService } from './services/challenge'

const delay = process.env.NEXT_PUBLIC_API_MOCK_DELAY ?? 'real'

console.log(delay)

const port = 3001
const hostname = `http://localhost:${port}`
const server = createServer(
	...[
		...createDelay(delay),
		...createVaultService('/api/vault'),
		...createPaymentService('/api/payments'),
		...createChallengeService('/api/challenge')
	]
)

server.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(` ${chalk.green('✓')} Server mock is running at ${hostname}`)
})
