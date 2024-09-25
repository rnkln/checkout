import { type MutableRefObject, useEffect } from 'react'

export type UseOutsideOptions = {
	enabled?: boolean
	capture?: boolean
	exclude?: HTMLElement
}

export const useOutside = (
	ref: MutableRefObject<Element | null>, // Ref can be null initially
	type: keyof DocumentEventMap,
	handler: () => void,
	{ enabled = true, capture = true, exclude }: UseOutsideOptions = {}
) => {
	useEffect(() => {
		if (enabled) {
			const element = ref.current

			const listener = (event: Event) => {
				if (event.target instanceof Element) {
					const excluded = exclude?.contains(event.target)
					const outside =
						!excluded && element && !element.contains(event.target)

					if (outside) {
						handler()
					}
				}
			}

			document.addEventListener(type, listener, { capture })

			return () => {
				document.removeEventListener(type, listener, { capture })
			}
		}
	}, [ref, type, enabled, exclude, capture, handler])
}
