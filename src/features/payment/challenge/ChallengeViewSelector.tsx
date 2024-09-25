import { useState } from 'react'
import { Flex } from '@matter/flex'
import { Heading } from '@matter/typography'

import { type Challenge, challengeTypes } from '../client/payment_types'

export type ChallengeViewSelectorProps = {
	strategy?: 'auto' | 'manual'
	challenges?: Challenge[]
	children: (challenge: Challenge | undefined) => JSX.Element
}

export const ChallengeViewSelector = ({
	strategy = 'auto',
	challenges: challengesProp,
	children
}: ChallengeViewSelectorProps) => {
	const challenges = challengesProp ?? []
	const [challenge, setChallenge] = useState<Challenge | undefined>(() =>
		getChallenge(strategy, challenges)
	)

	if (!challenge && challenges.length > 0) {
		return (
			<Flex
				gap={4}
				alignItems="center"
				flexDirection="column"
				data-test-id="challenge-view-selector"
			>
				<Heading>Challenges</Heading>

				<Flex flexDirection="column" gap={2}>
					{[...challenges]
						.sort(
							(a, b) =>
								getChallengePriority(a) -
								getChallengePriority(b)
						)
						.map((c) => (
							<button
								key={c.type}
								type="button"
								onClick={() => setChallenge(c)}
								data-test-id={`challenge-view-selector-${c.type}`}
							>
								{c.type}
							</button>
						))}
				</Flex>
			</Flex>
		)
	}

	return children(challenge)
}

const getChallenge = (
	strategy: ChallengeViewSelectorProps['strategy'],
	challenges: Challenge[]
) =>
	strategy === 'manual'
		? undefined
		: [...challenges]
				.sort(
					(a, b) => getChallengePriority(a) - getChallengePriority(b)
				)
				.find((challenge) => challengeTypes.includes(challenge.type))

const getChallengePriority = (challenge: Challenge) => {
	switch (challenge.type) {
		case 'fetch':
			return 0
		case 'background-iframe':
			return 1
		case 'poll':
			return 2
		case 'redirect':
			return 3
		case 'iframe':
			return 4
		default:
			return 10
	}
}
