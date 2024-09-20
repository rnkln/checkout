import { useMemo, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export type QueryProps = {
  children: ReactNode;
};

export const Query = ({ children }: QueryProps) => {
  const client = useQueryClient();

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

const useQueryClient = () =>
  useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      }),
    []
  );
