import type {
	Hint,
	PollChallenge as PollChallengeType
} from '../client/payment_types'
import { useEffect } from 'react'

export type PollChallengeProps = {
	challenge: PollChallengeType
	onResolve: (hints?: Hint[]) => void
}

export const PollChallenge = ({ challenge, onResolve }: PollChallengeProps) => {
	useEffect(() => {
		const fetchData = async () => {
			const now = new Date()
			const threshold = new Date(challenge.notBefore)

			if (now > threshold) {
				const response = await fetch(challenge.url)
				const result = (await response.json()) as { hints?: Hint[] }

				if (result.hints) {
					onResolve(result.hints)
				}
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		const interval = setInterval(fetchData, challenge.interval)

		return () => clearInterval(interval)
	}, [challenge.interval, challenge.notBefore, challenge.url, onResolve])

	return null
}
