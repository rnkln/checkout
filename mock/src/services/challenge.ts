import { Express } from 'express';

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
