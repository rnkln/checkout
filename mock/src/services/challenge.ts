import { Express } from 'express';
import { payments } from './payment.js';

export const root = '/mock/public/';

let pollCounter = 0

export const createChallengeService = (app: Express, endpoint: string) => {
  app.all(`${endpoint}/background-iframe`, async (req, res) => {
    return res.sendFile('challenge-background-iframe.html', { root });
  });

  app.all(`${endpoint}/iframe`, async (req, res) => {
    return res.sendFile('iframe.html', { root });
  });

  app.all(`${endpoint}/redirect`, async (req, res) => {
     // @ts-expect-error returnUrl not defined as param
    const returnUrl = new URL(req.query.returnUrl)
    const returnUrlParams = new URLSearchParams(returnUrl.search);
    const paymentId = returnUrlParams.get('id')

    payments.update(
      (p) => p.id === paymentId,
      (p) => ({
        ...p,
        status: 'completed',
        challenges: [],
      })
    );

    return res.sendFile('redirect.html', { root });
  });

  app.all(`${endpoint}/fetch`, async (req, res) => {
    return res.json({ hints: ['hint-from-fetch'] });
  });

  app.all(`${endpoint}/poll`, async (req, res) => {
    if(pollCounter === 3) {
      pollCounter = 0;
      return res.json({ hints: ['hint-from-poll'] });
    }

    pollCounter++;
    return res.json({});
  });
};
