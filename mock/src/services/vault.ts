import { Express } from 'express';

export const createVaultService = (app: Express, endpoint: string) => {
  app.post(endpoint, async (req, res) => {
    const input = req.body;
    const token = Buffer.from(input.value).toString('base64');

    return res.json({ token });
  });
};
