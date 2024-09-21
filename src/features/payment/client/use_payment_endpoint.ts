import { useMemo } from 'react';
import { useEnvironment } from '@setup/use_environment';

export const usePaymentEndpoint = (...paths: Array<string | undefined>) => {
  const PAYMENTS_API_ENDPOINT = useEnvironment('PAYMENTS_API_ENDPOINT');

  return useMemo(
    () =>
      [PAYMENTS_API_ENDPOINT, ...paths]
        .filter((part): part is string => Boolean(part))
        .map((part) => part.replace(/^\//, ''))
        .join('/'),
    [PAYMENTS_API_ENDPOINT, paths]
  );
};
