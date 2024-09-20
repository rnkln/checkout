import { useTranslation } from 'react-i18next';
import { ButtonWithLoading } from '@matter/button';

import { ApplePayIcon } from './ApplePayIcon';
import * as classes from './ApplePayButton.css';

export type ApplePayButtonProps = {
  autoFocus?: boolean;
  busy?: boolean;
  onClick: () => void;
};

export const ApplePayButton = ({
  autoFocus,
  busy,
  onClick,
  ...otherProps
}: ApplePayButtonProps) => {
  const { t } = useTranslation();

  return (
    <ButtonWithLoading
      busy={busy}
      disabled={busy}
      aria-label={t('cc-pay-with', { provider: 'ApplePay' })}
      className={classes.root}
      onClick={onClick}
      data-test-id="apple-pay-button"
      {...otherProps}
    >
      {t('cc-pay-with', { provider: ' ' })}
      <ApplePayIcon color="default" height={18} />
    </ButtonWithLoading>
  );
};
