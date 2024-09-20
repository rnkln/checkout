import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormState } from 'react-hook-form';
import { ButtonWithLoading } from '@matter/button';
import { useAmountFormatter } from '@lib/amount/use_amount_formatter';

import { Amount } from '../../features/payment/client/payment_types';

export type CardFormButtonProps = {
  busy?: boolean;
  amount?: Amount;
};

export const CardFormButton = ({ busy, amount }: CardFormButtonProps) => {
  const { t, i18n } = useTranslation();
  const { isSubmitting } = useFormState();
  const format = useAmountFormatter({
    locale: i18n.language,
    currency: amount?.currency ?? 'DKK',
  });

  const isBusy = busy || isSubmitting;
  const amountFormatted = amount ? format(amount.decimal) : null;

  const handleClick = (event: MouseEvent) => {
    if (isBusy) {
      event.preventDefault();
    }
  };

  return (
    <ButtonWithLoading
      name="submit"
      type="submit"
      busy={isBusy}
      aria-disabled={isBusy}
      onClick={handleClick}
    >
      {t('cc-pay', { amount: amountFormatted })}
    </ButtonWithLoading>
  );
};
