import { useState, useEffect, type ReactElement } from 'react'

export type RoutingProps = {
	children: ReactElement
}

export const Routing = ({ children }: RoutingProps): JSX.Element | null => {
	const [isReady, setIsReady] = useState(false)

	// Blocking all server side rendering here so hydration works in dev.
	// This works because the app is client side only, and therefore
	// only needs to render the top level html, head and body when doing SSR.
	// Sigh....
	useEffect(() => {
		setIsReady(true)
	}, [])

	if (!isReady) {
		return null
	}

	return children
}
