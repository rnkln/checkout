import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flex } from '@matter/flex';
import { Button } from '@matter/button';
import { Textfield } from '@matter/textfield';

import { Amount } from '../client/payment_types';

export type PayViewAmountProps = {
  initialAmount?: Amount;
  onComplete: (amount: Amount) => void;
};

export const PayViewAmount = ({
  initialAmount,
  onComplete,
}: PayViewAmountProps) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLInputElement>(null);
  const [decimal, setDecimal] = useState(initialAmount?.decimal ?? '');
  const [currency] = useState(initialAmount?.currency ?? '');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter' && decimal !== '' && currency !== '') {
      onComplete({ decimal, currency })
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const valid = input === '' || /^[0-9.,-]+$/.test(input);

    if (valid) {
      setDecimal(input);
    }
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Flex gap={2} flexDirection="column">
      <Textfield
        ref={ref}
        value={decimal}
        name="amount"
        label={t('pay-amount')}
        autoFocus
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        data-test-id="pay-view-amount-submit"
        disabled={decimal === '' || currency === ''}
        onClick={() => onComplete({ decimal, currency })}
      >
        {t('pay-amount-next')}
      </Button>
    </Flex>
  );
};
