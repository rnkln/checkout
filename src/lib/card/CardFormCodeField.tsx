import { useTranslation } from 'react-i18next'
import { TextFieldWithMask } from '@matter/textfield'

import { CardFormCodeHelper } from './CardFormCodeHelper'
import { useCardField } from './use_card_field'

export type CardFormCodeFieldProps = {
	target: string
	disabled?: boolean
}

export const cardFormCodeFieldName = 'cc-csc'

export const CardFormCodeField = ({
	target,
	disabled
}: CardFormCodeFieldProps) => {
	const { t } = useTranslation()
	const { field, fieldState, formState } = useCardField(cardFormCodeFieldName)

	const error =
		fieldState.isDirty || formState.isSubmitted
			? fieldState.error?.message
			: undefined

	return (
		<TextFieldWithMask
			ref={field.ref}
			inputMode="numeric"
			label={t(cardFormCodeFieldName)}
			mask="###"
			name={cardFormCodeFieldName}
			value={field.value}
			error={error}
			disabled={disabled ?? formState.isSubmitting}
			placeholder="000"
			autoComplete={cardFormCodeFieldName}
			adornmentEnd={<CardFormCodeHelper target={target} />}
			onBlur={field.onBlur}
			onChange={field.onChange}
		/>
	)
}
