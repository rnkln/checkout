import { useEffect } from 'react';

import { RedirectChallenge as RedirectChallengeType } from '../client/payment_types';

export type RedirectChallengeProps = {
  challenge: RedirectChallengeType;
};

export const RedirectChallenge = ({ challenge }: RedirectChallengeProps) => {
  useEffect(() => {
    const url = new URL(challenge.url);
    const params = new URLSearchParams(url.search);

    params.append('returnUrl', window.location.href);
    url.search = params.toString();

    window.location.assign(url.toString())
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  return null;
};
