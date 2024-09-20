import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { vars } from '@matter/theme/contract.css';
import { Accordion, AccordionPanel } from '@matter/accordion';
import { ApplePayButton } from '@lib/applepay/ApplePayButton';
import { MobilePayButton } from '@lib/mobilepay/MobilePayButton';
import { toKebabCase } from '@utils/toKebabCase';
import { useAmountFormatted } from '@lib/amount/use_amount_formatted';

import { Amount, Method } from '../client/payment_types';
import { CardForm } from '../../../lib/card/CardForm';
import { CardFormValues } from '../../../lib/card/use_card_values';

export type PayViewMethodsResult =
  | {
      method: Exclude<Method, 'card'>;
    }
  | {
      method: 'card';
      values: CardFormValues;
    };

export type PayViewMethodsProps = {
  busy?: boolean;
  amount: Amount;
  methods: Array<Method>;
  preferred?: Method;
  onComplete: (result: PayViewMethodsResult) => void;
};

export const PayViewMethods = ({
  busy,
  amount,
  methods,
  preferred,
  onComplete,
}: PayViewMethodsProps) => {
  const { t, i18n } = useTranslation();

  const amountFormatted = useAmountFormatted({
    locale: i18n.language,
    amount,
  });

  const methodsSorted: Array<Method> = useMemo(
    () =>
      methods.includes('card')
        ? [...methods.filter((method) => method !== 'card'), 'card']
        : methods,
    [methods]
  );

  const [expanded, setExpanded] = useState(preferred || methodsSorted[0]);

  const handleChange = (method: Method) => () => setExpanded(method);

  if (methodsSorted.length === 1) {
    return renderMethod(methodsSorted[0], amountFormatted, {
      busy,
      autoFocus: true,
      onComplete,
    });
  }

  return (
    <Accordion
      style={{ marginBlockStart: `calc(${vars.spacing[2]} * -1` }}
      data-test-id="pay-view-methods"
    >
      {methodsSorted.map((method) => (
        <AccordionPanel
          key={method}
          title={getTitleByMethod(t, method)}
          expanded={expanded === method}
          disabled={busy}
          data-test-id={`pay-view-methods-${toKebabCase(method)}`}
          onChange={handleChange(method)}
        >
          <div style={{ padding: `${vars.spacing[2]} ${vars.spacing[4]}` }}>
            {renderMethod(method, amountFormatted, {
              busy,
              autoFocus: method === preferred,
              onComplete,
            })}
          </div>
        </AccordionPanel>
      ))}
    </Accordion>
  );
};

const getTitleByMethod = (t: TFunction, method: Method) => {
  const i18nKey = `method-${toKebabCase(method)}` as const;

  return t(i18nKey);
};

const renderMethod = (
  method: Method,
  amount: string,
  props: Omit<PayViewMethodsProps, 'amount' | 'methods'> & {
    autoFocus?: boolean;
  }
) => {
  switch (method) {
    case 'applePay':
      return (
        <ApplePayButton
          busy={props.busy}
          onClick={() => props.onComplete({ method: 'applePay' })}
        />
      );
    case 'mobilePay':
      return (
        <MobilePayButton
          busy={props.busy}
          onClick={() => props.onComplete({ method: 'mobilePay' })}
        />
      );
    case 'card':
      return (
        <CardForm
          amount={amount}
          autoFocus={props.autoFocus}
          busy={props.busy}
          onSubmit={(values) => props.onComplete({ method: 'card', values })}
        />
      );
    default:
      throw Error('Unsupported method');
  }
};
