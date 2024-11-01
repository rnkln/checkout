import { useTranslation } from 'react-i18next'
import { TextFieldWithMask, TextfieldAdornment } from '@matter/textfield'

import { CardFormNumberFieldIcon } from './CardFormNumberFieldIcon'
import { useCardType } from './use_card_type'
import { useCardField } from './use_card_field'

export const cardFormNumberFieldName = 'cc-number'

export type CardFormNumberFieldProps = {
	autoFocus?: boolean
	disabled?: boolean
	className?: string
}

export const CardFormNumberField = ({
	autoFocus,
	disabled,
	className
}: CardFormNumberFieldProps) => {
	const { t } = useTranslation()
	const { field, fieldState, formState } = useCardField(
		cardFormNumberFieldName
	)

	const type = useCardType(field.value)
	const error =
		fieldState.isDirty || formState.isSubmitted
			? fieldState.error?.message
			: undefined

	const icon = type ? (
		<TextfieldAdornment>
			<CardFormNumberFieldIcon type={type} />
		</TextfieldAdornment>
	) : undefined

	return (
		<TextFieldWithMask
			ref={field.ref}
			adornmentEnd={icon}
			// eslint-disable-next-line jsx-a11y/no-autofocus
			autoFocus={autoFocus}
			inputMode="numeric"
			label={t(cardFormNumberFieldName)}
			mask="#### #### #### ####"
			name={cardFormNumberFieldName}
			value={field.value}
			error={error}
			disabled={disabled ?? formState.isSubmitting}
			className={className}
			placeholder="0000000000000000"
			autoComplete={cardFormNumberFieldName}
			onBlur={field.onBlur}
			onChange={field.onChange}
		/>
	)
}
