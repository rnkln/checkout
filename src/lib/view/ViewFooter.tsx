import { useTranslation } from 'react-i18next';
import { Flex } from '@matter/flex';
import { Text } from '@matter/typography';
import { vars } from '@matter/theme/contract.css';
import { ApplePayIcon } from '@lib/applepay/ApplePayIcon';
import { MobilePayIcon } from '@lib/mobilepay/MobilePayIcon';
import { CardIconVisa } from '@lib/card/CardIconVisa';
import { CardIconMastercard } from '@lib/card/CardIconMastercard';
import { Method } from '@features/payment/client/payment_types';
import Lunar from '@public/logo/lunar.svg';

import * as classes from './ViewFooter.css';

export type ViewFooterProps = {
  methods: Array<Method>;
};

export const ViewFooter = ({ methods }: ViewFooterProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      className={classes.root}
      data-test-id="pay-view-footer"
    >
      <Flex gap={0.5} flexDirection="column">
        <Lunar fill={vars.palette.surface.quaternary.main} width={54} />

        <Text color="quaternary" className={classes.message}>
          {t('secure-payments')}
        </Text>
      </Flex>

      <Flex
        gap={2}
        alignItems="center"
        data-test-id="pay-view-footer-providers"
      >
        {methods.includes('mobilePay') && (
          <MobilePayIcon color="grey" height={20} />
        )}

        {methods.includes('applePay') && (
          <ApplePayIcon color="grey" height={18} />
        )}

        {methods.includes('card') && (
          <>
            <CardIconVisa color="grey" height={10} />
            <CardIconMastercard color="grey" height={16} />
          </>
        )}
      </Flex>
    </Flex>
  );
};
