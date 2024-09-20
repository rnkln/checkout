import { ChangeEvent, useEffect, useRef, useState } from 'react';
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
  const ref = useRef<HTMLInputElement>(null);
  const [decimal, setDecimal] = useState(initialAmount?.decimal ?? '');
  const [currency] = useState(initialAmount?.currency ?? '');

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
        label="Amount"
        autoFocus
        onChange={handleChange}
      />
      <Button
        data-test-id="pay-view-amount-submit"
        disabled={decimal === '' || currency === ''}
        onClick={() => onComplete({ decimal, currency })}
      >
        Next
      </Button>
    </Flex>
  );
};
