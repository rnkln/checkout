import type {
	Hint,
	FetchChallenge as FetchChallengeType
} from '../client/payment_types'
import { useEffect } from 'react'

export type FetchChallengeProps = {
	challenge: FetchChallengeType
	onResolve: (hints?: Hint[]) => void
}

export const FetchChallenge = ({
	challenge,
	onResolve
}: FetchChallengeProps) => {
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(challenge.url)
			const result = (await response.json()) as { hints?: Hint[] }

			onResolve(result.hints)
		}

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetchData()
	}, [challenge.url, onResolve])

	return null
}
