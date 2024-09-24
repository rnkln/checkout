import { createServer } from '@mswjs/http-middleware';
import chalk from 'chalk'

import { createDelay } from './helpers/delay';
import { createVaultService } from './services/vault';
import { createPaymentService } from './services/payment';
import { createChallengeService } from './services/challenge';

const port = 3001;
const hostname = `http://localhost:${port}`;
const server = createServer(
  ...[
    ...createDelay('real'),
    ...createVaultService('/api/vault'),
    ...createPaymentService('/api/payments'),
    ...createChallengeService('/api/challenge'),
  ]
);

server.listen(port, () => {
  console.log(` ${chalk.green('✓')} Server mock is running at ${hostname}`);
});