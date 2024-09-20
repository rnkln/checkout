import { forwardRef, ReactNode, ElementType } from 'react';
import { clsx } from 'clsx';

import {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from '../utils/Component';

import * as classes from './Flex.css';

export type FlexPropsBase = Parameters<typeof classes.flexSprinkles>[0];

export type FlexProps<C extends ElementType> = PolymorphicComponentPropWithRef<
  C,
  FlexPropsBase
>;

export type FlexComponent = <C extends ElementType = 'div'>(
  props: FlexProps<C>
) => ReactNode;

export const Flex: FlexComponent = forwardRef(
  <C extends ElementType = 'div'>(
    {
      as,
      alignItems,
      children,
      className: classNameProp,
      display = 'flex',
      flexDirection,
      flexGrow,
      flexShrink,
      flexWrap,
      gap,
      justifyContent,
      style,
      ...otherProps
    }: FlexProps<C>,
    forwardedRef: PolymorphicRef<C>
  ) => {
    const Component = as ?? 'div';
    const className = clsx(
      classNameProp,
      classes.flexSprinkles({
        alignItems,
        display,
        flexDirection,
        flexGrow,
        flexShrink,
        flexWrap,
        gap,
        justifyContent,
      })
    );

    return (
      <Component
        ref={forwardedRef}
        className={className}
        style={style}
        {...otherProps}
      >
        {children}
      </Component>
    );
  }
);
