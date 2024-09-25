import { useTranslation } from 'react-i18next'
import { Spinner } from '@matter/loading'
import { View } from '@lib/view/View'
import { ViewContent } from '@lib/view/ViewContent'
import { ViewFooter } from '@lib/view/ViewFooter'
import { ViewError } from '@lib/view/ViewError'

import {
	usePayment,
	usePaymentConfig,
	usePaymentPatch
} from '../client/use_payment'
import type { Hint } from '../client/payment_types'
import { ViewHeader } from '../../../lib/view/ViewHeader'

import {
	useChallengeParams,
	type ChallengeParams
} from './use_challenge_params'
import { ChallengeViewSuccess } from './ChallengeViewSuccess'
import { ChallengeViewSelector } from './ChallengeViewSelector'
import { PollChallenge } from './PollChallenge'
import { FetchChallenge } from './FetchChallenge'
import { RedirectChallenge } from './RedirectChallenge'
import { IFrameChallenge } from './IFrameChallenge'
import { wrapAsync } from '@matter/utils/wrapAsync'

export const ChallengeView = () => {
	const { id, ...otherParams } = useChallengeParams()
	const { t } = useTranslation()

	if (!id) {
		return <div>{t('error-unknown')}</div>
	}

	return <ChallengeViewInner id={id} {...otherParams} />
}

export const ChallengeViewInner = ({
	id,
	redirect,
	strategy
}: {
	id: string
	redirect: ChallengeParams['redirect']
	strategy: ChallengeParams['strategy']
}) => {
	const { t } = useTranslation()

	const {
		data: config,
		isError: isConfigError,
		isLoading: isConfigLoading
	} = usePaymentConfig()
	const {
		data: payment,
		refetch,
		isError: isPaymentError,
		isLoading: isPaymentLoading
	} = usePayment(id)
	const { mutateAsync: patch } = usePaymentPatch(id)

	const handleResolve = wrapAsync(async (hints: Hint[] = []) => {
		await patch(hints)
		await refetch()
	})

	if (isConfigError || isPaymentError) {
		return <div>{t('error-unknown')}</div>
	}

	if (isConfigLoading || isPaymentLoading) {
		return <Spinner data-test-id="challenge-view-loading" />
	}

	return (
		<View data-test-id="challenge-view">
			<ViewHeader
				busy={payment.status === 'pending'}
				amount={payment.amount}
				merchant={config.merchant}
			/>

			<ViewContent>
				{payment.status === 'completed' && (
					<ChallengeViewSuccess redirect={redirect} />
				)}

				{payment.status === 'failed' && (
					<ViewError
						code={payment.error}
						options={{ id, name: config.merchant.name }}
					/>
				)}

				<ChallengeViewSelector
					strategy={strategy}
					challenges={payment.challenges}
				>
					{(challenge) => {
						if (!challenge) {
							return <Spinner data-test-id="challenge-loading" />
						}

						switch (challenge.type) {
							case 'redirect':
								return (
									<RedirectChallenge challenge={challenge} />
								)
							case 'poll':
								return (
									<PollChallenge
										challenge={challenge}
										onResolve={handleResolve}
									/>
								)
							case 'fetch':
								return (
									<FetchChallenge
										challenge={challenge}
										onResolve={handleResolve}
									/>
								)
							case 'iframe':
							case 'background-iframe':
								return (
									<IFrameChallenge
										challenge={challenge}
										onResolve={handleResolve}
									/>
								)
							default:
								return (
									<Spinner data-test-id="challenge-loading" />
								)
						}
					}}
				</ChallengeViewSelector>
				<ViewFooter methods={config.methods} />
			</ViewContent>
		</View>
	)
}
