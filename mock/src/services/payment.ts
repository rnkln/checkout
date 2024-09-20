import crypto from 'crypto';

import { Express, Request, Response } from 'express';

import { Payment, Challenge } from '@features/payment/client/payment_types.js';
import { PaymentErrorCode } from '@features/payment/client/payment_error.js';
import {
  PaymentResponse,
  PaymentPostResponse,
  PaymentPatchResponse,
  PaymentConfigResponse,
} from '@features/payment/client/use_payment.js';

import { Store } from '../helpers/store.js';

export const payments = new Store<Payment>();

export const createPaymentService = (app: Express, endpoint: string) => {
  app.get(`${endpoint}/config`, (req, res: Response<PaymentConfigResponse>) => res.json({
    methods: ['card', 'mobilePay', 'applePay'],
    merchant: {
      key: crypto.randomUUID(),
      logo: 'https://fakeimg.pl/200x200/231070/ffffff?text=Logo&font=bebas',
      name: 'Fake A/S',
    }
  }));

  app.get(`${endpoint}/:id`, (req, res: Response<PaymentResponse>) => {
    const error = extractPaymentError(req);
    const payment = payments.find((p) => p.id === req.params.id);

    if (!payment || error) {
      return sendError(res, 500, error);
    }

    return res.json(payment);
  });

  app.post(endpoint, async (req, res: Response<PaymentPostResponse>) => {
    const payment = req.body;
    const paymentId = crypto.randomUUID();

    payments.insert({
      id: paymentId,
      status: 'pending',
      amount: {
        decimal: '10.57',
        currency: 'DKK',
      },
      challenges: [
        createPoll(),
        createFetch(),
        createIFrame('iframe'),
        createIFrame('background-iframe'),
        createRedirect('http://localhost:3000'),
      ],
      ...payment,
    });

    return res.json({
      paymentId,
    });
  });

  app.patch(
    `${endpoint}/:id`,
    async (req, res: Response<PaymentPatchResponse>) => {
      const error = extractPaymentError(req);
      const payment = payments.find((p) => p.id === req.params.id);

      if (!payment) {
        return sendError(res);
      }

      if (error) {
        payments.update(
          (p) => p.id === payment.id,
          (p) => ({
            ...p,
            error,
            status: 'failed',
            challenges: [],
          })
        );

        return res.json({});
      }

      payments.update(
        (p) => p.id === payment.id,
        (p) => ({
          ...p,
          status: 'completed',
          challenges: [],
        })
      );

      return res.json({});
    }
  );
};

const extractPaymentError = (req: Request) =>
  req.headers['x-mock-error-code'] as PaymentErrorCode;

const sendError = (
  res: Response,
  status: number = 404,
  code?: PaymentErrorCode
) =>
  res.status(status).json({
    code: code ?? 'entity.not.found',
    message: 'payment error debugging message',
  });

const createPoll = (): Challenge => {
  const notBefore = new Date()
  notBefore.setSeconds(notBefore.getSeconds() + 5)
  
  return {
    type: 'poll',
    notBefore: notBefore.toISOString(),
    interval: 1000,
    url: `http://localhost:3001/api/challenge/poll`
  }
};

const createFetch = (): Challenge => ({
  type: 'fetch',
  url: `http://localhost:3001/api/challenge/fetch`,
});

const createIFrame = (type: 'iframe' | 'background-iframe'): Challenge => {
  const path = `http://localhost:3001/api/challenge/${type}`;
  const method = Math.random() < 0.5 ? 'GET' : 'POST';
  const generate = () =>
    Array.from({ length: Math.floor(Math.random() * 3) }, (v, i) => i).reduce(
      (acc, index) => ({ ...acc, [`field${index}`]: `value${index}` }),
      {}
    );

  return {
    type,
    method,
    url: method === 'GET' ? path : undefined,
    action: method === 'POST' ? path : undefined,
    fields: method === 'POST' ? generate() : undefined,
    width: type === 'iframe' ? 400 : undefined,
    height: type === 'iframe' ? 400 : undefined,
    timeout: 10000,
  };
};

const createRedirect = (url: string): Challenge => ({
  type: 'redirect',
  url: `http://localhost:3001/api/challenge/redirect?returnUrl=${url}`,
});
