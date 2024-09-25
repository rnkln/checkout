import { useTranslation } from 'react-i18next'
import { Flex } from '@matter/flex'
import { Text } from '@matter/typography'
import { Avatar } from '@matter/avatar'
import { Spinner } from '@matter/loading'
import { Amount } from '@lib/amount/Amount'
import type {
	Amount as AmountType,
	Merchant
} from '@features/payment/client/payment_types'

import * as classes from './ViewHeader.css'

export type ViewHeaderProps = {
	busy?: boolean
	amount?: AmountType
	merchant: Merchant
}

export const ViewHeader = ({ busy, amount, merchant }: ViewHeaderProps) => {
	const { t, i18n } = useTranslation()

	return (
		<Flex
			gap={1}
			alignItems="center"
			justifyContent="space-between"
			className={classes.root}
		>
			<Flex
				gap={1}
				alignItems="center"
				flexDirection="row"
				className={classes.merchant}
				data-test-id="pay-view-merchant"
			>
				<Avatar
					src={merchant.logo}
					alt={t('merchant-logo', { name: merchant.name })}
					size={1}
					data-test-id="pay-view-merchant-avatar"
				>
					{merchant.name
						?.split(' ')
						.map((part) => part.charAt(0))
						.join('')}
				</Avatar>

				{busy ? (
					<Spinner
						radius={24}
						thickness={2}
						className={classes.spinner}
					/>
				) : null}

				<Text
					color="primary"
					fontSize={5}
					fontWeight="medium"
					data-test-id="pay-view-merchant-name"
				>
					{merchant.name}
				</Text>
			</Flex>

			{amount ? (
				<Amount
					amount={amount}
					locale={i18n.language}
					color="primary"
					fontSize={5}
					fontWeight="medium"
					data-test-id="pay-view-amounts-amount"
				/>
			) : null}
		</Flex>
	)
}
