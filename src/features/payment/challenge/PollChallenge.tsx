import {
  Hint,
  PollChallenge as PollChallengeType,
} from '../client/payment_types';
import { useEffect } from 'react';

export type PollChallengeProps = {
  challenge: PollChallengeType;
  onResolve: (hints?: Array<Hint>) => void;
};

export const PollChallenge = ({ challenge, onResolve }: PollChallengeProps) => {
  useEffect(() => {
     const interval = setInterval(async () => {
      const now = new Date();
      const threshold = new Date(challenge.notBefore);

      if(now > threshold) {
        console.log('check')
        const response = await fetch(challenge.url);
        const result = await response.json();
  
        if (result.hints) {
          clearInterval(interval)
          onResolve(result.hints)
        }
      }
    }, challenge.interval);

    return () => clearInterval(interval);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return null;
};
