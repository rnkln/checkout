import { useCallback, useRef, useState, type PointerEvent } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import clsx from 'clsx'
import { Portal } from '@matter/portal/Portal'
import { ButtonBase } from '@matter/button'
import { HelpCircleOutline } from '@matter/icon'
import { TextfieldAdornment } from '@matter/textfield'
import { useOutside } from '@matter/utils/useOutside'

import Illustration from './CardFormCodeHelper.svg'
import * as classes from './CardFormCodeHelper.css'

export type CardFormCodeHelperProps = {
	target: string
}

export const CardFormCodeHelper = ({ target }: CardFormCodeHelperProps) => {
	const ref = useRef<SVGSVGElement>(null)
	const [shown, setShown] = useState(false)

	const handleHide = useCallback(() => setShown(false), [])
	const handleShow = useCallback(() => setShown(true), [])

	const illustrationClassName = clsx(classes.illustration, { shown })

	useOutside(ref, 'click', handleHide, { enabled: shown })
	useHotkeys('esc', handleHide, { enabled: shown })

	return (
		<TextfieldAdornment>
			<ButtonBase
				type="button"
				aria-hidden
				tabIndex={-1}
				style={{ display: 'block' }}
				onClick={handleShow}
				// This prevents the button from getting focus when clicking it.
				onPointerDown={(event: PointerEvent) => event.preventDefault()}
			>
				<HelpCircleOutline color="quaternary" />
			</ButtonBase>
			<Portal target={target}>
				<div className={illustrationClassName} onClick={handleHide}>
					<Illustration
						ref={ref}
						role="presentation"
						aria-hidden
						className={classes.illustrationSVG}
					/>
				</div>
			</Portal>
		</TextfieldAdornment>
	)
}
