import { forwardRef } from 'react';
import clsx from 'clsx';

import { Text } from '../typography';
import { useId } from '../utils/useId';

import { TextfieldBase, TextfieldBaseProps } from './TextfieldBase';
import * as classes from './Textfield.css';

export type TextfieldProps = TextfieldBaseProps & {
  label: string;
  error?: string;
};

export const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(
  (
    {
      id: idProp,
      value,
      label,
      error,
      disabled,
      placeholder,
      className: classNameProp,
      invalid = Boolean(error),
      ...otherProps
    },
    ref
  ) => {
    const id = useId(idProp);
    const className = clsx(classNameProp, classes.textfieldRoot);

    const baseId = `${id}-base`;

    const errorId = `${id}-error`;

    const labelId = `${id}-label`;
    const textClassName = clsx(classes.textfieldText, {
      active: Boolean(value) || Boolean(placeholder),
    });

    return (
      <div id={id} className={className}>
        <Text
          fontSize={1}
          fontWeight="medium"
          textTransform="uppercase"
          className={textClassName}
        >
          {label && (
            <Text
              as="label"
              id={labelId}
              color="secondary"
              fontWeight="medium"
              className={classes.textfieldLabel}
              htmlFor={baseId}
            >
              {label}
            </Text>
          )}
          {error && !disabled && (
            <Text id={errorId} fontSize={1} color="negative">
              {` · ${error}`}
            </Text>
          )}
        </Text>

        <TextfieldBase
          id={baseId}
          ref={ref}
          value={value}
          invalid={invalid}
          disabled={disabled}
          placeholder={placeholder}
          aria-labelledby={label ? labelId : undefined}
          aria-errormessage={error ? errorId : undefined}
          inputProps={{ className: classes.textfieldInput }}
          {...otherProps}
        />
      </div>
    );
  }
);
