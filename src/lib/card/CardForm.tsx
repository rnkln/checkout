import { useCallback, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from 'react-hook-form';
import { useId } from '@matter/utils/useId';
import { Flex } from '@matter/flex';

import { CardFormButton } from './CardFormButton';
import { CardFormCodeField } from './CardFormCodeField';
import { CardFormExpiryField } from './CardFormExpiryField';
import { CardFormNumberField } from './CardFormNumberField';
import { useCardResolver } from './use_card_validation';
import {
  useCardDefaultValues,
  CardFormValues,
  CardFormValuesPartial,
} from './use_card_values';
import * as classes from './CardForm.css';

export type CardFormProps = {
  id?: string;
  busy?: boolean;
  amount?: string;
  autoFocus?: boolean;
  defaultValues?: CardFormValuesPartial;
  onSubmit: (values: CardFormValues) => void;
};

export const CardForm = ({
  id: idProp,
  busy,
  amount,
  autoFocus,
  defaultValues: defaultValuesProp = {},
  onSubmit,
}: CardFormProps) => {
  const { t } = useTranslation();
  const resolver = useCardResolver(t);
  const id = useId(idProp);
  const form = useForm<CardFormValues>({
    mode: 'onTouched',
    resolver,
    shouldFocusError: true,
    defaultValues: useCardDefaultValues(defaultValuesProp),
  });

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    },
    [form, onSubmit]
  );

  return (
    <FormProvider {...form}>
      <Flex
        id={id}
        as="form"
        gap={4}
        className={classes.root}
        flexDirection="column"
        alignItems="flex-start"
        data-test-id="card-form"
        onSubmit={handleSubmit}
      >
        <div className={classes.grid}>
          <CardFormNumberField
            autoFocus={autoFocus}
            disabled={busy}
            className={classes.number}
          />

          <CardFormExpiryField disabled={busy} />

          <CardFormCodeField target={id} disabled={busy} />
        </div>

        <CardFormButton amount={amount} busy={busy} />
      </Flex>
    </FormProvider>
  );
};
