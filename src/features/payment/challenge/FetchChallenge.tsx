import {
  Hint,
  FetchChallenge as FetchChallengeType,
} from '../client/payment_types';
import { useEffect } from 'react';

export type FetchChallengeProps = {
  challenge: FetchChallengeType;
  onResolve: (hints?: Array<Hint>) => void;
};

export const FetchChallenge = ({
  challenge,
  onResolve,
}: FetchChallengeProps) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(challenge.url);
      const result = await response.json();

      onResolve(result.hints)
    };

    fetchData();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return null;
};
