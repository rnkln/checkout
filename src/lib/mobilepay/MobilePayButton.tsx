import localFont from 'next/font/local';
import { useTranslation } from 'react-i18next';
import { ButtonWithLoading } from '@matter/button';
import clsx from 'clsx';

import { MobilePayIcon } from './MobilePayIcon';
import * as classes from './MobilePayButton.css';

export type MobilePayButtonProps = {
  autoFocus?: boolean;
  busy?: boolean;
  onClick: () => void;
};

export const MobilePayFont = localFont({
  src: [
    {
      path: './MobilePayBold.woff2',
      style: 'normal',
      weight: '700',
    },
  ],
});

export const MobilePayButton = ({
  autoFocus,
  busy,
  onClick,
}: MobilePayButtonProps) => {
  const { t } = useTranslation();
  const className = clsx(classes.root, MobilePayFont.className);

  return (
    <ButtonWithLoading
      busy={busy}
      aria-disabled={busy}
      autoFocus={autoFocus}
      className={className}
      data-test-id="mobile-pay-button"
      onClick={busy ? undefined : onClick}
    >
      <MobilePayIcon color="white" height={20} />

      {t('cc-pay-with', { provider: 'MobilePay' })}
    </ButtonWithLoading>
  );
};
