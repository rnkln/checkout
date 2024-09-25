import type {
	ElementType,
	PropsWithChildren,
	ComponentPropsWithRef,
	ComponentPropsWithoutRef
} from 'react'

export type AsProp<C extends ElementType> = {
	as?: C
}

export type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P)

export type PolymorphicRef<C extends ElementType> =
	ComponentPropsWithRef<C>['ref']

export type PolymorphicComponentProp<
	C extends ElementType,
	Props = object
> = PropsWithChildren<Props & AsProp<C>> &
	Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export type PolymorphicComponentPropWithRef<
	C extends ElementType,
	Props = object
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }
