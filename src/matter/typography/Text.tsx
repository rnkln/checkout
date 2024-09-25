import { forwardRef, type ReactNode, type ElementType } from 'react'
import { clsx } from 'clsx'

import type {
	PolymorphicComponentProp,
	PolymorphicComponentPropWithRef,
	PolymorphicRef
} from '../utils/Component'

import * as classes from './Typography.css'

export type TextPropsBase = Parameters<typeof classes.typographySprinkles>[0]

export type TextProps<C extends ElementType = 'span'> =
	PolymorphicComponentPropWithRef<C, TextPropsBase>

export type TextComponent = <C extends ElementType = 'span'>(
	props: TextProps<C>
) => ReactNode

export const Text: TextComponent = forwardRef(
	<C extends ElementType = 'span'>(
		{
			as,
			children,
			color,
			fontSize,
			fontWeight,
			textAlign,
			textTransform,
			textDecoration,
			className: classNameProp,
			...otherProps
		}: PolymorphicComponentProp<C, TextProps>,
		forwardedRef: PolymorphicRef<C>
	) => {
		const Component = as ?? 'span'
		const className = clsx(
			classNameProp,
			classes.typographyRoot,
			classes.typographySprinkles({
				color,
				fontSize,
				fontWeight,
				textAlign,
				textTransform,
				textDecoration
			})
		)

		return (
			<Component ref={forwardedRef} className={className} {...otherProps}>
				{children}
			</Component>
		)
	}
)
