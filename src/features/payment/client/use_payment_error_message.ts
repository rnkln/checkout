import { useTranslation } from 'react-i18next';
import { capitalize } from '@utils/capitalize';
import { TFunction } from 'i18next';
import { paymentCardTypes } from '@lib/card/use_card_type';

import { PaymentErrorCode } from './payment_error';

export type UsePaymentErrorMessageOptions = {
  id?: string;
  name?: string;
};

export const usePaymentErrorMessage = (
  code: PaymentErrorCode,
  options: UsePaymentErrorMessageOptions = {}
) => {
  const { t } = useTranslation();
  const schemes = paymentCardTypes.map(capitalize).join(', ');

  switch (code) {
    case 'payment.amount.limit':
      return t('error-payment-amount-limit');
    case 'payment.card.disabled':
      return t('error-payment-card-disabled');
    case 'payment.card.expired':
      return t('error-payment-card-expired');
    case 'payment.card.lost':
      return t('error-payment-card-lost');
    case 'payment.card.number.invalid':
      return t('error-payment-card-number-invalid');
    case 'payment.card.scheme.not.supported':
      return t('error-payment-card-scheme-not-supported', {
        schemes,
      });
    case 'payment.card.scheme.unknown':
      return t('error-payment-card-scheme-unknown', {
        schemes,
      });
    case 'payment.card.security.code.invalid':
      return t('error-payment-card-security-code-invalid');
    case 'payment.insufficient.funds':
      return t('error-payment-insufficient-funds');
    case 'payment.receiver.blocked':
      return t('error-payment-receiver-blocked');
    case 'payment.rejected.by.issuer':
      return t('error-payment-rejected-by-issuer');
    case 'payment.rejected':
      return withOptions(t, 'error-payment-rejected', options);
    case 'td.secure.failed':
      return t('error-td-secure-failed');
    case 'td.secure.required':
      return t('error-td-secure-required');
    case 'payment.integration.disabled':
    case 'payment.integration.key.unknown':
      return withOptions(t, 'error-payment-integration-error', options);
    default:
      return withOptions(t, 'error-unknown', options);
  }
};

const withOptions = (
  t: TFunction,
  key:
    | 'error-unknown'
    | 'error-payment-integration-error'
    | 'error-payment-rejected',
  { id, name }: UsePaymentErrorMessageOptions = {}
) => {
  if (name) {
    const keyWithContact = `${key}-contact-name` as const;

    return t(keyWithContact, {
      id,
      name,
    });
  }

  return t(key, { id });
};
