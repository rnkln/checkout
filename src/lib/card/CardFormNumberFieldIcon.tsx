import type { CSSProperties } from 'react'

import type { CardType } from './use_card_type'
import Visa from './CardIconVisa.svg'
import Mastercard from './CardIconMastercard.svg'

export type CardFormNumberFieldIconProps = {
	type: CardType
	style?: CSSProperties
	className?: string
}

export const CardFormNumberFieldIcon = ({
	type,
	style,
	className
}: CardFormNumberFieldIconProps) => {
	const Icon = getCardIconByType(type)
	const height = getCardIconHeightByType(type)

	return (
		<Icon
			role="presentation"
			height={height}
			style={{ display: 'block', ...style }}
			className={className}
			aria-hidden
			data-test-id={`card-icon-${type}`}
		/>
	)
}

const getCardIconByType = (type?: CardType) => {
	switch (type) {
		case 'visa':
			return Visa
		case 'mastercard':
			return Mastercard
		default:
			throw Error('unsupported card type')
	}
}

const getCardIconHeightByType = (type?: CardType) => {
	switch (type) {
		case 'visa':
			return 10
		default:
			return 14
	}
}
