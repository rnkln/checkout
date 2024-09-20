import { useCallback } from 'react';

export const usePaymentFetch = () =>
  useCallback(
    async (
      input: URL | RequestInfo,
      { headers, ...init }: RequestInit = {}
    ) => {
      try {
        const response = await fetch(input, {
          ...init,
          headers: {
            ...headers,
            'x-forwarded-referer': document.referrer,
          },
        });

        if (!response.ok) {
          throw new Error();
        }

        return response;
      } catch (error) {
        throw new Error('An unexpected error occured');
      }
    },
    []
  );
