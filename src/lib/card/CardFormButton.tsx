import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormState } from 'react-hook-form';
import { ButtonWithLoading } from '@matter/button';

export type CardFormButtonProps = {
  busy?: boolean;
  amount?: string;
};

export const CardFormButton = ({ busy, amount }: CardFormButtonProps) => {
  const { t } = useTranslation();
  const { isSubmitting } = useFormState();

  const isBusy = busy || isSubmitting;

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
      {t('cc-pay', { amount })}
    </ButtonWithLoading>
  );
};
