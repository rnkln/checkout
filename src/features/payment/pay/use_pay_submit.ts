import { useCallback, useState } from 'react';

import { usePaymentHints } from '../client/use_payment_hints';
import { usePaymentVault } from '../../vault/client/use_vault';
import { usePaymentSubmit } from '../client/use_payment_patch';
import { CardFormValues } from '../../../lib/card/use_card_values';
import { PaymentError } from '../client/payment_error';
import { PaymentHints, PaymentMethodType } from '../client/payment_types';

export const usePaySubmit = (id: string) => {
  const [error, setError] = useState<PaymentError>();

  const {
    mutateAsync: vault,
    isSuccess: vaultIsSuccess,
    isLoading: vaultIsLoading,
  } = usePaymentVault(id);

  const {
    mutateAsync: hints,
    isSuccess: hintsIsSuccess,
    isLoading: hintsIsLoading,
  } = usePaymentHints(id);

  const {
    data,
    reset: submitReset,
    mutateAsync: submit,
    isSuccess: submitIsSuccess,
    isLoading: submitIsLoading,
  } = usePaymentSubmit(id, { onMutate: () => setError(undefined) });

  const reset = useCallback(() => {
    submitReset();
    setError(undefined);
  }, [submitReset, setError]);

  const handleFailure = useCallback(
    (caught: PaymentError) => {
      submitReset();
      setError(caught);
    },
    [submitReset, setError]
  );

  const handlePay = useCallback(
    async (method: Exclude<PaymentMethodType, 'card'>) => {
      try {
        if (method === 'mobilePay') {
          await submit({
            mobilePay: {
              returnUrl: `${window.location.href}&resume=true`,
            },
          });
        }

        if (method === 'applePay') {
          await submit({
            applePay: true,
          });
        }
      } catch (caught) {
        handleFailure(caught as PaymentError);
      }
    },
    [submit, handleFailure]
  );

  const handlePayWithCard = useCallback(
    async (values: CardFormValues) => {
      try {
        const [number, code] = await vault([
          { type: 'pcn', value: values['cc-number'] },
          { type: 'pcsc', value: values['cc-csc'] },
        ]);

        await submit({
          card: {
            code: code.token,
            number: number.token,
            expiry: {
              month: Number.parseInt(values['cc-exp'].slice(0, 2), 10),
              year: Number.parseInt(`20${values['cc-exp'].slice(2)}`, 10),
            },
          },
        });
      } catch (caught) {
        handleFailure(caught as PaymentError);
      }
    },
    [submit, vault, handleFailure]
  );

  const handleResolve = useCallback(
    async (payload?: PaymentHints) => {
      try {
        if (payload !== undefined) {
          await hints(payload);
        }

        await submit();
      } catch (caught) {
        handleFailure(caught as PaymentError);
      }
    },
    [submit, hints, handleFailure]
  );

  return {
    data,
    reset,
    error: error ?? undefined,
    isSuccess: submitIsSuccess || vaultIsSuccess || hintsIsSuccess,
    isLoading: submitIsLoading || vaultIsLoading || hintsIsLoading,
    handlePay,
    handlePayWithCard,
    handleResolve,
    handleFailure,
  };
};
