import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { TextFieldWithMask } from '@matter/textfield'

import { cardFormCodeFieldName } from './CardFormCodeField'
import { useCardField } from './use_card_field'

export type CardFormExpiryFieldProps = {
	disabled?: boolean
}

export const cardFormExpiryFieldName = 'cc-exp'

export const CardFormExpiryField = ({ disabled }: CardFormExpiryFieldProps) => {
	const { t } = useTranslation()
	const { field, fieldState, formState } = useCardField(
		cardFormExpiryFieldName
	)

	const error =
		fieldState.isDirty || formState.isSubmitted
			? fieldState.error?.message
			: undefined

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		field.onChange(event)

		if (event.target.value.length === 4) {
			document.getElementsByName(cardFormCodeFieldName)[0].focus()
		}
	}

	return (
		<TextFieldWithMask
			ref={field.ref}
			inputMode="numeric"
			label={t(cardFormExpiryFieldName)}
			mask="## / ##"
			name={cardFormExpiryFieldName}
			value={field.value}
			error={error}
			disabled={disabled ?? formState.isSubmitting}
			placeholder="MMYY"
			autoComplete={cardFormExpiryFieldName}
			onBlur={field.onBlur}
			onChange={handleChange}
		/>
	)
}
