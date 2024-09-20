import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { methodsTypes } from '../client/payment_types';

export type PayParams = {
  locale?: string;
  redirect?: string;
  decimal?: string;
  currency?: string;
  strategy?: 'auto' | 'manual';
};

export const usePayParams = () => {
  const router = useRouter();

  return useMemo(() => {
    const params = new URLSearchParams(router.asPath.split('?')[1]);

    return {
      method: asMethod(params.get('method')),
      decimal: asString(params.get('decimal')),
      currency: asString(params.get('currency')),
      locale: asString(params.get('locale')),
      redirect: asString(params.get('redirect')),
      strategy: asStrategy(params.get('strategy')),
    };
  }, [router.asPath]);
};

const asString = (value: string | null) => value ?? undefined;

const asMethod = (value: string | null) => {
  if (!value) {
    return undefined;
  }

  return methodsTypes.find(
    (method) => value?.toLowerCase() === method.toLocaleLowerCase()
  );
};

const asStrategy = (value: string | null) => {
  if (!value && value !== 'auto' && value !== 'manual') {
    return undefined;
  }

  return value.toLocaleLowerCase() as 'auto' | 'manual';
};
