import { useTranslation } from 'react-i18next';
import { useTimeout } from '@matter/utils/useTimeout';
import { Flex } from '@matter/flex';
import { Text } from '@matter/typography';
import Lottie from 'lottie-react';

import success from './ChallengeViewSuccess.lottie.json';
import * as classes from './ChallengeViewSuccess.css';

export type ChallengeViewSuccessProps = {
  delay?: number;
  redirect?: string;
};

export const ChallengeViewSuccess = ({
  redirect,
  delay = 4000,
}: ChallengeViewSuccessProps) => {
  const { t } = useTranslation();

  useTimeout(
    () => {
      if (window.parent !== window || window.opener !== null) {
        window.parent.postMessage('success', '*');
      } else if (redirect !== undefined) {
        window.location.assign(redirect);
      }
    },
    {
      delay,
    }
  );

  return (
    <Flex
      gap={5}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className={classes.root}
      data-test-id="pay-challenge-view-success"
    >
      <Lottie
        animationData={success}
        data-test-id="pay-challenge-view-success-lottie"
      />
      <Flex
        gap={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={6} fontWeight="medium" color="primary">
          {t('pay-success')}
        </Text>

        {redirect && (
          <Text fontSize={2} color="secondary">
            {t('pay-success-redirect')}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
