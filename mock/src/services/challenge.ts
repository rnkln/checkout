import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

// eslint-disable-next-line import/no-extraneous-dependencies
import { http, HttpResponse } from 'msw';

import { payments } from './payment';

const directory = dirname(fileURLToPath(import.meta.url));

let pollCounter = 0;

const getChallengeHTML = (type: string) => {
  const path = join(directory, '..', '..', 'public', `${type}.html`);
  const content = readFileSync(path, 'utf8');

  return content;
};

export const createChallengeService = (endpoint: string) => [
  http.all(`${endpoint}/background-iframe`, async () =>
    HttpResponse.html(getChallengeHTML('background-iframe'))
  ),

  http.all(`${endpoint}/iframe`, async () =>
    HttpResponse.html(getChallengeHTML('iframe'))
  ),

  http.all<{ returnUrl: string }>(
    `${endpoint}/redirect`,
    async ({ params }) => {
      const returnUrl = new URL(params.returnUrl);
      const returnUrlParams = new URLSearchParams(returnUrl.search);
      const paymentId = returnUrlParams.get('id');

      payments.update(
        (p) => p.id === paymentId,
        (p) => ({
          ...p,
          status: 'completed',
          challenges: [],
        })
      );

      return HttpResponse.html(getChallengeHTML('redirect'));
    }
  ),

  http.all<{}, {}, { hints?: Array<string> }>(`${endpoint}/fetch`, async () =>
    HttpResponse.json({ hints: ['hint-from-fetch'] })
  ),

  http.all<{}, {}, { hints?: Array<string> }>(`${endpoint}/poll`, async () => {
    if (pollCounter === 3) {
      pollCounter = 0;
      return HttpResponse.json({ hints: ['hint-from-fetch'] });
    }

    pollCounter += 1;
    return HttpResponse.json({});
  }),
];
