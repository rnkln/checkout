import { useEffect } from 'react';

import { RedirectChallenge as RedirectChallengeType } from '../client/payment_types';

export type RedirectChallengeProps = {
  challenge: RedirectChallengeType;
};

export const RedirectChallenge = ({ challenge }: RedirectChallengeProps) => {
  useEffect(() => {
    window.location.assign(challenge.url)
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  return null;
};
