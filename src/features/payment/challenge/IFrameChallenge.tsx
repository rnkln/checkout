import { useEffect, useMemo, useRef, useState } from 'react'
import { useTimeout } from '@matter/utils/useTimeout'

import type {
	Hint,
	IFrameChallenge as IFrameChallengeType
} from '../client/payment_types'

import * as classes from './IFrameChallenge.css'

export type IFrameChallengeProps = {
	challenge: IFrameChallengeType
	onResolve: (hints?: Hint[]) => void
}

export const IFrameChallenge = ({
	challenge,
	onResolve
}: IFrameChallengeProps) => {
	const fref = useRef<HTMLFormElement>(null)
	const iref = useRef<HTMLIFrameElement>(null)
	const { type, method = 'GET', url, action, fields, timeout } = challenge
	const [display, setDisplay] = useState<'none' | 'block'>('none')

	const iname = 'challenge-frame'
	const hidden = type === 'background-iframe'

	const handleLoad = useMemo(
		() => (hidden ? undefined : () => setDisplay('block')),
		[hidden]
	)

	useTimeout(onResolve, {
		delay: timeout,
		enabled: timeout !== undefined
	})

	useEffect(() => {
		const form = fref.current
		const iframe = iref.current
		const handler = ({
			source,
			data
		}: MessageEvent<undefined | { hints?: Hint[] }>) => {
			if (source === iframe?.contentWindow) {
				setDisplay('none')
				onResolve(data?.hints)
			}
		}

		window.addEventListener('message', handler)
		form?.submit()

		return () => {
			window.removeEventListener('message', handler)
		}
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [])

	return (
		<>
			<iframe
				ref={iref}
				src={method.toUpperCase() === 'GET' ? url : undefined}
				name={iname}
				title={iname}
				className={classes.root}
				data-test-id="iframe-challenge"
				style={{ display }}
				onLoad={handleLoad}
			/>

			{method.toUpperCase() === 'POST' && (
				<form
					ref={fref}
					target={iname}
					method={method}
					action={action}
					style={{ display }}
				>
					{fields
						? Object.entries(fields).map(([name, value]) => (
								<input
									key={name}
									type="hidden"
									name={name}
									value={value}
								/>
							))
						: null}
				</form>
			)}
		</>
	)
}
