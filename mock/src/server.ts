import cors from 'cors';
import express from 'express';

import delay from './helpers/delay.js';
import { createVaultService } from './services/vault.js';
import { createPaymentService } from './services/payment.js';
import { createChallengeService } from './services/challenge.js';

const app = express();
const port = 3001;
const hostname = `http://localhost:${port}`;

app.use(cors());
app.use(delay(20));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('etag', false);

createVaultService(app, '/api/vault');
createPaymentService(app, '/v1/payments');
createChallengeService(app, '/api/challenge');

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${hostname}`);
});

['SIGHUP', 'SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    server.close(() => {
      console.log(`⚡️[server]: Server stopped by ${signal}`);
      process.exit();
    });
  });
});
