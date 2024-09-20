import { PaymentErrorCode } from './payment_error';

export type Amount = {
  currency: string;
  decimal: string;
};

export type Merchant = {
  key: string;
  name?: string;
  logo?: string;
};

export type Config = {
  merchant: Merchant;
  methods: Array<Method>;
};

export type PollChallenge = {
  type: 'poll';
  notBefore: string;
  interval: number;
  url: string;
};

export type FetchChallenge = {
  type: 'fetch';
  url: string;
};

export type IFrameChallenge = {
  type: 'iframe' | 'background-iframe';
  method: 'GET' | 'POST';
  url?: string;
  action?: string;
  fields?: object;
  timeout?: number;
  width?: number;
  height?: number;
};

export type RedirectChallenge = {
  type: 'redirect';
  url: string;
};

export type Challenge =
  | PollChallenge
  | FetchChallenge
  | IFrameChallenge
  | RedirectChallenge;

export const challengeTypes = [
  'poll',
  'fetch',
  'iframe',
  'redirect',
  'background-iframe',
] as const;

export type ChallengeType = (typeof challengeTypes)[number];

export const methodsTypes = ['card', 'mobilePay', 'applePay'] as const;

export type Method = (typeof methodsTypes)[number];

export type Hint = string;

export type Payment = {
  id: string;
  text?: string;
  hints: Array<Hint>;
  amount: Amount;
  method: Method;
  challenges?: Array<Challenge>;
} & (
  | { status: 'pending' | 'completed' }
  | {
      status: 'failed';
      error: PaymentErrorCode;
    }
);
