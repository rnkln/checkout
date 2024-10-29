import {
	type ChangeEvent,
	type KeyboardEvent,
	useEffect,
	useRef,
	useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from '@matter/flex'
import { Button } from '@matter/button'
import { Textfield } from '@matter/textfield'

export type PayViewAmountProps = {
	initial?: string
	onComplete: (amount: string) => void
}

export const PayViewAmount = ({
	initial = '',
	onComplete
}: PayViewAmountProps) => {
	const { t } = useTranslation()
	const ref = useRef<HTMLInputElement>(null)
	const [decimal, setDecimal] = useState(initial)

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && decimal !== '') {
			onComplete(decimal)
		}
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const input = event.target.value
		const valid = input === '' || /^[0-9.,-]+$/.test(input)

		if (valid) {
			setDecimal(input)
		}
	}

	useEffect(() => {
		ref.current?.focus()
	}, [])

	return (
		<Flex gap={2} flexDirection="column">
			<Textfield
				ref={ref}
				value={decimal}
				name="amount"
				label={t('pay-amount')}
				// eslint-disable-next-line jsx-a11y/no-autofocus
				autoFocus
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>
			<Button
				data-test-id="pay-view-amount-submit"
				disabled={decimal === ''}
				onClick={() => onComplete(decimal)}
			>
				{t('pay-amount-next')}
			</Button>
		</Flex>
	)
}
