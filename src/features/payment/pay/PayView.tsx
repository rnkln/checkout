import { useState } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from '@matter/loading';
import { View } from '@lib/view/View';
import { ViewContent } from '@lib/view/ViewContent';
import { toUrlParams } from '@utils/toUrlParams';
import { ViewHeader } from '@lib/view/ViewHeader';
import { ViewFooter } from '@lib/view/ViewFooter';

import { usePaymentConfig, usePaymentPost } from '../client/use_payment';
import { Amount } from '../client/payment_types';

import { usePayParams } from './use_pay_params';
import { PayViewAmount } from './PayViewAmount';
import { PayViewMethods, PayViewMethodsResult } from './PayViewMethods';

export const PayView = () => {
  const router = useRouter();
  const {
    decimal,
    currency = 'DKK',
    method,
    redirect,
    strategy,
  } = usePayParams();

  const { data: config, isLoading, isError } = usePaymentConfig();
  const { mutateAsync: create, isLoading: isCreating } = usePaymentPost();

  const [amount, setAmount] = useState<Amount>(() => ({
    decimal: decimal ?? '',
    currency: currency ?? '',
  }));

  const shouldShowAmountView = amount.decimal === '' || amount.currency === '';
  const shouldShowMethodView = !shouldShowAmountView;

  const handleAmount = (result: Amount) => {
    setAmount(result);
    
    router.push(`/?${toUrlParams({
      decimal: result.decimal,
      currency: result.currency,
      method,
      redirect,
      strategy
    })}`, undefined, { shallow: true })
  }

  const handlePay = async (result: PayViewMethodsResult) => {
    const { paymentId } = await create(
      result.method === 'card'
        ? {
            amount,
            card: {
              number: result.values['cc-number'],
              code: result.values['cc-csc'],
              expiry: {
                month: Number.parseInt(result.values['cc-exp'].slice(0, 2), 10),
                year: Number.parseInt(
                  `20${result.values['cc-exp'].slice(2)}`,
                  10
                ),
              },
            },
          }
        : { amount, [result.method as 'mobilePay']: true }
    );

    router.push(
      `/challenge?${toUrlParams({
        id: paymentId,
        redirect,
        strategy,
      })}`
    );
  };

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  if (isLoading) {
    return <Spinner data-test-id="pay-view-loading" />;
  }

  return (
    <View data-test-id="pay-view">
      <ViewHeader
        busy={isCreating}
        amount={shouldShowMethodView ? amount : undefined}
        merchant={config.merchant}
      />

      <ViewContent>
        {shouldShowAmountView && (
          <PayViewAmount initialAmount={amount} onComplete={handleAmount} />
        )}
        {shouldShowMethodView && (
          <PayViewMethods
            busy={isCreating}
            methods={config.methods}
            preferred={method}
            onComplete={handlePay}
          />
        )}

        <ViewFooter methods={config.methods} />
      </ViewContent>
    </View>
  );
};
