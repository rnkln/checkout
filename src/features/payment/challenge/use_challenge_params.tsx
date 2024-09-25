import { useMemo } from 'react'
import { useRouter } from 'next/router'

export type ChallengeParams = {
	id?: string
	locale?: string
	redirect?: string
	strategy?: 'auto' | 'manual'
}

export const useChallengeParams = () => {
	const router = useRouter()

	return useMemo(() => {
		const params = new URLSearchParams(router.asPath.split('?')[1])

		return {
			id: asString(params.get('id')),
			locale: asString(params.get('locale')),
			redirect: asString(params.get('redirect')),
			strategy: asStrategy(params.get('strategy'))
		}
	}, [router.asPath])
}

const asString = (value: string | null) => value ?? undefined

const asStrategy = (value: string | null) => {
	if (!value && value !== 'auto' && value !== 'manual') {
		return undefined
	}

	return value.toLocaleLowerCase() as 'auto' | 'manual'
}
